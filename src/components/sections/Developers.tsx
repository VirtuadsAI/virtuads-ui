import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Developers = () => {
    const { t } = useTranslation();

    return (
        <section id="developers" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-green/5 skew-y-3 transform origin-top-left scale-110"></div>
            <div className="relative z-10">
                <h2 className="text-4xl font-bold text-center mb-4">{t('developers.title')}</h2>
                <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                    {t('developers.subtitle')}
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-brand-dark/50 backdrop-blur-sm border border-brand-green/20 hover:border-brand-green/50 transition-all hover:-translate-y-2 group">
                        <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                            <span className="text-3xl">💰</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">{t('developers.benefits.revenue.title')}</h3>
                        <p className="text-brand-gray mb-4">
                            {t('developers.benefits.revenue.description')}
                        </p>
                        <ul className="text-sm text-brand-gray space-y-2">
                            {(t('developers.benefits.revenue.features', { returnObjects: true }) as any[]).map((feature: string, index: number) => (
                                <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>{feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 rounded-2xl bg-brand-dark/50 backdrop-blur-sm border border-brand-green/20 hover:border-brand-green/50 transition-all hover:-translate-y-2 group">
                        <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                            <span className="text-3xl">🔌</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">{t('developers.benefits.integration.title')}</h3>
                        <p className="text-brand-gray mb-4">
                            {t('developers.benefits.integration.description')}
                        </p>
                        <ul className="text-sm text-brand-gray space-y-2">
                            {(t('developers.benefits.integration.features', { returnObjects: true }) as any[]).map((feature: string, index: number) => (
                                <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>{feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 rounded-2xl bg-brand-dark/50 backdrop-blur-sm border border-brand-green/20 hover:border-brand-green/50 transition-all hover:-translate-y-2 group">
                        <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                            <span className="text-3xl">🛡️</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">{t('developers.benefits.control.title')}</h3>
                        <p className="text-brand-gray mb-4">
                            {t('developers.benefits.control.description')}
                        </p>
                        <ul className="text-sm text-brand-gray space-y-2">
                            {(t('developers.benefits.control.features', { returnObjects: true }) as any[]).map((feature: string, index: number) => (
                                <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>{feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-brand-dark/30 rounded-2xl p-8 border border-brand-green/10 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">{t('developers.integrationProcess.title')}</h3>
                    <div className="grid md:grid-cols-5 gap-4 text-center">
                        {(t('developers.integrationProcess.steps', { returnObjects: true }) as any[]).map((step: string, index: number) => (
                            <div key={index} className="relative">
                                <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-bold flex items-center justify-center mx-auto mb-3 z-10 relative">{index + 1}</div>
                                <p className="text-sm font-medium">{step}</p>
                                {index < 4 && <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-brand-green/20 -z-0"></div>}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link to="/developers" className="inline-block bg-brand-green text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-brand-green/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                            {t('developers.cta')}
                        </Link>
                        <p className="mt-4 text-xs text-brand-gray">
                            {t('developers.ctaSubtext')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Developers;
