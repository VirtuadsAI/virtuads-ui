import React, { useState, useEffect } from 'react';
import {
    Image,
    Loader2,
    ExternalLink,
    Trash2,
    DollarSign,
    RefreshCw,
    AlertCircle,
    Sparkles
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { nftService, NFToken } from '../../services/nftService';
import { ipfsService } from '../../services/ipfsService';

// ============================================================================
// Types
// ============================================================================

interface NFTAdGalleryProps {
    onCreateClick?: () => void;
}

// ============================================================================
// Component
// ============================================================================

const NFTAdGallery: React.FC<NFTAdGalleryProps> = ({ onCreateClick }) => {
    const { address, isConnected, walletType } = useWallet();

    const [nfts, setNfts] = useState<NFToken[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ========================================================================
    // Effects
    // ========================================================================

    useEffect(() => {
        if (isConnected && address && walletType === 'xrpl') {
            fetchNFTs();
        } else {
            setNfts([]);
        }
    }, [isConnected, address, walletType]);

    // ========================================================================
    // Handlers
    // ========================================================================

    const fetchNFTs = async () => {
        if (!address) return;

        setIsLoading(true);
        setError(null);

        try {
            const accountNFTs = await nftService.getAccountNFTs(address);
            // Filter to show only VirtuAds NFTs (optional)
            const virtuAdsNFTs = accountNFTs.filter(nft =>
                nftService.isVirtuAdsNFT(nft) || nft.metadata
            );
            setNfts(virtuAdsNFTs);
        } catch (err) {
            console.error('[NFTGallery] Fetch error:', err);
            setError('Error al cargar NFTs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBurn = async (nftokenId: string) => {
        if (!confirm('¿Estás seguro de querer quemar este NFT? Esta acción es irreversible.')) {
            return;
        }

        // TODO: Implement burn with wallet signing
        alert('Función de quemar próximamente disponible');
    };

    const handleSell = async (nftokenId: string) => {
        // TODO: Open sell modal
        alert('Función de venta próximamente disponible');
    };

    // ========================================================================
    // Render
    // ========================================================================

    // Not connected state
    if (!isConnected || walletType !== 'xrpl') {
        return (
            <div className="bg-brand-dark-secondary border border-white/10 rounded-2xl p-8 text-center">
                <Image className="w-12 h-12 text-brand-gray mx-auto mb-4" />
                <p className="text-white font-medium mb-2">Conecta tu wallet XRPL</p>
                <p className="text-brand-gray text-sm">
                    Para ver y gestionar tus NFT Ads
                </p>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-brand-dark-secondary border border-white/10 rounded-2xl p-8 text-center">
                <Loader2 className="w-12 h-12 text-brand-green mx-auto mb-4 animate-spin" />
                <p className="text-brand-gray">Cargando NFTs...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-brand-dark-secondary border border-red-500/20 rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-400 mb-4">{error}</p>
                <button
                    onClick={fetchNFTs}
                    className="text-brand-green hover:underline flex items-center gap-2 mx-auto"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reintentar
                </button>
            </div>
        );
    }

    // Empty state
    if (nfts.length === 0) {
        return (
            <div className="bg-brand-dark-secondary border border-brand-green/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-brand-green" />
                </div>
                <p className="text-white font-medium mb-2">No tienes NFT Ads todavía</p>
                <p className="text-brand-gray text-sm mb-6">
                    Crea tu primer anuncio NFT para publicidad en metaversos
                </p>
                {onCreateClick && (
                    <button
                        onClick={onCreateClick}
                        className="bg-brand-green text-brand-dark font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform"
                    >
                        Crear NFT Ad
                    </button>
                )}
            </div>
        );
    }

    // Gallery
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                    Mis NFT Ads ({nfts.length})
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={fetchNFTs}
                        className="p-2 text-brand-gray hover:text-white transition-colors"
                        title="Actualizar"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    {onCreateClick && (
                        <button
                            onClick={onCreateClick}
                            className="flex items-center gap-2 bg-brand-green text-brand-dark font-bold px-4 py-2 rounded-lg text-sm hover:scale-105 transition-transform"
                        >
                            <Sparkles className="w-4 h-4" />
                            Nuevo
                        </button>
                    )}
                </div>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                    <div
                        key={nft.NFTokenID}
                        className="bg-brand-dark-secondary border border-white/10 rounded-xl overflow-hidden hover:border-brand-green/30 transition-colors group"
                    >
                        {/* Image */}
                        <div className="aspect-video bg-black/50 relative overflow-hidden">
                            {nft.httpImageUrl ? (
                                <img
                                    src={nft.httpImageUrl}
                                    alt={nft.metadata?.name || 'NFT'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23111" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%23333" font-size="30">NFT</text></svg>';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-brand-gray">
                                    <Image className="w-8 h-8" />
                                </div>
                            )}

                            {/* Type badge */}
                            {nft.metadata?.ad_type && (
                                <span className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-brand-green text-xs rounded font-bold uppercase">
                                    {nft.metadata.ad_type}
                                </span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h4 className="text-white font-medium mb-1 truncate">
                                {nft.metadata?.name || `NFT #${nft.NFTokenID.slice(-8)}`}
                            </h4>
                            <p className="text-brand-gray text-xs mb-3 truncate">
                                {nft.metadata?.description || 'Sin descripción'}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSell(nft.NFTokenID)}
                                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium text-brand-green border border-brand-green/30 rounded hover:bg-brand-green/10 transition-colors"
                                >
                                    <DollarSign className="w-3 h-3" />
                                    Vender
                                </button>
                                <button
                                    onClick={() => handleBurn(nft.NFTokenID)}
                                    className="p-2 text-red-400 border border-red-500/30 rounded hover:bg-red-500/10 transition-colors"
                                    title="Quemar NFT"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                                <a
                                    href={`https://testnet.xrpl.org/nft/${nft.NFTokenID}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-brand-gray border border-white/10 rounded hover:bg-white/5 transition-colors"
                                    title="Ver en Explorer"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTAdGallery;
