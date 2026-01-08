import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, AlertCircle, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../../context/WalletContext';
import { xrplPaymentService, AccountBalance } from '../../services/xrplPaymentService';

// ============================================================================
// Types
// ============================================================================

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultDestination?: string;
    defaultAmount?: string;
    defaultCurrency?: string;
    memo?: string;
    onSuccess?: (txHash: string) => void;
}

type PaymentStep = 'form' | 'confirm' | 'processing' | 'success' | 'error';

// ============================================================================
// Component
// ============================================================================

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    defaultDestination = '',
    defaultAmount = '',
    defaultCurrency = 'XRP',
    memo = '',
    onSuccess
}) => {
    const { t } = useTranslation();
    const { address, isConnected, walletType } = useWallet();

    // Form state
    const [destination, setDestination] = useState(defaultDestination);
    const [amount, setAmount] = useState(defaultAmount);
    const [currency, setCurrency] = useState(defaultCurrency);
    const [paymentMemo, setPaymentMemo] = useState(memo);

    // UI state
    const [step, setStep] = useState<PaymentStep>('form');
    const [balances, setBalances] = useState<AccountBalance[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [estimatedFee, setEstimatedFee] = useState<string>('0.00001');

    // ========================================================================
    // Effects
    // ========================================================================

    // Fetch balances when modal opens
    useEffect(() => {
        if (isOpen && address && walletType === 'xrpl') {
            fetchBalances();
        }
    }, [isOpen, address, walletType]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('form');
                setError(null);
                setTxHash(null);
            }, 300);
        }
    }, [isOpen]);

    // ========================================================================
    // Handlers
    // ========================================================================

    const fetchBalances = async () => {
        if (!address) return;
        try {
            const accountBalances = await xrplPaymentService.getAccountBalances(address);
            setBalances(accountBalances);
        } catch (e) {
            console.error('Failed to fetch balances:', e);
        }
    };

    const validateForm = (): boolean => {
        if (!destination.trim()) {
            setError('Ingresa una dirección de destino');
            return false;
        }
        if (!xrplPaymentService.isValidAddress(destination)) {
            setError('Dirección XRPL inválida');
            return false;
        }
        if (destination === address) {
            setError('No puedes enviarte a ti mismo');
            return false;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Ingresa un monto válido');
            return false;
        }

        // Check balance
        const currentBalance = balances.find(b => b.currency === currency);
        if (currentBalance && parseFloat(amount) > parseFloat(currentBalance.value)) {
            setError(`Saldo insuficiente. Tienes ${currentBalance.value} ${currency}`);
            return false;
        }

        setError(null);
        return true;
    };

    const handleReview = () => {
        if (validateForm()) {
            setStep('confirm');
        }
    };

    const handleConfirmPayment = async () => {
        if (!address) return;

        setStep('processing');
        setError(null);

        try {
            // Prepare the transaction
            const preparedTx = await xrplPaymentService.preparePayment(address, {
                destination,
                amount,
                currency,
                memo: paymentMemo || undefined
            });

            // Get estimated fee
            if (preparedTx.Fee) {
                setEstimatedFee(xrplPaymentService.dropsToXrp(preparedTx.Fee));
            }

            // Request wallet to sign
            // Note: In a real implementation, you would call the wallet extension to sign
            // For now, we'll simulate this step with a message
            console.log('[PaymentModal] Transaction prepared, waiting for wallet signature:', preparedTx);

            // Simulate wallet signing delay (replace with actual wallet signing)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production, you would:
            // 1. Send preparedTx to wallet for signing (Crossmark/GemWallet)
            // 2. Get signed blob back
            // 3. Submit with: await xrplPaymentService.submitSignedTransaction(signedBlob)

            // For demo purposes, we'll show success
            const mockTxHash = `SIMULATED_${Date.now().toString(16).toUpperCase()}`;
            setTxHash(mockTxHash);
            setStep('success');

            if (onSuccess) {
                onSuccess(mockTxHash);
            }

        } catch (err) {
            console.error('[PaymentModal] Payment error:', err);
            setError(err instanceof Error ? err.message : 'Error al procesar el pago');
            setStep('error');
        }
    };

    const handleClose = () => {
        if (step === 'processing') return; // Don't close while processing
        onClose();
    };

    const getSelectedBalance = (): string => {
        const balance = balances.find(b => b.currency === currency);
        return balance ? balance.value : '0';
    };

    // ========================================================================
    // Render
    // ========================================================================

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0a0a0a] border border-brand-green/30 rounded-xl max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Send className="w-5 h-5 text-brand-green" />
                        {step === 'success' ? 'Pago Exitoso' : 'Enviar Pago'}
                    </h2>
                    {step !== 'processing' && (
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="p-6">
                    {/* Step: Form */}
                    {step === 'form' && (
                        <div className="space-y-4">
                            {/* Balance Display */}
                            <div className="bg-brand-green/10 p-3 rounded-lg border border-brand-green/20">
                                <p className="text-xs text-brand-gray mb-1">Tu balance disponible</p>
                                <p className="text-xl font-bold text-brand-green">
                                    {getSelectedBalance()} {currency}
                                </p>
                            </div>

                            {/* Destination */}
                            <div>
                                <label className="block text-sm text-brand-gray mb-2">
                                    Dirección de destino
                                </label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none font-mono text-sm"
                                />
                            </div>

                            {/* Amount & Currency */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                    <label className="block text-sm text-brand-gray mb-2">
                                        Monto
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        step="0.000001"
                                        min="0"
                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-brand-gray mb-2">
                                        Moneda
                                    </label>
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-3 text-white focus:border-brand-green focus:outline-none"
                                    >
                                        <option value="XRP">XRP</option>
                                        {balances.filter(b => b.currency !== 'XRP').map(b => (
                                            <option key={`${b.currency}-${b.issuer}`} value={b.currency}>
                                                {b.currency}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Memo (optional) */}
                            <div>
                                <label className="block text-sm text-brand-gray mb-2">
                                    Memo (opcional)
                                </label>
                                <input
                                    type="text"
                                    value={paymentMemo}
                                    onChange={(e) => setPaymentMemo(e.target.value)}
                                    placeholder="Ej: Pago campaña #123"
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none text-sm"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleReview}
                                disabled={!isConnected || walletType !== 'xrpl'}
                                className="w-full bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Revisar Pago
                            </button>

                            {walletType !== 'xrpl' && (
                                <p className="text-xs text-center text-yellow-500">
                                    Conecta una wallet XRPL para enviar pagos
                                </p>
                            )}
                        </div>
                    )}

                    {/* Step: Confirm */}
                    {step === 'confirm' && (
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-brand-gray">Destino</span>
                                    <span className="text-white font-mono text-xs">
                                        {destination.slice(0, 8)}...{destination.slice(-6)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-brand-gray">Monto</span>
                                    <span className="text-brand-green font-bold">
                                        {amount} {currency}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-brand-gray">Fee estimado</span>
                                    <span className="text-white">{estimatedFee} XRP</span>
                                </div>
                                {paymentMemo && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-gray">Memo</span>
                                        <span className="text-white truncate max-w-[200px]">{paymentMemo}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start gap-2 text-xs text-yellow-500 bg-yellow-500/10 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <p>Las transacciones en XRPL son irreversibles. Verifica los datos antes de confirmar.</p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('form')}
                                    className="flex-1 border border-white/20 text-white font-medium py-3 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Atrás
                                </button>
                                <button
                                    onClick={handleConfirmPayment}
                                    className="flex-1 bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-green/90 transition-colors"
                                >
                                    Confirmar Pago
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step: Processing */}
                    {step === 'processing' && (
                        <div className="text-center py-8 space-y-4">
                            <Loader2 className="w-12 h-12 text-brand-green mx-auto animate-spin" />
                            <p className="text-white font-medium">Procesando transacción...</p>
                            <p className="text-sm text-brand-gray">
                                Confirma la transacción en tu wallet
                            </p>
                        </div>
                    )}

                    {/* Step: Success */}
                    {step === 'success' && (
                        <div className="text-center py-6 space-y-4">
                            <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8 text-brand-green" />
                            </div>
                            <div>
                                <p className="text-white font-medium text-lg">¡Pago enviado!</p>
                                <p className="text-sm text-brand-gray mt-1">
                                    {amount} {currency} enviados correctamente
                                </p>
                            </div>
                            {txHash && (
                                <a
                                    href={xrplPaymentService.getExplorerTxUrl(txHash)}
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
                                className="w-full bg-white/10 text-white font-medium py-3 rounded-lg hover:bg-white/20 transition-colors mt-4"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}

                    {/* Step: Error */}
                    {step === 'error' && (
                        <div className="text-center py-6 space-y-4">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <p className="text-white font-medium text-lg">Error en el pago</p>
                                <p className="text-sm text-red-400 mt-2">{error}</p>
                            </div>
                            <button
                                onClick={() => setStep('form')}
                                className="w-full bg-white/10 text-white font-medium py-3 rounded-lg hover:bg-white/20 transition-colors"
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

export default PaymentModal;
