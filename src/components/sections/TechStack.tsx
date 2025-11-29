import React from 'react';
import { Database, Network, Brain, Shield, Wallet, TrendingUp } from 'lucide-react';
import TechCard from '../ui/TechCard';

const TechStack = () => (
    <section id="tecnologia" className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">ARQUITECTURA TECNOLÓGICA</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Stack de tecnologías de vanguardia para publicidad descentralizada, transparente y eficiente
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
            <TechCard
                icon={<Database className="h-12 w-12 text-brand-green" />}
                title="XRPL (Ripple)"
                description="Rail principal de pagos programables. Liquidación en segundos con stablecoins (USDC, USDT) y CBDCs (RLUSD, Bre·B)."
            />
            <TechCard
                icon={<Network className="h-12 w-12 text-brand-green" />}
                title="Chainlink/CCIP"
                description="Oráculos seguros para datos externos, Proof of Reserve e interoperabilidad multi-cadena confiable."
            />
            <TechCard
                icon={<Brain className="h-12 w-12 text-brand-green" />}
                title="Agentes IA"
                description="Planificación automática de campañas, optimización en tiempo real, compliance y creatividad generativa."
            />
            <TechCard
                icon={<Shield className="h-12 w-12 text-brand-green" />}
                title="Brave/BAT"
                description="Inventario privacy-first para anuncios con consentimiento del usuario (sujeto a acuerdos)."
            />
            <TechCard
                icon={<Wallet className="h-12 w-12 text-brand-green" />}
                title="SDK P2E/Metaverso"
                description="NFT Ads, métricas in-game y reporting en tiempo real para Decentraland, Spatial, Star Atlas."
            />
            <TechCard
                icon={<TrendingUp className="h-12 w-12 text-brand-green" />}
                title="Dashboard & APIs"
                description="Métricas en tiempo real, auditoría on-chain y reporting regulatorio completo."
            />
        </div>
    </section>
);

export default TechStack;
