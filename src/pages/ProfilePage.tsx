import React from 'react';
import {
  CheckCircle2,
  Compass,
  Gauge,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Translations } from '../data/i18n';
import { AuthenticatedUser, Language } from '../types/relaybus';

interface ProfilePageProps {
  t: Translations;
  lang: Language;
  user: AuthenticatedUser;
  onLogout: () => void;
  onTestUnauthorizedRoute: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  t,
  lang,
  user,
  onLogout,
  onTestUnauthorizedRoute,
}) => {
  const isTraveler = user.role === 'traveler';
  const permissions = isTraveler
    ? t.profile.travelerPermissions
    : t.profile.operatorPermissions;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${
              isTraveler ? 'bg-[#167A5B]' : 'bg-[#24332E]'
            }`}
          >
            {isTraveler ? (
              <Compass className="w-6 h-6" />
            ) : (
              <Gauge className="w-6 h-6" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#24332E]">
              {isTraveler ? t.profile.travelerTitle : t.profile.operatorTitle}
            </h1>
            <p className="text-sm text-[#75847D]">{t.profile.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="h-10 px-4 rounded-xl border border-[#E1E9E4] bg-white hover:border-[#DC2626] hover:text-[#DC2626] text-xs sm:text-sm font-semibold text-[#24332E] inline-flex items-center gap-2 self-start cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.profile.logoutBtn}</span>
        </button>
      </div>

      {/* Active Session Details */}
      <section className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#24332E]">
          <User className="w-4 h-4 text-[#167A5B]" />
          <span>{t.profile.accountDetailsTitle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4]">
            <div className="text-xs text-[#75847D]">{t.profile.nameLabel}</div>
            <div className="font-semibold text-[#24332E] mt-0.5">
              {user.name[lang]}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4]">
            <div className="text-xs text-[#75847D]">{t.profile.emailLabel}</div>
            <div className="font-mono-tabular font-semibold text-[#24332E] mt-0.5" dir="ltr">
              {user.email}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4]">
            <div className="text-xs text-[#75847D]">{t.profile.roleLabel}</div>
            <div className="font-semibold text-[#167A5B] mt-0.5">
              {isTraveler ? t.nav.roleTravelerBadge : t.nav.roleOperatorBadge}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4]">
            <div className="text-xs text-[#75847D]">{t.profile.sessionTypeLabel}</div>
            <div className="font-medium text-[#24332E] mt-0.5">
              {t.profile.demoSessionValue}
            </div>
          </div>

          {!isTraveler && user.organization && (
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E1E9E4]">
              <div className="text-xs text-[#75847D]">{t.profile.orgLabel}</div>
              <div className="font-semibold text-[#24332E] mt-0.5">
                {user.organization[lang]}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Granted Permissions & Role Isolation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#167A5B]">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.profile.permissionsTitle}</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#24332E]">
            {permissions.map((perm) => (
              <li key={perm} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
                <span>{perm}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-4">
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-[#24332E]">
              {t.profile.restrictedNoticeTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#75847D] leading-relaxed">
              {isTraveler
                ? t.profile.travelerRestrictedNotice
                : t.profile.operatorRestrictedNotice}
            </p>
          </div>

          <div className="pt-3 border-t border-[#E1E9E4] space-y-2">
            <div className="text-xs font-bold text-[#24332E]">
              {t.profile.testGuardTitle}
            </div>
            <button
              type="button"
              onClick={() =>
                onTestUnauthorizedRoute(
                  isTraveler ? '/operator/gap-analysis' : '/traveler/explore'
                )
              }
              className="w-full h-9 px-3 rounded-lg border border-[#E1E9E4] hover:border-[#DC2626]/50 bg-[#F8FAF7] text-xs font-semibold text-[#24332E] cursor-pointer transition-colors text-start"
            >
              {isTraveler
                ? t.profile.testGuardTravelerBtn
                : t.profile.testGuardOperatorBtn}
            </button>
          </div>
        </section>
      </div>

      {/* Honest Backend Security Requirement Note */}
      <div className="rounded-xl bg-white border border-[#E1E9E4] p-4 flex items-start gap-3 text-xs sm:text-sm text-[#75847D]">
        <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-[#24332E]">
            {t.profile.backendNoticeTitle}
          </div>
          <p className="leading-relaxed">{t.profile.backendNoticeDesc}</p>
        </div>
      </div>
    </div>
  );
};
