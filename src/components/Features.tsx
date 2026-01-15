import { useRef, useEffect, useState } from "react";
import {
  Sparkles,
  Users,
  FileOutput,
  MessageSquare,
  Globe,
  Zap,
  Move3D,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./Features.css";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "ai-geometry",
    icon: Sparkles,
    title: "AI Geometry Generation",
    description:
      "Transform natural language descriptions into precise 3D models. Simply describe what you need, and watch AI bring your vision to life with geometric accuracy.",
  },
  {
    id: "direct-modeling",
    icon: Move3D,
    title: "Direct Modeling",
    description:
      "Push, pull, and manipulate geometry directly without complex feature trees. Intuitive direct editing gives you immediate feedback and complete creative freedom.",
  },
  {
    id: "collaboration",
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with cloud-based design sessions. Multiple engineers can iterate on the same model simultaneously, accelerating your workflow.",
  },
  {
    id: "export",
    icon: FileOutput,
    title: "Multi-format Export",
    description:
      "Export your designs in industry-standard formats including STEP, BREP, and STL. Compatible with your existing manufacturing and simulation toolchain.",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat-driven Modeling",
    description:
      "Conversational design interface that understands engineering intent. Modify, refine, and perfect your models through natural dialogue.",
  },
  {
    id: "cross-platform",
    icon: Globe,
    title: "Cross-platform Access",
    description:
      "Browser-based accessibility means you can design from anywhere. No installation required—just open your browser and start creating.",
  },
  {
    id: "rapid-prototyping",
    icon: Zap,
    title: "AI-Driven Rapid Prototyping",
    description:
      "Reduce engineering iterations dramatically with AI-assisted design validation. Go from concept to production-ready designs in a fraction of the time.",
  },
];

interface FeatureSectionProps {
  feature: Feature;
  index: number;
  isActive: boolean;
}

function FeatureSection({ feature, index, isActive }: FeatureSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`feature-section ${isActive ? "feature-section--active" : ""}`}
      data-feature-id={feature.id}
    >
      <div
        className={`feature-section__inner ${
          isEven ? "" : "feature-section__inner--reverse"
        }`}
      >
        {/* Text Content */}
        <div className="feature-section__content">
          <div className="feature-section__text">
            <div className="feature-section__icon">
              <feature.icon size={22} />
            </div>
            <h3 className="feature-section__title">{feature.title}</h3>
            <p className="feature-section__description">
              {feature.description}
            </p>
          </div>
        </div>

        {/* 3D Model Placeholder */}
        <div className="feature-section__visual">
          <div className="feature-section__model-placeholder">
            <div className="feature-section__model-area">
              {/* Placeholder indicator */}
              <div className="feature-section__placeholder-content">
                <feature.icon size={48} strokeWidth={1} />
                <span>3D Model Area</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll(".feature-section");

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;

        // Check if section is near the center of viewport
        if (Math.abs(sectionCenter - viewportCenter) < rect.height / 3) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="features" className="features">
      <div className="features__header">
        <div className="container">
          <span className="features__label">Capabilities</span>
          <h2 className="features__title">
            Everything you need for
            <br />
            modern product design
          </h2>
        </div>
      </div>

      <div className="features__sections" ref={containerRef}>
        {features.map((feature, index) => (
          <FeatureSection
            key={feature.id}
            feature={feature}
            index={index}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}
