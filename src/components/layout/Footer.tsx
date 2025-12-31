import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import logoVirtu from '../../assets/logo-virtu.jpg';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-brand-green/20 mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img src={logoVirtu} alt="Virtuads AI logo" className="h-8 w-auto" />
                            <span className="text-xl font-bold">{t('footer.brand')}</span>
                        </div>
                        <p className="text-brand-gray text-sm">
                            {t('footer.tagline')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t('footer.product.title')}</h4>
                        <ul className="space-y-2 text-brand-gray text-sm">
                            <li><a href="/#tecnologia" className="hover:text-brand-green transition-colors">{t('footer.product.links.technology')}</a></li>
                            <li><a href="/#casos-uso" className="hover:text-brand-green transition-colors">{t('footer.product.links.useCases')}</a></li>
                            <li><a href="/#roadmap" className="hover:text-brand-green transition-colors">{t('footer.product.links.roadmap')}</a></li>
                            <li><a href="/#pilotos" className="hover:text-brand-green transition-colors">{t('footer.product.links.pilots')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t('footer.company.title')}</h4>
                        <ul className="space-y-2 text-brand-gray text-sm">
                            <li><a href="#" className="hover:text-brand-green transition-colors">{t('footer.company.links.blog')}</a></li>
                            <li><Link to="/whitepaper" className="hover:text-brand-green transition-colors">{t('footer.company.links.whitepaper')}</Link></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">{t('footer.company.links.careers')}</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">{t('footer.company.links.contact')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t('footer.follow')}</h4>
                        <div className="flex items-center space-x-4">
                            <a href="https://www.linkedin.com/company/virtuadsai/" className="text-brand-gray hover:text-brand-green transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-brand-gray hover:text-brand-green transition-colors">
                                <Mail className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-brand-green/10 pt-8 text-center text-brand-gray text-sm">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
