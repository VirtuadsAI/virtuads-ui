import React from 'react';
import aboutImage from '../../assets/about-image.png';

const About = () => (
    <section className="py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-bold mb-6">¿QUÉ ES VIRTUADSAI?</h2>
                <p className="text-lg text-brand-gray leading-relaxed mb-6">
                    VirtuAdsAI es la <span className="text-brand-green font-semibold">primera plataforma publicitaria Web3 descentralizada</span> que automatiza campañas digitales en web, metaversos y videojuegos Play-to-Earn (P2E).
                </p>
                <p className="text-lg text-brand-gray leading-relaxed mb-6">
                    Integramos tecnologías de vanguardia como <span className="text-brand-green">XRPL (Ripple)</span> para liquidación instantánea, <span className="text-brand-green">Chainlink/CCIP</span> para oráculos seguros, <span className="text-brand-green">Agentes IA</span> para optimización, y <span className="text-brand-green">Brave/BAT</span> para inventario privacy-first.
                </p>
                <div className="flex items-center gap-4 mt-8">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-brand-green">USD 600B+</p>
                        <p className="text-sm text-brand-gray">Mercado Global</p>
                    </div>
                    <div className="w-px h-12 bg-brand-green/30"></div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-brand-green">≥5%</p>
                        <p className="text-sm text-brand-gray">Target de Captura</p>
                    </div>
                </div>
            </div>
            <div className="h-80 rounded-2xl bg-no-repeat bg-cover bg-center border-2 border-brand-green/20" style={{ backgroundImage: `url(${aboutImage})` }}>
            </div>
        </div>
    </section>
);

export default About;
