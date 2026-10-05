import { eq } from 'drizzle-orm';
import db from '~~/server/db';
import { battlesTable } from '~~/server/db/schema';

export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  if (!Number.isInteger(id)) {
    throw createError({
      status: 400,
      message: ErrorMessages.BATTLE_ID_INVALID,
    });
  }

  const [deleted] = await db
    .delete(battlesTable)
    .where(eq(battlesTable.id, id))
    .returning({ id: battlesTable.id });

  if (!deleted) {
    throw createError({ status: 404, message: ErrorMessages.BATTLE_NOT_FOUND });
  }

  return deleted;
});
