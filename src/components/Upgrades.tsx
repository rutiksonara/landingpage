import { Zap, Crown, Rocket } from 'lucide-react';

interface UpgradeOption {
  icon: typeof Zap;
  title: string;
  description: string;
  features: string[];
  price: string;
  period: string;
  highlighted?: boolean;
}

const upgradeOptions: UpgradeOption[] = [
  {
    icon: Zap,
    title: "Pro",
    description: "For individual professionals",
    features: [
      "Unlimited AI generations",
      "Priority rendering",
      "All export formats",
      "Email support"
    ],
    price: "$29",
    period: "/month"
  },
  {
    icon: Crown,
    title: "Team",
    description: "For small to medium teams",
    features: [
      "Everything in Pro",
      "Real-time collaboration",
      "Team management",
      "API access",
      "Priority support"
    ],
    price: "$79",
    period: "/user/month",
    highlighted: true
  },
  {
    icon: Rocket,
    title: "Enterprise",
    description: "For large organizations",
    features: [
      "Everything in Team",
      "Custom integrations",
      "Dedicated support",
      "SSO & security",
      "Custom contracts"
    ],
    price: "Custom",
    period: ""
  }
];

export default function Upgrades() {
  return (
    <section id="upgrades" className="py-24 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
            Pricing
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-text-primary)] mb-4">
            Upgrade Your Experience
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-[600px] mx-auto">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upgradeOptions.map((option) => (
            <div
              key={option.title}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                option.highlighted
                  ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25'
                  : 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)]'
              }`}
            >
              {option.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-[var(--color-accent)] text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                option.highlighted ? 'bg-white/20' : 'bg-[var(--color-accent)]/10'
              }`}>
                <option.icon className={`w-6 h-6 ${option.highlighted ? 'text-white' : 'text-[var(--color-accent)]'}`} />
              </div>

              <h3 className={`text-xl font-semibold mb-2 ${
                option.highlighted ? 'text-white' : 'text-[var(--color-text-primary)]'
              }`}>
                {option.title}
              </h3>

              <p className={`text-sm mb-6 ${
                option.highlighted ? 'text-white/80' : 'text-[var(--color-text-secondary)]'
              }`}>
                {option.description}
              </p>

              <div className="mb-6">
                <span className={`text-3xl font-bold ${
                  option.highlighted ? 'text-white' : 'text-[var(--color-text-primary)]'
                }`}>
                  {option.price}
                </span>
                <span className={`text-sm ${
                  option.highlighted ? 'text-white/70' : 'text-[var(--color-text-muted)]'
                }`}>
                  {option.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-2 text-sm ${
                    option.highlighted ? 'text-white/90' : 'text-[var(--color-text-secondary)]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      option.highlighted ? 'bg-white' : 'bg-[var(--color-accent)]'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                option.highlighted
                  ? 'bg-white text-[var(--color-accent)] hover:bg-white/90'
                  : 'border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
