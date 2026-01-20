import { useState, useEffect, forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { ArrowRight, Loader2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroEngine3D from './HeroEngine3D';

interface HeroProps {
  onDemoClick: () => void;
}

export interface HeroRef {
  focusEmailInput: () => void;
}

const Hero = forwardRef<HeroRef, HeroProps>(({ onDemoClick: _onDemoClick }, ref) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Track mouse position for spotlight effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

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
    // Focus OTP input after transition
    setTimeout(() => {
      otpInputRef.current?.focus();
    }, 300);
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
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 300);
  };

  // Animation variants for smooth morph transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Mouse-following spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--grid-glow-color), transparent 40%)`,
          opacity: mousePosition.x > 0 || mousePosition.y > 0 ? 1 : 0,
        }}
      />
      {/* Static gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.1), transparent)',
        }}
      />
      <div className="max-w-[1200px] mx-auto py-16 px-6 relative z-10">
        {/* Two-column layout: Text left, Engine right */}
        <div className="flex items-center gap-8 max-lg:flex-col max-lg:text-center">
          {/* Left column: Text content */}
          <div className="flex-1 max-w-[600px] max-lg:max-w-full">

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

            {/* Email/OTP Form Container with AnimatePresence for morph transitions */}
            <div
              id="signup-form"
              className="mb-16"
              style={{ minHeight: '80px' }}
            >
              <AnimatePresence mode="wait">
                {step === 'email' ? (
                  <motion.form
                    key="email-form"
                    onSubmit={handleEmailSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative"
                  >
                    <div className="relative flex items-center max-w-[400px]">
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-5 py-3.5 pr-14 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all text-[15px]"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading || !email.trim()}
                        className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoading ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <ArrowRight size={22} strokeWidth={2.5} />
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="otp-form"
                    onSubmit={handleOtpSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.p
                      className="text-sm text-[var(--color-text-muted)] mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      We sent a code to <span className="text-[var(--color-text-primary)] font-medium">{email}</span>
                    </motion.p>

                    <div className="relative flex items-center max-w-[400px]">
                      <input
                        ref={otpInputRef}
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-5 py-3.5 pr-14 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all tracking-[0.3em] text-center font-mono text-[15px]"
                        maxLength={6}
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoading ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <ArrowRight size={22} strokeWidth={2.5} />
                        )}
                      </motion.button>
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1 mt-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors bg-transparent border-none cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ x: -3 }}
                    >
                      <ChevronLeft size={14} />
                      Back
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
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

          {/* Right column: Interactive 3D Engine */}
          <motion.div
            className="flex-1 flex items-center justify-center max-lg:mt-8 min-h-[400px] max-lg:min-h-[350px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[550px] aspect-square">
              {/* Glow effect behind 3D model */}
              <div
                className="absolute inset-0 blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(34, 211, 238, 0.2) 50%, transparent 70%)',
                }}
              />
              <HeroEngine3D />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;

