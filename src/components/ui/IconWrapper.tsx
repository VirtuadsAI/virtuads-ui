import React from 'react';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-24 h-24 border-2 border-brand-green/50 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm bg-brand-dark/50">
        {children}
    </div>
);

export default IconWrapper;
