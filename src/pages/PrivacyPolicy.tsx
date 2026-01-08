import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    const sections = t('privacy.sections', { returnObjects: true }) as Array<{ heading: string; content: string }>;

    return (
        <div className="min-h-screen pt-24 pb-12">
            <Helmet>
                <title>{t('privacy.title')} | VirtuAdsAI</title>
                <meta name="description" content={t('privacy.subtitle')} />
            </Helmet>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block p-4 rounded-full bg-brand-green/10 mb-6">
                            <Shield className="h-12 w-12 text-brand-green" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-brand-blue">
                            {t('privacy.title')}
                        </h1>
                        <p className="text-xl text-brand-gray">
                            {t('privacy.subtitle')}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="bg-brand-dark/50 p-8 rounded-xl border border-brand-green/10 backdrop-blur-sm shadow-xl">
                            {sections.map((section, index) => (
                                <div key={index} className="mb-8 last:mb-0 group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 hidden md:block">
                                            {index === 0 && <Eye className="w-6 h-6 text-brand-green/50 group-hover:text-brand-green transition-colors" />}
                                            {index === 1 && <FileText className="w-6 h-6 text-brand-green/50 group-hover:text-brand-green transition-colors" />}
                                            {index === 2 && <Lock className="w-6 h-6 text-brand-green/50 group-hover:text-brand-green transition-colors" />}
                                            {index > 2 && <Shield className="w-6 h-6 text-brand-green/50 group-hover:text-brand-green transition-colors" />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors">
                                                {section.heading}
                                            </h3>
                                            <p className="text-brand-gray leading-relaxed text-justify">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-brand-green/5 border border-brand-green/20 rounded-lg p-4 mt-8 flex justify-center items-center">
                            <p className="text-sm text-brand-gray">
                                {t('privacy.lastUpdated')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
