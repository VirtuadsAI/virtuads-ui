import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Wallet, Info, X, CheckSquare, Square } from 'lucide-react';

interface WalletSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: 'xrpl' | 'evm') => void;
}

const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [mounted, setMounted] = useState(false);

    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#050505] border border-brand-green/30 rounded-xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
                <p className="text-gray-400 text-sm mb-6">Choose a network to connect with</p>

                {/* Consent Checkbox */}
                <div
                    className="flex items-start gap-3 mb-6 bg-brand-green/5 p-3 rounded-lg border border-brand-green/10 cursor-pointer hover:bg-brand-green/10 transition-colors"
                    onClick={() => setIsAgreed(!isAgreed)}
                >
                    <div className={`mt-0.5 text-brand-green ${isAgreed ? 'opacity-100' : 'opacity-50'}`}>
                        {isAgreed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </div>
                    <p className="text-xs text-brand-gray select-none">
                        I agree to the <Link to="/terms" className="text-brand-green hover:underline font-bold" onClick={(e) => e.stopPropagation()}>Terms and Conditions</Link>, including the use of cookies and AI-generated content policies.
                    </p>
                </div>

                <div className={`space-y-4 transition-opacity duration-200 ${!isAgreed ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
                    {/* XRPL Option */}
                    <button
                        onClick={() => onSelect('xrpl')}
                        disabled={!isAgreed}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-brand-green/30 bg-brand-green/10 hover:bg-brand-green/20 hover:border-brand-green transition-all group disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
                                <span className="font-bold">X</span>
                            </div>
                            <div className="text-left">
                                <h3 className="text-white font-bold">XRPL Network</h3>
                                <p className="text-xs text-brand-green/90 font-medium">Crossmark / GemWallet</p>
                            </div>
                        </div>
                        <Wallet className="w-5 h-5 text-gray-400 group-hover:text-brand-green" />
                    </button>

                    {/* EVM Option */}
                    <button
                        onClick={() => onSelect('evm')}
                        disabled={!isAgreed}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-500 transition-all group disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L12 3L3 12L12 21L21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h3 className="text-white font-bold">EVM Network</h3>
                                <p className="text-xs text-orange-400/90 font-medium">MetaMask / Web3</p>
                            </div>
                        </div>
                        <Wallet className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
                    </button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 bg-gray-900/50 p-2 rounded">
                    <Info className="w-4 h-4 text-brand-green" />
                    <p>Make sure you have the corresponding browser extension installed.</p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default WalletSelectionModal;
