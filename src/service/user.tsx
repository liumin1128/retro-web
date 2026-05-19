import { setStorage, removeStorage, getStorage } from '@/utils/store';
import { HREF_BEFORE_LOGOUT, USER_TOKEN } from '@/configs/base';

const DEFAULT_AFTER_LOGIN_PATH = '/';
const AUTH_PATHS = ['/login', '/register'];

function getRoutePathname(path: string): string {
  const pathname = path.split(/[?#]/)[0];
  return pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
}

function isAuthPath(path: string): boolean {
  return AUTH_PATHS.some(
    (authPath) => path === authPath || path.startsWith(`${authPath}/`),
  );
}

export function normalizeRedirectPath(path?: unknown): string | undefined {
  if (typeof path !== 'string' || !path.trim()) {
    return undefined;
  }

  try {
    const url = new URL(path.trim(), window.location.origin);
    const routePath = url.hash
      ? url.hash.replace(/^#/, '')
      : `${url.pathname}${url.search}`;
    const normalizedPath = routePath.startsWith('/')
      ? routePath
      : `/${routePath}`;
    const routePathname = getRoutePathname(normalizedPath);

    if (isAuthPath(routePathname)) {
      return undefined;
    }

    return normalizedPath;
  } catch {
    return undefined;
  }
}

export function getCurrentRedirectPath(): string | undefined {
  return normalizeRedirectPath(window.location.href);
}

export function rememberLoginRedirectPath(): void {
  const redirectPath = getCurrentRedirectPath();

  if (redirectPath) {
    setStorage(HREF_BEFORE_LOGOUT, redirectPath);
  }
}

function toHashUrl(path: string): string {
  return `/#${path}`;
}

export async function handleLogin(token: string): Promise<void> {
  if (!token) {
    return;
  }

  setStorage(USER_TOKEN, token);

  const redirectPath =
    normalizeRedirectPath(getStorage(HREF_BEFORE_LOGOUT)) ||
    DEFAULT_AFTER_LOGIN_PATH;

  removeStorage(HREF_BEFORE_LOGOUT);
  window.location.replace(toHashUrl(redirectPath));
}

export async function handleLogout(): Promise<void> {
  removeStorage(USER_TOKEN);
  removeStorage(HREF_BEFORE_LOGOUT);
  window.location.replace('/#/login');
}
