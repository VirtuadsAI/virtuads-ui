import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check, Terminal, Key, Shield, Zap } from 'lucide-react';

const DevelopersPage = () => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [email, setEmail] = useState('');

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateApiKey = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API key generation
        const mockKey = 'va_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
        setApiKey(mockKey);
    };

    const codeSnippet = `
// Install the SDK
npm install @virtuads/sdk

// Initialize
import { VirtuAds } from '@virtuads/sdk';

const virtuAds = new VirtuAds({
  apiKey: 'YOUR_API_KEY',
  gameId: 'GAME_123'
});

// Show an ad
await virtuAds.showAd({
  zoneId: 'ZONE_REWARD',
  onReward: (reward) => {
    console.log('Player earned:', reward);
  }
});
`;

    return (
        <div className="pt-24 pb-12 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-blue-500">
                        {t('developersPage.title')}
                    </h1>
                    <p className="text-xl text-brand-gray max-w-2xl mx-auto">
                        {t('developersPage.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Integration Guide */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Terminal className="text-brand-green" />
                            {t('developersPage.integration.title')}
                        </h2>

                        <div className="bg-brand-dark/50 border border-brand-green/20 rounded-xl overflow-hidden mb-8">
                            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-brand-green/10">
                                <span className="text-xs text-brand-gray">TypeScript</span>
                                <button
                                    onClick={() => handleCopy(codeSnippet)}
                                    className="text-brand-gray hover:text-brand-green transition-colors"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto text-sm text-brand-light font-mono">
                                <code>{codeSnippet}</code>
                            </pre>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 text-brand-green font-bold">1</div>
                                <div>
                                    <h3 className="font-bold mb-1">{t('developersPage.steps.step1.title')}</h3>
                                    <p className="text-sm text-brand-gray">{t('developersPage.steps.step1.description')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 text-brand-green font-bold">2</div>
                                <div>
                                    <h3 className="font-bold mb-1">{t('developersPage.steps.step2.title')}</h3>
                                    <p className="text-sm text-brand-gray">{t('developersPage.steps.step2.description')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 text-brand-green font-bold">3</div>
                                <div>
                                    <h3 className="font-bold mb-1">{t('developersPage.steps.step3.title')}</h3>
                                    <p className="text-sm text-brand-gray">{t('developersPage.steps.step3.description')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* API Key Generation */}
                    <div>
                        <div className="bg-gradient-to-br from-brand-green/10 to-transparent p-8 rounded-2xl border border-brand-green/30">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Key className="text-brand-green" />
                                {t('developersPage.apiKey.title')}
                            </h2>

                            {!apiKey ? (
                                <form onSubmit={generateApiKey} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">{t('developersPage.apiKey.emailLabel')}</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-brand-green/30 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
                                            placeholder="dev@studio.com"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-green/90 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Zap size={18} />
                                        {t('developersPage.apiKey.generateBtn')}
                                    </button>
                                </form>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="p-4 bg-brand-green/20 rounded-lg border border-brand-green/50">
                                        <p className="text-xs text-brand-green mb-1 font-bold uppercase">{t('developersPage.apiKey.successLabel')}</p>
                                        <div className="flex items-center justify-between">
                                            <code className="font-mono text-lg">{apiKey}</code>
                                            <button
                                                onClick={() => handleCopy(apiKey)}
                                                className="text-brand-green hover:text-white transition-colors"
                                            >
                                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-brand-gray flex items-center gap-2">
                                        <Shield size={14} />
                                        {t('developersPage.apiKey.securityNote')}
                                    </p>
                                    <button
                                        onClick={() => setApiKey('')}
                                        className="text-sm text-brand-green hover:underline"
                                    >
                                        {t('developersPage.apiKey.generateNew')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopersPage;
