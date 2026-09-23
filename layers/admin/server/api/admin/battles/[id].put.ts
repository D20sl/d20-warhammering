import { eq } from 'drizzle-orm';
import db from '~~/server/db';
import { battlesTable } from '~~/server/db/schema';
import { battleSchema } from '~~/shared/types/battle';

export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  if (!Number.isInteger(id)) {
    throw createError({ status: 400, message: 'ID non valido' });
  }

  const body = await validateBody(event, battleSchema);

  await assertPlayersExist([body.player1, body.player2]);

  const [updated] = await db
    .update(battlesTable)
    .set(body)
    .where(eq(battlesTable.id, id))
    .returning({ id: battlesTable.id });

  if (!updated) {
    throw createError({ status: 404, message: 'Partita non trovata' });
  }

  return updated;
});
