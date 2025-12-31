import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import bgHero from '../../assets/bg-hero.png';

interface HeroProps {
    onJoinClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
    const { t } = useTranslation();

    return (
        <section
            id="inicio"
            className="min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `linear-gradient(to right, rgba(6, 13, 9, 0.95) 30%, rgba(6, 13, 9, 0.4)), url(${bgHero})` }}
        >
            <div className="container mx-auto px-6">
                <div className="max-w-3xl text-left">
                    <div className="inline-block px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/30 mb-6">
                        <p className="text-brand-green text-sm font-semibold">{t('hero.badge')}</p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-6 text-white">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-gray mb-4">
                        {t('hero.subtitle')}
                    </p>
                    <p className="text-lg text-brand-green mb-8">
                        {t('hero.technologies')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={onJoinClick}
                            className="bg-brand-green text-brand-dark font-bold px-10 py-4 rounded-md text-xl transition-transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            {t('hero.ctaPrimary')}
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <Link
                            to="/whitepaper"
                            className="border-2 border-brand-green text-brand-green font-bold px-10 py-4 rounded-md text-xl transition-all hover:bg-brand-green/10 text-center"
                        >
                            {t('hero.ctaSecondary')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
