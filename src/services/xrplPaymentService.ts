import * as xrpl from 'xrpl';

class XrplPaymentService {
    private client: xrpl.Client | null = null;
    private networkUrl: string = 'wss://s.altnet.rippletest.net:51233';

    async connect(): Promise<xrpl.Client> {
        if (this.client && this.client.isConnected()) {
            return this.client;
        }

        this.client = new xrpl.Client(this.networkUrl);
        await this.client.connect();
        return this.client;
    }

    async disconnect() {
        if (this.client) {
            await this.client.disconnect();
            this.client = null;
        }
    }

    /**
     * Get XRPL balance for an account
     */
    async getBalance(address: string): Promise<string> {
        const client = await this.connect();
        try {
            const response = await client.request({
                command: 'account_info',
                account: address,
                ledger_index: 'validated'
            });
            const accountData = response.result.account_data as { Balance: string };
            return xrpl.dropsToXrp(accountData.Balance);
        } catch {
            return "0";
        }
    }

    /**
     * Get detailed account info including tokens
     */
    async getAccountObjects(address: string) {
        const client = await this.connect();
        try {
            const response = await client.request({
                command: 'account_objects',
                account: address
            });
            return response.result.account_objects;
        } catch {
            return [];
        }
    }

    /**
     * Fetch token balances (trustlines)
     */
    async getTokenBalances(address: string) {
        const client = await this.connect();
        try {
            const response = await client.request({
                command: 'account_lines',
                account: address
            });
            return response.result.lines;
        } catch {
            return [];
        }
    }

    /**
     * Simplified fetch for a specific token balance
     */
    async getTokenBalance(address: string, currency: string, issuer?: string) {
        const lines = await this.getTokenBalances(address);
        const token = lines.find(l =>
            l.currency === currency && (!issuer || l.account === issuer)
        );
        return token ? token.balance : "0";
    }

    /**
     * Prepare a payment transaction
     */
    async preparePayment(address: string, destination: string, amount: string, currency: string = "XRP", issuer?: string) {
        const client = await this.connect();

        const tx: xrpl.Payment = {
            TransactionType: "Payment",
            Account: address,
            Destination: destination,
            Amount: currency === "XRP"
                ? xrpl.xrpToDrops(amount)
                : {
                    currency,
                    issuer: issuer || '',
                    value: amount
                }
        };

        return await client.autofill(tx);
    }

    /**
     * Get transaction history for an account
     */
    async getTransactionHistory(address: string): Promise<unknown[]> {
        const client = await this.connect();
        try {
            const response = await client.request({
                command: 'account_tx',
                account: address,
                limit: 20
            });
            return response.result.transactions;
        } catch {
            return [];
        }
    }

    /**
     * Calculate network fee
     */
    async getNetworkFee(): Promise<string> {
        const client = await this.connect();
        try {
            const response = await client.request({
                command: 'fee'
            });
            const result = response.result as { drops: { minimum_fee: string } };
            return result.drops.minimum_fee;
        } catch {
            return "12"; // Default fallback in drops
        }
    }
}

export const xrplPaymentService = new XrplPaymentService();
