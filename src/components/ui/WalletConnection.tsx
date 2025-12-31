import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { Wallet, ExternalLink } from 'lucide-react';

const WalletConnection: React.FC = () => {
    const { address, isConnected, connect, disconnect, balance, error } = useWallet();

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <div className="flex flex-col items-end">
            {!isConnected ? (
                <button
                    onClick={connect}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-brand-green bg-brand-green/20 text-brand-green hover:bg-brand-green hover:text-brand-dark transition-all text-sm font-medium"
                >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end text-xs">
                        <span className="text-brand-green font-medium">{balance} XRP</span>
                        <div className="flex items-center gap-1">
                            <span className="text-brand-gray opacity-70">{formatAddress(address!)}</span>
                            <a
                                href={`https://testnet.xrpl.org/accounts/${address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-gray hover:text-brand-green transition-colors"
                                title="Ver en Explorer"
                            >
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={disconnect}
                        className="p-1.5 rounded-md border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all"
                        aria-label="Disconnect wallet"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </button>
                </div>
            )}
            {error && (
                <span className="absolute top-full mt-1 text-[10px] text-red-500 bg-brand-dark px-1 rounded shadow-sm">
                    {error}
                </span>
            )}
        </div>
    );
};

export default WalletConnection;
