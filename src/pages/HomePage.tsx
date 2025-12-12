import React from 'react';
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

const HomePage = () => {
    return (
        <>
            <Hero />
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
                <Roadmap />
            </div>
        </>
    );
};

export default HomePage;
