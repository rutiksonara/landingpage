import { ArrowRight, Play } from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onAuthClick: () => void;
  onDemoClick: () => void;
}

export default function Hero({ onAuthClick, onDemoClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            AI-Powered PLM Platform
          </div>
          
          <h1 className="hero__title">
            Design Faster.
            <br />
            Iterate Less.
          </h1>
          
          <p className="hero__description">
            CloudCadAI is a complete PLM solution with AI at the forefront. 
            Enable rapid prototyping, reduce engineering iterations, and 
            accelerate your path from concept to production.
          </p>
          
          <div className="hero__actions">
            <button onClick={onAuthClick} className="btn btn-primary hero__cta">
              Start Designing
              <ArrowRight size={16} />
            </button>
            <button onClick={onDemoClick} className="btn btn-secondary hero__cta">
              <Play size={16} />
              Watch Demo
            </button>
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">10x</span>
              <span className="hero__stat-label">Faster Prototyping</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">60%</span>
              <span className="hero__stat-label">Fewer Iterations</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">24/7</span>
              <span className="hero__stat-label">Cloud Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
