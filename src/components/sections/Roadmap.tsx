import { useTranslation } from 'react-i18next';

const Roadmap = () => {
    const { t } = useTranslation();

    return (
        <section id="roadmap" className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('roadmap.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('roadmap.subtitle')}
            </p>

            <div className="space-y-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 border-l-4 border-brand-green">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-brand-green">1</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{t('roadmap.phases.phase1.title')}</h3>
                            <p className="text-brand-gray">{t('roadmap.phases.phase1.year')}</p>
                        </div>
                    </div>
                    <ul className="space-y-2 text-brand-gray ml-20">
                        {t('roadmap.phases.phase1.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-l-4 border-blue-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-blue-400">2</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{t('roadmap.phases.phase2.title')}</h3>
                            <p className="text-brand-gray">{t('roadmap.phases.phase2.year')}</p>
                        </div>
                    </div>
                    <ul className="space-y-2 text-brand-gray ml-20">
                        {t('roadmap.phases.phase2.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-l-4 border-purple-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-400">3</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{t('roadmap.phases.phase3.title')}</h3>
                            <p className="text-brand-gray">{t('roadmap.phases.phase3.year')}</p>
                        </div>
                    </div>
                    <ul className="space-y-2 text-brand-gray ml-20">
                        {t('roadmap.phases.phase3.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-l-4 border-yellow-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-yellow-400">4</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{t('roadmap.phases.phase4.title')}</h3>
                            <p className="text-brand-gray">{t('roadmap.phases.phase4.year')}</p>
                        </div>
                    </div>
                    <ul className="space-y-2 text-brand-gray ml-20">
                        {t('roadmap.phases.phase4.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
