import { useTranslation } from 'react-i18next';

const WhitepaperPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-brand-dark text-brand-light">
            <div className="container mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">
                        {t('whitepaper.title')}
                    </h1>
                    <p className="text-xl text-brand-gray max-w-3xl mx-auto">
                        {t('whitepaper.subtitle')}
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-2xl p-8 border border-brand-green/20">
                    <h2 className="text-2xl font-bold mb-6">{t('whitepaper.toc.title')}</h2>
                    <ul className="space-y-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <li key={num}>
                                <a 
                                    href={`#section-${num}`} 
                                    className="text-brand-green hover:text-brand-blue transition-colors flex items-center gap-2"
                                >
                                    <span className="font-mono">{num}.</span>
                                    <span>{t(`whitepaper.toc.item${num}`)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Executive Summary */}
                    <section id="section-1" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section1.title')}</h2>
                        <div className="space-y-4 text-brand-gray leading-relaxed">
                            <p>{t('whitepaper.section1.p1')}</p>
                            <p>{t('whitepaper.section1.p2')}</p>
                            <p>{t('whitepaper.section1.p3')}</p>
                        </div>
                    </section>

                    {/* Problem Statement */}
                    <section id="section-2" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section2.title')}</h2>
                        <div className="space-y-6">
                            <p className="text-brand-gray leading-relaxed">{t('whitepaper.section2.intro')}</p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {['centralized', 'transparency', 'exclusion'].map((key) => (
                                    <div key={key} className="bg-brand-dark-secondary rounded-xl p-6 border border-brand-green/20">
                                        <h3 className="text-xl font-bold mb-3">{t(`whitepaper.section2.${key}.title`)}</h3>
                                        <p className="text-brand-gray text-sm">{t(`whitepaper.section2.${key}.description`)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Solution */}
                    <section id="section-3" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section3.title')}</h2>
                        <div className="space-y-4 text-brand-gray leading-relaxed">
                            <p>{t('whitepaper.section3.p1')}</p>
                            <div className="bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-xl p-6 border border-brand-green/20 my-6">
                                <ul className="space-y-3">
                                    {['transparency', 'payments', 'interoperability', 'privacy', 'fairSharing'].map((key) => (
                                        <li key={key} className="flex items-start gap-3">
                                            <span className="text-brand-green mt-1">✓</span>
                                            <span>{t(`whitepaper.section3.features.${key}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Technology Architecture */}
                    <section id="section-4" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section4.title')}</h2>
                        <p className="text-brand-gray leading-relaxed mb-6">{t('whitepaper.section4.intro')}</p>
                        <div className="space-y-6">
                            {['xrpl', 'chainlink', 'ai', 'brave', 'sdk'].map((key) => (
                                <div key={key} className="bg-brand-dark-secondary rounded-xl p-6 border border-brand-green/20">
                                    <h3 className="text-xl font-bold mb-3 text-brand-blue">{t(`whitepaper.section4.${key}.title`)}</h3>
                                    <p className="text-brand-gray">{t(`whitepaper.section4.${key}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tokenomics */}
                    <section id="section-5" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section5.title')}</h2>
                        <p className="text-brand-gray leading-relaxed mb-6">{t('whitepaper.section5.intro')}</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {['platform', 'users', 'developers', 'dao', 'partners', 'governments'].map((key) => (
                                <div key={key} className="bg-brand-dark-secondary rounded-xl p-6 border border-brand-green/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold">{t(`whitepaper.section5.${key}.title`)}</h3>
                                        <span className="text-2xl font-bold text-brand-green">{t(`whitepaper.section5.${key}.percentage`)}</span>
                                    </div>
                                    <p className="text-brand-gray text-sm">{t(`whitepaper.section5.${key}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Roadmap */}
                    <section id="section-6" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section6.title')}</h2>
                        <div className="space-y-8">
                            {['phase1', 'phase2', 'phase3', 'phase4'].map((phase, index) => (
                                <div key={phase} className="bg-brand-dark-secondary rounded-xl p-6 border-l-4 border-brand-green">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-3xl font-bold text-brand-green">{index + 1}</span>
                                        <div>
                                            <h3 className="text-xl font-bold">{t(`whitepaper.section6.${phase}.title`)}</h3>
                                            <p className="text-brand-gray">{t(`whitepaper.section6.${phase}.year`)}</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 ml-14">
                                        {t(`whitepaper.section6.${phase}.items`, { returnObjects: true }).map((item: string, i: number) => (
                                            <li key={i} className="text-brand-gray flex items-start gap-2">
                                                <span className="text-brand-green mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Compliance */}
                    <section id="section-7" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section7.title')}</h2>
                        <p className="text-brand-gray leading-relaxed mb-6">{t('whitepaper.section7.intro')}</p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {['regulation', 'security', 'certifications'].map((key) => (
                                <div key={key} className="bg-brand-dark-secondary rounded-xl p-6 border border-brand-green/20">
                                    <h3 className="text-lg font-bold mb-4">{t(`whitepaper.section7.${key}.title`)}</h3>
                                    <ul className="space-y-2">
                                        {t(`whitepaper.section7.${key}.items`, { returnObjects: true }).map((item: string, i: number) => (
                                            <li key={i} className="text-brand-gray text-sm flex items-start gap-2">
                                                <span className="text-brand-green mt-1">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section id="section-8" className="scroll-mt-20">
                        <h2 className="text-3xl font-bold mb-6 text-brand-green">{t('whitepaper.section8.title')}</h2>
                        <div className="space-y-4 text-brand-gray leading-relaxed">
                            <p>{t('whitepaper.section8.p1')}</p>
                            <p>{t('whitepaper.section8.p2')}</p>
                            <div className="bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-xl p-8 border border-brand-green/20 text-center mt-8">
                                <p className="text-xl font-bold mb-4">{t('whitepaper.section8.cta')}</p>
                                <a 
                                    href="/" 
                                    className="inline-block bg-gradient-to-r from-brand-green to-brand-blue text-brand-dark font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
                                >
                                    {t('whitepaper.section8.ctaButton')}
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default WhitepaperPage;
