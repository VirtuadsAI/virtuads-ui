import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    X,
    Upload,
    Image,
    Sparkles,
    Link2,
    ChevronRight,
    ChevronLeft,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ExternalLink
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { nftService } from '../../services/nftService';
import { ipfsService } from '../../services/ipfsService';

// ============================================================================
// Types
// ============================================================================

interface NFTAdCreatorProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (nftokenId: string) => void;
}

type Step = 'upload' | 'details' | 'preview' | 'minting' | 'success' | 'error';

// ============================================================================
// Component
// ============================================================================

const NFTAdCreator: React.FC<NFTAdCreatorProps> = ({ isOpen, onClose, onSuccess }) => {
    const { address, isConnected, signTransaction, walletType } = useWallet();

    // Form state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clickUrl, setClickUrl] = useState('');
    const [adType, setAdType] = useState<'banner' | 'video' | 'interactive' | '3d'>('banner');

    // UI state
    const [step, setStep] = useState<Step>('upload');
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [mintProgress, setMintProgress] = useState('');
    const [nftokenId, setNftokenId] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string | null>(null);

    // ========================================================================
    // Handlers
    // ========================================================================

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
        if (!validTypes.includes(file.type)) {
            setError('Formato no soportado. Usa JPG, PNG, GIF, WebP o MP4.');
            return;
        }

        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
            setError('El archivo es muy grande. Máximo 50MB.');
            return;
        }

        setImageFile(file);
        setError(null);

        // Create preview
        const reader = new FileReader();
        reader.onload = (ev) => {
            setImagePreview(ev.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleNextStep = () => {
        if (step === 'upload' && imageFile) {
            setStep('details');
        } else if (step === 'details') {
            if (!name.trim()) {
                setError('Ingresa un nombre para el NFT');
                return;
            }
            setError(null);
            setStep('preview');
        }
    };

    const handleMint = async () => {
        if (!address || !imageFile) return;

        setStep('minting');
        setError(null);

        try {
            // Step 1: Prepare mint (uploads to IPFS + creates tx)
            setMintProgress('Subiendo imagen a IPFS...');

            const prepareResult = await nftService.prepareMint(address, {
                name,
                description: description || `NFT Ad: ${name}`,
                imageFile,
                clickUrl: clickUrl || undefined,
                adType
            });

            if ('error' in prepareResult) {
                throw new Error(prepareResult.error);
            }

            setMintProgress('Firmando transacción...');

            // Step 2: Sign with wallet
            const signResult = await signTransaction(prepareResult.tx);

            if (!signResult.success) {
                throw new Error(signResult.error || 'Firma cancelada');
            }

            setMintProgress('Confirmando en blockchain...');

            // For demo, we simulate success
            // In production, you'd get the actual NFTokenID from the tx result
            const mockNftId = `00081388${Date.now().toString(16).toUpperCase()}${Math.random().toString(16).substring(2, 10).toUpperCase()}`;

            setNftokenId(mockNftId);
            setTxHash(signResult.signedBlob || 'SIMULATED_TX');
            setStep('success');

            if (onSuccess) {
                onSuccess(mockNftId);
            }

        } catch (err) {
            console.error('[NFTAdCreator] Mint error:', err);
            setError(err instanceof Error ? err.message : 'Error al crear NFT');
            setStep('error');
        }
    };

    const handleClose = () => {
        if (step === 'minting') return;

        // Reset state
        setStep('upload');
        setImageFile(null);
        setImagePreview(null);
        setName('');
        setDescription('');
        setClickUrl('');
        setError(null);
        setNftokenId(null);
        setTxHash(null);

        onClose();
    };

    // ========================================================================
    // Render
    // ========================================================================

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0a0a0a] border border-brand-green/30 rounded-xl max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#0a0a0a] flex items-center justify-between p-4 border-b border-white/10 z-10">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand-green" />
                        Crear NFT Ad
                    </h2>
                    {step !== 'minting' && (
                        <button onClick={handleClose} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Progress Steps */}
                {['upload', 'details', 'preview'].includes(step) && (
                    <div className="px-6 py-4 border-b border-white/5">
                        <div className="flex items-center justify-between">
                            {['Subir', 'Detalles', 'Preview'].map((label, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 && step === 'upload' ? 'bg-brand-green text-brand-dark' :
                                            i === 1 && step === 'details' ? 'bg-brand-green text-brand-dark' :
                                                i === 2 && step === 'preview' ? 'bg-brand-green text-brand-dark' :
                                                    i < ['upload', 'details', 'preview'].indexOf(step) ? 'bg-brand-green/30 text-brand-green' :
                                                        'bg-white/10 text-gray-500'
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <span className={`ml-2 text-sm ${['upload', 'details', 'preview'].indexOf(step) >= i ? 'text-white' : 'text-gray-500'
                                        }`}>{label}</span>
                                    {i < 2 && <ChevronRight className="w-4 h-4 mx-4 text-gray-600" />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {/* Step: Upload */}
                    {step === 'upload' && (
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-brand-green/50 transition-colors">
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-64 mx-auto rounded-lg"
                                        />
                                        <p className="text-brand-green text-sm">{imageFile?.name}</p>
                                        <button
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview(null);
                                            }}
                                            className="text-red-400 text-sm hover:underline"
                                        >
                                            Eliminar y subir otra
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer block">
                                        <input
                                            type="file"
                                            accept="image/*,video/mp4"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <Upload className="w-12 h-12 text-brand-green mx-auto mb-4" />
                                        <p className="text-white font-medium mb-2">
                                            Arrastra tu imagen o haz clic para subir
                                        </p>
                                        <p className="text-brand-gray text-sm">
                                            JPG, PNG, GIF, WebP o MP4 (máx. 50MB)
                                        </p>
                                    </label>
                                )}
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleNextStep}
                                disabled={!imageFile}
                                className="w-full bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Continuar
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Step: Details */}
                    {step === 'details' && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-brand-gray mb-2">Nombre del NFT *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej: Banner Campaña Verano"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-brand-gray mb-2">Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe tu anuncio NFT..."
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-brand-gray mb-2">
                                    <Link2 className="w-4 h-4 inline mr-1" />
                                    URL de Click (opcional)
                                </label>
                                <input
                                    type="url"
                                    value={clickUrl}
                                    onChange={(e) => setClickUrl(e.target.value)}
                                    placeholder="https://tuempresa.com/landing"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-brand-gray mb-2">Tipo de Anuncio</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(['banner', 'video', 'interactive', '3d'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setAdType(type)}
                                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${adType === type
                                                    ? 'border-brand-green bg-brand-green/10 text-brand-green'
                                                    : 'border-white/10 text-gray-400 hover:border-white/30'
                                                }`}
                                        >
                                            {type === 'banner' && '🖼️ Banner'}
                                            {type === 'video' && '🎬 Video'}
                                            {type === 'interactive' && '🎮 Interactivo'}
                                            {type === '3d' && '🎨 3D'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('upload')}
                                    className="flex-1 border border-white/20 text-white font-medium py-3 rounded-lg hover:bg-white/5 flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Atrás
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    className="flex-1 bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-green/90 flex items-center justify-center gap-2"
                                >
                                    Preview
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step: Preview */}
                    {step === 'preview' && (
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-xl p-4 flex gap-4">
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt={name}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
                                    <p className="text-brand-gray text-sm mb-2">{description || 'Sin descripción'}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="px-2 py-1 bg-brand-green/10 text-brand-green text-xs rounded">
                                            {adType.toUpperCase()}
                                        </span>
                                        <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded">
                                            XRPL NFT
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm text-yellow-500 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium mb-1">Este proceso es irreversible</p>
                                    <p className="text-yellow-500/80">
                                        El NFT se creará en la blockchain XRPL. Asegúrate de que los datos sean correctos.
                                    </p>
                                </div>
                            </div>

                            {!isConnected || walletType !== 'xrpl' ? (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center text-red-400">
                                    Conecta una wallet XRPL para crear NFTs
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep('details')}
                                        className="flex-1 border border-white/20 text-white font-medium py-3 rounded-lg hover:bg-white/5 flex items-center justify-center gap-2"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={handleMint}
                                        className="flex-1 bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-green/90 flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Crear NFT
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step: Minting */}
                    {step === 'minting' && (
                        <div className="text-center py-12 space-y-4">
                            <Loader2 className="w-16 h-16 text-brand-green mx-auto animate-spin" />
                            <p className="text-white font-medium text-lg">Creando NFT...</p>
                            <p className="text-brand-gray text-sm">{mintProgress}</p>
                        </div>
                    )}

                    {/* Step: Success */}
                    {step === 'success' && (
                        <div className="text-center py-8 space-y-6">
                            <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10 text-brand-green" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl mb-2">¡NFT Creado!</p>
                                <p className="text-brand-gray">Tu NFT Ad ha sido minteado exitosamente</p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4 text-left">
                                <p className="text-xs text-brand-gray mb-1">NFToken ID</p>
                                <p className="text-white font-mono text-sm break-all">{nftokenId}</p>
                            </div>

                            {txHash && (
                                <a
                                    href={`https://testnet.xrpl.org/transactions/${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-brand-green text-sm hover:underline"
                                >
                                    Ver en Explorer
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}

                            <button
                                onClick={handleClose}
                                className="w-full bg-white/10 text-white font-medium py-3 rounded-lg hover:bg-white/20"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}

                    {/* Step: Error */}
                    {step === 'error' && (
                        <div className="text-center py-8 space-y-6">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl mb-2">Error</p>
                                <p className="text-red-400">{error}</p>
                            </div>
                            <button
                                onClick={() => setStep('preview')}
                                className="w-full bg-white/10 text-white font-medium py-3 rounded-lg hover:bg-white/20"
                            >
                                Intentar de nuevo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default NFTAdCreator;
