import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoVirtu from '../../assets/logo-virtu.jpg';
import LanguageSelector from '../ui/LanguageSelector';
import WalletConnection from '../ui/WalletConnection';

const Header = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { href: '/#inicio', label: t('header.nav.home'), isAnchor: true },
        { href: '/#tecnologia', label: t('header.nav.technology'), isAnchor: true },
        { href: '/#casos-uso', label: t('header.nav.useCases'), isAnchor: true },
        { to: '/whitepaper', label: t('header.nav.whitepaper') },
        { to: '/developers', label: t('header.nav.developers') },
        { to: '/p2e-demo', label: 'P2E DEMO', isSpecial: true },
        { to: '/dashboard', label: 'DASHBOARD', isSpecial: true },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-green/10">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left: Logo and Brand */}
                <Link to="/" className="flex items-center space-x-3 shrink-0" onClick={() => setIsMenuOpen(false)}>
                    <img src={logoVirtu} alt="Virtuads AI logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold tracking-wider">{t('header.brand')}</span>
                </Link>

                {/* Center: Navigation Links (Desktop) */}
                <nav className="hidden lg:flex flex-1 justify-center space-x-8 text-sm">
                    {navLinks.map((link, idx) => (
                        link.isAnchor ? (
                            <a key={idx} href={link.href} className="hover:text-brand-green transition-colors">{link.label}</a>
                        ) : (
                            <Link
                                key={idx}
                                to={link.to!}
                                className={`${link.isSpecial ? 'text-brand-green font-bold' : 'text-brand-gray hover:text-brand-green'} transition-colors`}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
                    <div className="hidden sm:block">
                        <WalletConnection />
                    </div>
                    <LanguageSelector />

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-brand-gray hover:text-white"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-dark border-b border-brand-green/20 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col p-6 space-y-4">
                        <div className="sm:hidden pb-4 mb-4 border-b border-white/10">
                            <WalletConnection />
                        </div>
                        {navLinks.map((link, idx) => (
                            link.isAnchor ? (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className="text-lg hover:text-brand-green transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={idx}
                                    to={link.to!}
                                    className={`text-lg ${link.isSpecial ? 'text-brand-green font-bold' : 'text-white hover:text-brand-green'} transition-colors`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

