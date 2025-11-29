import React from 'react';
import PilotCard from '../ui/PilotCard';

const Pilots = () => (
    <section id="pilotos" className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">VALIDACIÓN Y PILOTOS</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Proyectos piloto estratégicos para validar la plataforma en escenarios reales
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <PilotCard
                name="Bancannabis"
                description="Piloto inicial con NFT Ads y XRPL testnet. Marketplace cannabis medicinal tokenizado."
                status="Q3-Q4 2025"
            />
            <PilotCard
                name="Decentraland & Spatial"
                description="Trazabilidad on-chain de conversiones en eventos virtuales y conciertos en metaversos."
                status="Q4 2025"
            />
            <PilotCard
                name="Star Atlas"
                description="Entorno P2E de gran escala para validar NFT Ads y métricas in-game avanzadas."
                status="Q1 2026"
            />
            <PilotCard
                name="Brave Wallet"
                description="Integración privacy-first con ecosistema BAT para recompensas a usuarios."
                status="Q2 2026"
            />
        </div>
    </section>
);

export default Pilots;
