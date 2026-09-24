export default eventHandler((event) => {
  const { serverUrl, realm } = useRuntimeConfig(event).oauth.keycloak;

  return sendRedirect(event, `${serverUrl}/realms/${realm}/account`);
});
