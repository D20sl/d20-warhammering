import { eq } from 'drizzle-orm';
import db from '~~/server/db';
import { seasonsTable } from '~~/server/db/schema';

export default eventHandler(async (event) => {
  const name = getRouterParam(event, 'name');

  if (!name) {
    throw createError({ status: 400, message: 'Nome stagione mancante' });
  }

  const [deleted] = await db
    .delete(seasonsTable)
    .where(eq(seasonsTable.name, name))
    .returning({ id: seasonsTable.name });

  if (!deleted) {
    throw createError({ status: 404, message: 'Stagione non trovata' });
  }

  return deleted;
});
