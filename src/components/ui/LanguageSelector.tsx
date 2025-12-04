import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);

        // Update HTML lang and dir attributes
        document.documentElement.lang = langCode;
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';

        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-brand-green/30 hover:border-brand-green/60 hover:bg-brand-green/10 transition-all text-sm"
                aria-label="Select language"
            >
                {/* Bandera siempre visible */}
                <span className="text-xl">{currentLanguage.flag}</span>
                {/* Nombre visible solo en pantallas medianas+ */}
                <span className="hidden md:inline">{currentLanguage.name}</span>
                {/* Ícono globo solo en pantallas pequeñas */}
                <Globe className="w-4 h-4 md:hidden" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-brand-dark border border-brand-green/30 shadow-xl overflow-hidden z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-brand-green/10 transition-colors ${i18n.language === lang.code ? 'bg-brand-green/20 text-brand-green' : 'text-brand-light'
                                }`}
                        >
                            {/* Bandera más grande en el menú */}
                            <span className="text-2xl">{lang.flag}</span>
                            <div className="flex flex-col">
                                <span className="font-medium">{lang.name}</span>
                                {/* Código del idioma como texto secundario */}
                                <span className="text-xs opacity-60">{lang.code.toUpperCase()}</span>
                            </div>
                            {/* Checkmark para el idioma seleccionado */}
                            {i18n.language === lang.code && (
                                <span className="ml-auto text-brand-green">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
