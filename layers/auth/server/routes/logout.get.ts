export default eventHandler(async (event) => {
  const { serverUrl, realm, clientId } = useRuntimeConfig(event).oauth.keycloak;

  const { secure } = await getUserSession(event);

  // Dropping our own cookie is not enough. Keycloak keeps its own session, so
  // the next login would go straight through without asking for a password.
  await clearUserSession(event);

  const params = new URLSearchParams({
    client_id: clientId,
    post_logout_redirect_uri: getRequestURL(event).origin,
  });

  if (secure?.idToken) params.set('id_token_hint', secure.idToken);

  return sendRedirect(
    event,
    `${serverUrl}/realms/${realm}/protocol/openid-connect/logout?${params}`,
  );
});
