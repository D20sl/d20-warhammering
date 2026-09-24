import { and, eq, or } from 'drizzle-orm';
import db from '~~/server/db';
import { battlesTable, playersTable } from '~~/server/db/schema';

export default eventHandler(async (event): Promise<PlayerStats[]> => {
  const { season } = getQuery<{ season?: string }>(event);

  const query = await db
    .select()
    .from(playersTable)
    .leftJoin(
      battlesTable,
      and(
        or(
          eq(playersTable.name, battlesTable.player1),
          eq(playersTable.name, battlesTable.player2),
        ),
        season ? eq(battlesTable.season, season) : undefined,
      ),
    );

  const record = query.reduce(
    (acc, { players: { name }, battles }) => {
      if (!acc[name]) acc[name] = [];

      if (!battles) return acc;

      acc[name].push(toBattleStats(battles, name));

      return acc;
    },
    {} as Record<string, BattleStats[]>,
  );

  return Object.entries(record)
    .map(([player, battles]) => {
      const { wins, losses, ties } = countAndSortBattles(battles);

      const factions = getSortedFactions(battles, wins, losses, ties);

      const winRate = calculateWinRate(wins, battles);

      const score = calculateScore(wins, ties);

      return {
        player,
        battles,
        wins,
        losses,
        ties,
        winRate,
        factions,
        score,
      } satisfies PlayerStats;
    })
    .sort((a, b) => {
      const scoreComparison = b.score - a.score;
      if (scoreComparison !== 0) return scoreComparison;

      const winRateComparison = b.winRate - a.winRate;
      if (winRateComparison !== 0) return winRateComparison;

      return calculateTotalPoints(b) - calculateTotalPoints(a);
    });
});
