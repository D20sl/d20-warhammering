export function loginUrl(redirect?: string) {
  if (!redirect) return '/login';

  return `/login?redirect=${encodeURIComponent(redirect)}`;
}

export function logoutUrl() {
  return '/logout';
}

export function accountUrl() {
  return '/account';
}
