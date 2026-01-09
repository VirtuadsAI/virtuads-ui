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

                        {/* SDK Live Demo Section */}
                        <div className="mt-24">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                                    <Zap className="text-brand-green" />
                                    SDK Live Demo
                                </h2>
                                <p className="text-brand-gray">Mira cómo se integra VirtuAds en tiempo real dentro de un entorno de juego.</p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="bg-brand-dark-secondary p-6 rounded-2xl border border-brand-green/20">
                                        <h3 className="text-xl font-bold mb-4 text-white">Anuncio NFT Dinámico</h3>
                                        <p className="text-brand-gray mb-4">
                                            Nuestra tecnología inyecta texturas publicitarias directamente en el motor de renderizado del juego (Unity/Unreal/Web3 Engines).
                                        </p>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-2 text-brand-green">
                                                <Check size={16} /> Latencia Cero en Renderizado
                                            </li>
                                            <li className="flex items-center gap-2 text-brand-green">
                                                <Check size={16} /> Seguimiento de Impresión On-Chain
                                            </li>
                                            <li className="flex items-center gap-2 text-brand-green">
                                                <Check size={16} /> Recompensas P2E Automáticas
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-brand-green/5 border border-brand-green/10 rounded-xl">
                                        <p className="text-xs font-mono text-brand-green">
                                    // Ad initialized at 0.04ms<br />
                                    // Identity verified: XRPL_ADDR_...<br />
                                    // Injecting AdID: VAD_9932
                                        </p>
                                    </div>
                                </div>

                                {/* Game Simulator */}
                                <div className="relative aspect-video bg-black rounded-3xl border-8 border-brand-dark-secondary shadow-2xl overflow-hidden flex items-center justify-center">
                                    {/* Inner Game Screen */}
                                    <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center">
                                        {/* Procedural Game Layout */}
                                        <div className="w-full h-full p-4 flex flex-col">
                                            <div className="flex justify-between items-center text-xs text-brand-gray mb-4">
                                                <div className="flex gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                </div>
                                                <span className="font-mono">FPS: 60 | PING: 12ms</span>
                                            </div>

                                            <div className="flex-grow flex items-center justify-center relative">
                                                {/* The "Game" Character */}
                                                <div className="relative">
                                                    <img
                                                        src="/assets/character-sprite.png"
                                                        alt="Fortnite-style character"
                                                        className="w-48 h-48 object-contain animate-bounce drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                                                    />
                                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-brand-gray text-[10px] uppercase font-bold bg-black/50 px-3 py-1 rounded-full border border-white/10">Player_01</div>
                                                </div>

                                                {/* The Ad Placement - Enhanced Version */}
                                                <div className="absolute bottom-8 right-8 w-52 h-32 bg-gradient-to-br from-brand-green via-brand-green to-brand-blue rounded-xl p-[3px] shadow-[0_0_40px_rgba(0,255,157,0.6),0_0_80px_rgba(0,255,157,0.3)] animate-pulse">
                                                    <div className="w-full h-full bg-gradient-to-br from-[#0a0f1a] to-[#0d1520] rounded-[10px] flex flex-col items-center justify-center overflow-hidden relative border-2 border-brand-green/30">
                                                        {/* Background gradient overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/10 via-transparent to-brand-blue/10"></div>

                                                        {/* Content */}
                                                        <div className="relative z-10 flex flex-col items-center justify-center px-2">
                                                            <div className="text-xs font-black text-brand-green mb-1 animate-pulse tracking-wider drop-shadow-[0_0_8px_rgba(0,255,157,0.8)]">VIRTUADS AI</div>
                                                            <div className="text-[10px] text-white font-bold opacity-90 mb-2">Tu Anuncio Aquí</div>

                                                            {/* Live indicator */}
                                                            <div className="flex items-center gap-1 mb-2">
                                                                <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping"></div>
                                                                <div className="text-[7px] text-brand-green font-bold uppercase">TESTNET LIVE</div>
                                                            </div>

                                                            {/* Stats bar */}
                                                            <div className="flex gap-2 text-[6px] text-brand-gray/70 font-mono">
                                                                <span>FPS: 60</span>
                                                                <span>•</span>
                                                                <span>LAT: 0ms</span>
                                                            </div>
                                                        </div>

                                                        {/* Corner accents */}
                                                        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-brand-green/50 rounded-tl"></div>
                                                        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-brand-green/50 rounded-br"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-center gap-4">
                                                <div className="w-10 h-10 border border-white/20 rounded-full"></div>
                                                <div className="w-10 h-10 border border-white/20 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        {/* DeFi Island Technical Integration */}
                        <div className="mt-32 p-12 bg-white/5 border border-white/10 rounded-[40px]">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="md:w-1/2 space-y-6">
                                    <h3 className="text-3xl font-bold text-white leading-tight">
                                        Patrón de Integración: <br />
                                        <span className="text-brand-green">DeFi Island + nice-xrpl</span>
                                    </h3>
                                    <p className="text-brand-gray">
                                        Para proyectos basados en <span className="text-white">nice-xrpl</span> (como <a href="https://learn.xrpl.org/defi-island/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">DeFi Island</a>), nuestro SDK proporciona hooks reactivos que sincronizan el estado del juego con la disponibilidad de anuncios globales.
                                    </p>
                                    <div className="flex items-center gap-4 p-4 bg-brand-green/10 border border-brand-green/20 rounded-2xl">
                                        <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center text-brand-dark">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Prueba Social Técnica</p>
                                            <p className="text-xs text-brand-gray">Más de 50 dApps de XRPL usan este patrón de integración.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 bg-black/60 rounded-3xl p-6 border border-white/10 font-mono text-sm overflow-hidden">
                                    <div className="flex gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <div className="text-brand-green opacity-80 mb-2">// Hook de integración DeFi Island</div>
                                    <div className="text-white">
                                        <span className="text-blue-400">const</span> {'{ ads, sync }'} = <span className="text-yellow-400">useVirtuAds</span>({'{\n'}
                                        {'  zoneId: '} <span className="text-brand-green">'DEFI_ISLE_3D'</span>{',\n'}
                                        {'  refreshRate: '} <span className="text-orange-400">10000</span>{'\n'}
                                        {'})'}
                                    </div>
                                    <div className="mt-4 text-brand-gray">
                                        {'// Inyectar en el motor Three.js\n'}
                                        {'<Billboard texture={ads.currentTexture} />'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopersPage;

