import { useTranslation } from 'react-i18next';

const RevenueSharing = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24">
            <h2 className="text-4xl font-bold text-center mb-4">{t('revenueSharing.title')}</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                {t('revenueSharing.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/30">
                    <div className="text-5xl font-black text-brand-green mb-2">{t('revenueSharing.shares.platform.percentage')}</div>
                    <p className="font-bold mb-2">{t('revenueSharing.shares.platform.title')}</p>
                    <p className="text-brand-gray text-sm">{t('revenueSharing.shares.platform.description')}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
                    <div className="text-5xl font-black text-blue-400 mb-2">{t('revenueSharing.shares.users.percentage')}</div>
                    <p className="font-bold mb-2">{t('revenueSharing.shares.users.title')}</p>
                    <p className="text-brand-gray text-sm">{t('revenueSharing.shares.users.description')}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                    <div className="text-5xl font-black text-purple-400 mb-2">{t('revenueSharing.shares.developers.percentage')}</div>
                    <p className="font-bold mb-2">{t('revenueSharing.shares.developers.title')}</p>
                    <p className="text-brand-gray text-sm">{t('revenueSharing.shares.developers.description')}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30">
                    <div className="text-5xl font-black text-yellow-400 mb-2">{t('revenueSharing.shares.dao.percentage')}</div>
                    <p className="font-bold mb-2">{t('revenueSharing.shares.dao.title')}</p>
                    <p className="text-brand-gray text-sm">{t('revenueSharing.shares.dao.description')}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/30">
                    <div className="text-5xl font-black text-pink-400 mb-2">{t('revenueSharing.shares.partners.percentage')}</div>
                    <p className="font-bold mb-2">{t('revenueSharing.shares.partners.title')}</p>
                    <p className="text-brand-gray text-sm">{t('revenueSharing.shares.partners.description')}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30">
                    <div className="text-5xl font-black text-red-400 mb-2">{t('revenueSharing.shares.governments.percentage')}</div>
                    <p className="font-bold mb-2">{t('revenueSharing.shares.governments.title')}</p>
                    <p className="text-brand-gray text-sm">{t('revenueSharing.shares.governments.description')}</p>
                </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                <h3 className="text-2xl font-bold mb-4">{t('revenueSharing.tokenomics.title')}</h3>
                <div className="grid md:grid-cols-2 gap-6 text-brand-gray">
                    <div>
                        <p className="font-semibold mb-2 text-white">{t('revenueSharing.tokenomics.items.mainRail.title')}</p>
                        <p className="text-sm">{t('revenueSharing.tokenomics.items.mainRail.description')}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2 text-white">{t('revenueSharing.tokenomics.items.cbdcs.title')}</p>
                        <p className="text-sm">{t('revenueSharing.tokenomics.items.cbdcs.description')}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2 text-white">{t('revenueSharing.tokenomics.items.stablecoins.title')}</p>
                        <p className="text-sm">{t('revenueSharing.tokenomics.items.stablecoins.description')}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2 text-white">{t('revenueSharing.tokenomics.items.dao.title')}</p>
                        <p className="text-sm">{t('revenueSharing.tokenomics.items.dao.description')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RevenueSharing;
