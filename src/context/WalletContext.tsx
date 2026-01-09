import * as xrpl from 'xrpl';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
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
    const [error, setError] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [walletType, setWalletType] = useState<'xrpl' | 'evm' | 'solana' | null>(null);

    const { publicKey, connected, disconnect: disconnectSolana, signTransaction: signSolanaTx } = useSolanaWallet();
    const { setVisible: setWalletModalVisible } = useWalletModal();

    // Sync Solana wallet state
    React.useEffect(() => {
        if (connected && publicKey) {
            setAddress(publicKey.toString());
            setIsConnected(true);
            setWalletType('solana');

            // Fetch balance
            const fetchSolBalance = async () => {
                try {
                    const connection = new Connection("https://api.mainnet-beta.solana.com");
                    const bal = await connection.getBalance(publicKey);
                    setBalance((bal / LAMPORTS_PER_SOL).toFixed(4));
                } catch (e) {
                    console.warn("Failed to fetch SOL balance", e);
                }
            };
            fetchSolBalance();
        } else if (walletType === 'solana' && !connected) {
            setAddress(null);
            setIsConnected(false);
            setWalletType(null);
            setBalance(null);
        }
    }, [connected, publicKey, walletType]);

    const connect = useCallback(async (type: 'xrpl' | 'evm' | 'solana' = 'xrpl') => {
        try {
            setError(null);
            console.log(`Initiating ${type} wallet connection...`);

            if (type === 'solana') {
                setWalletModalVisible(true);
                return;
            } else if (type === 'evm') {
                // MetaMask / Trust Wallet / EVM Connection
                // @ts-ignore
                const provider = window.trustwallet || window.ethereum;
                if (typeof provider !== 'undefined') {
                    try {
                        const accounts = await provider.request({ method: 'eth_requestAccounts' });
                        if (accounts.length > 0) {
                            setAddress(accounts[0]);
                            setWalletType('evm');
                            setIsConnected(true);

                            // Simple Ether balance fetch
                            try {
                                const balanceResp = await provider.request({
                                    method: 'eth_getBalance',
                                    params: [accounts[0], 'latest']
                                });
                                if (balanceResp) {
                                    const ethBal = parseInt(balanceResp, 16) / 1e18;
                                    setBalance(ethBal.toFixed(4));
                                }
                            } catch (e) {
                                console.warn("Failed to fetch EVM balance", e);
                            }
                            return;
                        }
                    } catch (err: any) {
                        throw new Error(err.message || "User denied wallet access");
                    }
                } else {
                    throw new Error("No EVM wallet (MetaMask/Trust Wallet) detected.");
                }
            } else {
                // XRPL Connection (Crossmark/GemWallet)
                // Integrated Crossmark detection with robust resolution
                // @ts-ignore
                const crossmark = window.xrpl?.crossmark || window.crossmark;

                const resolveMethod = (obj: any, name: string) => {
                    if (!obj) return null;
                    if (typeof obj[name] === 'function') return obj[name].bind(obj);
                    if (obj.async && typeof obj.async[name] === 'function') return obj.async[name].bind(obj.async);
                    if (obj.methods && typeof obj.methods[name] === 'function') return obj.methods[name].bind(obj.methods);
                    return null;
                };

                const signInFn = resolveMethod(crossmark, 'signInAndWait');

                if (signInFn) {
                    console.log("Crossmark resolve succeeded. Attempting to sign in...");

                    try {
                        const { response } = await signInFn();
                        console.log("Sign in response:", response);

                        if (response?.data?.address) {
                            setAddress(response.data.address);
                            setWalletType('xrpl');
                            setIsConnected(true);

                            // Fetch balance using public node
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
                                console.warn("Could not fetch balance - account might be unactivated");
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
                    console.warn("Crossmark found but signInAndWait missing in likely paths.");
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
                if (!crossmark && !(window as any).gemwallet) {
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
        if (walletType === 'solana') {
            disconnectSolana();
        }
        setAddress(null);
        setBalance(null);
        setBalances([]);
        setWalletType(null);
        setIsConnected(false);
    }, [walletType, disconnectSolana]);

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
            } catch {
                // No trust lines
            }

            setBalances(newBalances);
            await client.disconnect();
        } catch {
            console.warn("Could not refresh balance");
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
            const crossmark = window.xrpl?.crossmark || window.crossmark;
            if (crossmark) {
                console.log('[WalletContext] Signing with Crossmark...');

                // Robust method resolution for Crossmark
                const resolveMethod = (obj: any, name: string) => {
                    if (!obj) return null;
                    if (typeof obj[name] === 'function') return obj[name].bind(obj);
                    if (obj.async && typeof obj.async[name] === 'function') return obj.async[name].bind(obj.async);
                    if (obj.methods && typeof obj.methods[name] === 'function') return obj.methods[name].bind(obj.methods);
                    return null;
                };

                const signFn = resolveMethod(crossmark, 'signAndSubmitAndWait');

                if (signFn) {
                    const { response } = await signFn(tx);
                    console.log('[WalletContext] Crossmark response:', response);

                    if (response?.data?.resp?.result?.hash || response?.data?.hash) {
                        return {
                            success: true,
                            signedBlob: response.data.resp?.result?.hash || response.data.hash
                        };
                    } else if (response?.data?.meta?.TransactionResult === 'tesSUCCESS' || response?.data?.result?.engine_result === 'tesSUCCESS') {
                        // Handle different response structures if necessary
                        const hash = response.data.resp?.result?.hash || response.data.hash || response.data.result?.tx_json?.hash;
                        return {
                            success: true,
                            signedBlob: hash
                        };
                    } else {
                        return {
                            success: false,
                            error: response?.data?.resp?.result?.engine_result_message ||
                                response?.data?.result?.engine_result_message ||
                                'Transaction failed'
                        };
                    }
                } else {
                    console.warn('[WalletContext] signAndSubmitAndWait not found in Crossmark');
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
