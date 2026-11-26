import React, { useState } from 'react';
import { X, CheckCircle2, Info } from 'lucide-react';
import { Translations } from '../data/i18n';
import { Language } from '../types/relaybus';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
  t: Translations;
  lang: Language;
  onDemoAuthSuccess: (displayName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
  t,
  lang,
  onDemoAuthSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(t.auth.invalidEmail);
      return;
    }
    if (password.length < 6) {
      setError(t.auth.shortPassword);
      return;
    }
    if (mode === 'signup' && name.trim().length < 2) {
      setError(lang === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.');
      return;
    }

    setSubmitted(true);
    const resolvedName = mode === 'signup' ? name.trim() : email.split('@')[0];
    setTimeout(() => {
      onDemoAuthSuccess(resolvedName);
      setSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#16221E]/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E1E9E4] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E9E4]">
          <h2 id="auth-modal-title" className="text-lg font-semibold text-[#24332E]">
            {mode === 'login' ? t.auth.loginTitle : t.auth.signupTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#75847D] hover:text-[#24332E] hover:bg-[#F8FAF7] transition-colors focus-visible:outline-2 focus-visible:outline-[#167A5B]"
            aria-label={t.nav.closeMenu}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAF7] border border-[#E1E9E4] text-xs text-[#75847D]">
            <Info className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
            <span>{t.auth.demoNotice}</span>
          </div>

          {submitted ? (
            <div className="py-6 flex flex-col items-center text-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-[#167A5B]" />
              <p className="text-sm font-medium text-[#24332E]">
                {mode === 'login' ? t.auth.successLogin : t.auth.successSignup}
              </p>
            </div>
          ) : (
            <>
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-[#24332E] mb-1.5">
                    {t.auth.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'ar' ? 'سلمان العتيبي' : 'Salman Al-Otaibi'}
                    className="w-full h-11 px-3.5 rounded-lg border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#24332E] mb-1.5">
                  {t.auth.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@relaybus.sa"
                  dir="ltr"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#24332E] mb-1.5">
                  {t.auth.passwordLabel}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-[#DC2626]" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                {mode === 'login' ? t.auth.submitLogin : t.auth.submitSignup}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    onSwitchMode(mode === 'login' ? 'signup' : 'login');
                  }}
                  className="text-xs font-medium text-[#167A5B] hover:underline cursor-pointer"
                >
                  {mode === 'login' ? t.auth.switchToSignup : t.auth.switchToLogin}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
