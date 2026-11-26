import {
  AuthenticatedUser,
  OpsSection,
  PageId,
  UserRole,
} from '../types/relaybus';
import { stripBasePath } from '../utils/paths';

export const DEMO_ACCOUNTS: Record<UserRole, AuthenticatedUser> = {
  traveler: {
    id: 'demo-traveler-01',
    name: { ar: 'سلمان العتيبي (مسافر تجريبي)', en: 'Salman Al-Otaibi (Demo Traveler)' },
    email: 'traveler.demo@relaybus.sa',
    role: 'traveler',
    preferredCityId: 'dammam',
    isDemo: true,
  },
  operator: {
    id: 'demo-operator-01',
    name: { ar: 'م. نورة القحطاني (مشغل تجريبي)', en: 'Eng. Noura Al-Qahtani (Demo Operator)' },
    email: 'operator.demo@relaybus.sa',
    role: 'operator',
    organization: {
      ar: 'مركز تنسيق النقل المتكامل — القطاع الشرقي والشمالي',
      en: 'Intermodal Operations Hub — Eastern & Northern Corridors',
    },
    isDemo: true,
  },
};

export interface RouteDescriptor {
  requiredRole: UserRole | null;
  page: PageId;
  opsSection?: OpsSection;
}

export function getPathForRoute(page: PageId, opsSection: OpsSection = 'overview'): string {
  switch (page) {
    case 'login':
      return '/login';
    case 'home':
      return '/traveler/home';
    case 'search':
      return '/traveler/explore';
    case 'details':
      return '/traveler/journey-details';
    case 'assistant':
      return '/traveler/assistant';
    case 'traveler-profile':
      return '/traveler/profile';
    case 'operator-profile':
      return '/operator/profile';
    case 'access-denied':
      return '/access-denied';
    case 'operations':
      switch (opsSection) {
        case 'connections':
          return '/operator/schedules';
        case 'gap-analysis':
          return '/operator/gap-analysis';
        case 'optimization':
          return '/operator/optimization';
        case 'analytics':
          return '/operator/analytics';
        case 'overview':
        default:
          return '/operator/overview';
      }
    default:
      return '/login';
  }
}

export function parsePathnameToRoute(pathname: string): RouteDescriptor {
  const stripped = stripBasePath(pathname);
  const clean = stripped.toLowerCase().replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/login') {
    return { requiredRole: null, page: 'login' };
  }

  if (clean.startsWith('/traveler')) {
    if (clean === '/traveler' || clean === '/traveler/home') {
      return { requiredRole: 'traveler', page: 'home' };
    }
    if (clean === '/traveler/explore' || clean === '/traveler/search') {
      return { requiredRole: 'traveler', page: 'search' };
    }
    if (clean === '/traveler/journey-details' || clean === '/traveler/details') {
      return { requiredRole: 'traveler', page: 'details' };
    }
    if (clean === '/traveler/assistant') {
      return { requiredRole: 'traveler', page: 'assistant' };
    }
    if (clean === '/traveler/profile') {
      return { requiredRole: 'traveler', page: 'traveler-profile' };
    }
    return { requiredRole: 'traveler', page: 'home' };
  }

  if (clean.startsWith('/operator')) {
    if (clean === '/operator' || clean === '/operator/overview') {
      return { requiredRole: 'operator', page: 'operations', opsSection: 'overview' };
    }
    if (clean === '/operator/schedules' || clean === '/operator/journeys' || clean === '/operator/connections') {
      return { requiredRole: 'operator', page: 'operations', opsSection: 'connections' };
    }
    if (clean === '/operator/gap-analysis') {
      return { requiredRole: 'operator', page: 'operations', opsSection: 'gap-analysis' };
    }
    if (clean === '/operator/optimization') {
      return { requiredRole: 'operator', page: 'operations', opsSection: 'optimization' };
    }
    if (clean === '/operator/analytics') {
      return { requiredRole: 'operator', page: 'operations', opsSection: 'analytics' };
    }
    if (clean === '/operator/profile') {
      return { requiredRole: 'operator', page: 'operator-profile' };
    }
    return { requiredRole: 'operator', page: 'operations', opsSection: 'overview' };
  }

  return { requiredRole: null, page: 'login' };
}

export function isRoleAuthorizedForRoute(
  userRole: UserRole | null | undefined,
  requiredRole: UserRole | null
): boolean {
  if (!requiredRole) return true;
  if (!userRole) return false;
  return userRole === requiredRole;
}
