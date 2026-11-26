import React from 'react';
import { ArrowLeft, ArrowRight, LogOut, ShieldAlert } from 'lucide-react';
import { Translations } from '../data/i18n';
import { Language, UserRole } from '../types/relaybus';

interface AccessDeniedPageProps {
  t: Translations;
  lang: Language;
  activeRole: UserRole;
  attemptedPath: string;
  onReturnToPortal: () => void;
  onLogout: () => void;
}

export const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({
  t,
  lang,
  activeRole,
  attemptedPath,
  onReturnToPortal,
  onLogout,
}) => {
  const DirectionalArrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const requiredRole: UserRole =
    activeRole === 'traveler' ? 'operator' : 'traveler';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="bg-white rounded-2xl border border-[#E1E9E4] p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[#DC2626]">
              {t.accessDenied.badge}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#24332E]">
              {t.accessDenied.title}
            </h1>
            <p className="text-sm text-[#75847D] leading-relaxed">
              {t.accessDenied.desc}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F8FAF7] border border-[#E1E9E4] p-4 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#75847D]">{t.accessDenied.attemptedRouteLabel}</span>
            <span className="font-mono-tabular font-semibold text-[#DC2626]" dir="ltr">
              {attemptedPath}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#75847D]">{t.accessDenied.activeRoleLabel}</span>
            <span className="font-semibold text-[#24332E]">
              {activeRole === 'traveler'
                ? t.nav.roleTravelerBadge
                : t.nav.roleOperatorBadge}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#75847D]">{t.accessDenied.requiredRoleLabel}</span>
            <span className="font-semibold text-[#167A5B]">
              {requiredRole === 'traveler'
                ? t.nav.roleTravelerBadge
                : t.nav.roleOperatorBadge}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#75847D] leading-relaxed border-t border-[#E1E9E4] pt-4">
          {t.accessDenied.securityNote}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onReturnToPortal}
            className="flex-1 h-11 px-5 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>{t.accessDenied.backToPortalBtn}</span>
            <DirectionalArrow className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="h-11 px-5 rounded-xl border border-[#E1E9E4] hover:border-[#167A5B] text-[#24332E] text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#75847D]" />
            <span>{t.accessDenied.logoutSwitchBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
