import { eq, or } from 'drizzle-orm';
import db from '~~/server/db';
import { battlesTable, playersTable } from '~~/server/db/schema';

export default eventHandler(async (): Promise<PlayerStats[]> => {
  const query = await db
    .select()
    .from(playersTable)
    .leftJoin(
      battlesTable,
      or(
        eq(playersTable.name, battlesTable.player1),
        eq(playersTable.name, battlesTable.player2),
      ),
    );

  const record = query.reduce(
    (acc, { players: { name, defaultFaction }, battles }) => {
      if (!acc[name]) {
        acc[name] = {
          defaultFaction: defaultFaction ?? undefined,
          battles: [],
        };
      }

      if (!battles) return acc;

      acc[name].battles.push(toBattleStats(battles, name));

      return acc;
    },
    {} as Record<string, { defaultFaction?: string; battles: BattleStats[] }>,
  );

  return Object.entries(record)
    .map(([player, { battles, defaultFaction }]) =>
      toPlayerStats(player, battles, defaultFaction),
    )
    .sort(compareStandings);
});
