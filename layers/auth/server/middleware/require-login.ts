const publicPaths = [
  // The privacy policy has to be readable before someone decides to sign up.
  '/privacy',
  loginUrl(),
  logoutUrl(),
  // nuxt-auth-utils reads the session through this route while rendering a
  // public page, and answers with an empty session when nobody is logged in.
  '/api/_auth/session',
  // Nuxt renders its error page by requesting this route from itself.
  '/__nuxt_error',
];

export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event);

  if (publicPaths.includes(pathname)) return;

  const { user } = await getUserSession(event);

  if (user) return;

  if (pathname.startsWith('/api/')) {
    throw createError({ status: 401, message: 'Devi accedere per continuare' });
  }

  return sendRedirect(event, loginUrl(event.path));
});
