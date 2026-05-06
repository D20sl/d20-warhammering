import { eq } from 'drizzle-orm';
import db from '~~/server/db';
import { seasonsTable } from '~~/server/db/schema';

export default eventHandler(async (event): Promise<Season> => {
  const name = getRouterParam(event, 'name');

  if (!name) {
    throw createError({ status: 400, message: 'Nome stagione mancante' });
  }

  const season = await db.query.seasonsTable.findFirst({
    where: eq(seasonsTable.name, name),
  });

  if (!season) {
    throw createError({ status: 404, message: 'Stagione non trovata' });
  }

  return season;
});
