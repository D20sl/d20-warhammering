export function isAdmin(user?: { roles: string[] } | null) {
  return user?.roles.includes('admin') ?? false;
}
