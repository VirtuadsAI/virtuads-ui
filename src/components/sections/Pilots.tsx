import { useTranslation } from 'react-i18next';
import PilotCard from '../ui/PilotCard';

const Pilots = () => {
    const { t } = useTranslation();

    return (
        <section id="pilotos" className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('pilots.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('pilots.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                <PilotCard
                    name={t('pilots.projects.bancannabis.name')}
                    description={t('pilots.projects.bancannabis.description')}
                    status={t('pilots.projects.bancannabis.status')}
                />
                <PilotCard
                    name={t('pilots.projects.metaverses.name')}
                    description={t('pilots.projects.metaverses.description')}
                    status={t('pilots.projects.metaverses.status')}
                />
                <PilotCard
                    name={t('pilots.projects.starAtlas.name')}
                    description={t('pilots.projects.starAtlas.description')}
                    status={t('pilots.projects.starAtlas.status')}
                />
                <PilotCard
                    name={t('pilots.projects.brave.name')}
                    description={t('pilots.projects.brave.description')}
                    status={t('pilots.projects.brave.status')}
                />
            </div>
        </section>
    );
};

export default Pilots;
