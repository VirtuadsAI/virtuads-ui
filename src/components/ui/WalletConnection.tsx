import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { Wallet, ExternalLink, X } from 'lucide-react';
import WalletSelectionModal from './WalletSelectionModal';

const WalletConnection: React.FC = () => {
    const { address, isConnected, connect, disconnect, balance, error, walletType } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnect = async (type: 'xrpl' | 'evm' | 'solana') => {
        setIsModalOpen(false);
        await connect(type);
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const getExplorerUrl = (addr: string, type: 'xrpl' | 'evm' | 'solana' | null) => {
        if (type === 'evm') return `https://etherscan.io/address/${addr}`;
        if (type === 'solana') return `https://solscan.io/account/${addr}`;
        return `https://testnet.xrpl.org/accounts/${addr}`;
    };

    return (
        <div className="flex flex-col items-end">
            <WalletSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleConnect}
            />

            {!isConnected ? (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-brand-green bg-brand-green/20 text-brand-green hover:bg-brand-green hover:text-brand-dark transition-all text-sm font-medium"
                >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                </button>
            ) : (
                <div className="flex items-center gap-3 bg-brand-green/10 px-3 py-1.5 rounded-full border border-brand-green/20">
                    <div className="flex items-center gap-2 text-xs">
                        {/* Network Indicator */}
                        <div className={`w-2 h-2 rounded-full ${walletType === 'evm' ? 'bg-orange-500' : walletType === 'solana' ? 'bg-purple-500' : 'bg-blue-500'}`}
                            title={walletType === 'evm' ? 'EVM Network' : walletType === 'solana' ? 'Solana Network' : 'XRPL Network'}
                        />

                        {/* Balance */}
                        <span className="text-brand-green font-bold">
                            {balance} {walletType === 'evm' ? 'ETH' : walletType === 'solana' ? 'SOL' : 'XRP'}
                        </span>

                        <span className="text-brand-gray/50">|</span>

                        {/* Address */}
                        <a
                            href={getExplorerUrl(address!, walletType)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-gray hover:text-white transition-colors font-mono"
                            title="View on Explorer"
                        >
                            {formatAddress(address!)}
                        </a>
                    </div>

                    <button
                        onClick={disconnect}
                        className="text-red-400 hover:text-red-300 transition-colors p-0.5"
                        aria-label="Disconnect wallet"
                        title="Disconnect"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}
            {error && (
                <span className="absolute top-full mt-1 text-[10px] text-red-500 bg-brand-dark px-1 rounded shadow-sm z-10 w-48 text-right">
                    {error}
                </span>
            )}
        </div>
    );
};

export default WalletConnection;
