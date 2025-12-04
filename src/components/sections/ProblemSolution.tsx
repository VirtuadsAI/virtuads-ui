import { useTranslation } from 'react-i18next';
import FeatureItem from '../ui/FeatureItem';

const ProblemSolution = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-red-400">{t('problemSolution.problemTitle')}</h2>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <p className="font-semibold mb-2">{t('problemSolution.problems.centralized.title')}</p>
                            <p className="text-brand-gray text-sm">{t('problemSolution.problems.centralized.description')}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <p className="font-semibold mb-2">{t('problemSolution.problems.transparency.title')}</p>
                            <p className="text-brand-gray text-sm">{t('problemSolution.problems.transparency.description')}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <p className="font-semibold mb-2">{t('problemSolution.problems.exclusion.title')}</p>
                            <p className="text-brand-gray text-sm">{t('problemSolution.problems.exclusion.description')}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-brand-green">{t('problemSolution.solutionTitle')}</h2>
                    <p className="text-lg text-brand-gray mb-6">
                        {t('problemSolution.solutionDescription')}
                    </p>
                    <div className="space-y-3">
                        <FeatureItem text={t('problemSolution.features.transparency')} />
                        <FeatureItem text={t('problemSolution.features.payments')} />
                        <FeatureItem text={t('problemSolution.features.interoperability')} />
                        <FeatureItem text={t('problemSolution.features.privacy')} />
                        <FeatureItem text={t('problemSolution.features.fairSharing')} />
                    </div>
                    <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/30">
                        <p className="text-2xl font-bold text-brand-green mb-2">{t('problemSolution.strategicGoal.title')}</p>
                        <p className="text-brand-gray">{t('problemSolution.strategicGoal.description')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
