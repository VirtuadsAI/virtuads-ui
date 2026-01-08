import React, { createContext, useContext, useState, useCallback } from 'react';
import * as xrpl from 'xrpl';

// Transaction signing result interface
export interface SignTransactionResult {
    success: boolean;
    signedBlob?: string;
    error?: string;
}

interface WalletContextType {
    address: string | null;
    isConnected: boolean;
    balance: string | null;
    balances: { currency: string; value: string; issuer?: string }[];
    connect: (type?: 'xrpl' | 'evm') => Promise<void>;
    disconnect: () => void;
    signTransaction: (tx: xrpl.Transaction) => Promise<SignTransactionResult>;
    refreshBalance: () => Promise<void>;
    error: string | null;
    walletType: 'xrpl' | 'evm' | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);


export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const [walletType, setWalletType] = useState<'xrpl' | 'evm' | null>(null);

    const connect = useCallback(async (type: 'xrpl' | 'evm' = 'xrpl') => {
        try {
            setError(null);
            console.log(`Initiating ${type} wallet connection...`);

            if (type === 'evm') {
                // MetaMask / EVM Connection
                // @ts-ignore
                if (typeof window.ethereum !== 'undefined') {
                    try {
                        // @ts-ignore
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        if (accounts.length > 0) {
                            setAddress(accounts[0]);
                            setWalletType('evm');
                            setIsConnected(true);
                            // Balance fetching for EVM can be added here
                            return;
                        }
                    } catch (err: any) {
                        throw new Error(err.message || "User denied MetaMask access");
                    }
                } else {
                    throw new Error("MetaMask is not installed.");
                }
            } else {
                // XRPL Connection (Crossmark/GemWallet)
                // Integrated Crossmark detection with function verification
                // @ts-ignore
                let crossmarkLib: any = undefined;
                // @ts-ignore
                let signInFn: any = undefined;

                // Helper to find the function in the object
                const findSignIn = (obj: any) => {
                    if (!obj) return null;
                    if (typeof obj.signInAndWait === 'function') return obj;
                    if (obj.methods && typeof obj.methods.signInAndWait === 'function') return obj.methods;
                    if (obj.async && typeof obj.async.signInAndWait === 'function') return obj.async;
                    if (obj.api && typeof obj.api.signInAndWait === 'function') return obj.api;
                    return null;
                };

                // Check window.xrpl.crossmark
                // @ts-ignore
                if (typeof window.xrpl !== 'undefined' && window.xrpl.crossmark) {
                    // @ts-ignore
                    const found = findSignIn(window.xrpl.crossmark);
                    if (found) {
                        console.log("Found Crossmark function via window.xrpl.crossmark path");
                        crossmarkLib = found;
                    }
                }

                // Check window.crossmark fallback if not found yet
                // @ts-ignore
                if (!crossmarkLib && typeof window.crossmark !== 'undefined') {
                    // @ts-ignore
                    const found = findSignIn(window.crossmark);
                    if (found) {
                        console.log("Found Crossmark function via window.crossmark path");
                        crossmarkLib = found;
                    }
                }

                if (crossmarkLib) {
                    console.log("Crossmark lib resolved. Attempting to sign in...");

                    try {
                        // Try signInAndWait first (standard)
                        const { response } = await crossmarkLib.signInAndWait();
                        console.log("Sign in response:", response);

                        if (response?.data?.address) {
                            setAddress(response.data.address);
                            setWalletType('xrpl');
                            setIsConnected(true);

                            // Fetch balance using public node (Testnet for now, can be configured)
                            const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
                            await client.connect();
                            try {
                                const accountInfo = await client.request({
                                    command: "account_info",
                                    account: response.data.address,
                                    ledger_index: "validated"
                                });
                                setBalance(xrpl.dropsToXrp(accountInfo.result.account_data.Balance).toString());
                            } catch (e) {
                                console.warn("Could not fetch balance - account might be unactivated on Testnet", e);
                                setBalance("0");
                            }
                            await client.disconnect();
                            return;
                        } else {
                            throw new Error("No address received from Crossmark.");
                        }
                    } catch (innerErr: any) {
                        console.error("Crossmark specific error:", innerErr);
                        throw new Error(`Crossmark Error: ${innerErr.message || "Unknown error during sign in"}`);
                    }
                } else {
                    console.warn("Crossmark object found but signInAndWait missing in likely paths.");
                    // Debugging: Deep log to find where it is
                    // @ts-ignore
                    if (typeof window.xrpl !== 'undefined' && window.xrpl.crossmark) {
                        // @ts-ignore
                        console.log("DEBUG: window.xrpl.crossmark.methods keys:", window.xrpl.crossmark.methods ? Object.keys(window.xrpl.crossmark.methods) : "undefined");
                    }
                }

                // Fallback to previous logic (GemWallet or Mock)
                if ((window as any).gemwallet) {
                    console.log("GemWallet detected.");
                    const response = await (window as any).gemwallet.getAddress();
                    if (response.result?.address) {
                        setAddress(response.result.address);
                        setWalletType('xrpl');
                        setIsConnected(true);

                        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
                        await client.connect();
                        const accountInfo = await client.request({
                            command: "account_info",
                            account: response.result.address,
                            ledger_index: "validated"
                        });
                        setBalance(xrpl.dropsToXrp(accountInfo.result.account_data.Balance).toString());
                        await client.disconnect();
                        return;
                    }
                }

                // If we reach here, no wallet succeeded
                if (!crossmarkLib && !(window as any).gemwallet) {
                    console.error("No wallet detected.");
                    setError("No se detectó una billetera compatible (Crossmark/GemWallet/MetaMask). Revisa la consola (F12) para más detalles.");
                }
            }

        } catch (err: any) {
            setError(err.message || "Failed to connect to wallet");
            console.error("Wallet connection error:", err);
        }
    }, []);

    const disconnect = useCallback(() => {
        setAddress(null);
        setBalance(null);
        setBalances([]);
        setWalletType(null);
        setIsConnected(false);
    }, []);

    // Balances state for multi-currency support
    const [balances, setBalances] = useState<{ currency: string; value: string; issuer?: string }[]>([]);

    // Refresh balance from XRPL
    const refreshBalance = useCallback(async () => {
        if (!address || walletType !== 'xrpl') return;

        try {
            const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
            await client.connect();

            // Get XRP balance
            const accountInfo = await client.request({
                command: "account_info",
                account: address,
                ledger_index: "validated"
            });
            const xrpBalance = xrpl.dropsToXrp(accountInfo.result.account_data.Balance).toString();
            setBalance(xrpBalance);

            // Get token balances
            const newBalances: { currency: string; value: string; issuer?: string }[] = [
                { currency: 'XRP', value: xrpBalance }
            ];

            try {
                const lines = await client.request({
                    command: "account_lines",
                    account: address,
                    ledger_index: "validated"
                });
                for (const line of lines.result.lines) {
                    newBalances.push({
                        currency: line.currency,
                        value: line.balance,
                        issuer: line.account
                    });
                }
            } catch (e) {
                // No trust lines
            }

            setBalances(newBalances);
            await client.disconnect();
        } catch (e) {
            console.warn("Could not refresh balance:", e);
        }
    }, [address, walletType]);

    // Sign transaction using connected wallet (Crossmark/GemWallet)
    const signTransaction = useCallback(async (tx: xrpl.Transaction): Promise<SignTransactionResult> => {
        if (!address || !isConnected) {
            return { success: false, error: 'Wallet not connected' };
        }

        if (walletType !== 'xrpl') {
            return { success: false, error: 'XRPL wallet required for signing' };
        }

        try {
            // Try Crossmark first
            // @ts-ignore
            if (window.xrpl?.crossmark) {
                console.log('[WalletContext] Signing with Crossmark...');
                // @ts-ignore
                const { response } = await window.xrpl.crossmark.signAndSubmitAndWait(tx);
                console.log('[WalletContext] Crossmark response:', response);

                if (response?.data?.resp?.result?.hash) {
                    return {
                        success: true,
                        signedBlob: response.data.resp.result.hash
                    };
                } else {
                    return {
                        success: false,
                        error: response?.data?.resp?.result?.engine_result_message || 'Transaction failed'
                    };
                }
            }

            // Try GemWallet fallback
            // @ts-ignore
            if (window.gemwallet) {
                console.log('[WalletContext] Signing with GemWallet...');
                // @ts-ignore
                const response = await window.gemwallet.signTransaction({ transaction: tx });
                if (response?.result?.signature) {
                    return {
                        success: true,
                        signedBlob: response.result.signature
                    };
                }
            }

            return { success: false, error: 'No compatible wallet found for signing' };

        } catch (err: any) {
            console.error('[WalletContext] Sign error:', err);
            return {
                success: false,
                error: err.message || 'Failed to sign transaction'
            };
        }
    }, [address, isConnected, walletType]);

    return (
        <WalletContext.Provider value={{
            address,
            isConnected,
            balance,
            balances,
            connect,
            disconnect,
            signTransaction,
            refreshBalance,
            error,
            walletType
        }}>
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
