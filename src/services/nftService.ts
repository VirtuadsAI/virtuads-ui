/**
 * XRPL NFT Service - Minting and managing NFTs on XRPL
 * Uses NFTokenMint, NFTokenCreateOffer, NFTokenBurn transactions
 */

import * as xrpl from 'xrpl';
import { ipfsService, NFTMetadata, IPFSUploadResult } from './ipfsService';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface NFToken {
    NFTokenID: string;
    Issuer: string;
    NFTokenTaxon: number;
    URI?: string;
    Flags: number;
    TransferFee?: number;
    // Decoded metadata
    metadata?: NFTMetadata;
    httpImageUrl?: string;
}

export interface NFTMintParams {
    name: string;
    description: string;
    imageFile: File;
    clickUrl?: string;
    adType?: NFTMetadata['ad_type'];
    transferFee?: number;  // 0-50000 (0-50%)
    taxon?: number;
}

export interface NFTMintResult {
    success: boolean;
    nftokenId?: string;
    txHash?: string;
    metadataUri?: string;
    error?: string;
}

export interface NFTOfferParams {
    nftokenId: string;
    amount: string;  // In drops for XRP
    destination?: string;  // Specific buyer (optional)
    expiration?: number;  // Unix timestamp
}

export interface NFTOfferResult {
    success: boolean;
    offerId?: string;
    txHash?: string;
    error?: string;
}

// ============================================================================
// Configuration
// ============================================================================

const NETWORK_CONFIG = {
    testnet: 'wss://s.altnet.rippletest.net:51233',
    mainnet: 'wss://xrplcluster.com'
};

// VirtuAds NFT Taxon (unique identifier for our platform's NFTs)
const VIRTUADS_TAXON = 1337;

// NFT Flags
const NFT_FLAGS = {
    burnable: 1,      // tfBurnable
    onlyXRP: 2,       // tfOnlyXRP
    trustLine: 4,     // tfTrustLine
    transferable: 8   // tfTransferable
};

// ============================================================================
// XRPL NFT Service Class
// ============================================================================

class NFTService {
    private network: 'testnet' | 'mainnet';
    private client: xrpl.Client | null = null;

    constructor() {
        this.network = (import.meta.env.VITE_XRPL_NETWORK as 'testnet' | 'mainnet') || 'testnet';
    }

    // ========================================================================
    // Connection
    // ========================================================================

    async connect(): Promise<xrpl.Client> {
        if (this.client && this.client.isConnected()) {
            return this.client;
        }

        this.client = new xrpl.Client(NETWORK_CONFIG[this.network]);
        await this.client.connect();
        console.log(`[NFT] Connected to ${this.network}`);
        return this.client;
    }

    async disconnect(): Promise<void> {
        if (this.client?.isConnected()) {
            await this.client.disconnect();
        }
        this.client = null;
    }

    // ========================================================================
    // NFT Minting
    // ========================================================================

    /**
     * Prepare full NFT minting flow:
     * 1. Upload image to IPFS
     * 2. Create and upload metadata to IPFS
     * 3. Prepare NFTokenMint transaction
     */
    async prepareMint(
        account: string,
        params: NFTMintParams
    ): Promise<{ tx: xrpl.NFTokenMint; metadataUri: string } | { error: string }> {
        try {
            console.log('[NFT] Starting mint preparation for:', params.name);

            // Step 1: Upload image to IPFS
            console.log('[NFT] Uploading image...');
            const imageResult = await ipfsService.uploadFile(params.imageFile);
            if (!imageResult.success || !imageResult.cid) {
                return { error: `Image upload failed: ${imageResult.error}` };
            }
            console.log('[NFT] Image uploaded:', imageResult.cid);

            // Step 2: Create and upload metadata
            console.log('[NFT] Creating metadata...');
            const metadata = ipfsService.createAdMetadata({
                name: params.name,
                description: params.description,
                imageCid: imageResult.cid,
                clickUrl: params.clickUrl,
                adType: params.adType
            });

            const metadataResult = await ipfsService.uploadMetadata(metadata);
            if (!metadataResult.success || !metadataResult.uri) {
                return { error: `Metadata upload failed: ${metadataResult.error}` };
            }
            console.log('[NFT] Metadata uploaded:', metadataResult.cid);

            // Step 3: Prepare NFTokenMint transaction
            const client = await this.connect();

            // Convert URI to hex
            const uriHex = this.stringToHex(metadataResult.uri);

            const mintTx: xrpl.NFTokenMint = {
                TransactionType: 'NFTokenMint',
                Account: account,
                NFTokenTaxon: params.taxon || VIRTUADS_TAXON,
                URI: uriHex,
                Flags: NFT_FLAGS.burnable | NFT_FLAGS.transferable,
            };

            // Add transfer fee if specified (0.001% = 1, max 50% = 50000)
            if (params.transferFee && params.transferFee > 0) {
                mintTx.TransferFee = Math.min(params.transferFee, 50000);
            }

            const prepared = await client.autofill(mintTx);
            console.log('[NFT] Mint transaction prepared');

            return {
                tx: prepared,
                metadataUri: metadataResult.uri
            };

        } catch (error) {
            console.error('[NFT] Prepare mint error:', error);
            return {
                error: error instanceof Error ? error.message : 'Mint preparation failed'
            };
        }
    }

    /**
     * Get NFToken ID from a mint transaction result
     */
    extractNFTokenId(txResult: any): string | null {
        try {
            // Look for the NFTokenID in affected nodes
            const meta = txResult.meta || txResult.result?.meta;
            if (!meta || typeof meta === 'string') return null;

            for (const node of meta.AffectedNodes || []) {
                const created = node.CreatedNode;
                if (created?.LedgerEntryType === 'NFTokenPage') {
                    const tokens = created.NewFields?.NFTokens;
                    if (tokens && tokens.length > 0) {
                        return tokens[tokens.length - 1].NFToken?.NFTokenID;
                    }
                }

                const modified = node.ModifiedNode;
                if (modified?.LedgerEntryType === 'NFTokenPage') {
                    const finalTokens = modified.FinalFields?.NFTokens || [];
                    const prevTokens = modified.PreviousFields?.NFTokens || [];

                    // Find the new token
                    const prevIds = new Set(prevTokens.map((t: any) => t.NFToken?.NFTokenID));
                    for (const token of finalTokens) {
                        if (!prevIds.has(token.NFToken?.NFTokenID)) {
                            return token.NFToken?.NFTokenID;
                        }
                    }
                }
            }

            return null;
        } catch (e) {
            console.error('[NFT] Extract token ID error:', e);
            return null;
        }
    }

    // ========================================================================
    // NFT Offers (Selling)
    // ========================================================================

    /**
     * Prepare a sell offer for an NFT
     */
    async prepareSellOffer(
        account: string,
        params: NFTOfferParams
    ): Promise<xrpl.NFTokenCreateOffer> {
        const client = await this.connect();

        const offerTx: xrpl.NFTokenCreateOffer = {
            TransactionType: 'NFTokenCreateOffer',
            Account: account,
            NFTokenID: params.nftokenId,
            Amount: params.amount,
            Flags: 1  // tfSellNFToken
        };

        if (params.destination) {
            offerTx.Destination = params.destination;
        }

        if (params.expiration) {
            offerTx.Expiration = params.expiration;
        }

        return await client.autofill(offerTx);
    }

    // ========================================================================
    // NFT Burning
    // ========================================================================

    /**
     * Prepare burn transaction for an NFT
     */
    async prepareBurn(account: string, nftokenId: string): Promise<xrpl.NFTokenBurn> {
        const client = await this.connect();

        const burnTx: xrpl.NFTokenBurn = {
            TransactionType: 'NFTokenBurn',
            Account: account,
            NFTokenID: nftokenId
        };

        return await client.autofill(burnTx);
    }

    // ========================================================================
    // Query Methods
    // ========================================================================

    /**
     * Get all NFTs owned by an account
     */
    async getAccountNFTs(account: string): Promise<NFToken[]> {
        const client = await this.connect();

        try {
            const response = await client.request({
                command: 'account_nfts',
                account,
                ledger_index: 'validated'
            });

            const nfts: NFToken[] = [];

            for (const nft of response.result.account_nfts) {
                const token: NFToken = {
                    NFTokenID: nft.NFTokenID,
                    Issuer: nft.Issuer,
                    NFTokenTaxon: nft.NFTokenTaxon,
                    URI: nft.URI ? this.hexToString(nft.URI) : undefined,
                    Flags: nft.Flags,
                    TransferFee: nft.nft_serial
                };

                // Try to fetch metadata if URI exists
                if (token.URI) {
                    const metadata = await this.fetchNFTMetadata(token.URI);
                    if (metadata) {
                        token.metadata = metadata;
                        token.httpImageUrl = ipfsService.getHttpUrl(metadata.image);
                    }
                }

                nfts.push(token);
            }

            return nfts;

        } catch (error) {
            console.error('[NFT] Get account NFTs error:', error);
            return [];
        }
    }

    /**
     * Fetch metadata from IPFS URI
     */
    async fetchNFTMetadata(uri: string): Promise<NFTMetadata | null> {
        try {
            if (uri.startsWith('ipfs://')) {
                const cid = uri.replace('ipfs://', '');
                return await ipfsService.fetchFromIPFS<NFTMetadata>(cid);
            }
            return null;
        } catch (e) {
            console.warn('[NFT] Fetch metadata failed:', e);
            return null;
        }
    }

    /**
     * Get sell offers for an NFT
     */
    async getNFTSellOffers(nftokenId: string): Promise<any[]> {
        const client = await this.connect();

        try {
            const response = await client.request({
                command: 'nft_sell_offers',
                nft_id: nftokenId
            });
            return response.result.offers || [];
        } catch (e) {
            return [];
        }
    }

    // ========================================================================
    // Utility Methods
    // ========================================================================

    private stringToHex(str: string): string {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
    }

    private hexToString(hex: string): string {
        const bytes = new Uint8Array(
            hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
        );
        return new TextDecoder().decode(bytes);
    }

    /**
     * Check if NFT is a VirtuAds NFT
     */
    isVirtuAdsNFT(nft: NFToken): boolean {
        return nft.NFTokenTaxon === VIRTUADS_TAXON;
    }

    /**
     * Get platform taxon
     */
    getVirtuAdsTaxon(): number {
        return VIRTUADS_TAXON;
    }
}

// Export singleton instance
export const nftService = new NFTService();
