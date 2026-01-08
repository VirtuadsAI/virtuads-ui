import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import { WalletProvider } from './context/WalletContext';
import { HelmetProvider } from 'react-helmet-async';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DevelopersPage from './pages/DevelopersPage';
import WhitepaperPage from './pages/WhitepaperPage';
import DashboardPage from './pages/DashboardPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <HelmetProvider>
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
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletProvider>
    </HelmetProvider>
  );
}

export default App;
