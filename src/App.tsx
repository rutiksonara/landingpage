import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductDemo from './components/ProductDemo';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import './index.css';

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAuthClick = () => setIsAuthOpen(true);
  const handleAuthClose = () => setIsAuthOpen(false);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header onAuthClick={handleAuthClick} />
      <main>
        <Hero onAuthClick={handleAuthClick} onDemoClick={scrollToDemo} />
        <Features />
        <ProductDemo />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={handleAuthClose} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
