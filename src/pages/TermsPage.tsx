import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Building2, Users, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type TabType = 'general' | 'b2b' | 'b2c';

const TermsPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<TabType>('general');

    const tabs: { id: TabType; label: string; icon: any }[] = [
        { id: 'general', label: t('terms.tabs.general'), icon: FileText },
        { id: 'b2b', label: t('terms.tabs.b2b'), icon: Building2 },
        { id: 'b2c', label: t('terms.tabs.b2c'), icon: Users },
    ];

    const renderContent = () => {
        const sections = t(`terms.${activeTab}.sections`, { returnObjects: true }) as Array<{ heading: string; content: string }>;

        return (
            <div className="space-y-8 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                    <Shield className="h-8 w-8 text-brand-green" />
                    <h2 className="text-2xl font-bold font-display">{t(`terms.${activeTab}.title`)}</h2>
                </div>

                <div className="bg-brand-dark/50 p-8 rounded-xl border border-brand-green/10 backdrop-blur-sm">
                    {sections.map((section, index) => (
                        <div key={index} className="mb-8 last:mb-0">
                            <h3 className="text-xl font-bold text-white mb-3">{section.heading}</h3>
                            <p className="text-brand-gray leading-relaxed text-justify">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-green/5 border border-brand-green/20 rounded-lg p-4 mt-8">
                    <p className="text-sm text-brand-gray text-center">
                        {t('terms.lastUpdated')}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <Helmet>
                <title>{t('terms.title')} | VirtuAdsAI</title>
                <meta name="description" content={t('terms.subtitle')} />
            </Helmet>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-brand-blue">
                            {t('terms.title')}
                        </h1>
                        <p className="text-xl text-brand-gray">
                            {t('terms.subtitle')}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300
                                        ${activeTab === tab.id
                                            ? 'bg-brand-green text-brand-dark font-bold shadow-lg shadow-brand-green/20 scale-105'
                                            : 'bg-brand-dark/50 text-brand-gray border border-brand-gray/20 hover:border-brand-green/50 hover:text-white'}
                                    `}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content */}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
