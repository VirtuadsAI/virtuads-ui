import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
            setEmail('');
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-brand-dark/90 border border-brand-green/30 rounded-2xl p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-green/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {submitted ? '¡Bienvenido!' : t('hero.ctaPrimary')}
                            </h2>
                            <p className="text-brand-gray text-sm">
                                {submitted
                                    ? 'Gracias por unirte. Te mantendremos informado sobre el lanzamiento.'
                                    : 'Sé el primero en saber cuándo lanzamos la plataforma publicitaria Web3.'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Cerrar modal"
                            className="p-1 rounded-md text-brand-gray hover:text-white transition-colors hover:bg-white/5"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-brand-gray uppercase tracking-wider mb-2">
                                    Email de profesional
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@empresa.com"
                                    className="w-full bg-white/5 border border-brand-green/20 rounded-lg px-4 py-3 text-white placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-green/60 transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 bg-brand-green text-brand-dark font-bold py-3 px-6 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>UNIRSE AHORA</span>
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green mb-2">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <p className="text-white font-medium">¡Registro completado con éxito!</p>
                            <p className="text-brand-gray text-xs">Cerrando ventana...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaitlistModal;
