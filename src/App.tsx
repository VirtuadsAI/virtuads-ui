import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DevelopersPage from './pages/DevelopersPage';
import WhitepaperPage from './pages/WhitepaperPage';

function App() {
  return (
    <Router>
      <div className="bg-brand-dark text-brand-light font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/whitepaper" element={<WhitepaperPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
