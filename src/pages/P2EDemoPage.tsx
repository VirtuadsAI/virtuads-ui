import React from 'react';
import P2ESimulator from '../components/game/P2ESimulator';
import XRPLGameBridge from '../components/game/XRPLGameBridge';
import SolanaGameBridge from '../components/game/SolanaGameBridge';
import { Zap, Trophy, BarChart3, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const P2EDemoPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>P2E Simulator | VirtuAds AI</title>
                <meta name="description" content="Experimenta la integración de nuestra API en juegos nativos de XRPL y Solana." />
            </Helmet>

            <div className="pt-32 pb-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col gap-12">
                        {/* Title Section */}
                        <div className="text-center max-w-3xl mx-auto mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Multi-Chain <span className="text-brand-green">P2E Bridge</span>
                            </h1>
                            <p className="text-brand-gray text-lg">
                                Conectamos campañas publicitarias con eventos on-chain en tiempo real a través de XRPL y Solana.
                            </p>
                        </div>

                        {/* Simulation Area */}
                        <div className="grid lg:grid-cols-5 gap-12">
                            <div className="lg:col-span-3">
                                <P2ESimulator />
                            </div>

                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-brand-dark-secondary border border-brand-green/20 rounded-3xl p-8 h-full">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <Globe className="text-brand-blue animate-pulse" />
                                        Cross-Chain Hub
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="text-brand-green w-4 h-4" />
                                                <span className="text-xs font-bold text-brand-green uppercase tracking-wider">Dynamic In-Game Mapping</span>
                                            </div>
                                            <p className="text-sm text-brand-gray leading-relaxed">
                                                Nuestra API escucha transacciones en tiempo real de juegos como <span className="text-white">Star Atlas</span> y <span className="text-white">Ripple Racer</span> para sincronizar recompensas.
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                                                <Trophy className="text-brand-green w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-white">Escalabilidad Multi-Chain</h4>
                                                <p className="text-xs text-brand-gray">Soporte nativo para XRPL hooks y Solana Program activity.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                                                <BarChart3 className="text-brand-blue w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-white">Live Metrics</h4>
                                                <p className="text-xs text-brand-gray">Monitoreo directo de Mainnet y Testnets en vivo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game Bridges Section */}
                        <div className="grid gap-12">
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-white">Solana <span className="text-brand-blue">Direct Integration</span></h2>
                                        <p className="text-brand-gray">Monitorea firmas de programas reales de Star Atlas en Mainnet.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-[10px] text-brand-blue">Star Atlas SAGE</span>
                                        <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-[10px] text-brand-blue">Mainnet-Beta</span>
                                    </div>
                                </div>
                                <SolanaGameBridge />
                            </div>

                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-white">XRPL <span className="text-brand-green">Native Dashboard</span></h2>
                                        <p className="text-brand-gray">Monitorea cómo VirtuAds intercepta eventos de juego reales en el testnet.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-brand-gray">Xcade Protocol</span>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-brand-gray">B3 Gamechain</span>
                                    </div>
                                </div>
                                <XRPLGameBridge />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default P2EDemoPage;
