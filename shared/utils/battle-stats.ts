import type { Battle } from '#shared/types/battle';
import type { BattleStats, PlayerStats } from '#shared/types/stats';
import { getAllianceByFaction } from './alliances';
import { isDecisiveVictory } from './victory';

/**
 * Turns a battle row into the stats of one of its two players, with the other
 * one as the opponent.
 */
export function toBattleStats(battle: Battle, player: string): BattleStats {
  const isPlayer1 = battle.player1 === player;

  const ownId = isPlayer1 ? 'player1' : 'player2';
  const opponentId = isPlayer1 ? 'player2' : 'player1';

  const ownFaction = battle[`${ownId}Faction`];
  const opponentFaction = battle[`${opponentId}Faction`];

  return {
    id: battle.id,
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

/**
 * Splits battles into wins, ties and losses, comparing the player's points with
 * the opponent's.
 */
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

/** Returns the factions the player used, most played first. */
export function getFactionsByUse(battles: BattleStats[]) {
  const counts = new Map<string, number>();

  battles.forEach(({ ownData: { faction } }) => {
    counts.set(faction, (counts.get(faction) ?? 0) + 1);
  });

  return [...counts].sort((a, b) => b[1] - a[1]).map(([faction]) => faction);
}

/**
 * Sorts the battles newest first, changing the array passed in, then splits
 * them by outcome.
 */
export function countAndSortBattles(battles: BattleStats[]) {
  battles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return splitByOutcome(battles);
}

/**
 * Builds a player's ranking stats from their battles. Sorts `battles` in
 * place, newest first.
 */
export function toPlayerStats(
  player: string,
  battles: BattleStats[],
): PlayerStats {
  const { wins, losses, ties } = countAndSortBattles(battles);

  return {
    player,
    battles,
    wins,
    losses,
    ties,
    winRate: calculateWinRate(wins, battles),
    factions: getSortedFactions(battles, wins, losses, ties),
    score: calculateScore(wins, ties),
  };
}

/**
 * Returns wins, losses, ties and win rate for each faction the player used,
 * most played first.
 */
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

/** Percentage of battles won, rounded. Returns NaN when `battles` is empty. */
export function calculateWinRate(wins: BattleStats[], battles: BattleStats[]) {
  return Math.round((wins.length * 100) / battles.length);
}

/** League score: 3 per decisive win, 2 per other win, 1 per tie. */
export function calculateScore(wins: BattleStats[], ties: BattleStats[]) {
  let p3 = 0,
    p2 = 0;

  wins.forEach((w) => {
    if (isDecisiveVictory(w)) p3++;
    else p2++;
  });

  return p3 * 3 + p2 * 2 + ties.length;
}

/** Sum of the points the player scored across the battles. */
export function calculateTotalPoints(battles: BattleStats[]) {
  return battles.reduce((acc, curr) => acc + curr.ownData.points, 0);
}

type Standing = Pick<PlayerStats, 'score' | 'winRate' | 'battles'>;

/**
 * Sort comparator for the ranking: higher score first, then win rate, then
 * total points.
 */
export function compareStandings(a: Standing, b: Standing) {
  const scoreComparison = b.score - a.score;
  if (scoreComparison !== 0) return scoreComparison;

  const winRateComparison = b.winRate - a.winRate;
  if (winRateComparison !== 0) return winRateComparison;

  return calculateTotalPoints(b.battles) - calculateTotalPoints(a.battles);
}

/**
 * Rebuilds each player's stats from only the battles of `season`, drops
 * players who did not play in it, and sorts them by standing.
 */
export function getSeasonStandings(stats: PlayerStats[], season: string) {
  return stats
    .map((s) =>
      toPlayerStats(
        s.player,
        s.battles.filter((b) => b.season === season),
      ),
    )
    .filter((s) => s.battles.length)
    .sort(compareStandings);
}
