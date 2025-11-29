import { Linkedin, Instagram, Youtube } from 'lucide-react';
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
                        <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                            </svg>
                        </a>
                        <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                            <Youtube className="h-6 w-6" />
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
