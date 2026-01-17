import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { ArrowRight, Play, Loader2, ChevronLeft } from 'lucide-react';

interface HeroProps {
  onDemoClick: () => void;
}

export interface HeroRef {
  focusEmailInput: () => void;
}

const Hero = forwardRef<HeroRef, HeroProps>(({ onDemoClick }, ref) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Expose method to focus email input from parent
  useImperativeHandle(ref, () => ({
    focusEmailInput: () => {
      if (step !== 'email') {
        setStep('email');
      }
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }));

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    setStep('otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    // TODO: Handle successful verification
    console.log('OTP verified for:', email);
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1200px] mx-auto py-16 px-6 relative z-10">
        {/*Hero section starts here*/}
        <div className="max-w-[640px]">  

          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6">
            Design Faster.
            <br />
            Iterate Less.
          </h1>

          <p className="text-[17px] leading-[1.7] max-w-[520px] mb-12 text-[var(--color-text-secondary)]">
            CloudCadAI is a complete PLM solution with AI at the forefront.
            Enable rapid prototyping, reduce engineering iterations, and
            accelerate your path from concept to production.
          </p>

          <div className="flex flex-wrap gap-3 mb-16 items-start">
            {/* Email/OTP Form Container */}
            <div 
              id="signup-form"
              className="relative overflow-hidden"
              style={{ minWidth: '320px' }}
            >
              {/* Email Step */}
              <form 
                onSubmit={handleEmailSubmit}
                className={`flex gap-2 transition-all duration-300 ease-out ${
                  step === 'email' 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !email.trim()}
                  className="btn btn-primary py-2.5 px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Next
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* OTP Step */}
              <form 
                onSubmit={handleOtpSubmit}
                className={`transition-all duration-300 ease-out ${
                  step === 'otp' 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  We sent a code to <span className="text-[var(--color-text-primary)] font-medium">{email}</span>
                </p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all tracking-widest text-center font-mono"
                    maxLength={6}
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading || otp.length !== 6}
                    className="btn btn-primary py-2.5 px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
                <button 
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors bg-transparent border-none cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  Back
                </button>
              </form>
            </div>

            {/* Watch Demo Button */}
            <button onClick={onDemoClick} className="btn btn-secondary py-2.5 px-6">
              <Play size={16} />
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[var(--color-border)] max-sm:gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">10x</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">Faster Prototyping</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)] max-sm:hidden" />
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">60%</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">Fewer Iterations</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)] max-sm:hidden" />
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">24/7</span>
              <span className="text-[13px] text-[var(--color-text-muted)]">Cloud Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
