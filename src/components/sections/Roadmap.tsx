import React from 'react';

const Roadmap = () => (
    <section id="roadmap" className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">ROADMAP 2026-2030</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Fases de desarrollo y expansión de la plataforma
        </p>

        <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 border-l-4 border-brand-green">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-brand-green">1</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Fase 1: Lanzamiento</h3>
                        <p className="text-brand-gray">2026</p>
                    </div>
                </div>
                <ul className="space-y-2 text-brand-gray ml-20">
                    <li>• Lanzamiento oficial de la plataforma</li>
                    <li>• XRPL mainnet con CBDCs (Bre·B, RLUSD)</li>
                    <li>• Primera integración con metaversos (Decentraland, Spatial)</li>
                    <li>• Dashboard de campañas v2.0</li>
                    <li>• Primeros 10 clientes B2B</li>
                </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-l-4 border-blue-500">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-400">2</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Fase 2: Expansión</h3>
                        <p className="text-brand-gray">2027</p>
                    </div>
                </div>
                <ul className="space-y-2 text-brand-gray ml-20">
                    <li>• Integración con 5+ videojuegos P2E</li>
                    <li>• NFT Ads avanzados (composables, dinámicos)</li>
                    <li>• Chainlink CCIP en 5 cadenas</li>
                    <li>• Agentes IA creativos autónomos</li>
                    <li>• 50+ clientes activos globalmente</li>
                </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-l-4 border-purple-500">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-400">3</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Fase 3: Consolidación</h3>
                        <p className="text-brand-gray">2028</p>
                    </div>
                </div>
                <ul className="space-y-2 text-brand-gray ml-20">
                    <li>• DAO governance activada</li>
                    <li>• ISO/IEC 27001 certificación completa</li>
                    <li>• 10+ integraciones con CBDCs globales</li>
                    <li>• Marketplace de NFT Ads descentralizado</li>
                    <li>• 200+ clientes enterprise</li>
                </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-l-4 border-yellow-500">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-400">4</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Fase 4: Liderazgo Global</h3>
                        <p className="text-brand-gray">2029-2030</p>
                    </div>
                </div>
                <ul className="space-y-2 text-brand-gray ml-20">
                    <li>• Presencia en 30+ países</li>
                    <li>• {'>'} 5% del mercado global de publicidad digital</li>
                    <li>• Red descentralizada de validadores</li>
                    <li>• SDK universal Web3 Ads</li>
                    <li>• Estándar de industria en publicidad descentralizada</li>
                </ul>
            </div>
        </div>
    </section>
);

export default Roadmap;
