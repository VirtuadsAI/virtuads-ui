import React from 'react';

const UseCaseCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="p-6 rounded-xl bg-brand-dark/60 border border-brand-green/20 hover:border-brand-green/50 transition-all backdrop-blur-sm group">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-brand-gray text-sm">{description}</p>
    </div>
);

export default UseCaseCard;
