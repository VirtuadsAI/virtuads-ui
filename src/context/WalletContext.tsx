import React, { useState, useCallback, useContext, createContext } from 'react';
import * as xrpl from 'xrpl';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

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
    connect: (type?: 'xrpl' | 'evm' | 'solana') => Promise<void>;
    disconnect: () => void;
    signTransaction: (tx: xrpl.Transaction) => Promise<SignTransactionResult>;
    refreshBalance: () => Promise<void>;
    error: string | null;
    walletType: 'xrpl' | 'evm' | 'solana' | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [balances, setBalances] = useState<{ currency: string; value: string; issuer?: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [walletType, setWalletType] = useState<'xrpl' | 'evm' | 'solana' | null>(null);

    const connect = useCallback(async (type: 'xrpl' | 'evm' | 'solana' = 'xrpl') => {
        try {
            setError(null);
            console.log(`Initiating ${type} wallet connection...`);

            if (type === 'solana') {
                // Phantom Wallet Connection using window.solana
                // @ts-expect-error - solana might be on window
                const phantom = (window as { solana?: any }).solana;
                if (phantom?.isPhantom) {
                    try {
                        const resp = await phantom.connect();
                        setAddress(resp.publicKey.toString());
                        setWalletType('solana');
                        setIsConnected(true);

                        // Fetch SOL balance
                        try {
                            const connection = new Connection("https://api.mainnet-beta.solana.com");
                            const publicKey = new PublicKey(resp.publicKey.toString());
                            const balance = await connection.getBalance(publicKey);
                            setBalance((balance / LAMPORTS_PER_SOL).toFixed(4));
                        } catch (_e) {
                            console.warn("Failed to fetch SOL balance:", _e);
                            setBalance("0");
                        }
                    } catch (err: unknown) {
                        const msg = err instanceof Error ? err.message : "Failed to connect to Phantom";
                        setError(msg);
                    }
                } else {
                    throw new Error("Phantom wallet not detected. Please install Phantom.");
                }
            } else if (type === 'evm') {
                // MetaMask / Trust Wallet / EVM Connection
                // @ts-expect-error - provider might be on window
                const provider = window.trustwallet || (window as { ethereum?: { request: (args: unknown) => Promise<string[]> } }).ethereum;
                if (typeof provider !== 'undefined') {
                    try {
                        const accounts = await (provider as { request: (args: unknown) => Promise<string[]> }).request({ method: 'eth_requestAccounts' });
                        if (accounts.length > 0) {
                            setAddress(accounts[0]);
                            setWalletType('evm');
                            setIsConnected(true);

                            // Simple Ether balance fetch
                            try {
                                const balanceResp = await (provider as { request: (args: unknown) => Promise<string> }).request({
                                    method: 'eth_getBalance',
                                    params: [accounts[0], 'latest']
                                });
                                if (balanceResp) {
                                    const ethBal = parseInt(balanceResp, 16) / 1e18;
                                    setBalance(ethBal.toFixed(4));
                                }
                            } catch (_e) {
                                console.error("[WalletContext] EVM balance fetch error:", _e);
                            }
                        }
                    } catch (err: unknown) {
                        const msg = err instanceof Error ? err.message : "Failed to connect to EVM wallet";
                        setError(msg);
                    }
                } else {
                    throw new Error("No EVM wallet (MetaMask/Trust Wallet) detected.");
                }
            } else {
                // XRPL Connection (Crossmark/GemWallet)
                // @ts-expect-error - xrpl might be on window
                const crossmark = (window as { xrpl?: { crossmark?: unknown } }).xrpl?.crossmark || (window as { crossmark?: unknown }).crossmark;

                const resolveMethod = (obj: unknown, name: string) => {
                    if (!obj || typeof obj !== 'object') return null;
                    const record = obj as Record<string, unknown>;
                    const target = record[name];
                    if (typeof target === 'function') return (target as (...args: unknown[]) => unknown).bind(obj);

                    const asyncObj = record.async as Record<string, unknown> | undefined;
                    if (asyncObj && typeof asyncObj[name] === 'function') return (asyncObj[name] as (...args: unknown[]) => unknown).bind(asyncObj);

                    const methodsObj = record.methods as Record<string, unknown> | undefined;
                    if (methodsObj && typeof methodsObj[name] === 'function') return (methodsObj[name] as (...args: unknown[]) => unknown).bind(methodsObj);

                    return null;
                };

                const signInFn = resolveMethod(crossmark, 'signInAndWait');

                if (signInFn) {
                    try {
                        const result = await (signInFn as () => Promise<unknown>)();
                        const response = (result as { response?: { data?: { address?: string } } })?.response;
                        if (response?.data?.address) {
                            setAddress(response.data.address);
                            setWalletType('xrpl');
                            setIsConnected(true);

                            const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
                            await client.connect();
                            try {
                                const accountInfo = await client.request({
                                    command: "account_info",
                                    account: response.data.address,
                                    ledger_index: "validated"
                                });
                                setBalance(xrpl.dropsToXrp(accountInfo.result.account_data.Balance).toString());
                            } catch {
                                setBalance("0");
                            }
                            await client.disconnect();
                        }
                    } catch (err: unknown) {
                        const msg = err instanceof Error ? err.message : "Failed to sign in with Crossmark";
                        setError(msg);
                    }
                } else {
                    throw new Error("No XRPL wallet detected.");
                }
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : `Failed to connect wallet`;
            setError(msg);
            setIsConnected(false);
        }
    }, []);

    const disconnect = useCallback(() => {
        setAddress(null);
        setBalance(null);
        setBalances([]);
        setWalletType(null);
        setIsConnected(false);
    }, []);

    const refreshBalance = useCallback(async () => {
        if (!address || walletType !== 'xrpl') return;
        try {
            const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
            await client.connect();
            const accountInfo = await client.request({
                command: "account_info",
                account: address,
                ledger_index: "validated"
            });
            setBalance(xrpl.dropsToXrp(accountInfo.result.account_data.Balance).toString());
            await client.disconnect();
        } catch {
            console.warn("Could not refresh balance");
        }
    }, [address, walletType]);

    const signTransaction = useCallback(async (tx: xrpl.Transaction): Promise<SignTransactionResult> => {
        if (!address || walletType !== 'xrpl') {
            return { success: false, error: 'Wallet not connected or incorrect network' };
        }

        try {
            // @ts-expect-error - xrpl might be on window
            const crossmark = (window as { xrpl?: { crossmark?: unknown } }).xrpl?.crossmark || (window as { crossmark?: unknown }).crossmark;

            if (crossmark) {
                const resolveMethod = (obj: unknown, name: string) => {
                    if (!obj || typeof obj !== 'object') return null;
                    const record = obj as Record<string, unknown>;
                    const target = record[name];
                    if (typeof target === 'function') return (target as (...args: unknown[]) => unknown).bind(obj);
                    const asyncObj = record.async as Record<string, unknown> | undefined;
                    if (asyncObj && typeof asyncObj[name] === 'function') return (asyncObj[name] as (...args: unknown[]) => unknown).bind(asyncObj);
                    const methodsObj = record.methods as Record<string, unknown> | undefined;
                    if (methodsObj && typeof methodsObj[name] === 'function') return (methodsObj[name] as (...args: unknown[]) => unknown).bind(methodsObj);
                    return null;
                };

                const signFn = resolveMethod(crossmark, 'signAndSubmitAndWait');
                if (signFn) {
                    const result = await (signFn as (t: xrpl.Transaction) => Promise<unknown>)(tx);
                    const response = (result as { response?: { data?: { resp?: { result?: { hash?: string } }; hash?: string } } })?.response;
                    if (response?.data?.resp?.result?.hash || response?.data?.hash) {
                        return {
                            success: true,
                            signedBlob: response.data.resp?.result?.hash || response.data.hash
                        };
                    }
                }
            }
            return { success: false, error: 'Failed to sign transaction' };
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Signing failed';
            return { success: false, error: msg };
        }
    }, [address, walletType]);

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
