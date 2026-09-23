export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return;

  const { loggedIn, user } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo(loginUrl(to.fullPath), { external: true });
  }

  if (!isAdmin(user.value)) {
    return abortNavigation(
      createError({
        statusCode: 403,
        statusMessage: 'Non hai i permessi per questa sezione',
      }),
    );
  }
});
