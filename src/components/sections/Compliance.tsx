import { useTranslation } from 'react-i18next';
import { Lock, Shield, CheckCircle } from 'lucide-react';

const Compliance = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('compliance.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('compliance.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                    <Lock className="w-12 h-12 text-brand-green mb-4" />
                    <h3 className="text-xl font-bold mb-3">{t('compliance.sections.regulation.title')}</h3>
                    <ul className="text-brand-gray text-sm space-y-2">
                        {t('compliance.sections.regulation.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                    <Shield className="w-12 h-12 text-brand-green mb-4" />
                    <h3 className="text-xl font-bold mb-3">{t('compliance.sections.security.title')}</h3>
                    <ul className="text-brand-gray text-sm space-y-2">
                        {t('compliance.sections.security.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                    <CheckCircle className="w-12 h-12 text-brand-green mb-4" />
                    <h3 className="text-xl font-bold mb-3">{t('compliance.sections.certifications.title')}</h3>
                    <ul className="text-brand-gray text-sm space-y-2">
                        {t('compliance.sections.certifications.items', { returnObjects: true }).map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Compliance;
