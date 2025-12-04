import { useTranslation } from 'react-i18next';

const CompetitiveAdvantage = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('competitiveAdvantage.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('competitiveAdvantage.subtitle')}
            </p>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-brand-green/30">
                            <th className="text-left p-4 font-bold">{t('competitiveAdvantage.table.headers.feature')}</th>
                            <th className="text-center p-4 font-bold">{t('competitiveAdvantage.table.headers.metaAds')}</th>
                            <th className="text-center p-4 font-bold">{t('competitiveAdvantage.table.headers.braveAds')}</th>
                            <th className="text-center p-4 font-bold text-brand-green">{t('competitiveAdvantage.table.headers.virtuads')}</th>
                        </tr>
                    </thead>
                    <tbody className="text-brand-gray">
                        <tr className="border-b border-brand-green/10">
                            <td className="p-4">{t('competitiveAdvantage.table.rows.onChain.feature')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.onChain.meta')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.onChain.brave')}</td>
                            <td className="text-center p-4 text-brand-green font-bold">{t('competitiveAdvantage.table.rows.onChain.virtuads')}</td>
                        </tr>
                        <tr className="border-b border-brand-green/10">
                            <td className="p-4">{t('competitiveAdvantage.table.rows.fairSharing.feature')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.fairSharing.meta')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.fairSharing.brave')}</td>
                            <td className="text-center p-4 text-brand-green font-bold">{t('competitiveAdvantage.table.rows.fairSharing.virtuads')}</td>
                        </tr>
                        <tr className="border-b border-brand-green/10">
                            <td className="p-4">{t('competitiveAdvantage.table.rows.cbdc.feature')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.cbdc.meta')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.cbdc.brave')}</td>
                            <td className="text-center p-4 text-brand-green font-bold">{t('competitiveAdvantage.table.rows.cbdc.virtuads')}</td>
                        </tr>
                        <tr className="border-b border-brand-green/10">
                            <td className="p-4">{t('competitiveAdvantage.table.rows.ai.feature')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.ai.meta')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.ai.brave')}</td>
                            <td className="text-center p-4 text-brand-green font-bold">{t('competitiveAdvantage.table.rows.ai.virtuads')}</td>
                        </tr>
                        <tr className="border-b border-brand-green/10">
                            <td className="p-4">{t('competitiveAdvantage.table.rows.nft.feature')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.nft.meta')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.nft.brave')}</td>
                            <td className="text-center p-4 text-brand-green font-bold">{t('competitiveAdvantage.table.rows.nft.virtuads')}</td>
                        </tr>
                        <tr>
                            <td className="p-4">{t('competitiveAdvantage.table.rows.dao.feature')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.dao.meta')}</td>
                            <td className="text-center p-4">{t('competitiveAdvantage.table.rows.dao.brave')}</td>
                            <td className="text-center p-4 text-brand-green font-bold">{t('competitiveAdvantage.table.rows.dao.virtuads')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CompetitiveAdvantage;
