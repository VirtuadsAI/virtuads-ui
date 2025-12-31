import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Sparkles, Activity, ShieldCheck } from 'lucide-react';

const AiPreviewSection: React.FC = () => {
    const [optimizationState, setOptimizationState] = useState(0);
    const [activeAgents, setActiveAgents] = useState(0);
    const [efficiency, setEfficiency] = useState(94.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setOptimizationState(prev => (prev + 1) % 4);
            setActiveAgents(Math.floor(Math.random() * 5) + 12);
            setEfficiency(prev => {
                const change = (Math.random() - 0.5) * 0.5;
                return parseFloat(Math.min(99.9, Math.max(90.0, prev + change)).toFixed(1));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { title: 'Análisis de Red', icon: Brain, desc: 'Escaneo de inventario disponible en XRPL y redes P2E.' },
        { title: 'Perfilado de Audiencia', icon: Sparkles, desc: 'Identificación anónima de patrones de comportamiento.' },
        { title: 'Optimización de Puja', icon: Cpu, desc: 'Cálculo de oferta ideal para máximo ROI en milisegundos.' },
        { title: 'Verificación On-Chain', icon: ShieldCheck, desc: 'Validación de impresión y liquidación inmediata.' }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px] -z-10"></div>

            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Optimización por <span className="text-brand-green">IA en Tiempo Real</span>
                </h2>
                <p className="text-brand-gray max-w-2xl mx-auto text-lg">
                    Nuestros agentes de IA trabajan 24/7 para asegurar que cada gota de XRP gastada genere el máximo impacto publicitario.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual AI Flow */}
                <div className="bg-brand-dark-secondary border border-brand-green/20 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-4 right-6 flex items-center gap-2 text-brand-green">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <span className="text-xs font-mono font-bold">AGENTE_LIVE_ACTIVE</span>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-700 ${optimizationState === idx ? 'bg-brand-green/10 border border-brand-green/30 translate-x-4' : 'opacity-40 filter grayscale'
                                    }`}
                            >
                                <div className={`p-3 rounded-xl ${optimizationState === idx ? 'bg-brand-green text-brand-dark' : 'bg-white/5 text-brand-gray'}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className={`font-bold mb-1 ${optimizationState === idx ? 'text-white' : 'text-brand-gray'}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-brand-gray/80">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative lines */}
                    <div className="absolute left-12 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-brand-green/30 to-transparent"></div>
                </div>

                {/* Metrics & Control Area */}
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-brand-gray text-xs uppercase tracking-widest mb-2 font-bold">Agentes Activos</p>
                            <p className="text-4xl font-bold text-white font-mono">{activeAgents}</p>
                            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-green transition-all" style={{ width: `${(activeAgents / 20) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-brand-gray text-xs uppercase tracking-widest mb-2 font-bold">Eficiencia IA</p>
                            <p className="text-4xl font-bold text-brand-green font-mono">{efficiency}%</p>
                            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-green transition-all" style={{ width: `${efficiency}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/20 rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-brand-green" />
                            Gobernanza Algorítmica
                        </h3>
                        <p className="text-brand-gray leading-relaxed mb-6">
                            Cada decisión de compra es auditada por un smart contract secundario que garantiza el cumplimiento de las políticas de la DAO de VirtuAds en tiempo real.
                        </p>
                        <ul className="space-y-3">
                            {['Zero Fraud Bot Detection', 'Instant Settlement Verification', 'Contextual Safety Filter'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-brand-gray">
                                    <div className="w-1 h-1 bg-brand-green rounded-full"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiPreviewSection;
