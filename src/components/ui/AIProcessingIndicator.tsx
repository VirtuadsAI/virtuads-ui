import React from 'react';
import { Loader2, Zap, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AIProcessingIndicatorProps {
    stage: 'connecting' | 'analyzing' | 'optimizing' | 'finalizing' | 'complete';
}

const AIProcessingIndicator: React.FC<AIProcessingIndicatorProps> = ({ stage }) => {
    const { t } = useTranslation();

    const stages = [
        { key: 'connecting', icon: Zap, label: t('campaign.wizard.processing.connecting') },
        { key: 'analyzing', icon: Brain, label: t('campaign.wizard.processing.analyzing') },
        { key: 'optimizing', icon: Sparkles, label: t('campaign.wizard.processing.optimizing') },
        { key: 'finalizing', icon: Loader2, label: t('campaign.wizard.processing.finalizing') },
    ];

    const currentStageIndex = stages.findIndex(s => s.key === stage);

    if (stage === 'complete') {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green/10 rounded-full text-brand-green mb-4 animate-in zoom-in-95">
                    <CheckCircle2 size={40} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white">
                    {t('campaign.wizard.confirmation.title')}
                </h3>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="flex flex-col space-y-4">
                {stages.map((stageItem, index) => {
                    const Icon = stageItem.icon;
                    const isActive = index === currentStageIndex;
                    const isCompleted = index < currentStageIndex;

                    return (
                        <div
                            key={stageItem.key}
                            className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'scale-105' : 'scale-100'
                                }`}
                        >
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${isActive
                                    ? 'bg-brand-green text-brand-dark shadow-lg shadow-brand-green/50'
                                    : isCompleted
                                        ? 'bg-brand-green/30 text-brand-green'
                                        : 'bg-white/5 text-brand-gray'
                                    }`}
                            >
                                <Icon
                                    size={24}
                                    className={isActive ? 'animate-spin' : ''}
                                />
                            </div>
                            <div className="flex-1">
                                <p
                                    className={`text-sm font-medium transition-colors ${isActive
                                        ? 'text-brand-green'
                                        : isCompleted
                                            ? 'text-white'
                                            : 'text-brand-gray'
                                        }`}
                                >
                                    {stageItem.label}
                                </p>
                                {isActive && (
                                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-green rounded-full animate-pulse w-2/3" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 bg-brand-green/5 border border-brand-green/20 rounded-lg">
                <p className="text-xs text-brand-gray text-center">
                    {t('campaign.wizard.step2.description')}
                </p>
            </div>
        </div>
    );
};

export default AIProcessingIndicator;
