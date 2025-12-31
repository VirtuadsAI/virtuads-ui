import Hero from '../components/sections/Hero';
import ProblemSolution from '../components/sections/ProblemSolution';
import About from '../components/sections/About';
import TechStack from '../components/sections/TechStack';
import UseCases from '../components/sections/UseCases';
import Developers from '../components/sections/Developers';
import Compliance from '../components/sections/Compliance';
import RevenueSharing from '../components/sections/RevenueSharing';
import Pilots from '../components/sections/Pilots';
import CompetitiveAdvantage from '../components/sections/CompetitiveAdvantage';
import Roadmap from '../components/sections/Roadmap';
import AiPreviewSection from '../components/sections/AiPreviewSection';
import WaitlistModal from '../components/ui/WaitlistModal';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('hero.title')} | VirtuAds AI</title>
                <meta name="description" content={t('hero.subtitle')} />
                <meta property="og:title" content={`${t('hero.title')} | VirtuAds AI`} />
                <meta property="og:description" content={t('hero.subtitle')} />
            </Helmet>

            <Hero onJoinClick={() => setIsWaitlistOpen(true)} />
            <div className="container mx-auto px-6">
                <ProblemSolution />
                <About />
                <TechStack />
                <UseCases />
                <Developers />
                <Compliance />
                <RevenueSharing />
                <Pilots />
                <CompetitiveAdvantage />
                <AiPreviewSection />
                <Roadmap />
            </div>

            <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
            />
        </>
    );
};

export default HomePage;
