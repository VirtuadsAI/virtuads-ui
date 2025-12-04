import { useTranslation } from 'react-i18next';
import aboutImage from '../../assets/about-image.png';

const About = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6">{t('about.title')}</h2>
                    <p className="text-lg text-brand-gray leading-relaxed mb-6">
                        {t('about.description1')}
                    </p>
                    <p className="text-lg text-brand-gray leading-relaxed mb-6">
                        {t('about.description2')}
                    </p>
                    <div className="flex items-center gap-4 mt-8">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-brand-green">{t('about.stats.marketSize.value')}</p>
                            <p className="text-sm text-brand-gray">{t('about.stats.marketSize.label')}</p>
                        </div>
                        <div className="w-px h-12 bg-brand-green/30"></div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-brand-green">{t('about.stats.targetCapture.value')}</p>
                            <p className="text-sm text-brand-gray">{t('about.stats.targetCapture.label')}</p>
                        </div>
                    </div>
                </div>
                <div className="h-80 rounded-2xl bg-no-repeat bg-cover bg-center border-2 border-brand-green/20" style={{ backgroundImage: `url(${aboutImage})` }}>
                </div>
            </div>
        </section>
    );
};

export default About;
