import React from 'react';

const RevenueSharing = () => (
    <section className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">REPARTO JUSTO DE INGRESOS</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Modelo transparente de distribución de ingresos entre todos los stakeholders
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/30">
                <div className="text-5xl font-black text-brand-green mb-2">30%</div>
                <p className="font-bold mb-2">VirtuAdsAI</p>
                <p className="text-brand-gray text-sm">Plataforma y desarrollo</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
                <div className="text-5xl font-black text-blue-400 mb-2">25%</div>
                <p className="font-bold mb-2">Usuarios Finales</p>
                <p className="text-brand-gray text-sm">Interacciones y atención</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                <div className="text-5xl font-black text-purple-400 mb-2">22%</div>
                <p className="font-bold mb-2">Devs Metaverso/P2E</p>
                <p className="text-brand-gray text-sm">Inventario y tráfico</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30">
                <div className="text-5xl font-black text-yellow-400 mb-2">10%</div>
                <p className="font-bold mb-2">Pool DAO</p>
                <p className="text-brand-gray text-sm">Gobernanza descentralizada</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/30">
                <div className="text-5xl font-black text-pink-400 mb-2">8%</div>
                <p className="font-bold mb-2">Partners/Canales</p>
                <p className="text-brand-gray text-sm">Distribución y alianzas</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30">
                <div className="text-5xl font-black text-red-400 mb-2">5%</div>
                <p className="font-bold mb-2">Gobiernos/Reguladores</p>
                <p className="text-brand-gray text-sm">Impuestos y compliance</p>
            </div>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
            <h3 className="text-2xl font-bold mb-4">Tokenómica</h3>
            <div className="grid md:grid-cols-2 gap-6 text-brand-gray">
                <div>
                    <p className="font-semibold mb-2 text-white">Rail Principal</p>
                    <p className="text-sm">XRPL para pagos instantáneos</p>
                </div>
                <div>
                    <p className="font-semibold mb-2 text-white">CBDCs Soportados</p>
                    <p className="text-sm">Bre·B (Colombia), RLUSD (Ripple)</p>
                </div>
                <div>
                    <p className="font-semibold mb-2 text-white">Stablecoins</p>
                    <p className="text-sm">USDC, USDT, PYUSD</p>
                </div>
                <div>
                    <p className="font-semibold mb-2 text-white">Gobernanza DAO</p>
                    <p className="text-sm">Q2 2026 (10% pool)</p>
                </div>
            </div>
        </div>
    </section>
);

export default RevenueSharing;
