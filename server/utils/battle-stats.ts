export function toBattleStats(battle: Battle, player: string): BattleStats {
  const isPlayer1 = battle.player1 === player;

  const ownId = isPlayer1 ? 'player1' : 'player2';
  const opponentId = isPlayer1 ? 'player2' : 'player1';

  const ownFaction = battle[`${ownId}Faction`];
  const opponentFaction = battle[`${opponentId}Faction`];

  return {
    date: battle.date,
    budget: battle.budget,
    season: battle.season,
    ownData: {
      points: battle[`${ownId}Points`],
      faction: ownFaction,
      alliance: getAllianceByFaction(ownFaction),
    },
    opponentData: {
      name: battle[opponentId],
      points: battle[`${opponentId}Points`],
      faction: opponentFaction,
      alliance: getAllianceByFaction(opponentFaction),
    },
  };
}

export function splitByOutcome(battles: BattleStats[]) {
  const wins: BattleStats[] = [],
    ties: BattleStats[] = [],
    losses: BattleStats[] = [];

  battles.forEach((b) => {
    if (b.ownData.points > b.opponentData.points) wins.push(b);
    else if (b.ownData.points < b.opponentData.points) losses.push(b);
    else ties.push(b);
  });

  return { wins, ties, losses };
}

export function calculateWinRate(wins: BattleStats[], battles: BattleStats[]) {
  return Math.round((wins.length * 100) / battles.length);
}

export function getFactionsByUse(battles: BattleStats[]) {
  const counts = new Map<string, number>();

  battles.forEach(({ ownData: { faction } }) => {
    counts.set(faction, (counts.get(faction) ?? 0) + 1);
  });

  return [...counts].sort((a, b) => b[1] - a[1]).map(([faction]) => faction);
}

export function countAndSortBattles(battles: BattleStats[]) {
  battles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return splitByOutcome(battles);
}

export function getSortedFactions(
  battles: BattleStats[],
  wins: BattleStats[],
  losses: BattleStats[],
  ties: BattleStats[],
) {
  const byFaction = (faction: string) => (b: BattleStats) =>
    b.ownData.faction === faction;

  return getFactionsByUse(battles).map<PlayerStats['factions'][0]>(
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

export function calculateScore(wins: BattleStats[], ties: BattleStats[]) {
  let p3 = 0,
    p2 = 0;

  wins.forEach((w) => {
    if (isDecisiveVictory(w)) p3++;
    else p2++;
  });

  return p3 * 3 + p2 * 2 + ties.length;
}

export function calculateTotalPoints(stats: PlayerStats) {
  return stats.battles.reduce((acc, curr) => acc + curr.ownData.points, 0);
}
