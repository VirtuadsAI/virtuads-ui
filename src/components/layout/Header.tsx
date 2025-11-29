import React from 'react';
import { Linkedin } from 'lucide-react';
import logoVirtu from '../../assets/logo-virtu.jpg';

const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-green/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 mr-6">
                <img src={logoVirtu} alt="Virtuads AI logo" className="h-8 w-auto" />
                <span className="text-xl font-bold tracking-wider">VIRTUADSAI</span>
            </div>

            <div className="flex-grow"></div>

            <nav className="hidden md:flex items-center space-x-6 text-sm">
                <a href="#inicio" className="hover:text-brand-green transition-colors">Inicio</a>
                <a href="#tecnologia" className="hover:text-brand-green transition-colors">Tecnología</a>
                <a href="#casos-uso" className="hover:text-brand-green transition-colors whitespace-nowrap">Casos de Uso</a>
                <a href="#roadmap" className="hover:text-brand-green transition-colors">Roadmap</a>
                <a href="#pilotos" className="hover:text-brand-green transition-colors">Pilotos</a>
            </nav>

            <button className="hidden md:block border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-dark px-3 py-1.5 rounded-md font-medium transition-all hover:scale-105 text-xs whitespace-nowrap ml-4">
                SOLICITAR ACCESO BETA
            </button>
            <div className="hidden md:flex items-center space-x-3 ml-3">
                <a href="https://www.linkedin.com/company/virtuadsai/" aria-label="LinkedIn" className="text-brand-gray hover:text-brand-green transition-colors">
                    <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" aria-label="X (Twitter)" className="text-brand-gray hover:text-brand-green transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path d="M17.53 3H21.5l-7.19 8.21L23 21h-7.38l-5.13-6.41L4.47 21H0.5l7.61-8.7L1 3h7.5l4.7 5.88L17.53 3zm-1.13 15h2.13l-6.06-7.59-1.71-2.14L5.6 5H3.47l6.29 7.77 1.71 2.14L16.4 18z" />
                    </svg>
                </a>
            </div>
        </div>
    </header>
);

export default Header;
