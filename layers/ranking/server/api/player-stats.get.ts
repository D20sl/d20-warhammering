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

      const isPlayer1 = battles.player1 === name;

      const ownId = isPlayer1 ? 'player1' : 'player2';
      const opponentId = isPlayer1 ? 'player2' : 'player1';

      const ownPoints = battles[`${ownId}Points`];
      const ownFaction = battles[`${ownId}Faction`];

      const opponent = battles[opponentId];
      const opponentPoints = battles[`${opponentId}Points`];
      const opponentFaction = battles[`${opponentId}Faction`];

      acc[name].push({
        date: battles.date,
        budget: battles.budget,
        season: battles.season,
        ownData: {
          points: ownPoints,
          faction: ownFaction,
          alliance: getAllianceByFaction(ownFaction),
        },
        opponentData: {
          name: opponent,
          points: opponentPoints,
          faction: opponentFaction,
          alliance: getAllianceByFaction(opponentFaction),
        },
      });

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

function countAndSortBattles(battles: BattleStats[]) {
  const wins: BattleStats[] = [],
    ties: BattleStats[] = [],
    losses: BattleStats[] = [];

  battles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  battles.forEach((b) => {
    if (b.ownData.points > b.opponentData.points) wins.push(b);
    else if (b.ownData.points < b.opponentData.points) losses.push(b);
    else ties.push(b);
  });

  return { wins, ties, losses };
}

function getSortedFactions(
  battles: BattleStats[],
  wins: BattleStats[],
  losses: BattleStats[],
  ties: BattleStats[],
) {
  const factions = battles.map((b) => b.ownData.faction);

  factions.sort((a, b) => {
    const countA = factions.filter((f) => f === a).length;
    const countB = factions.filter((f) => f === b).length;
    return countB - countA;
  });

  const byFaction = (faction: string) => (b: BattleStats) =>
    b.ownData.faction === faction;

  return Array.from(new Set(factions)).map<PlayerStats['factions'][0]>(
    (faction) => ({
      name: faction,
      wins: wins.filter(byFaction(faction)).length,
      losses: losses.filter(byFaction(faction)).length,
      ties: ties.filter(byFaction(faction)).length,
      winRate: calculateWinRate(
        wins.filter(byFaction(faction)),
        battles.filter(byFaction(faction)),
      ),
    }),
  );
}

function calculateWinRate(wins: BattleStats[], battles: BattleStats[]) {
  return Math.round((wins.length * 100) / battles.length);
}

function calculateScore(wins: BattleStats[], ties: BattleStats[]) {
  let p3 = 0,
    p2 = 0;

  wins.forEach((w) => {
    if (isDecisiveVictory(w)) p3++;
    else p2++;
  });

  return p3 * 3 + p2 * 2 + ties.length;
}

function calculateTotalPoints(stats: PlayerStats) {
  return stats.battles.reduce((acc, curr) => acc + curr.ownData.points, 0);
}
