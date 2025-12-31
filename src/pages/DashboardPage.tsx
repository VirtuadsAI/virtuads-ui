import React, { useState } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    Target,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Calendar,
    Filter
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../context/WalletContext';
import CampaignWizard from '../components/ui/CampaignWizard';

const DashboardPage: React.FC = () => {
    const { t } = useTranslation();
    const { isConnected } = useWallet();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = [
        { label: 'Gasto Total', value: '1,240.50 XRP', change: '+12.5%', tendency: 'up', icon: Zap },
        { label: 'Impresiones', value: '45.2K', change: '+8.2%', tendency: 'up', icon: BarChart3 },
        { label: 'CTR Promedio', value: '3.14%', change: '-0.4%', tendency: 'down', icon: Target },
        { label: 'Conversiones', value: '842', change: '+24.1%', tendency: 'up', icon: ArrowUpRight },
    ];

    return (
        <div className="pt-24 pb-16 bg-brand-dark min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                            <LayoutDashboard className="text-brand-green" />
                            {t('dashboard.title', { defaultValue: 'Panel de Anunciante' })}
                        </h1>
                        <p className="text-brand-gray">
                            {t('dashboard.welcome', { defaultValue: 'Gestiona tus campañas publicitarias impulsadas por IA.' })}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            <Calendar className="w-4 h-4" />
                            Últimos 30 días
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-brand-green text-brand-dark font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform"
                        >
                            <Plus className="w-4 h-4" />
                            Nueva Campaña
                        </button>
                    </div>
                </div>

                {!isConnected && (
                    <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-500">
                        <Zap className="w-5 h-5" />
                        <p className="text-sm">Conecta tu wallet para ver datos reales de la red XRPL.</p>
                    </div>
                )}

                {/* Automation Badge */}
                <div className="mb-8 p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3 text-brand-green">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-25"></div>
                            <Zap className="relative w-5 h-5" />
                        </div>
                        <p className="text-sm font-medium">Automatización n8n activa: Agentes de IA monitoreando el inventario P2E.</p>
                    </div>
                    <span className="text-[10px] text-brand-gray border border-white/10 px-2 py-1 rounded bg-white/5 uppercase font-bold">Local Node: 5678</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-brand-dark-secondary border border-brand-green/10 rounded-2xl p-6 hover:border-brand-green/30 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-brand-green/10 rounded-xl text-brand-green group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.tendency === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    {stat.tendency === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-brand-gray text-sm mb-1">{stat.label}</h3>
                            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Chart Placeholder */}
                    <div className="lg:col-span-2 bg-brand-dark-secondary border border-brand-green/10 rounded-2xl p-6 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-white">Rendimiento de Campaña</h3>
                            <div className="flex gap-2">
                                <button title="Filtrar" aria-label="Filtrar" className="p-2 text-brand-gray hover:text-white"><Filter className="w-4 h-4" /></button>
                            </div>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="relative h-64 flex items-end justify-between gap-2 pt-10 px-4">
                            {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85, 60, 95].map((height, i) => (
                                <div key={i} className="relative group flex-1">
                                    <div
                                        className="bg-brand-green/20 group-hover:bg-brand-green/40 rounded-t-sm transition-all duration-500"
                                        style={{ height: `${height}%` }}
                                    ></div>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-brand-green rounded-t-sm transition-all duration-700 delay-100"
                                        style={{ height: `${height - 10}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] text-brand-gray uppercase tracking-widest px-2 font-medium">
                            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span>
                        </div>
                    </div>

                    {/* Active Campaigns List */}
                    <div className="bg-brand-dark-secondary border border-brand-green/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6">Campañas Activas</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Metaverse Nexus', budget: '500 XRP', status: 'En curso' },
                                { name: 'P2E Booster', budget: '250 XRP', status: 'Optimizando' },
                                { name: 'Cyberpunk Drop', budget: '1,200 XRP', status: 'Finalizado' },
                                { name: 'VirtuAds Genesis', budget: '3,000 XRP', status: 'En curso' },
                            ].map((campaign, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-green/20">
                                    <div>
                                        <p className="text-white font-medium mb-1">{campaign.name}</p>
                                        <p className="text-brand-gray text-xs">{campaign.budget}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${campaign.status === 'En curso' ? 'text-brand-green bg-brand-green/10' :
                                        campaign.status === 'Optimizando' ? 'text-brand-blue bg-brand-blue/10' : 'text-brand-gray bg-white/10'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 text-brand-green text-sm font-bold border border-brand-green/20 rounded-xl hover:bg-brand-green/5 transition-colors">
                            VER TODAS LAS CAMPAÑAS
                        </button>
                    </div>
                </div>
            </div>

            {/* Campaign Wizard */}
            <CampaignWizard
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default DashboardPage;

