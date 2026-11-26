/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { translations } from './data/i18n';
import {
  getPathForRoute,
  isRoleAuthorizedForRoute,
  parsePathnameToRoute,
} from './data/mockAuth';
import { stripBasePath, withBasePath } from './utils/paths';
import { CURATED_DEMO_JOURNEYS } from './data/mockJourneys';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { AuthEntryPage } from './pages/AuthEntryPage';
import { HomePage } from './pages/HomePage';
import { JourneyDetailsPage } from './pages/JourneyDetailsPage';
import { OperationsDashboardPage } from './pages/OperationsDashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import {
  AuthenticatedUser,
  Journey,
  Language,
  OpsSection,
  PageId,
  SearchParams,
} from './types/relaybus';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null);
  const [currentPage, setCurrentPage] = useState<PageId>('login');
  const [opsSection, setOpsSection] = useState<OpsSection>('overview');
  const [opsHighlightConnId, setOpsHighlightConnId] = useState<string | null>('CONN-00');
  const [deniedPath, setDeniedPath] = useState<string | null>(null);
  const [pendingProtectedPath, setPendingProtectedPath] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const stripped = stripBasePath(window.location.pathname);
    const desc = parsePathnameToRoute(stripped);
    return desc.requiredRole ? stripped : null;
  });

  const [searchParams, setSearchParams] = useState<SearchParams>({
    fromCityId: 'riyadh',
    toCityId: 'jeddah',
    date: '2026-12-01',
    passengers: 1,
  });
  const [selectedJourney, setSelectedJourney] = useState<Journey>(
    CURATED_DEMO_JOURNEYS[0]
  );
  const [assistantContextJourney, setAssistantContextJourney] =
    useState<Journey | null>(null);

  const t = translations[lang];

  // Keep <html lang and dir> synced dynamically
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'RelayBus — منصة التنقل الذكي بين مدن المملكة'
        : 'RelayBus — Smart Multi-Modal Mobility Platform';
  }, [lang]);

  // Enforce role-based URL route guard for a given pathname
  const resolveAndGuardPath = (
    pathname: string,
    activeUser: AuthenticatedUser | null,
    syncHistory = false
  ) => {
    const cleanPath = stripBasePath(pathname);
    const descriptor = parsePathnameToRoute(cleanPath);

    if (!activeUser) {
      if (descriptor.requiredRole) {
        setPendingProtectedPath(cleanPath);
      }
      setCurrentPage('login');
      setDeniedPath(null);
      if (syncHistory && stripBasePath(window.location.pathname) !== '/login') {
        window.history.replaceState({}, '', withBasePath('/login'));
      }
      return;
    }

    if (!isRoleAuthorizedForRoute(activeUser.role, descriptor.requiredRole)) {
      setDeniedPath(cleanPath);
      setCurrentPage('access-denied');
      if (syncHistory) {
        window.history.pushState({}, '', withBasePath('/access-denied'));
      }
      return;
    }

    if (descriptor.page === 'login') {
      const defaultPage: PageId =
        activeUser.role === 'traveler' ? 'home' : 'operations';
      const defaultSection: OpsSection = 'overview';
      setCurrentPage(defaultPage);
      setOpsSection(defaultSection);
      setDeniedPath(null);
      if (syncHistory) {
        window.history.replaceState(
          {},
          '',
          withBasePath(getPathForRoute(defaultPage, defaultSection))
        );
      }
      return;
    }

    setDeniedPath(null);
    setCurrentPage(descriptor.page);
    if (descriptor.opsSection) {
      setOpsSection(descriptor.opsSection);
    }
  };

  // Listen to browser back/forward URL navigation
  useEffect(() => {
    const handlePopState = () => {
      resolveAndGuardPath(window.location.pathname, authUser, false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const navigateAuthorized = (
    page: PageId,
    nextOpsSection?: OpsSection,
    scrollTarget?: string
  ) => {
    if (!authUser) {
      setCurrentPage('login');
      window.history.pushState({}, '', withBasePath('/login'));
      return;
    }

    const resolvedSection = nextOpsSection || opsSection;
    const targetPath = getPathForRoute(page, resolvedSection);
    const descriptor = parsePathnameToRoute(targetPath);

    if (!isRoleAuthorizedForRoute(authUser.role, descriptor.requiredRole)) {
      setDeniedPath(targetPath);
      setCurrentPage('access-denied');
      window.history.pushState({}, '', withBasePath('/access-denied'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setDeniedPath(null);
    setCurrentPage(page);
    if (nextOpsSection) {
      setOpsSection(nextOpsSection);
    }

    const fullTargetPath = withBasePath(targetPath);
    if (window.location.pathname !== fullTargetPath) {
      window.history.pushState({}, '', fullTargetPath);
    }

    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTestUnauthorizedRoute = (path: string) => {
    if (!authUser) return;
    const cleanPath = stripBasePath(path);
    const descriptor = parsePathnameToRoute(cleanPath);
    if (!isRoleAuthorizedForRoute(authUser.role, descriptor.requiredRole)) {
      setDeniedPath(cleanPath);
      setCurrentPage('access-denied');
      window.history.pushState({}, '', withBasePath(cleanPath));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAuthenticate = (user: AuthenticatedUser) => {
    setAuthUser(user);

    // If user originally requested a protected URL before login, validate it against their new role
    if (pendingProtectedPath) {
      const pendingDesc = parsePathnameToRoute(pendingProtectedPath);
      setPendingProtectedPath(null);
      if (!isRoleAuthorizedForRoute(user.role, pendingDesc.requiredRole)) {
        setDeniedPath(pendingProtectedPath);
        setCurrentPage('access-denied');
        window.history.pushState({}, '', withBasePath(pendingProtectedPath));
        return;
      }
      setCurrentPage(pendingDesc.page);
      if (pendingDesc.opsSection) {
        setOpsSection(pendingDesc.opsSection);
      }
      window.history.pushState({}, '', withBasePath(pendingProtectedPath));
      return;
    }

    // Standard role-based portal redirect
    if (user.role === 'traveler') {
      setCurrentPage('home');
      window.history.pushState({}, '', withBasePath(getPathForRoute('home')));
    } else {
      setOpsSection('overview');
      setCurrentPage('operations');
      window.history.pushState(
        {},
        '',
        withBasePath(getPathForRoute('operations', 'overview'))
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setAuthUser(null);
    setAssistantContextJourney(null);
    setDeniedPath(null);
    setPendingProtectedPath(null);
    setCurrentPage('login');
    window.history.pushState({}, '', withBasePath('/login'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (params: SearchParams) => {
    setSearchParams(params);
    navigateAuthorized('search');
  };

  const handleSelectCityDestination = (cityId: string) => {
    const nextFrom =
      searchParams.fromCityId === cityId
        ? cityId === 'riyadh'
          ? 'jeddah'
          : 'riyadh'
        : searchParams.fromCityId;

    setSearchParams((prev) => ({
      ...prev,
      fromCityId: nextFrom,
      toCityId: cityId,
    }));
    navigateAuthorized('search');
  };

  const handleSelectJourney = (journey: Journey) => {
    setSelectedJourney(journey);
    navigateAuthorized('details');
  };

  const handleAskAssistantAboutJourney = (journey: Journey) => {
    setAssistantContextJourney(journey);
    navigateAuthorized('assistant');
  };

  // Unauthenticated gate -> Role-Based Authentication Entry Page
  if (!authUser) {
    return (
      <AuthEntryPage
        t={t}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
        onAuthenticate={handleAuthenticate}
        pendingProtectedPath={pendingProtectedPath}
      />
    );
  }

  const isTraveler = authUser.role === 'traveler';
  const defaultAuthorizedPage: PageId = isTraveler ? 'home' : 'operations';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#24332E]">
      <Navbar
        user={authUser}
        currentPage={currentPage}
        activeOpsSection={opsSection}
        onNavigate={(page, section) => navigateAuthorized(page, section)}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
        t={t}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {currentPage === 'access-denied' && (
          <AccessDeniedPage
            t={t}
            lang={lang}
            activeRole={authUser.role}
            attemptedPath={deniedPath || '/unauthorized'}
            onReturnToPortal={() =>
              navigateAuthorized(
                defaultAuthorizedPage,
                isTraveler ? undefined : 'overview'
              )
            }
            onLogout={handleLogout}
          />
        )}

        {/* Traveler-Only Pages (Guarded) */}
        {isTraveler && currentPage === 'home' && (
          <HomePage
            t={t}
            lang={lang}
            searchParams={searchParams}
            onSearchSubmit={handleSearchSubmit}
            onSelectCityDestination={handleSelectCityDestination}
            onNavigate={(page) => navigateAuthorized(page)}
          />
        )}

        {isTraveler && currentPage === 'search' && (
          <SearchResultsPage
            t={t}
            lang={lang}
            searchParams={searchParams}
            onUpdateSearch={setSearchParams}
            onSelectJourney={handleSelectJourney}
          />
        )}

        {isTraveler && currentPage === 'details' && (
          <JourneyDetailsPage
            t={t}
            lang={lang}
            journey={selectedJourney}
            searchParams={searchParams}
            onBack={() => navigateAuthorized('search')}
            onAskAssistant={handleAskAssistantAboutJourney}
          />
        )}

        {isTraveler && currentPage === 'assistant' && (
          <AiAssistantPage
            t={t}
            lang={lang}
            onSelectJourney={handleSelectJourney}
            contextJourney={assistantContextJourney}
            onClearContextJourney={() => setAssistantContextJourney(null)}
          />
        )}

        {isTraveler && currentPage === 'traveler-profile' && (
          <ProfilePage
            t={t}
            lang={lang}
            user={authUser}
            onLogout={handleLogout}
            onTestUnauthorizedRoute={handleTestUnauthorizedRoute}
          />
        )}

        {/* Operator-Only Pages (Guarded) */}
        {!isTraveler && currentPage === 'operations' && (
          <OperationsDashboardPage
            t={t}
            lang={lang}
            activeSection={opsSection}
            onSectionChange={(sec) => navigateAuthorized('operations', sec)}
            onOpenProfile={() => navigateAuthorized('operator-profile')}
            highlightedConnectionId={opsHighlightConnId}
            onHighlightConnection={setOpsHighlightConnId}
          />
        )}

        {!isTraveler && currentPage === 'operator-profile' && (
          <ProfilePage
            t={t}
            lang={lang}
            user={authUser}
            onLogout={handleLogout}
            onTestUnauthorizedRoute={handleTestUnauthorizedRoute}
          />
        )}
      </main>

      {isTraveler && currentPage !== 'access-denied' && (
        <Footer t={t} onNavigate={(page) => navigateAuthorized(page)} />
      )}
    </div>
  );
}
