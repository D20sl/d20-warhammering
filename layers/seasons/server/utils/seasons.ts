import { asc, sql } from 'drizzle-orm';
import { seasonsTable } from '~~/server/db/schema';

/**
 * Order for season lists: started seasons newest first, then seasons starting
 * in the future soonest first, then seasons with no start date.
 */
export function seasonsOrder() {
  const { startDate, name } = seasonsTable;
  const today = new Date().toISOString().slice(0, 10);

  return [
    sql`case when ${startDate} is null then 2 when ${startDate} > ${today} then 1 else 0 end`,
    sql`case when ${startDate} <= ${today} then ${startDate} end desc`,
    asc(startDate),
    asc(name),
  ];
}
