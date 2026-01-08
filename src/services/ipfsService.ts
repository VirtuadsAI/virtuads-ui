/**
 * IPFS Service - Almacenamiento descentralizado para NFT Ads
 * Usa nft.storage (free) o IPFS HTTP gateway
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface NFTMetadata {
    name: string;
    description: string;
    image: string;  // IPFS URI (ipfs://...)
    external_url?: string;
    attributes?: Array<{
        trait_type: string;
        value: string | number;
    }>;
    // VirtuAds specific fields
    ad_type?: 'banner' | 'video' | 'interactive' | '3d';
    campaign_id?: string;
    click_url?: string;
    start_date?: string;
    end_date?: string;
}

export interface IPFSUploadResult {
    success: boolean;
    cid?: string;
    uri?: string;  // ipfs://CID
    httpUrl?: string;  // https://gateway/ipfs/CID
    error?: string;
}

// ============================================================================
// Configuration
// ============================================================================

// Public IPFS gateways for reading
const IPFS_GATEWAYS = [
    'https://ipfs.io/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
    'https://dweb.link/ipfs/'
];

// nft.storage API (free, requires API key for production)
const NFT_STORAGE_API = 'https://api.nft.storage';
const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY || '';

// ============================================================================
// IPFS Service Class
// ============================================================================

class IPFSService {
    private apiKey: string;
    private preferredGateway: string;

    constructor() {
        this.apiKey = NFT_STORAGE_KEY;
        this.preferredGateway = IPFS_GATEWAYS[0];
    }

    // ========================================================================
    // Upload Methods
    // ========================================================================

    /**
     * Upload a file (image/video) to IPFS
     */
    async uploadFile(file: File): Promise<IPFSUploadResult> {
        // If API key is available, use nft.storage
        if (this.apiKey) {
            return this.uploadToNFTStorage(file);
        }

        // Fallback: Generate mock CID for development
        return this.generateMockUpload(file.name, 'file');
    }

    /**
     * Upload NFT metadata JSON to IPFS
     */
    async uploadMetadata(metadata: NFTMetadata): Promise<IPFSUploadResult> {
        if (this.apiKey) {
            const blob = new Blob([JSON.stringify(metadata, null, 2)], {
                type: 'application/json'
            });
            const file = new File([blob], 'metadata.json', { type: 'application/json' });
            return this.uploadToNFTStorage(file);
        }

        return this.generateMockUpload('metadata.json', 'metadata');
    }

    /**
     * Upload file to nft.storage
     */
    private async uploadToNFTStorage(file: File): Promise<IPFSUploadResult> {
        try {
            const response = await fetch(`${NFT_STORAGE_API}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: file
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.status}`);
            }

            const data = await response.json();
            const cid = data.value?.cid || data.cid;

            if (!cid) {
                throw new Error('No CID returned from upload');
            }

            return {
                success: true,
                cid,
                uri: `ipfs://${cid}`,
                httpUrl: `${this.preferredGateway}${cid}`
            };
        } catch (error) {
            console.error('[IPFS] Upload error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Upload failed'
            };
        }
    }

    /**
     * Generate mock IPFS upload for development (when no API key)
     */
    private generateMockUpload(filename: string, type: string): Promise<IPFSUploadResult> {
        return new Promise((resolve) => {
            // Simulate upload delay
            setTimeout(() => {
                // Generate a fake CID-like string
                const mockCid = `bafybeig${Date.now().toString(36)}${Math.random().toString(36).substring(2, 15)}`;

                console.log(`[IPFS] Mock ${type} upload:`, filename, '→', mockCid);

                resolve({
                    success: true,
                    cid: mockCid,
                    uri: `ipfs://${mockCid}`,
                    httpUrl: `${this.preferredGateway}${mockCid}`
                });
            }, 1500);
        });
    }

    // ========================================================================
    // Read Methods
    // ========================================================================

    /**
     * Fetch content from IPFS by CID
     */
    async fetchFromIPFS<T = any>(cid: string): Promise<T | null> {
        // Try each gateway until one works
        for (const gateway of IPFS_GATEWAYS) {
            try {
                const response = await fetch(`${gateway}${cid}`, {
                    signal: AbortSignal.timeout(10000)
                });

                if (response.ok) {
                    const contentType = response.headers.get('content-type');

                    if (contentType?.includes('application/json')) {
                        return await response.json();
                    }

                    return await response.text() as T;
                }
            } catch (e) {
                console.warn(`[IPFS] Gateway ${gateway} failed:`, e);
                continue;
            }
        }

        console.error('[IPFS] All gateways failed for CID:', cid);
        return null;
    }

    /**
     * Get HTTP URL for an IPFS URI
     */
    getHttpUrl(ipfsUri: string): string {
        if (ipfsUri.startsWith('ipfs://')) {
            const cid = ipfsUri.replace('ipfs://', '');
            return `${this.preferredGateway}${cid}`;
        }
        return ipfsUri;
    }

    /**
     * Get IPFS URI from CID
     */
    getIpfsUri(cid: string): string {
        return `ipfs://${cid}`;
    }

    // ========================================================================
    // Utility Methods
    // ========================================================================

    /**
     * Check if a string is a valid IPFS CID
     */
    isValidCid(str: string): boolean {
        // Basic CID validation (supports CIDv0 and CIDv1)
        return /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]+)$/i.test(str);
    }

    /**
     * Create metadata for a VirtuAds NFT
     */
    createAdMetadata(params: {
        name: string;
        description: string;
        imageCid: string;
        clickUrl?: string;
        campaignId?: string;
        startDate?: Date;
        endDate?: Date;
        adType?: NFTMetadata['ad_type'];
    }): NFTMetadata {
        const metadata: NFTMetadata = {
            name: params.name,
            description: params.description,
            image: `ipfs://${params.imageCid}`,
            external_url: params.clickUrl,
            ad_type: params.adType || 'banner',
            campaign_id: params.campaignId,
            click_url: params.clickUrl,
            attributes: [
                { trait_type: 'Platform', value: 'VirtuAdsAI' },
                { trait_type: 'Ad Type', value: params.adType || 'banner' }
            ]
        };

        if (params.startDate) {
            metadata.start_date = params.startDate.toISOString();
            metadata.attributes?.push({
                trait_type: 'Start Date',
                value: params.startDate.toLocaleDateString()
            });
        }

        if (params.endDate) {
            metadata.end_date = params.endDate.toISOString();
            metadata.attributes?.push({
                trait_type: 'End Date',
                value: params.endDate.toLocaleDateString()
            });
        }

        return metadata;
    }

    /**
     * Check if API key is configured
     */
    isConfigured(): boolean {
        return !!this.apiKey;
    }
}

// Export singleton instance
export const ipfsService = new IPFSService();
