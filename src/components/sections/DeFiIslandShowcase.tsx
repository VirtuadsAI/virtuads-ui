import React from 'react';
import { Map, ExternalLink, Shield, Zap, Info } from 'lucide-react';

const DeFiIslandShowcase: React.FC = () => {
    return (
        <section id="defi-island" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6">
                <div className="bg-brand-dark-secondary/50 border border-brand-green/20 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
                    {/* Floating badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full text-brand-green text-xs font-bold uppercase tracking-widest mb-8">
                        <Zap className="w-4 h-4" />
                        Featured Partnership
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                    Explora el Futuro en <br />
                                    <span className="text-brand-green">DeFi Island</span>
                                </h2>
                                <p className="text-lg text-brand-gray leading-relaxed">
                                    VirtuAds AI se integra con DeFi Island para ofrecer anuncios dinámicos en 3D y experiencias educativas gamificadas dentro del XRPL Testnet.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center text-brand-green">
                                        <Map className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold">Navegación Interactiva</h4>
                                    <p className="text-sm text-brand-gray">Vallas publicitarias reactivas que cambian según tu holding de tokens.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center text-brand-green">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold">Verificación XRPL</h4>
                                    <p className="text-sm text-brand-gray">Cada impresión se valida en la red de pruebas para asegurar transparencia total.</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="https://learn.xrpl.org/defi-island/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-green text-brand-dark font-bold px-8 py-4 rounded-2xl hover:bg-brand-green/90 transition-all flex items-center gap-2"
                                >
                                    Visitar DeFi Island <ExternalLink className="w-4 h-4" />
                                </a>
                                <button className="border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/5 transition-all">
                                    Ver Documentación
                                </button>
                            </div>
                        </div>

                        {/* Visual Representation (Simulator/Mock) */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-green/20 to-brand-blue/20 rounded-[48px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative aspect-square bg-black/40 border border-brand-green/30 rounded-[40px] overflow-hidden backdrop-blur-sm shadow-2xl">
                                {/* Simulated Island UI */}
                                <div className="absolute inset-0 p-8 flex flex-col">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="space-y-1">
                                            <div className="text-[10px] text-brand-green font-mono uppercase tracking-widest">Current Location</div>
                                            <div className="text-xl font-bold">DEFI_ISLAND_SECTOR_07</div>
                                        </div>
                                        <div className="px-3 py-1 bg-brand-green/10 border border-brand-green/30 rounded-lg text-[10px] font-mono text-brand-green flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping"></div>
                                            CONNECTED_LIVE
                                        </div>
                                    </div>

                                    <div className="flex-grow flex items-center justify-center relative">
                                        {/* Abstract Island Visualization */}
                                        <div className="w-48 h-48 bg-brand-green/10 rounded-full animate-pulse border border-brand-green/20 flex items-center justify-center">
                                            <div className="w-32 h-32 bg-brand-green/20 rounded-full flex items-center justify-center">
                                                <div className="w-16 h-16 bg-brand-green rounded-full shadow-[0_0_30px_rgba(0,255,136,0.5)]"></div>
                                            </div>
                                        </div>

                                        {/* Floating Ad Billboard Simulation */}
                                        <div className="absolute top-1/4 -right-4 w-40 h-24 bg-brand-dark border-2 border-brand-blue rounded-xl p-3 shadow-2xl transform rotate-12 animate-float">
                                            <div className="text-[8px] text-brand-blue font-bold mb-1 uppercase tracking-tighter">VirtuAds Campaign</div>
                                            <div className="w-full h-1 bg-brand-blue/30 rounded-full mb-2"></div>
                                            <div className="text-[10px] text-white font-bold leading-tight">MINT YOUR FIRST NFT ON XRPL TESTNET</div>
                                        </div>

                                        <div className="absolute bottom-1/4 -left-4 w-36 h-20 bg-brand-dark border-2 border-brand-green rounded-xl p-3 shadow-2xl transform -rotate-6 animate-float-delayed">
                                            <div className="text-[8px] text-brand-green font-bold mb-1 uppercase tracking-tighter">Liquid Ad Space</div>
                                            <div className="w-full h-1 bg-brand-green/30 rounded-full mb-2"></div>
                                            <div className="text-[10px] text-brand-green font-mono">ID: VAD_ISLE_99</div>
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="mt-auto p-4 bg-brand-dark/80 border border-white/5 rounded-2xl flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                            <Info className="w-4 h-4 text-brand-gray" />
                                        </div>
                                        <div className="text-[10px] text-brand-gray font-medium">
                                            Usa <span className="text-white">nice-xrpl</span> para conectar tu personaje con anuncios dinámicos.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-10px) rotate(14deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0) rotate(-6deg); }
                    50% { transform: translateY(10px) rotate(-8deg); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
            `}</style>
        </section>
    );
};

export default DeFiIslandShowcase;
