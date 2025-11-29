import React from 'react';
import { Wallet, Globe, Zap, Network, Users, Rocket } from 'lucide-react';
import UseCaseCard from '../ui/UseCaseCard';

const UseCases = () => (
    <section id="casos-uso" className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">CASOS DE USO</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Aplicaciones reales de publicidad Web3 para B2B y B2C
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <UseCaseCard
                icon={<Wallet className="w-10 h-10 text-brand-green" />}
                title="Campañas en CBDC Bre·B"
                description="Paga campañas con la moneda digital del Banco de la República de Colombia (CBDC)."
            />
            <UseCaseCard
                icon={<Globe className="w-10 h-10 text-brand-green" />}
                title="NFT Ads en Metaversos"
                description="Espacios publicitarios tokenizados en eventos virtuales y conciertos en Decentraland/Spatial."
            />
            <UseCaseCard
                icon={<Zap className="w-10 h-10 text-brand-green" />}
                title="Recompensas Cripto"
                description="Usuarios ganan BAT, stablecoins y NFT badges por interactuar con anuncios."
            />
            <UseCaseCard
                icon={<Network className="w-10 h-10 text-brand-green" />}
                title="Retargeting Inteligente"
                description="Datos de oráculos (clima, IoT, eventos) para campañas contextuales en tiempo real."
            />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-400" />
                    Segmento B2B
                </h3>
                <ul className="space-y-2 text-brand-gray">
                    <li>• Marcas globales y pymes</li>
                    <li>• Bancos (integración CBDCs)</li>
                    <li>• Estudios de videojuegos P2E</li>
                    <li>• Desarrolladores de metaversos</li>
                </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Rocket className="w-8 h-8 text-purple-400" />
                    Segmento B2C
                </h3>
                <ul className="space-y-2 text-brand-gray">
                    <li>• Gamers y jugadores P2E</li>
                    <li>• Usuarios con wallets crypto</li>
                    <li>• Creadores digitales NFT</li>
                    <li>• Early adopters Web3</li>
                </ul>
            </div>
        </div>
    </section>
);

export default UseCases;
