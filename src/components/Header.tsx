import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ChevronDown, Sparkles, Move3D, Users, FileOutput, MessageSquare, Globe, Zap } from 'lucide-react';

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
          {/* Features Dropdown */}
          <div 
            className="relative" 
            ref={dropdownRef}
            onMouseEnter={() => setIsFeaturesOpen(true)}
            onMouseLeave={() => setIsFeaturesOpen(false)}
          >
            <button
              className={`${getNavButtonClass('features')} flex items-center gap-1`}
            >
              Features
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`}
              />
              {activeSection === 'features' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
              )}
            </button>

            {/* Dropdown Menu - Enhanced Grid Layout */}
            <div className={`
              absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px]
              bg-[var(--color-bg-elevated)] backdrop-blur-xl
              border border-[var(--color-border)] rounded-2xl
              shadow-2xl shadow-black/30
              transition-all duration-150 origin-top
              max-md:relative max-md:left-0 max-md:translate-x-0 max-md:w-full max-md:mt-2
              ${isFeaturesOpen 
                ? 'opacity-100 scale-100 pointer-events-auto visible' 
                : 'opacity-0 scale-95 pointer-events-none invisible'}
            `}>
              {/* Header */}
              <div className="px-5 py-3 border-b border-[var(--color-border)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Features</span>
              </div>
              
              {/* Grid Layout */}
              <div className="p-3 grid grid-cols-2 gap-1 max-md:grid-cols-1">
                {featureItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToFeatureItem(item.id)}
                    className="flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-150 hover:bg-[var(--color-bg-tertiary)] bg-transparent border-none cursor-pointer group"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ 
                        backgroundColor: `${item.color}15`, 
                        color: item.color,
                        boxShadow: `0 0 0 1px ${item.color}30`
                      }}
                    >
                      <item.icon size={18} />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                        {item.title}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                        Explore this feature
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Footer */}
              <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)]/50 rounded-b-2xl">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors bg-transparent border-none cursor-pointer"
                >
                  View all features →
                </button>
              </div>
            </div>
          </div>

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
