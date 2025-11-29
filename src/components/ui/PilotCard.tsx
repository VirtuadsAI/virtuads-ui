import React from 'react';

const PilotCard = ({ name, description, status }: { name: string; description: string; status: string }) => (
    <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-dark/70 border border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all">
        <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold">{name}</h3>
            <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold">{status}</span>
        </div>
        <p className="text-brand-gray text-sm">{description}</p>
    </div>
);

export default PilotCard;
