export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/admin')) return;

  const message =
    event.method === 'GET'
      ? 'Non hai accesso a questi dati'
      : 'Non hai i permessi per questa operazione';

  const { user } = await requireUserSession(event, { message });

  if (!isAdmin(user)) {
    throw createError({ status: 403, message });
  }
});
