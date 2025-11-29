import React from 'react';

const Developers = () => (
    <section id="developers" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-green/5 skew-y-3 transform origin-top-left scale-110"></div>
        <div className="relative z-10">
            <h2 className="text-4xl font-bold text-center mb-4">DESARROLLADORES P2E</h2>
            <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
                Monetiza tu videojuego o metaverso con publicidad descentralizada y transparente
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="p-8 rounded-2xl bg-brand-dark/50 backdrop-blur-sm border border-brand-green/20 hover:border-brand-green/50 transition-all hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                        <span className="text-3xl">💰</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">22% Revenue Share</h3>
                    <p className="text-brand-gray mb-4">
                        Gana más que con plataformas tradicionales. Pagos automáticos en stablecoins vía XRPL.
                    </p>
                    <ul className="text-sm text-brand-gray space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>Pagos inmediatos</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>Dashboard transparente</li>
                    </ul>
                </div>

                <div className="p-8 rounded-2xl bg-brand-dark/50 backdrop-blur-sm border border-brand-green/20 hover:border-brand-green/50 transition-all hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                        <span className="text-3xl">🔌</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Integración Simple</h3>
                    <p className="text-brand-gray mb-4">
                        SDK plug-and-play compatible con Unity y Unreal Engine. Integración en menos de 48 horas.
                    </p>
                    <ul className="text-sm text-brand-gray space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>Documentación completa</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>Soporte dedicado</li>
                    </ul>
                </div>

                <div className="p-8 rounded-2xl bg-brand-dark/50 backdrop-blur-sm border border-brand-green/20 hover:border-brand-green/50 transition-all hover:-translate-y-2 group">
                    <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                        <span className="text-3xl">🛡️</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Control Total</h3>
                    <p className="text-brand-gray mb-4">
                        Tú decides qué anuncios se muestran. Protege la experiencia de tus jugadores sin ser intrusivo.
                    </p>
                    <ul className="text-sm text-brand-gray space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>Filtros de contenido</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>Formatos nativos</li>
                    </ul>
                </div>
            </div>

            <div className="bg-brand-dark/30 rounded-2xl p-8 border border-brand-green/10 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 text-center">Proceso de Integración</h3>
                <div className="grid md:grid-cols-5 gap-4 text-center">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-bold flex items-center justify-center mx-auto mb-3 z-10 relative">1</div>
                        <p className="text-sm font-medium">Registro</p>
                        <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-brand-green/20 -z-0"></div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-bold flex items-center justify-center mx-auto mb-3 z-10 relative">2</div>
                        <p className="text-sm font-medium">Descarga SDK</p>
                        <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-brand-green/20 -z-0"></div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-bold flex items-center justify-center mx-auto mb-3 z-10 relative">3</div>
                        <p className="text-sm font-medium">Configura Zonas</p>
                        <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-brand-green/20 -z-0"></div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-bold flex items-center justify-center mx-auto mb-3 z-10 relative">4</div>
                        <p className="text-sm font-medium">Conecta Wallet</p>
                        <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-brand-green/20 -z-0"></div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-bold flex items-center justify-center mx-auto mb-3 z-10 relative">5</div>
                        <p className="text-sm font-medium">¡Monetiza!</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <button className="bg-brand-green text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-brand-green/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                        SOLICITAR EARLY ACCESS SDK
                    </button>
                    <p className="mt-4 text-xs text-brand-gray">
                        Prioridad para los primeros 10 juegos integrados • Soporte técnico 24/7
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default Developers;
