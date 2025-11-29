import React from 'react';
import { CheckCircle } from 'lucide-react';

const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3 mb-3">
        <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
        <p className="text-brand-gray">{text}</p>
    </div>
);

export default FeatureItem;
