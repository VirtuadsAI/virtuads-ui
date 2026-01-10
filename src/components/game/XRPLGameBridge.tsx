import React, { useState, useEffect } from 'react';
import { Activity, Coins, Radio, Monitor, CheckCircle2 } from 'lucide-react';
import { n8nService } from '../../services/n8nService';
import { analyticsService } from '../../services/analyticsService';

interface XrplEvent {
    id: string;
    game: string;
    type: string;
    player: string;
    timestamp: string;
    rewarded: boolean;
}

interface XrplStatus {
    address: string;
    connected: boolean;
    network: string;
    environment: string;
}

const XRPLGameBridge: React.FC = () => {
    const [events, setEvents] = useState<XrplEvent[]>([]);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [lastReward, setLastReward] = useState<string | null>(null);
    const [adContent, setAdContent] = useState<string>("Esperando campaña...");
    const [xrplStatus, setXrplStatus] = useState<XrplStatus | null>(null);

    // Fetch XRPL Backend Status
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/xrpl/status');
                if (response.ok) {
                    const data = await response.json();
                    setXrplStatus(data);
                }
            } catch {
                console.warn('Backend offline - using simulation mode');
            }
        };
        fetchStatus();
    }, []);

    // Simulate incoming game events from XRPL Testnet
    useEffect(() => {
        if (!isMonitoring) return;

        const interval = setInterval(() => {
            const newEvent = {
                id: Math.random().toString(36).substr(2, 9),
                game: Math.random() > 0.5 ? 'Ripple Racer' : 'Phnix Runner',
                type: Math.random() > 0.7 ? 'ACHIEVEMENT' : 'CHECKPOINT',
                player: 'rN...test_wallet',
                timestamp: new Date().toLocaleTimeString(),
                rewarded: false
            };

            setEvents(prev => [newEvent, ...prev].slice(0, 5));

            if (newEvent.type === 'ACHIEVEMENT') {
                handleAchievement(newEvent);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isMonitoring]);

    const handleAchievement = async (event: XrplEvent) => {
        // Call n8n to fetch a targeted P2E ad for this achievement
        const response = await n8nService.submitCampaign({
            name: `P2E_Reward_${event.game}`,
            budget: "100",
            objective: "conversions",
            description: `Achievement in ${event.game}`
        });

        if (response.success && response.data?.aiRecommendations) {
            setAdContent(response.data.aiRecommendations.targetAudience + ": " + response.data.message);
            setLastReward("0.5 XRP Distributed via Gamechain");

            // PHASE 4: Record Impression in the bridge
            analyticsService.recordImpression({
                nftId: `BRIDGE_${event.game.toUpperCase()}`,
                adCreativeId: `P2E_${event.game.toUpperCase()}_REWARD`,
                placement: 'xrpl_game_bridge',
                campaignId: response.data.campaignId
            });
        }
    };

    return (
        <div className="bg-brand-dark-secondary border border-brand-green/20 rounded-[32px] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-brand-green/10 flex items-center justify-between bg-gradient-to-r from-brand-green/5 to-transparent">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green">
                        <Radio className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">XRPL Game Bridge</h3>
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest font-mono">
                            {xrplStatus?.address ? `Node: ${xrplStatus.address.substring(0, 15)}...` : 'Connecting to XRPL Node...'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${isMonitoring
                        ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                        : 'bg-brand-green text-brand-dark'
                        }`}
                >
                    {isMonitoring ? 'Stop Monitoring' : 'Start Bridge'}
                </button>
            </div>

            <div className="grid lg:grid-cols-2">
                {/* Left: Event Stream */}
                <div className="p-8 border-r border-brand-green/10">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-brand-green w-4 h-4" />
                        <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">Event Stream</span>
                    </div>

                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <div className="py-12 text-center text-brand-gray italic border border-dashed border-white/5 rounded-2xl">
                                Sin eventos activos...
                            </div>
                        ) : (
                            events.map(event => (
                                <div key={event.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between animate-in slide-in-from-left duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${event.type === 'ACHIEVEMENT' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-brand-green'}`}></div>
                                        <div>
                                            <div className="font-bold text-sm text-white">{event.game}</div>
                                            <div className="text-[10px] text-brand-gray uppercase">{event.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-mono text-brand-gray">{event.timestamp}</div>
                                        {event.type === 'ACHIEVEMENT' && <div className="text-[10px] text-yellow-500 font-bold">+Reward</div>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Ad Injection & Rewards */}
                <div className="p-8 bg-black/20">
                    <div className="space-y-8">
                        {/* Live Ad Simulation */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Monitor className="text-brand-blue w-4 h-4" />
                                <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">In-Game Ad Injector</span>
                            </div>
                            <div className="aspect-video bg-brand-dark rounded-2xl border border-brand-blue/30 p-6 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3">
                                    <div className="px-2 py-0.5 bg-brand-blue/20 rounded-md text-[8px] font-bold text-brand-blue border border-brand-blue/30 uppercase">Active_Inject</div>
                                </div>
                                <div className="z-10">
                                    <div className="text-[10px] text-brand-blue font-mono mb-2">Campaign ID: VA_XP_993</div>
                                    <div className="text-lg font-bold text-white leading-tight mb-4">{adContent}</div>
                                    <div className="flex gap-2">
                                        <div className="h-1 w-12 bg-brand-blue rounded-full"></div>
                                        <div className="h-1 w-8 bg-brand-blue/30 rounded-full"></div>
                                    </div>
                                </div>
                                {/* Mesh background */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none mesh-grid-blue"></div>
                            </div>
                        </div>

                        {/* Reward Distribution Dashboard */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Coins className="text-yellow-500 w-4 h-4" />
                                <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">Reward Settlement</span>
                            </div>
                            <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-brand-gray">Status:</span>
                                    <span className="text-brand-green font-bold flex items-center gap-1">
                                        <CheckCircle2 size={14} /> Synchronized
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-brand-gray">Last Settlement:</span>
                                    <span className="text-white font-mono">{lastReward || 'Pending Event...'}</span>
                                </div>
                                <div className="pt-2">
                                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-brand-green h-full w-[85%]"></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[10px] text-brand-gray uppercase">Batch Health</span>
                                        <span className="text-[10px] text-brand-green font-bold">85% Stable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XRPLGameBridge;
