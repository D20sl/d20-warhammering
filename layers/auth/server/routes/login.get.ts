// nuxt-auth-utils types both of these as `any`, because what a realm sends back
// depends on its protocol mappers. These are the claims ours actually sends.
type KeycloakUser = {
  sub: string;
  // The realm marks email required, so it is always collected before login.
  email: string;
  // The realm also requires first and last name. Keycloak joins them here.
  name: string;
};

type KeycloakTokens = {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
};

type KeycloakAccessToken = {
  resource_access?: Record<string, { roles: string[] }>;
  realm_access?: { roles: string[] };
};

// This route handles two requests. The first has no `code` and sends the user
// to Keycloak. The second is Keycloak sending them back with one.
const login = defineOAuthKeycloakEventHandler({
  async onSuccess(
    event,
    { user, tokens }: { user: KeycloakUser; tokens: KeycloakTokens },
  ) {
    const { clientId } = useRuntimeConfig(event).oauth.keycloak;

    // /userinfo leaves roles out entirely. They are only in the access token.
    const accessToken = decodeJwtPayload(tokens.access_token);

    const redirect = safeRedirect(
      getCookie(event, Cookies.AUTH_REDIRECT),
      '/admin',
    );

    deleteCookie(event, Cookies.AUTH_REDIRECT);

    await syncPlayer(user.sub, user.name);

    await setUserSession(
      event,
      {
        user: {
          keycloakId: user.sub,
          displayName: user.name,
          roles: accessToken?.resource_access?.[clientId]?.roles ?? [],
        },
        secure: { idToken: tokens.id_token },
      },
      { maxAge: 60 * 60 * 24 },
    );

    return sendRedirect(event, redirect);
  },

  onError(event, error) {
    console.error('[keycloak] login failed:', error.message, error.data);

    deleteCookie(event, Cookies.AUTH_REDIRECT);

    return sendRedirect(event, '/');
  },
});

export default eventHandler(async (event) => {
  const query = getQuery(event);

  // Keycloak only sends back its own parameters, so store the destination in a
  // cookie until the user returns.
  if (!query.code) {
    setCookie(
      event,
      Cookies.AUTH_REDIRECT,
      safeRedirect(query.redirect, '/admin'),
      {
        httpOnly: true,
        sameSite: 'lax',
        secure: !import.meta.dev,
        path: '/',
        maxAge: 60 * 10,
      },
    );
  }

  return login(event);
});

function safeRedirect(path: unknown, fallback: string) {
  if (typeof path !== 'string' || !path.startsWith('/')) return fallback;

  // Browsers read both `//evil.com` and `/\evil.com` as another site.
  if (path.startsWith('//') || path.startsWith('/\\')) return fallback;

  return path;
}

function decodeJwtPayload(token: string): KeycloakAccessToken | undefined {
  const payload = token.split('.')[1];

  if (!payload) return undefined;

  return JSON.parse(Buffer.from(payload, 'base64url').toString());
}
