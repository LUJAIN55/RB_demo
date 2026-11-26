import React, { useState } from 'react';
import {
  Compass,
  Gauge,
  Globe,
  LogOut,
  Menu,
  User,
  X,
} from 'lucide-react';
import { Translations } from '../data/i18n';
import { BrandLogo } from './BrandLogo';
import {
  AuthenticatedUser,
  Language,
  OpsSection,
  PageId,
} from '../types/relaybus';

interface NavbarProps {
  user: AuthenticatedUser;
  currentPage: PageId;
  activeOpsSection: OpsSection;
  onNavigate: (page: PageId, opsSection?: OpsSection) => void;
  lang: Language;
  onToggleLang: () => void;
  t: Translations;
  onLogout: () => void;
}

interface RoleNavItem {
  key: string;
  page: PageId;
  opsSection?: OpsSection;
  label: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentPage,
  activeOpsSection,
  onNavigate,
  lang,
  onToggleLang,
  t,
  onLogout,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isTraveler = user.role === 'traveler';

  const navItems: RoleNavItem[] = isTraveler
    ? [
        { key: 'home', page: 'home', label: t.nav.home },
        { key: 'search', page: 'search', label: t.nav.explore },
        { key: 'assistant', page: 'assistant', label: t.nav.assistant },
        { key: 'profile', page: 'traveler-profile', label: t.nav.travelerProfile },
      ]
    : [
        {
          key: 'op-overview',
          page: 'operations',
          opsSection: 'overview',
          label: t.nav.opOverview,
        },
        {
          key: 'op-schedules',
          page: 'operations',
          opsSection: 'connections',
          label: t.nav.opSchedules,
        },
        {
          key: 'op-gap',
          page: 'operations',
          opsSection: 'gap-analysis',
          label: t.nav.opGapAnalysis,
        },
        {
          key: 'op-opt',
          page: 'operations',
          opsSection: 'optimization',
          label: t.nav.opOptimization,
        },
        {
          key: 'op-analytics',
          page: 'operations',
          opsSection: 'analytics',
          label: t.nav.opAnalytics,
        },
        {
          key: 'op-profile',
          page: 'operator-profile',
          label: t.nav.operatorProfile,
        },
      ];

  const isItemActive = (item: RoleNavItem) => {
    if (isTraveler) {
      return (
        currentPage === item.page ||
        (currentPage === 'details' && item.page === 'search')
      );
    }
    if (item.page === 'operator-profile') {
      return currentPage === 'operator-profile';
    }
    return currentPage === 'operations' && activeOpsSection === item.opsSection;
  };

  const handleNavClick = (item: RoleNavItem) => {
    setMobileOpen(false);
    onNavigate(item.page, item.opsSection);
  };

  const defaultPortalPage: PageId = isTraveler ? 'home' : 'operations';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E1E9E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark + icon + Role badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate(defaultPortalPage, isTraveler ? undefined : 'overview')}
            className="flex items-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#167A5B] rounded-lg py-1"
            aria-label={t.brandName}
          >
            <BrandLogo className="h-7 sm:h-9 w-auto" alt={t.brandName} />
          </button>

          <span
            className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border whitespace-nowrap ${
              isTraveler
                ? 'bg-[#F0F7F4] border-[#B7E4D2] text-[#167A5B]'
                : 'bg-[#F8FAF7] border-[#E1E9E4] text-[#24332E]'
            }`}
          >
            {isTraveler ? (
              <Compass className="w-3 h-3" />
            ) : (
              <Gauge className="w-3 h-3" />
            )}
            <span>
              {isTraveler ? t.nav.roleTravelerBadge : t.nav.roleOperatorBadge}
            </span>
          </span>
        </div>

        {/* Zone 2: Strictly Role-Authorized Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6"
          aria-label={lang === 'ar' ? 'التنقل حسب الصلاحية' : 'Role Navigation'}
        >
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  active
                    ? 'text-[#167A5B]'
                    : 'text-[#75847D] hover:text-[#24332E]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-[#167A5B]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher + Authenticated User + Logout */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            className="h-9 px-3 rounded-lg border border-[#E1E9E4] hover:border-[#167A5B]/40 text-xs font-semibold text-[#24332E] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#167A5B]" />
            <span>{t.nav.switchLang}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate(isTraveler ? 'traveler-profile' : 'operator-profile')
            }
            className="h-9 px-3 rounded-lg bg-[#F8FAF7] border border-[#E1E9E4] hover:border-[#167A5B]/40 text-xs font-semibold text-[#24332E] inline-flex items-center gap-1.5 max-w-[190px] cursor-pointer transition-colors"
            title={user.email}
          >
            <User className="w-3.5 h-3.5 text-[#167A5B] shrink-0" />
            <span className="truncate">{user.name[lang]}</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="h-9 px-3.5 rounded-lg border border-[#E1E9E4] hover:border-[#DC2626] hover:text-[#DC2626] text-xs font-semibold text-[#24332E] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.nav.logout}</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            className="h-10 px-3 rounded-lg border border-[#E1E9E4] text-xs font-semibold text-[#24332E] inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#167A5B]" />
            <span>{t.nav.switchLang}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-11 h-11 rounded-lg border border-[#E1E9E4] flex items-center justify-center text-[#24332E] cursor-pointer"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E1E9E4] bg-white px-4 py-4 space-y-2">
          <div className="px-3.5 py-2 rounded-lg bg-[#F8FAF7] border border-[#E1E9E4] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#24332E] truncate">
              {user.name[lang]}
            </span>
            <span className="text-[#167A5B] font-semibold shrink-0">
              {isTraveler ? t.nav.roleTravelerBadge : t.nav.roleOperatorBadge}
            </span>
          </div>

          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`w-full text-start px-3.5 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#F0F7F4] text-[#167A5B]'
                    : 'text-[#24332E] hover:bg-[#F8FAF7]'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#E1E9E4]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onLogout();
              }}
              className="w-full h-11 rounded-lg border border-[#E1E9E4] text-sm font-semibold text-[#DC2626] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.nav.logout}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
