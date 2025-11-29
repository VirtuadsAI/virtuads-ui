import React from 'react';
import FeatureItem from '../ui/FeatureItem';

const ProblemSolution = () => (
    <section className="py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
                <h2 className="text-4xl font-bold mb-6 text-red-400">EL PROBLEMA</h2>
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="font-semibold mb-2">Dominio Centralizado</p>
                        <p className="text-brand-gray text-sm">Google y Meta controlan {'>'}70% del mercado publicitario digital</p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="font-semibold mb-2">Falta de Transparencia</p>
                        <p className="text-brand-gray text-sm">Métricas opacas y reparto injusto de ingresos</p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="font-semibold mb-2">Exclusión de Valor</p>
                        <p className="text-brand-gray text-sm">Usuarios y gobiernos excluidos del valor generado</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-4xl font-bold mb-6 text-brand-green">LA SOLUCIÓN</h2>
                <p className="text-lg text-brand-gray mb-6">
                    VirtuAdsAI es la primera capa publicitaria <span className="text-brand-green font-semibold">auditable, interoperable y regulatoria-compliant</span> en Web3.
                </p>
                <div className="space-y-3">
                    <FeatureItem text="Transparencia total con conversiones verificables on-chain" />
                    <FeatureItem text="Pagos programables en stablecoins y CBDCs vía XRPL" />
                    <FeatureItem text="Interoperabilidad multi-cadena vía Chainlink CCIP" />
                    <FeatureItem text="Privacidad avanzada con zk-proofs y Brave Ads" />
                    <FeatureItem text="Reparto justo entre usuarios, gobiernos, devs y plataforma" />
                </div>
                <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/30">
                    <p className="text-2xl font-bold text-brand-green mb-2">Meta Estratégica</p>
                    <p className="text-brand-gray">Capturar ≥5% del mercado global de publicidad digital (USD 600B+)</p>
                </div>
            </div>
        </div>
    </section>
);

export default ProblemSolution;
