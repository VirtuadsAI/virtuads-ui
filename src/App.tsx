import React from 'react';
import { Leaf, Handshake, Rocket, Camera, Linkedin, Twitter } from 'lucide-react';
import bgHero from './assets/bg-hero.png';
import aboutImage from './assets/about-image.png';
import logoVirtu from './assets/logo-virtu.jpg';

// Helper component for icons
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-24 h-24 border-2 border-brand-green/50 rounded-full mx-auto mb-6 flex items-center justify-center">
    {children}
  </div>
);

// Helper component for process flow
const ProcessNode = ({ label, subtitle, icon, isLast }: { label: string; subtitle: string; icon?: React.ReactNode; isLast?: boolean; }) => (
    <div className="flex items-center text-center flex-col md:flex-row">
        <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-28 h-28 border-2 border-brand-green rounded-full flex items-center justify-center bg-brand-dark z-10">
                {icon || <span className="font-bold text-brand-green">{label}</span>}
            </div>
            {subtitle && <p className="mt-2 text-sm text-brand-gray">{subtitle}</p>}
        </div>
        {!isLast && <div className="w-px h-8 md:w-16 md:h-px bg-brand-green/80"></div>}
    </div>
);


function App() {
  return (
    <div className="bg-brand-dark text-brand-light font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <img src={logoVirtu} alt="Virtuads AI logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold tracking-wider">VIRTUADSAI</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 text-lg">
                <a href="#" className="hover:text-brand-green transition-colors">Inicio</a>
                <a href="#" className="hover:text-brand-green transition-colors">Ecosistema</a>
                <a href="#" className="hover:text-brand-green transition-colors">Roadmap</a>
                <a href="#" className="hover:text-brand-green transition-colors">Contacto</a>
            </nav>
            
            <button className="hidden md:block border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-dark px-5 py-2 rounded-md font-medium transition-colors">
                SOLICITAR ACCESO BETA
            </button>
            <div className="hidden md:flex items-center space-x-4 ml-4">
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

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(to right, rgba(6, 13, 9, 0.9) 20%, rgba(6, 13, 9, 0.2)), url(${bgHero})` }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl text-left">
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-4 text-white">
                Un nuevo pacto <br/> digital en publicidad
            </h1>
            <p className="text-xl md:text-2xl text-brand-green mb-8">
                Publicidad ética, descentralizada e inmersiva
            </p>
            <button className="bg-brand-green text-brand-dark font-bold px-10 py-4 rounded-md text-xl transition-transform hover:scale-105">
                ÚNETE A LA REVOLUCIÓN
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* About Section */}
        <section className="py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6">¿QUÉ ES VIRTUADSAI?</h2>
                    <p className="text-lg text-brand-gray leading-relaxed">
                    Nuestra misión es transformar la publicidad digital.
                    Utilizando blockchain y experiencias inmersivas, 
                    conectamos marcas con audiencias de manera transparente y accesible.
                    </p>
                </div>
                <div className="h-80 rounded-2xl bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${aboutImage})`}}>
                    {/* The background image is now applied here */}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 text-center">
            <h2 className="text-4xl font-bold mb-16">¿CÓMO FUNCIONA?</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                    <IconWrapper>
                        <Leaf className="h-12 w-12 text-brand-green" />
                    </IconWrapper>
                    <h3 className="text-2xl font-bold">Sostenibilidad</h3>
                </div>
                
                <div className="text-center">
                    <IconWrapper>
                        <Handshake className="h-12 w-12 text-brand-green" />
                    </IconWrapper>
                    <h3 className="text-2xl font-bold">Ética</h3>
                </div>
                
                <div className="text-center">
                    <IconWrapper>
                        <Rocket className="h-12 w-12 text-brand-green" />
                    </IconWrapper>
                    <h3 className="text-2xl font-bold">Innovación</h3>
                </div>
            </div>
        </section>

        {/* Process Flow */}
        <section className="py-24">
            <h2 className="text-4xl font-bold text-center mb-20">CÓMO FUNCIONA</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-0">
                <ProcessNode label="pach" subtitle="pitch-web" />
                <ProcessNode label="" subtitle="angelia viault" icon={<Camera size={48} className="text-brand-green" />} />
                <ProcessNode label="Aulife" subtitle="face-role" />
                <ProcessNode label="panel" subtitle="admm-panel" />
                <ProcessNode label="DIGID" subtitle="biceu" />
                <ProcessNode label="API" subtitle="" isLast />
            </div>

            <div className="text-center mt-16">
                <button className="bg-brand-green text-brand-dark font-bold px-10 py-4 rounded-md text-xl transition-transform hover:scale-105">
                    EXPLORAR ECOSISTEMA
                </button>
            </div>
        </section>

        {/* Roadmap */}
        <section className="py-24">
            <h2 className="text-4xl font-bold text-center mb-20">ROADMAP Y VISIÓN 2025—2030</h2>
            
            <div className="flex justify-between items-center max-w-4xl mx-auto relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-green/50 -translate-y-1/2"></div>
                {['2025', '2026', '2027', '2028', '2029', '2030'].map((year) => (
                <div key={year} className="z-10 text-center">
                    <div className="w-4 h-4 bg-brand-green rounded-full mx-auto"></div>
                    <p className="mt-4 font-bold text-xl">{year}</p>
                </div>
                ))}
            </div>
            
            <div className="text-center mt-20">
                <button className="bg-brand-green text-brand-dark font-bold px-10 py-4 rounded-md text-xl transition-transform hover:scale-105">
                    SOLICITAR ACCESO BETA
                </button>
            </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-brand-green/20 mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-brand-gray">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <img src={logoVirtu} alt="Virtuads AI logo" className="h-7 w-auto" />
                <span className="text-xl font-bold tracking-wider text-brand-light">VIRTUADSAI</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Virtuads AI. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-6 mt-4">
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
      </footer>
    </div>
  );
}

export default App;
