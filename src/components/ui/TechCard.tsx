import React from 'react';
import IconWrapper from './IconWrapper';

const TechCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30 hover:border-brand-green/60 transition-all backdrop-blur-sm hover:transform hover:scale-105">
        <IconWrapper>{icon}</IconWrapper>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-brand-gray text-sm leading-relaxed">{description}</p>
    </div>
);

export default TechCard;
