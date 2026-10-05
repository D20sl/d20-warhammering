import { getLocalTimeZone, today } from '@internationalized/date';
import * as v from 'valibot';
import type { battlesTable } from '~~/server/db/schema';

export type Battle = typeof battlesTable.$inferSelect;
export type NewBattle = typeof battlesTable.$inferInsert;

const playerName = v.pipe(
  v.string(),
  v.nonEmpty(ErrorMessages.PLAYER_NAME_REQUIRED),
);

const playerFaction = v.pipe(
  v.string(),
  v.nonEmpty(ErrorMessages.FACTION_REQUIRED),
  v.values(FACTIONS, ErrorMessages.FACTION_INVALID),
);

const playerPoints = v.pipe(
  v.number(ErrorMessages.POINTS_REQUIRED),
  v.integer(ErrorMessages.POINTS_NOT_INTEGER),
  v.minValue(0, ErrorMessages.POINTS_BELOW_MIN),
  v.maxValue(100, ErrorMessages.POINTS_ABOVE_MAX),
);

export const battleSchema = v.pipe(
  v.object({
    budget: v.pipe(v.number(), v.values(BUDGETS)),

    date: v.pipe(
      dateSchema,
      v.check(
        (val) => val <= today(getLocalTimeZone()).toString(),
        ErrorMessages.BATTLE_IN_FUTURE,
      ),
    ),

    season: v.nullish(v.string()),

    player1: playerName,
    player1Points: playerPoints,
    player1Faction: playerFaction,

    player2: playerName,
    player2Points: playerPoints,
    player2Faction: playerFaction,
  }),
  v.forward(
    v.check(
      ({ player1, player2 }) => player1 !== player2,
      ErrorMessages.BATTLE_SAME_PLAYER,
    ),
    ['player2'],
  ),
) satisfies v.GenericSchema<NewBattle>;
