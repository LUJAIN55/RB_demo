const RAW_BASE = import.meta.env.BASE_URL || '/';

export const APP_BASE_URL = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;
const BASE_PREFIX = APP_BASE_URL === '/' ? '' : APP_BASE_URL.slice(0, -1);

export function withBasePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!BASE_PREFIX) return normalized;
  if (
    normalized === BASE_PREFIX ||
    normalized.startsWith(`${BASE_PREFIX}/`)
  ) {
    return normalized;
  }
  return `${BASE_PREFIX}${normalized}`;
}

export function stripBasePath(pathname: string): string {
  if (!BASE_PREFIX) return pathname || '/';
  const lower = pathname.toLowerCase();
  const baseLower = BASE_PREFIX.toLowerCase();
  if (lower === baseLower || lower === `${baseLower}/`) {
    return '/';
  }
  if (lower.startsWith(`${baseLower}/`)) {
    return pathname.slice(BASE_PREFIX.length) || '/';
  }
  return pathname || '/';
}
