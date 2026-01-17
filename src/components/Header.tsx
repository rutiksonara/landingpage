import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ChevronDown, Sparkles, Move3D, Users, FileOutput, MessageSquare, Globe, Zap } from 'lucide-react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

interface HeaderProps {
  onAuthClick: () => void;
}

const featureItems = [
  { id: 'ai-geometry', icon: Sparkles, title: 'AI Geometry Generation', color: '#3b82f6' },
  { id: 'direct-modeling', icon: Move3D, title: 'Direct Modeling', color: '#8b5cf6' },
  { id: 'collaboration', icon: Users, title: 'Real-time Collaboration', color: '#06b6d4' },
  { id: 'export', icon: FileOutput, title: 'Multi-format Export', color: '#10b981' },
  { id: 'chat', icon: MessageSquare, title: 'Chat-driven Modeling', color: '#f59e0b' },
  { id: 'cross-platform', icon: Globe, title: 'Cross-platform Access', color: '#ec4899' },
  { id: 'rapid-prototyping', icon: Zap, title: 'AI-Driven Rapid Prototyping', color: '#ef4444' },
];

const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'demo', label: 'Demo' },
  { id: 'product-tour', label: 'Product Tour' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'about', label: 'About' },
];

export default function Header({ onAuthClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sections = navSections.map(s => document.getElementById(s.id)).filter(Boolean);
    const scrollPosition = window.scrollY + 100; // Offset for header height

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(navSections[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    // Defer initial check to avoid synchronous setState in effect
    const frameId = requestAnimationFrame(updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      cancelAnimationFrame(frameId);
    };
  }, [updateActiveSection]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsFeaturesOpen(false);
  };

  const scrollToFeatureItem = (featureId: string) => {
    const element = document.querySelector(`[data-feature-id="${featureId}"]`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsFeaturesOpen(false);
  };

  const getNavButtonClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `text-sm font-medium transition-all duration-200 bg-transparent border-none cursor-pointer relative
      ${isActive 
        ? 'text-[var(--color-accent)]' 
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 bg-[var(--color-bg-header)]/90 backdrop-blur-xl border-b border-[var(--color-border)]/50">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-12">
        <div className="shrink-0">
          <span className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
            Cloud<span className="text-[var(--color-accent)]">Cad</span>AI
          </span>
        </div>

        <nav className={`
          flex items-center gap-6
          max-md:fixed max-md:top-[49px] max-md:left-0 max-md:right-0
          max-md:bg-[var(--color-bg-primary)]/95 max-md:backdrop-blur-xl max-md:flex-col max-md:p-6 max-md:gap-4
          max-md:border-b max-md:border-[var(--color-border)]/50
          max-md:transition-all max-md:duration-300
          ${isMobileMenuOpen
            ? 'max-md:translate-y-0 max-md:opacity-100 max-md:pointer-events-auto'
            : 'max-md:-translate-y-full max-md:opacity-0 max-md:pointer-events-none'}
        `}>
          {/* Features Dropdown with Framer Motion */}
          <MotionConfig transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}>
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <button
                className={`${getNavButtonClass('features')} flex items-center gap-1`}
              >
                <span>Features</span>
                <motion.div
                  animate={{ rotate: isFeaturesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
                {activeSection === 'features' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
                )}
              </button>

              {/* Animated Dropdown Menu */}
              <AnimatePresence mode="popLayout">
                {isFeaturesOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 w-[520px] bg-[var(--color-bg-elevated)] backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden max-md:relative max-md:left-0 max-md:w-full max-md:mt-2"
                    style={{ x: 'calc(-50% + 40px)' }}
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  >
                    {/* Header */}
                    <motion.div 
                      className="px-5 py-3 border-b border-[var(--color-border)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.span 
                        layoutId="features-text"
                        className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
                      >
                        Features
                      </motion.span>
                    </motion.div>
                    
                    {/* Grid Layout with staggered icon animations */}
                    <div className="p-3 grid grid-cols-2 gap-1 max-md:grid-cols-1">
                      {featureItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          onClick={() => scrollToFeatureItem(item.id)}
                          className="flex items-start gap-3 p-3 rounded-xl text-left hover:bg-[var(--color-bg-tertiary)] bg-transparent border-none cursor-pointer group"
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                          }}
                          exit={{ 
                            opacity: 0, 
                            scale: 0.5, 
                            y: -10 
                          }}
                          transition={{ 
                            delay: index * 0.05,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:shadow-lg"
                            style={{ 
                              backgroundColor: `${item.color}15`, 
                              color: item.color,
                              boxShadow: `0 0 0 1px ${item.color}30`
                            }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: index * 0.05 + 0.1,
                              duration: 0.5,
                              type: "spring",
                              stiffness: 300,
                              damping: 20
                            }}
                            whileHover={{ scale: 1.15, rotate: 5 }}
                          >
                            <item.icon size={18} />
                          </motion.div>
                          <motion.div 
                            className="flex flex-col gap-0.5 min-w-0"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.15, duration: 0.3 }}
                          >
                            <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                              {item.title}
                            </span>
                            <span className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                              Explore this feature
                            </span>
                          </motion.div>
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <motion.div 
                      className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)]/50 rounded-b-2xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <motion.button 
                        onClick={() => scrollToSection('features')}
                        className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors bg-transparent border-none cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        View all features →
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </MotionConfig>

          {/* Demo */}
          <button onClick={() => scrollToSection('demo')} className={getNavButtonClass('demo')}>
            Demo
            {activeSection === 'demo' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
            )}
          </button>

          {/* Product Tour */}
          <button onClick={() => scrollToSection('product-tour')} className={getNavButtonClass('product-tour')}>
            Product Tour
            {activeSection === 'product-tour' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
            )}
          </button>

          {/* Enterprise */}
          <button onClick={() => scrollToSection('enterprise')} className={getNavButtonClass('enterprise')}>
            Enterprise
            {activeSection === 'enterprise' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
            )}
          </button>

          {/* About */}
          <button onClick={() => scrollToSection('about')} className={getNavButtonClass('about')}>
            About
            {activeSection === 'about' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
            )}
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={onAuthClick} className="btn btn-primary py-1 px-4 text-[13px] max-md:hidden">
            Get Started
          </button>
          <button
            className="hidden max-md:flex text-[var(--color-text-primary)] bg-transparent border-none cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
