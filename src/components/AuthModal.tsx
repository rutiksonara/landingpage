import { useState, FormEvent } from 'react';
import { X, ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import OTPInput from './OTPInput';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'email' | 'otp' | 'success';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - replace with actual Firebase function call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // TODO: Call Firebase Cloud Function to send OTP
      // await sendOTPEmail(email);
      setStep('otp');
    } catch {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // TODO: Verify OTP with Firebase
      // await verifyOTP(email, otpString);
      setStep('success');
    } catch {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp(Array(6).fill(''));
    setError('');
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setOtp(Array(6).fill(''));
    setError('');
    onClose();
  };

  return (
    <div className="auth-modal__overlay" onClick={handleClose}>
      <div className="auth-modal glass-card" onClick={e => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="auth-modal__content">
            <div className="auth-modal__icon">
              <Mail size={28} />
            </div>
            <h2 className="auth-modal__title">Get Started</h2>
            <p className="auth-modal__description">
              Enter your email to receive a 6-digit verification code.
            </p>
            
            <div className="auth-modal__input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="auth-modal__input"
                disabled={isLoading}
                autoFocus
              />
            </div>

            {error && <p className="auth-modal__error">{error}</p>}

            <button 
              type="submit" 
              className="btn btn-primary auth-modal__submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="auth-modal__spinner" />
                  Sending...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOTPSubmit} className="auth-modal__content">
            <button 
              type="button" 
              className="auth-modal__back" 
              onClick={handleBack}
              disabled={isLoading}
            >
              <ArrowLeft size={18} />
              Back
            </button>
            
            <h2 className="auth-modal__title">Check your email</h2>
            <p className="auth-modal__description">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
            
            <OTPInput 
              value={otp} 
              onChange={setOtp} 
              disabled={isLoading}
            />

            {error && <p className="auth-modal__error">{error}</p>}

            <button 
              type="submit" 
              className="btn btn-primary auth-modal__submit"
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="auth-modal__spinner" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </button>

            <button type="button" className="auth-modal__resend" disabled={isLoading}>
              Didn't receive a code? <span>Resend</span>
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="auth-modal__content auth-modal__content--success">
            <div className="auth-modal__success-icon">
              <CheckCircle size={48} />
            </div>
            <h2 className="auth-modal__title">You're in!</h2>
            <p className="auth-modal__description">
              Welcome to CloudAICAD. Your account has been verified.
            </p>
            <button onClick={handleClose} className="btn btn-primary auth-modal__submit">
              Start Designing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
