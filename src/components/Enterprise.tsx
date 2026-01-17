import { Loader2, Building2 } from 'lucide-react';

export default function Enterprise() {
  return (
    <section id="enterprise" className="py-24 bg-[var(--color-bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
            Enterprise Solutions
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-text-primary)] mb-4">
            Enterprise
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-[600px] mx-auto">
            Powerful solutions for large-scale engineering teams
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-[600px] mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-12">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent)]/10 animate-pulse" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                Coming Soon
              </h3>
              
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-[400px]">
                We're building something special for enterprise teams. Advanced collaboration, 
                custom integrations, and dedicated support are on the way.
              </p>

              {/* Loading indicator */}
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--color-accent)]" />
                <span className="text-sm font-medium">Loading enterprise features...</span>
              </div>

              {/* Skeleton content */}
              <div className="w-full mt-10 space-y-4">
                <div className="h-4 bg-[var(--color-border)] rounded-full w-full animate-pulse" />
                <div className="h-4 bg-[var(--color-border)] rounded-full w-4/5 animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="h-4 bg-[var(--color-border)] rounded-full w-3/5 animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
