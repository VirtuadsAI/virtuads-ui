import React, { useState, useEffect } from 'react';
import { User, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { decentralandService, DCLProfile } from '../../services/decentralandService';

interface MetaverseStatusProps {
    address: string | null;
}

const MetaverseStatus: React.FC<MetaverseStatusProps> = ({ address }) => {
    const [profile, setProfile] = useState<DCLProfile | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (address) {
            setLoading(true);
            decentralandService.getProfile(address)
                .then(setProfile)
                .finally(() => setLoading(false));
        } else {
            setProfile(null);
        }
    }, [address]);

    if (!address) return null;

    return (
        <div className="bg-brand-dark-secondary border border-brand-green/20 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-brand-green/40">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-green/20 rounded-lg">
                            <MapPin className="w-5 h-5 text-brand-green" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Metaverse Identity</h3>
                    </div>
                    <span className="px-2 py-0.5 bg-brand-green/10 text-[10px] font-bold text-brand-green border border-brand-green/20 rounded uppercase tracking-wider">
                        Decentraland Connected
                    </span>
                </div>

                {loading ? (
                    <div className="flex items-center gap-4 animate-pulse">
                        <div className="w-16 h-16 bg-white/10 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="w-32 h-4 bg-white/10 rounded"></div>
                            <div className="w-24 h-3 bg-white/10 rounded"></div>
                        </div>
                    </div>
                ) : profile ? (
                    <div className="flex items-start gap-4">
                        <div className="relative group">
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-20 h-20 rounded-2xl border-2 border-brand-green/30 object-cover shadow-2xl transition-transform group-hover:scale-105"
                            />
                            {profile.hasDecentralandName && (
                                <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 border-2 border-brand-dark shadow-lg" title="Verified Name">
                                    <ShieldCheck className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white text-xl">{profile.name}</span>
                                {profile.hasDecentralandName && (
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">Official</span>
                                )}
                            </div>
                            <p className="text-brand-gray text-xs line-clamp-2 italic mb-3">
                                {profile.description || "No biography provided in Decentraland."}
                            </p>
                            <a
                                href={`https://decentraland.org/profile/?address=${address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-brand-green hover:underline font-bold"
                            >
                                View full profile <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 border border-dashed border-white/10 rounded-xl text-center">
                        <div className="flex justify-center mb-3">
                            <User className="w-8 h-8 text-brand-gray/30" />
                        </div>
                        <p className="text-sm text-brand-gray">No Decentraland avatar found for this address.</p>
                        <p className="text-[10px] text-brand-gray/60 mt-1 uppercase tracking-tighter">SDK initialized / API Ready</p>
                    </div>
                )}
            </div>

            {/* Visual accent */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-blue to-transparent opacity-50"></div>
        </div>
    );
};

export default MetaverseStatus;
