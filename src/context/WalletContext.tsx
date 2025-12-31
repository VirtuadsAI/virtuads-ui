import React, { createContext, useContext, useState, useCallback } from 'react';
import * as xrpl from 'xrpl';

interface WalletContextType {
    address: string | null;
    isConnected: boolean;
    balance: string | null;
    connect: () => Promise<void>;
    disconnect: () => void;
    error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const connect = useCallback(async () => {
        try {
            setError(null);

            // Check if GemWallet or Crossmark is available (injectable wallets)
            // For now, we'll implement a basic connection to XRPL Testnet
            // and simulate a "connection" if a browser wallet isn't detected.

            // Note: In a real app, we would use window.gemwallet or window.xrpl
            // to interact with browser extensions.

            const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
            await client.connect();

            // This is a placeholder for actual wallet selection logic
            // For demo purposes, we'll use a test wallet or prompt user
            // In a real implementation, you'd integrate GemWallet/Crossmark SDKs.

            // For now, let's assume we get an address (mocking local development)
            // If window.gemwallet exists, use it.

            if ((window as any).gemwallet) {
                const response = await (window as any).gemwallet.getAddress();
                if (response.result?.address) {
                    setAddress(response.result.address);
                    setIsConnected(true);

                    const accountInfo = await client.request({
                        command: "account_info",
                        account: response.result.address,
                        ledger_index: "validated"
                    });

                    setBalance(xrpl.dropsToXrp(accountInfo.result.account_data.Balance));
                }
            } else {
                // If no wallet extension, just notify that it's required or fallback
                setError("No Ripple wallet extension detected (GemWallet/Crossmark recommended)");
            }

            await client.disconnect();
        } catch (err: any) {
            setError(err.message || "Failed to connect to Ripple wallet");
            console.error("Wallet connection error:", err);
        }
    }, []);

    const disconnect = useCallback(() => {
        setAddress(null);
        setBalance(null);
        setIsConnected(false);
    }, []);

    return (
        <WalletContext.Provider value={{ address, isConnected, balance, connect, disconnect, error }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
