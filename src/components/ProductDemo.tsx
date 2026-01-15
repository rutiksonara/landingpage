import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import './ProductDemo.css';

export default function ProductDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // YouTube video ID placeholder - replace with actual video
  const videoId = 'dQw4w9WgXcQ'; // Placeholder

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Auto-play when 50% visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: [0.5] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;

  return (
    <section id="demo" className="demo section" ref={sectionRef}>
      <div className="container">
        <div className="demo__header">
          <span className="demo__label">Product Tour</span>
          <h2 className="demo__title">
            See <span className="gradient-text">CloudAICAD</span> in action
          </h2>
          <p className="demo__description">
            Watch how AI transforms the way you design. From natural language to production-ready models in minutes.
          </p>
        </div>

        <div className="demo__video-wrapper">
          <div className="demo__video-container">
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title="CloudAICAD Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="demo__iframe"
            />
            
            <div className="demo__overlay">
              <div className="demo__controls">
                <button 
                  onClick={togglePlay}
                  className="demo__control-btn demo__control-btn--play"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
              </div>
              
              <div className="demo__bottom-controls">
                <button 
                  onClick={toggleMute}
                  className="demo__control-btn"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo__control-btn"
                  aria-label="Open in fullscreen"
                >
                  <Maximize size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="demo__glow" />
        </div>

        <p className="demo__caption">
          Experience the future of product design. Replace placeholder video ID with your demo.
        </p>
      </div>
    </section>
  );
}
