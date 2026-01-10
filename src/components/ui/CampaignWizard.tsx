import React, { useState } from 'react';
import { X, Plus, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AIProcessingIndicator from './AIProcessingIndicator';
import { n8nService, CampaignData, N8nResponse } from '../../services/n8nService';

interface CampaignWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

type WizardStep = 'details' | 'processing' | 'recommendations' | 'success';
type ProcessingStage = 'connecting' | 'analyzing' | 'optimizing' | 'finalizing' | 'complete';

const CampaignWizard: React.FC<CampaignWizardProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    // Form state
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('100');
    const [objective, setObjective] = useState<'traffic' | 'conversions' | 'awareness'>('traffic');

    // Wizard state
    const [currentStep, setCurrentStep] = useState<WizardStep>('details');
    const [processingStage, setProcessingStage] = useState<ProcessingStage>('connecting');
    const [aiResponse, setAiResponse] = useState<N8nResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetWizard = () => {
        setName('');
        setBudget('100');
        setObjective('traffic');
        setCurrentStep('details');
        setProcessingStage('connecting');
        setAiResponse(null);
        setError(null);
        setIsSubmitting(false);
    };

    const handleClose = () => {
        resetWizard();
        onClose();
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError(t('campaign.wizard.errors.required'));
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setCurrentStep('processing');

        const campaignData: CampaignData = {
            name: name.trim(),
            budget,
            objective,
        };

        // Simulate processing stages
        const stages: ProcessingStage[] = ['connecting', 'analyzing', 'optimizing', 'finalizing'];

        for (let i = 0; i < stages.length; i++) {
            setProcessingStage(stages[i]);
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        try {
            const response = await n8nService.submitCampaign(campaignData);

            if (response.success) {
                setAiResponse(response);
                setProcessingStage('complete');

                // Wait a bit to show completion
                await new Promise(resolve => setTimeout(resolve, 1000));

                setCurrentStep('recommendations');
            } else {
                setError(response.error || t('campaign.wizard.errors.unknown'));
                setCurrentStep('details');
            }
        } catch (err) {
            setError(t('campaign.wizard.errors.unknown'));
            setCurrentStep('details');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalConfirm = () => {
        setCurrentStep('success');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={handleClose}></div>
            <div className="relative w-full max-w-2xl bg-brand-dark-secondary border border-brand-green/20 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-brand-gray hover:text-white z-10"
                    aria-label="Close wizard"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="p-8 pb-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Plus className="text-brand-green" />
                        {t('campaign.wizard.title')}
                    </h2>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className={`h-1 flex-1 rounded-full transition-all ${currentStep === 'details' ? 'bg-brand-green' : currentStep === 'processing' || currentStep === 'recommendations' || currentStep === 'success' ? 'bg-brand-green' : 'bg-white/10'}`}></div>
                        <div className={`h-1 flex-1 rounded-full transition-all ${currentStep === 'processing' || currentStep === 'recommendations' || currentStep === 'success' ? 'bg-brand-green' : 'bg-white/10'}`}></div>
                        <div className={`h-1 flex-1 rounded-full transition-all ${currentStep === 'recommendations' || currentStep === 'success' ? 'bg-brand-green' : 'bg-white/10'}`}></div>
                        <div className={`h-1 flex-1 rounded-full transition-all ${currentStep === 'success' ? 'bg-brand-green' : 'bg-white/10'}`}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Step 1: Campaign Details */}
                    {currentStep === 'details' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {t('campaign.wizard.step1.title')}
                                </h3>
                                <p className="text-sm text-brand-gray">
                                    {t('campaign.wizard.step1.description')}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-gray mb-2">
                                    {t('campaign.wizard.fields.name.label')}
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green/50 outline-none transition-colors"
                                    placeholder={t('campaign.wizard.fields.name.placeholder')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-gray mb-2">
                                    {t('campaign.wizard.fields.budget.label')}
                                </label>
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green/50 outline-none transition-colors"
                                    placeholder={t('campaign.wizard.fields.budget.placeholder')}
                                />
                            </div>

                            <div>
                                <label htmlFor="campaign-objective" className="block text-sm font-medium text-brand-gray mb-2">
                                    {t('campaign.wizard.fields.objective.label')}
                                </label>
                                <select
                                    id="campaign-objective"
                                    value={objective}
                                    onChange={(e) => setObjective(e.target.value as 'traffic' | 'conversions' | 'awareness')}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green/50 outline-none transition-colors appearance-none"
                                >
                                    <option value="traffic">{t('campaign.wizard.fields.objective.options.traffic')}</option>
                                    <option value="conversions">{t('campaign.wizard.fields.objective.options.conversions')}</option>
                                    <option value="awareness">{t('campaign.wizard.fields.objective.options.awareness')}</option>
                                </select>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !name.trim()}
                                className="w-full bg-brand-green text-brand-dark font-bold py-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                            >
                                {t('campaign.wizard.buttons.submit')}
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: AI Processing */}
                    {currentStep === 'processing' && (
                        <div className="animate-in fade-in slide-in-from-right duration-300">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {t('campaign.wizard.step2.title')}
                                </h3>
                                <p className="text-sm text-brand-gray">
                                    {t('campaign.wizard.step2.description')}
                                </p>
                            </div>
                            <AIProcessingIndicator stage={processingStage} />
                        </div>
                    )}

                    {/* Step 3: AI Recommendations */}
                    {currentStep === 'recommendations' && aiResponse?.data && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {t('campaign.wizard.step3.title')}
                                </h3>
                                <p className="text-sm text-brand-gray">
                                    {t('campaign.wizard.step3.description')}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Bidding Strategy */}
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h4 className="text-sm font-bold text-brand-green mb-2">
                                        {t('campaign.wizard.recommendations.biddingStrategy')}
                                    </h4>
                                    <p className="text-white">
                                        {aiResponse.data.aiRecommendations?.biddingStrategy || 'CPM Optimizado'}
                                    </p>
                                </div>

                                {/* Target Audience */}
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h4 className="text-sm font-bold text-brand-green mb-2">
                                        {t('campaign.wizard.recommendations.targetAudience')}
                                    </h4>
                                    <p className="text-white">
                                        {aiResponse.data.aiRecommendations?.targetAudience || 'Audiencia General Web3'}
                                    </p>
                                </div>

                                {/* Optimizations */}
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h4 className="text-sm font-bold text-brand-green mb-2">
                                        {t('campaign.wizard.recommendations.optimizations')}
                                    </h4>
                                    <ul className="space-y-2">
                                        {aiResponse.data.aiRecommendations?.optimizations?.map((opt, idx) => (
                                            <li key={idx} className="text-white text-sm flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                                                <span>{opt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* AI Message */}
                                {aiResponse.data.message && (
                                    <div className="p-4 bg-brand-green/5 rounded-xl border border-brand-green/20">
                                        <h4 className="text-sm font-bold text-brand-green mb-2">
                                            {t('campaign.wizard.recommendations.message')}
                                        </h4>
                                        <p className="text-white text-sm">
                                            {aiResponse.data.message}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleFinalConfirm}
                                className="w-full bg-brand-green text-brand-dark font-bold py-3 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            >
                                {t('campaign.wizard.buttons.next')}
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {currentStep === 'success' && (
                        <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full text-brand-green mb-4">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {t('campaign.wizard.success.title')}
                            </h3>
                            <p className="text-brand-gray mb-6">
                                {t('campaign.wizard.success.message')}
                            </p>
                            <button
                                onClick={handleClose}
                                className="w-full bg-brand-green text-brand-dark font-bold py-3 rounded-xl hover:scale-105 transition-transform"
                            >
                                {t('campaign.wizard.buttons.understood')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignWizard;
