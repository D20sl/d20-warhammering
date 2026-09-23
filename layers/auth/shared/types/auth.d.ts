declare module '#auth-utils' {
  interface User {
    // Keycloak `sub`, not the username: stable across profile changes.
    keycloakId: string;

    // First and Last names.
    displayName: string;

    // From resource_access[<client>].
    roles: string[];
  }

  interface SecureSessionData {
    // Keycloak stops to ask whether you really meant to log out unless it is
    // handed back the token it issued at login.
    idToken?: string;
  }
}

export { };

