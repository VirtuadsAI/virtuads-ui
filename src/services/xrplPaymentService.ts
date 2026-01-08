/**
 * XRPL Payment Service - Transacciones de pago en XRPL
 * Maneja pagos en XRP y stablecoins (RLUSD, USDC)
 */

import * as xrpl from 'xrpl';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface PaymentParams {
    destination: string;
    amount: string;
    currency?: string;  // 'XRP' | 'RLUSD' | 'USDC'
    issuer?: string;    // Required for non-XRP currencies
    memo?: string;
}

export interface TxResult {
    success: boolean;
    txHash?: string;
    error?: string;
    fee?: string;
}

export interface EscrowParams {
    destination: string;
    amount: string;
    finishAfterSeconds: number;
    cancelAfterSeconds?: number;
    condition?: string;
}

export interface TrustLineParams {
    currency: string;
    issuer: string;
    limit: string;
}

export interface AccountBalance {
    currency: string;
    value: string;
    issuer?: string;
}

// ============================================================================
// Configuration
// ============================================================================

const NETWORK_CONFIG = {
    testnet: {
        wss: import.meta.env.VITE_XRPL_WSS_TESTNET || 'wss://s.altnet.rippletest.net:51233',
        explorer: 'https://testnet.xrpl.org'
    },
    mainnet: {
        wss: import.meta.env.VITE_XRPL_WSS_MAINNET || 'wss://xrplcluster.com',
        explorer: 'https://livenet.xrpl.org'
    }
};

// Stablecoin Issuers (configure in .env for production)
const STABLECOIN_ISSUERS = {
    RLUSD: import.meta.env.VITE_RLUSD_ISSUER || 'rRLUSD_ISSUER_ADDRESS',
    USDC: import.meta.env.VITE_USDC_ISSUER || 'rUSDC_ISSUER_ADDRESS'
};

// ============================================================================
// XRPL Payment Service Class
// ============================================================================

class XRPLPaymentService {
    private network: 'testnet' | 'mainnet';
    private client: xrpl.Client | null = null;

    constructor() {
        this.network = (import.meta.env.VITE_XRPL_NETWORK as 'testnet' | 'mainnet') || 'testnet';
    }

    // ========================================================================
    // Connection Management
    // ========================================================================

    private get config() {
        return NETWORK_CONFIG[this.network];
    }

    async connect(): Promise<xrpl.Client> {
        if (this.client && this.client.isConnected()) {
            return this.client;
        }

        this.client = new xrpl.Client(this.config.wss);
        await this.client.connect();
        console.log(`[XRPL] Connected to ${this.network}`);
        return this.client;
    }

    async disconnect(): Promise<void> {
        if (this.client && this.client.isConnected()) {
            await this.client.disconnect();
            console.log('[XRPL] Disconnected');
        }
        this.client = null;
    }

    // ========================================================================
    // Prepare Transactions (for wallet signing)
    // ========================================================================

    /**
     * Prepara una transacción de pago para ser firmada por la wallet
     */
    async preparePayment(sourceAddress: string, params: PaymentParams): Promise<xrpl.Payment> {
        const client = await this.connect();

        // Determine amount format
        let amount: xrpl.Payment['Amount'];

        if (!params.currency || params.currency === 'XRP') {
            // XRP payment (in drops)
            amount = xrpl.xrpToDrops(params.amount);
        } else {
            // Token payment (RLUSD, USDC, etc.)
            const issuer = params.issuer || STABLECOIN_ISSUERS[params.currency as keyof typeof STABLECOIN_ISSUERS];
            if (!issuer) {
                throw new Error(`Unknown currency: ${params.currency}. Provide issuer.`);
            }
            amount = {
                currency: params.currency,
                value: params.amount,
                issuer: issuer
            };
        }

        // Build payment transaction
        const payment: xrpl.Payment = {
            TransactionType: 'Payment',
            Account: sourceAddress,
            Destination: params.destination,
            Amount: amount
        };

        // Add memo if provided
        if (params.memo) {
            payment.Memos = [{
                Memo: {
                    MemoType: this.stringToHex('text/plain'),
                    MemoData: this.stringToHex(params.memo)
                }
            }];
        }

        // Autofill sequence, fee, lastLedgerSequence
        const prepared = await client.autofill(payment);
        console.log('[XRPL] Payment prepared:', prepared);

        return prepared;
    }

    /**
     * Prepara una transacción de Escrow para pagos condicionados
     */
    async prepareEscrowCreate(sourceAddress: string, params: EscrowParams): Promise<xrpl.EscrowCreate> {
        const client = await this.connect();

        const finishAfter = Math.floor(Date.now() / 1000) + params.finishAfterSeconds;

        const escrow: xrpl.EscrowCreate = {
            TransactionType: 'EscrowCreate',
            Account: sourceAddress,
            Destination: params.destination,
            Amount: xrpl.xrpToDrops(params.amount),
            FinishAfter: finishAfter
        };

        if (params.cancelAfterSeconds) {
            escrow.CancelAfter = finishAfter + params.cancelAfterSeconds;
        }

        if (params.condition) {
            escrow.Condition = params.condition;
        }

        const prepared = await client.autofill(escrow);
        console.log('[XRPL] Escrow prepared:', prepared);

        return prepared;
    }

    /**
     * Prepara TrustLine para recibir stablecoins
     */
    async prepareTrustLine(sourceAddress: string, params: TrustLineParams): Promise<xrpl.TrustSet> {
        const client = await this.connect();

        const trustSet: xrpl.TrustSet = {
            TransactionType: 'TrustSet',
            Account: sourceAddress,
            LimitAmount: {
                currency: params.currency,
                issuer: params.issuer,
                value: params.limit
            }
        };

        const prepared = await client.autofill(trustSet);
        console.log('[XRPL] TrustLine prepared:', prepared);

        return prepared;
    }

    // ========================================================================
    // Submit Signed Transactions
    // ========================================================================

    /**
     * Submit a signed transaction blob to XRPL
     */
    async submitSignedTransaction(signedTxBlob: string): Promise<TxResult> {
        try {
            const client = await this.connect();

            const result = await client.submitAndWait(signedTxBlob);

            const txResult = result.result.meta;
            const success = typeof txResult === 'object' &&
                txResult !== null &&
                'TransactionResult' in txResult &&
                txResult.TransactionResult === 'tesSUCCESS';

            // Extract fee from tx_json if available
            const txJson = result.result as { tx_json?: { Fee?: string } };
            const fee = txJson.tx_json?.Fee ? xrpl.dropsToXrp(txJson.tx_json.Fee) : undefined;

            return {
                success,
                txHash: result.result.hash,
                fee,
                error: success ? undefined : `Transaction failed: ${typeof txResult === 'object' && txResult !== null && 'TransactionResult' in txResult ? txResult.TransactionResult : 'Unknown'}`
            };
        } catch (error) {
            console.error('[XRPL] Submit error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // ========================================================================
    // Query Methods
    // ========================================================================

    /**
     * Get all balances for an account (XRP + tokens)
     */
    async getAccountBalances(address: string): Promise<AccountBalance[]> {
        const client = await this.connect();
        const balances: AccountBalance[] = [];

        try {
            // Get XRP balance
            const accountInfo = await client.request({
                command: 'account_info',
                account: address,
                ledger_index: 'validated'
            });

            balances.push({
                currency: 'XRP',
                value: xrpl.dropsToXrp(accountInfo.result.account_data.Balance.toString())
            });

            // Get token balances (trust lines)
            try {
                const lines = await client.request({
                    command: 'account_lines',
                    account: address,
                    ledger_index: 'validated'
                });

                for (const line of lines.result.lines) {
                    balances.push({
                        currency: line.currency,
                        value: line.balance,
                        issuer: line.account
                    });
                }
            } catch (e) {
                // No trust lines, that's fine
            }

        } catch (e) {
            console.warn('[XRPL] Could not fetch balances:', e);
            // Account might not be activated
            balances.push({ currency: 'XRP', value: '0' });
        }

        return balances;
    }

    /**
     * Check if a trust line exists for a specific currency
     */
    async hasTrustLine(address: string, currency: string, issuer: string): Promise<boolean> {
        const client = await this.connect();

        try {
            const lines = await client.request({
                command: 'account_lines',
                account: address,
                peer: issuer,
                ledger_index: 'validated'
            });

            return lines.result.lines.some(
                line => line.currency === currency && line.account === issuer
            );
        } catch (e) {
            return false;
        }
    }

    /**
     * Get transaction history for an account
     */
    async getTransactionHistory(address: string, limit: number = 20): Promise<any[]> {
        const client = await this.connect();

        try {
            const response = await client.request({
                command: 'account_tx',
                account: address,
                limit,
                ledger_index_min: -1,
                ledger_index_max: -1
            });

            return response.result.transactions;
        } catch (e) {
            console.warn('[XRPL] Could not fetch tx history:', e);
            return [];
        }
    }

    /**
     * Validate an XRPL address
     */
    isValidAddress(address: string): boolean {
        return xrpl.isValidAddress(address);
    }

    /**
     * Get explorer URL for a transaction
     */
    getExplorerTxUrl(txHash: string): string {
        return `${this.config.explorer}/transactions/${txHash}`;
    }

    /**
     * Get explorer URL for an account
     */
    getExplorerAccountUrl(address: string): string {
        return `${this.config.explorer}/accounts/${address}`;
    }

    // ========================================================================
    // Utility Methods
    // ========================================================================

    private stringToHex(str: string): string {
        // Browser-compatible hex conversion
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
    }

    /**
     * Convert XRP to drops
     */
    xrpToDrops(xrp: string): string {
        return xrpl.xrpToDrops(xrp);
    }

    /**
     * Convert drops to XRP
     */
    dropsToXrp(drops: string | number): string {
        return xrpl.dropsToXrp(drops.toString());
    }

    /**
     * Get current network
     */
    getNetwork(): 'testnet' | 'mainnet' {
        return this.network;
    }

    /**
     * Get stablecoin issuer address
     */
    getStablecoinIssuer(currency: 'RLUSD' | 'USDC'): string {
        return STABLECOIN_ISSUERS[currency];
    }
}

// Export singleton instance
export const xrplPaymentService = new XRPLPaymentService();
