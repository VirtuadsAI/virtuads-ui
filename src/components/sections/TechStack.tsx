import { useTranslation } from 'react-i18next';
import { Database, Network, Brain, Shield, Wallet, TrendingUp } from 'lucide-react';
import TechCard from '../ui/TechCard';

const TechStack = () => {
    const { t } = useTranslation();

    return (
        <section id="tecnologia" className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('techStack.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('techStack.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <TechCard
                    icon={<Database className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.xrpl.title')}
                    description={t('techStack.technologies.xrpl.description')}
                />
                <TechCard
                    icon={<Network className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.chainlink.title')}
                    description={t('techStack.technologies.chainlink.description')}
                />
                <TechCard
                    icon={<Brain className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.ai.title')}
                    description={t('techStack.technologies.ai.description')}
                />
                <TechCard
                    icon={<Shield className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.brave.title')}
                    description={t('techStack.technologies.brave.description')}
                />
                <TechCard
                    icon={<Wallet className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.sdk.title')}
                    description={t('techStack.technologies.sdk.description')}
                />
                <TechCard
                    icon={<TrendingUp className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.dashboard.title')}
                    description={t('techStack.technologies.dashboard.description')}
                />
                <TechCard
                    icon={<Network className="h-12 w-12 text-brand-green" />}
                    title={t('techStack.technologies.orchestration.title')}
                    description={t('techStack.technologies.orchestration.description')}
                />
                {/* Stablecoins */}
                <TechCard
                    icon={<span className="text-3xl font-bold text-brand-green">$</span>}
                    title={t('techStack.technologies.usdt.title')}
                    description={t('techStack.technologies.usdt.description')}
                />
                <TechCard
                    icon={<span className="text-3xl font-bold text-brand-green">$</span>}
                    title={t('techStack.technologies.usdc.title')}
                    description={t('techStack.technologies.usdc.description')}
                />
                <TechCard
                    icon={<span className="text-3xl font-bold text-brand-green">▲</span>}
                    title={t('techStack.technologies.bat.title')}
                    description={t('techStack.technologies.bat.description')}
                />
            </div>
        </section>
    );
};

export default TechStack;
