import React, { useState, useEffect } from 'react';
import { Activity, Coins, Radio, Monitor, CheckCircle2, Rocket } from 'lucide-react';
import { n8nService } from '../../services/n8nService';
import { analyticsService } from '../../services/analyticsService';
import { starAtlasService, StarAtlasShip } from '../../services/starAtlasService';

const SAGE_PROGRAM_ID = "SAGE2HAwep459SNq61LHvjxPk4pLPEJLoMETef7f7EE";
const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

interface SolanaEventMetadata {
    signature: string;
    timestamp: string;
    block: number;
}

interface SolanaEvent {
    id: string;
    type: string;
    message: string;
    metadata: SolanaEventMetadata;
}

interface SolanaStatus {
    connected: boolean;
    tps: number;
}

const SolanaGameBridge: React.FC = () => {
    const [events, setEvents] = useState<SolanaEvent[]>([]);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [lastReward, setLastReward] = useState<string | null>(null);
    const [adContent, setAdContent] = useState<string>("Waiting for Star Atlas events...");
    const [solanaStatus, setSolanaStatus] = useState<SolanaStatus>({ connected: false, tps: 0 });
    const [starAtlasShips, setStarAtlasShips] = useState<StarAtlasShip[]>([]);
    const [loadingShips, setLoadingShips] = useState(false);

    // Fetch Star Atlas ships on mount
    useEffect(() => {
        const loadShips = async () => {
            setLoadingShips(true);
            const result = await starAtlasService.getRandomShips(6);
            if (result.success && result.data) {
                setStarAtlasShips(result.data);
                console.log('[SolanaGameBridge] Loaded', result.data.length, 'Star Atlas ships');
            }
            setLoadingShips(false);
        };
        loadShips();
    }, []);

    // Fetch Solana Network Status
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                // Get samples for TPS calculation
                const response = await fetch(SOLANA_RPC, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 1,
                        method: "getRecentPerformanceSamples",
                        params: [1]
                    })
                });
                if (response.ok) {
                    const { result } = await response.json();
                    if (result && result[0]) {
                        const tps = Math.round(result[0].numTransactions / result[0].samplePeriodSecs);
                        setSolanaStatus({ connected: true, tps });
                    }
                }
            } catch {
                console.warn('Solana RPC unreachable');
                setSolanaStatus({ connected: false, tps: 0 });
            }
        };
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    // Monitor for real signatures from Star Atlas programs
    useEffect(() => {
        if (!isMonitoring) return;

        const monitorSignatures = async () => {
            try {
                const response = await fetch(SOLANA_RPC, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 1,
                        method: "getSignaturesForAddress",
                        params: [
                            SAGE_PROGRAM_ID,
                            { limit: 3 }
                        ]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const result = data.result;
                    if (result && result.length > 0) {
                        const latestSig = result[0].signature;

                        // Check if this is a new event (very simple check for demo)
                        setEvents(prev => {
                            const isNew = prev.length === 0 || prev[0].metadata.signature !== latestSig;
                            if (isNew) {
                                const newEvent: SolanaEvent = {
                                    id: latestSig.substring(0, 8),
                                    type: 'ON_CHAIN_ACTION',
                                    message: 'SAGE Activity Detected',
                                    metadata: {
                                        signature: latestSig,
                                        timestamp: new Date().toLocaleTimeString(),
                                        block: result[0].slot
                                    }
                                };

                                // Trigger Ad Recommendation on new event
                                handleLiveEvent(newEvent);

                                return [newEvent, ...prev].slice(0, 5);
                            }
                            return prev;
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching Solana signatures:', error);
            }
        };

        const interval = setInterval(monitorSignatures, 8000); // Check every 8s
        monitorSignatures(); // Initial check

        return () => clearInterval(interval);
    }, [isMonitoring]);

    const handleLiveEvent = async (event: SolanaEvent) => {
        // Get random ship for context
        const randomShip = starAtlasShips[Math.floor(Math.random() * starAtlasShips.length)];
        const shipContext = randomShip ? {
            shipName: randomShip.name,
            shipClass: randomShip.attributes?.class || 'unknown',
            manufacturer: randomShip.attributes?.manufacturer || 'unknown'
        } : {};

        // Trigger n8n with REAL blockchain context + Star Atlas ship data
        const response = await n8nService.submitCampaign({
            name: `StarAtlas_Live_${event.id}`,
            budget: "500",
            objective: "engagement",
            description: `Star Atlas Live Game Activity${randomShip ? ` - ${randomShip.name}` : ''}`,
            metadata: {
                blockchain: "solana",
                programId: SAGE_PROGRAM_ID,
                signature: event.metadata.signature,
                ...shipContext
            }
        });

        if (response.success && response.data?.aiRecommendations) {
            const message = randomShip
                ? `New ${randomShip.attributes?.class || 'ship'} detected: ${randomShip.name}!`
                : response.data.message || "New Gear discovered in Star Atlas!";
            setAdContent(message);
            setLastReward(`Event tracked: ${event.id}`);

            analyticsService.recordImpression({
                nftId: `SOL_${event.id}`,
                adCreativeId: 'STAR_ATLAS_SAGE_LIVE',
                placement: 'solana_game_bridge',
                campaignId: response.data.campaignId
            });
        }
    };

    return (
        <div className="bg-brand-dark-secondary border border-brand-blue/20 rounded-[32px] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-brand-blue/10 flex items-center justify-between bg-gradient-to-r from-brand-blue/5 to-transparent">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-2xl flex items-center justify-center text-brand-blue">
                        <Radio className={`w-6 h-6 ${isMonitoring ? 'animate-spin-slow' : ''}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Solana Game Bridge</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] text-brand-gray uppercase tracking-widest font-mono">
                                {solanaStatus.connected ? `Mainnet-Beta | ${solanaStatus.tps} TPS` : 'Connecting to Solana...'}
                            </p>
                            <span className={`w-1.5 h-1.5 rounded-full ${solanaStatus.connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${isMonitoring
                        ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                        : 'bg-brand-blue text-white shadow-[0_0_20px_rgba(0,209,255,0.3)]'
                        }`}
                >
                    {isMonitoring ? 'Stop Monitoring' : 'Live Sync Star Atlas'}
                </button>
            </div>

            <div className="grid lg:grid-cols-2">
                {/* Left: Live On-Chain Stream */}
                <div className="p-8 border-r border-brand-blue/10">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-brand-blue w-4 h-4" />
                        <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">Live On-Chain Activity</span>
                    </div>

                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <div className="py-12 text-center text-brand-gray italic border border-dashed border-white/5 rounded-2xl">
                                {isMonitoring ? 'Escaneando bloques de SAGE...' : 'Sync Star Atlas para ver actividad real'}
                            </div>
                        ) : (
                            events.map(event => (
                                <div key={event.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between animate-in slide-in-from-left duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,209,255,0.5)]"></div>
                                        <div>
                                            <div className="font-bold text-sm text-white">{event.message}</div>
                                            <div className="text-[10px] text-brand-gray font-mono truncate w-32">{event.metadata.signature}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-mono text-brand-gray">{event.metadata.timestamp}</div>
                                        <div className="text-[10px] text-brand-blue font-bold flex items-center gap-1 justify-end">
                                            Slot: {event.metadata.block} <Coins size={10} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Real-time Ad Injection */}
                <div className="p-8 bg-black/20">
                    <div className="space-y-8">
                        {/* Live Ad Simulation */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Monitor className="text-brand-green w-4 h-4" />
                                <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">Solana Ad Injector</span>
                            </div>
                            <div className="aspect-video bg-brand-dark rounded-2xl border border-brand-green/30 p-6 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3">
                                    <div className="px-2 py-0.5 bg-brand-green/20 rounded-md text-[8px] font-bold text-brand-green border border-brand-green/30 uppercase">Mainnet_Native</div>
                                </div>
                                <div className="z-10">
                                    <div className="text-[10px] text-brand-green font-mono mb-2">Source: Star Atlas SAGE</div>
                                    <div className="text-lg font-bold text-white leading-tight mb-4">{adContent}</div>
                                    <button className="px-4 py-1.5 bg-brand-green text-brand-dark text-xs font-bold rounded-lg hover:brightness-110 transition-all">
                                        View in Explorer
                                    </button>
                                </div>
                                <div className="absolute inset-0 opacity-10 pointer-events-none mesh-grid-blue"></div>
                            </div>
                        </div>

                        {/* Status Panel */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Coins className="text-brand-green w-4 h-4" />
                                <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">Integration Health</span>
                            </div>
                            <div className="p-6 bg-brand-green/5 border border-brand-green/20 rounded-2xl space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-brand-gray">RPC Status:</span>
                                    <span className="text-brand-green font-bold flex items-center gap-1">
                                        <CheckCircle2 size={14} /> Live
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-brand-gray">Game:</span>
                                    <span className="text-white">Star Atlas (SAGE)</span>
                                </div>
                                {lastReward && (
                                    <div className="pt-4 border-t border-brand-green/10">
                                        <div className="text-[10px] text-brand-gray uppercase mb-1">Last Settlement</div>
                                        <div className="text-xs font-bold text-brand-green break-all">{lastReward}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Star Atlas Ships Gallery */}
            {starAtlasShips.length > 0 && (
                <div className="p-8 border-t border-brand-blue/10">
                    <div className="flex items-center gap-2 mb-6">
                        <Rocket className="text-brand-blue w-5 h-5" />
                        <span className="text-sm font-bold uppercase text-brand-gray tracking-wider">Star Atlas Fleet</span>
                        <span className="text-xs text-brand-blue/60">({starAtlasShips.length} ships)</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {loadingShips ? (
                            <div className="col-span-full text-center py-8 text-brand-gray">
                                Loading Star Atlas ships...
                            </div>
                        ) : (
                            starAtlasShips.map(ship => (
                                <div
                                    key={ship._id}
                                    className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-brand-blue/50 transition-all group cursor-pointer"
                                    title={ship.description || ship.name}
                                >
                                    {ship.image && (
                                        <div className="aspect-square bg-black/50 relative overflow-hidden">
                                            <img
                                                src={ship.image}
                                                alt={ship.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}
                                    <div className="p-3">
                                        <div className="text-xs font-bold text-white truncate">{ship.name}</div>
                                        <div className="text-[10px] text-brand-gray truncate">
                                            {ship.attributes?.class || ship.attributes?.itemType || 'Ship'}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolanaGameBridge;
