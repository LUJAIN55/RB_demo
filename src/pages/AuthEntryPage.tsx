import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Gauge,
  Globe,
  Info,
  Lock,
  Mail,
  ShieldAlert,
  User,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { Translations } from '../data/i18n';
import { DEMO_ACCOUNTS } from '../data/mockAuth';
import { AuthenticatedUser, Language, UserRole } from '../types/relaybus';

interface AuthEntryPageProps {
  t: Translations;
  lang: Language;
  onToggleLang: () => void;
  onAuthenticate: (user: AuthenticatedUser) => void;
  pendingProtectedPath?: string | null;
}

export const AuthEntryPage: React.FC<AuthEntryPageProps> = ({
  t,
  lang,
  onToggleLang,
  onAuthenticate,
  pendingProtectedPath,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('traveler');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const DirectionalArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setError('');
    setShowForgotNotice(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError(t.auth.invalidEmail);
      return;
    }

    if (password.length < 6) {
      setError(t.auth.shortPassword);
      return;
    }

    if (authMode === 'register' && fullName.trim().length < 2) {
      setError(
        lang === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.'
      );
      return;
    }

    if (
      authMode === 'register' &&
      selectedRole === 'operator' &&
      organization.trim().length < 2
    ) {
      setError(t.authEntry.missingOrgError);
      return;
    }

    const displayName =
      authMode === 'register'
        ? fullName.trim()
        : trimmedEmail.split('@')[0] || (selectedRole === 'traveler' ? 'Traveler' : 'Operator');

    const user: AuthenticatedUser = {
      id: `demo-${selectedRole}-${Date.now()}`,
      name: {
        ar: displayName,
        en: displayName,
      },
      email: trimmedEmail,
      role: selectedRole,
      organization:
        selectedRole === 'operator'
          ? {
              ar: organization.trim() || 'مشغل نقل شريك (عرض تجريبي)',
              en: organization.trim() || 'Partner Transport Operator (Demo)',
            }
          : undefined,
      preferredCityId: selectedRole === 'traveler' ? 'dammam' : undefined,
      isDemo: true,
    };

    onAuthenticate(user);
  };

  const handleDemoLogin = (role: UserRole) => {
    onAuthenticate(DEMO_ACCOUNTS[role]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#24332E] flex flex-col">
      {/* Minimal Header with Brand Logo & Language Switcher */}
      <header className="bg-white border-b border-[#E1E9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center py-1">
            <BrandLogo className="h-8 sm:h-10 w-auto" alt={t.brandName} />
          </div>

          <button
            type="button"
            onClick={onToggleLang}
            className="h-9 px-3.5 rounded-lg border border-[#E1E9E4] hover:border-[#167A5B]/40 text-xs font-semibold text-[#24332E] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#167A5B]" />
            <span>{t.nav.switchLang}</span>
          </button>
        </div>
      </header>

      {/* Main Entry Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Welcome Heading */}
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold text-[#167A5B]">
            {t.hero.kicker}
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#24332E] text-balance">
            {t.authEntry.welcomeTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#75847D] leading-relaxed">
            {t.authEntry.welcomeSubtitle}
          </p>
        </div>

        {/* Notice if user hit a protected route directly while signed out */}
        {pendingProtectedPath && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#B7E4D2] text-xs sm:text-sm text-[#24332E]">
            <Lock className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
            <div>
              <span>{t.authEntry.routeAuthRequiredNotice} </span>
              <span className="font-mono-tabular text-xs text-[#167A5B]" dir="ltr">
                ({pendingProtectedPath})
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Account Type Selection + Login/Registration Form */}
          <section className="lg:col-span-7 bg-white rounded-2xl border border-[#E1E9E4] p-6 sm:p-7 space-y-6">
            {/* Step 1: Select Account Type */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-[#24332E]">
                {t.authEntry.selectRoleLabel}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange('traveler')}
                  className={`text-start p-4 rounded-xl border transition-colors cursor-pointer ${
                    selectedRole === 'traveler'
                      ? 'bg-[#F0F7F4] border-[#167A5B] ring-1 ring-[#167A5B]'
                      : 'bg-[#F8FAF7] border-[#E1E9E4] hover:border-[#167A5B]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-9 h-9 rounded-lg bg-white border border-[#E1E9E4] flex items-center justify-center text-[#167A5B]">
                      <Compass className="w-4 h-4" />
                    </span>
                    {selectedRole === 'traveler' && (
                      <CheckCircle2 className="w-4 h-4 text-[#167A5B]" />
                    )}
                  </div>
                  <div className="text-sm font-bold text-[#24332E]">
                    {t.authEntry.travelerRoleTitle}
                  </div>
                  <p className="text-xs text-[#75847D] mt-1 leading-relaxed">
                    {t.authEntry.travelerRoleDesc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('operator')}
                  className={`text-start p-4 rounded-xl border transition-colors cursor-pointer ${
                    selectedRole === 'operator'
                      ? 'bg-[#F0F7F4] border-[#167A5B] ring-1 ring-[#167A5B]'
                      : 'bg-[#F8FAF7] border-[#E1E9E4] hover:border-[#167A5B]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-9 h-9 rounded-lg bg-white border border-[#E1E9E4] flex items-center justify-center text-[#24332E]">
                      <Gauge className="w-4 h-4" />
                    </span>
                    {selectedRole === 'operator' && (
                      <CheckCircle2 className="w-4 h-4 text-[#167A5B]" />
                    )}
                  </div>
                  <div className="text-sm font-bold text-[#24332E]">
                    {t.authEntry.operatorRoleTitle}
                  </div>
                  <p className="text-xs text-[#75847D] mt-1 leading-relaxed">
                    {t.authEntry.operatorRoleDesc}
                  </p>
                </button>
              </div>
            </div>

            {/* Login / Register Mode Switch */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4]">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                }}
                className={`h-9 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-[#167A5B] border border-[#E1E9E4]'
                    : 'text-[#75847D] hover:text-[#24332E]'
                }`}
              >
                {t.authEntry.tabLogin}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                }}
                className={`h-9 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-[#167A5B] border border-[#E1E9E4]'
                    : 'text-[#75847D] hover:text-[#24332E]'
                }`}
              >
                {t.authEntry.tabRegister}
              </button>
            </div>

            {/* Role-Specific Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#24332E] mb-1.5">
                    {t.authEntry.nameLabel}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={
                        selectedRole === 'traveler'
                          ? lang === 'ar'
                            ? 'سلمان العتيبي'
                            : 'Salman Al-Otaibi'
                          : lang === 'ar'
                          ? 'م. نورة القحطاني'
                          : 'Eng. Noura Al-Qahtani'
                      }
                      className="w-full h-11 ps-10 pe-3.5 rounded-xl border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                    />
                  </div>
                </div>
              )}

              {authMode === 'register' && selectedRole === 'operator' && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#24332E] mb-1.5">
                    {t.authEntry.orgLabel}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={t.authEntry.orgPlaceholder}
                      className="w-full h-11 ps-10 pe-3.5 rounded-xl border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#24332E] mb-1.5">
                  {t.authEntry.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      selectedRole === 'traveler'
                        ? 'traveler.demo@relaybus.sa'
                        : 'operator.demo@relaybus.sa'
                    }
                    dir="ltr"
                    className="w-full h-11 ps-10 pe-3.5 rounded-xl border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-medium text-[#24332E]">
                    {t.authEntry.passwordLabel}
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotNotice((prev) => !prev)}
                      className="text-xs font-medium text-[#167A5B] hover:underline cursor-pointer"
                    >
                      {t.authEntry.forgotPasswordLink}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    dir="ltr"
                    className="w-full h-11 ps-10 pe-3.5 rounded-xl border border-[#E1E9E4] bg-white text-sm text-[#24332E] focus:outline-none focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
                  />
                </div>
              </div>

              {showForgotNotice && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4] text-xs text-[#75847D] leading-relaxed">
                  <Info className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
                  <span>{t.authEntry.forgotPasswordNotice}</span>
                </div>
              )}

              {error && (
                <p className="text-xs font-medium text-[#DC2626]" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>
                  {authMode === 'login'
                    ? selectedRole === 'traveler'
                      ? t.authEntry.loginBtnTraveler
                      : t.authEntry.loginBtnOperator
                    : selectedRole === 'traveler'
                    ? t.authEntry.registerBtnTraveler
                    : t.authEntry.registerBtnOperator}
                </span>
                <DirectionalArrow className="w-4 h-4" />
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'));
                  }}
                  className="text-xs font-medium text-[#167A5B] hover:underline cursor-pointer"
                >
                  {authMode === 'login'
                    ? t.authEntry.switchToRegister
                    : t.authEntry.switchToLogin}
                </button>
              </div>
            </form>
          </section>

          {/* Column 2: Clearly Labeled Demo Accounts for Jury Presentation */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#167A5B]">
                  {t.authEntry.demoSectionTitle}
                </div>
                <p className="text-xs text-[#75847D] leading-relaxed">
                  {t.authEntry.demoSectionSubtitle}
                </p>
              </div>

              {/* Demo Traveler Account Card */}
              <div className="rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-[#167A5B] text-white flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[#24332E]">
                        {t.authEntry.demoTravelerCardTitle}
                      </h2>
                      <div className="text-[11px] font-mono-tabular text-[#75847D]" dir="ltr">
                        {DEMO_ACCOUNTS.traveler.email}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#75847D] leading-relaxed">
                  {t.authEntry.demoTravelerCardDesc}
                </p>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('traveler')}
                  className="w-full h-10 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{t.authEntry.demoTravelerBtn}</span>
                  <DirectionalArrow className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Demo Operator Account Card */}
              <div className="rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-[#24332E] text-white flex items-center justify-center shrink-0">
                      <Gauge className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[#24332E]">
                        {t.authEntry.demoOperatorCardTitle}
                      </h2>
                      <div className="text-[11px] font-mono-tabular text-[#75847D]" dir="ltr">
                        {DEMO_ACCOUNTS.operator.email}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#75847D] leading-relaxed">
                  {t.authEntry.demoOperatorCardDesc}
                </p>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('operator')}
                  className="w-full h-10 rounded-xl bg-[#24332E] hover:bg-[#16221E] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{t.authEntry.demoOperatorBtn}</span>
                  <DirectionalArrow className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Honest Backend Authorization Disclaimer */}
            <div className="rounded-xl bg-white border border-[#E1E9E4] p-4 flex items-start gap-2.5 text-xs text-[#75847D] leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <span>{t.authEntry.securityDisclaimer}</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
