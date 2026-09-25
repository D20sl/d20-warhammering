import { eq, or } from 'drizzle-orm';
import db from '~~/server/db';
import { battlesTable, playersTable } from '~~/server/db/schema';

export default eventHandler(async (event): Promise<Account> => {
  const { user } = await requireUserSession(event);

  const player = await db.query.playersTable.findFirst({
    columns: { name: true },
    where: eq(playersTable.keycloakId, user.keycloakId),
  });

  if (!player) {
    throw createError({ status: 404, message: 'Giocatore non trovato' });
  }

  const rows = await db
    .select()
    .from(battlesTable)
    .where(
      or(
        eq(battlesTable.player1, player.name),
        eq(battlesTable.player2, player.name),
      ),
    );

  const battles = rows.map((b) => toBattleStats(b, player.name));

  const { wins } = splitByOutcome(battles);

  return {
    name: player.name,
    battles: battles.length,
    mostUsedFaction: getFactionsByUse(battles)[0],
    winRate: battles.length ? calculateWinRate(wins, battles) : undefined,
  };
});
