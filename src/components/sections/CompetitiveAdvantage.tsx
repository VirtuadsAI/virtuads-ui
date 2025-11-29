import React from 'react';

const CompetitiveAdvantage = () => (
    <section className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">VENTAJA COMPETITIVA</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Comparativa con plataformas tradicionales y Web3 existentes
        </p>

        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-brand-green/30">
                        <th className="text-left p-4 font-bold">Característica</th>
                        <th className="text-center p-4 font-bold">Meta Ads</th>
                        <th className="text-center p-4 font-bold">Brave Ads</th>
                        <th className="text-center p-4 font-bold text-brand-green">VirtuAdsAI</th>
                    </tr>
                </thead>
                <tbody className="text-brand-gray">
                    <tr className="border-b border-brand-green/10">
                        <td className="p-4">Trazabilidad on-chain</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">⚠️ Limitada</td>
                        <td className="text-center p-4 text-brand-green font-bold">✅ Total</td>
                    </tr>
                    <tr className="border-b border-brand-green/10">
                        <td className="p-4">Reparto justo multi-stakeholder</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">⚠️ Solo BAT</td>
                        <td className="text-center p-4 text-brand-green font-bold">✅ 5 grupos</td>
                    </tr>
                    <tr className="border-b border-brand-green/10">
                        <td className="p-4">Soporte CBDCs</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4 text-brand-green font-bold">✅ Bre·B, RLUSD</td>
                    </tr>
                    <tr className="border-b border-brand-green/10">
                        <td className="p-4">Agentes IA avanzados</td>
                        <td className="text-center p-4">⚠️ Básico</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4 text-brand-green font-bold">✅ Completo</td>
                    </tr>
                    <tr className="border-b border-brand-green/10">
                        <td className="p-4">NFT Ads (metaverso/P2E)</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4 text-brand-green font-bold">✅ Nativo</td>
                    </tr>
                    <tr>
                        <td className="p-4">Gobernanza DAO</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4">❌</td>
                        <td className="text-center p-4 text-brand-green font-bold">✅ 2026</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);

export default CompetitiveAdvantage;
