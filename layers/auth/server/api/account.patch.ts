import { eq } from 'drizzle-orm';
import * as v from 'valibot';
import db from '~~/server/db';
import { playersTable } from '~~/server/db/schema';

const accountPatchSchema = v.object({
  defaultFaction: v.nullable(
    v.picklist(FACTIONS, ErrorMessages.FACTION_INVALID),
  ),
});

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await validateBody(event, accountPatchSchema);

  const [updated] = await db
    .update(playersTable)
    .set(body)
    .where(eq(playersTable.keycloakId, user.keycloakId))
    .returning({ name: playersTable.name });

  if (!updated) {
    throw createError({ status: 404, message: ErrorMessages.PLAYER_NOT_FOUND });
  }
});
