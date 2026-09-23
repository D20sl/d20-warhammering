import { and, eq, inArray, isNull } from 'drizzle-orm';
import db from '~~/server/db';
import { playersTable } from '~~/server/db/schema';

export async function syncPlayer(keycloakId: string, name: string) {
  // Players who changed their name must reflect the change here too.
  const linkedPlayerName = await findLinkedPlayer(keycloakId);

  if (linkedPlayerName) return renamePlayer(linkedPlayerName, name);

  // On login, update a null keycloadId based on player.name, and retrieve it.
  // If keycloakId is already correct nothing bad happens.
  // If there is no name match, a new player row must be created.
  const [claimed] = await db
    .update(playersTable)
    .set({ keycloakId })
    .where(and(eq(playersTable.name, name), isNull(playersTable.keycloakId)))
    .returning({ name: playersTable.name });

  if (claimed) return;

  const [created] = await db
    .insert(playersTable)
    .values({ name, keycloakId })
    .onConflictDoNothing()
    .returning({ name: playersTable.name });

  if (created) return;

  throw nameTakenError(name);
}

async function findLinkedPlayer(keycloakId: string) {
  const player = await db.query.playersTable.findFirst({
    columns: { name: true },
    where: eq(playersTable.keycloakId, keycloakId),
  });

  return player?.name;
}

export async function assertPlayersExist(names: string[]) {
  const found = await db.query.playersTable.findMany({
    columns: { name: true },
    where: inArray(playersTable.name, names),
  });

  const missing = names.find((name) => !found.some((p) => p.name === name));

  if (missing) {
    throw createError({
      status: 400,
      message: `Il giocatore "${missing}" non esiste`,
    });
  }
}

async function renamePlayer(name: string, newName: string) {
  if (name === newName) return;

  const taken = await db.query.playersTable.findFirst({
    columns: { name: true },
    where: eq(playersTable.name, newName),
  });

  if (taken) throw nameTakenError(newName);

  await db
    .update(playersTable)
    .set({ name: newName })
    .where(eq(playersTable.name, name));
}

function nameTakenError(name: string) {
  return createError({
    status: 409,
    message: `Il nome "${name}" appartiene già a un altro giocatore`,
  });
}
