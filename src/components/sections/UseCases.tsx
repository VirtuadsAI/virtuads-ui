import { useTranslation } from 'react-i18next';
import { Wallet, Globe, Zap, Network, Users, Rocket } from 'lucide-react';
import UseCaseCard from '../ui/UseCaseCard';

const UseCases = () => {
    const { t } = useTranslation();

    return (
        <section id="casos-uso" className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('useCases.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('useCases.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <UseCaseCard
                    icon={<Wallet className="w-10 h-10 text-brand-green" />}
                    title={t('useCases.cases.cbdc.title')}
                    description={t('useCases.cases.cbdc.description')}
                />
                <UseCaseCard
                    icon={<Globe className="w-10 h-10 text-brand-green" />}
                    title={t('useCases.cases.nft.title')}
                    description={t('useCases.cases.nft.description')}
                />
                <UseCaseCard
                    icon={<Zap className="w-10 h-10 text-brand-green" />}
                    title={t('useCases.cases.rewards.title')}
                    description={t('useCases.cases.rewards.description')}
                />
                <UseCaseCard
                    icon={<Network className="w-10 h-10 text-brand-green" />}
                    title={t('useCases.cases.retargeting.title')}
                    description={t('useCases.cases.retargeting.description')}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-400" />
                        {t('useCases.segments.b2b.title')}
                    </h3>
                    <ul className="space-y-2 text-brand-gray">
                        {t('useCases.segments.b2b.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-purple-400" />
                        {t('useCases.segments.b2c.title')}
                    </h3>
                    <ul className="space-y-2 text-brand-gray">
                        {t('useCases.segments.b2c.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default UseCases;
