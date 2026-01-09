import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import { WalletProvider } from './context/WalletContext';
import { SolanaProvider } from './context/SolanaProvider';
import { HelmetProvider } from 'react-helmet-async';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DevelopersPage from './pages/DevelopersPage';
import WhitepaperPage from './pages/WhitepaperPage';
import DashboardPage from './pages/DashboardPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import P2EDemoPage from './pages/P2EDemoPage';

function App() {
  return (
    <HelmetProvider>
      <SolanaProvider>
        <WalletProvider>
          <Router>
            <div className="bg-brand-dark text-brand-light font-sans flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/developers" element={<DevelopersPage />} />
                  <Route path="/whitepaper" element={<WhitepaperPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/p2e-demo" element={<P2EDemoPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WalletProvider>
      </SolanaProvider>
    </HelmetProvider>
  );
}

export default App;
