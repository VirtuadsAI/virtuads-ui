import React from 'react';
import { Linkedin } from 'lucide-react';
import logoVirtu from '../../assets/logo-virtu.jpg';

const Footer = () => (
    <footer className="border-t border-brand-green/20 mt-20">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <img src={logoVirtu} alt="Virtuads AI logo" className="h-8 w-auto" />
                        <span className="text-xl font-bold">VIRTUADSAI</span>
                    </div>
                    <p className="text-brand-gray text-sm">
                        Primera plataforma Web3 de publicidad descentralizada con IA y Blockchain.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Producto</h4>
                    <ul className="space-y-2 text-brand-gray text-sm">
                        <li><a href="#tecnologia" className="hover:text-brand-green transition-colors">Tecnología</a></li>
                        <li><a href="#casos-uso" className="hover:text-brand-green transition-colors">Casos de Uso</a></li>
                        <li><a href="#roadmap" className="hover:text-brand-green transition-colors">Roadmap</a></li>
                        <li><a href="#pilotos" className="hover:text-brand-green transition-colors">Pilotos</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Empresa</h4>
                    <ul className="space-y-2 text-brand-gray text-sm">
                        <li><a href="#" className="hover:text-brand-green transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-brand-green transition-colors">Whitepaper</a></li>
                        <li><a href="#" className="hover:text-brand-green transition-colors">Carreras</a></li>
                        <li><a href="#" className="hover:text-brand-green transition-colors">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Síguenos</h4>
                    <div className="flex items-center space-x-4">
                        <a href="https://www.linkedin.com/company/virtuadsai/" className="text-brand-gray hover:text-brand-green transition-colors">
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path d="M17.53 3H21.5l-7.19 8.21L23 21h-7.38l-5.13-6.41L4.47 21H0.5l7.61-8.7L1 3h7.5l4.7 5.88L17.53 3zm-1.13 15h2.13l-6.06-7.59-1.71-2.14L5.6 5H3.47l6.29 7.77 1.71 2.14L16.4 18z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-brand-green/10 pt-8 text-center text-brand-gray text-sm">
                <p>© 2025 VirtuAdsAI. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
