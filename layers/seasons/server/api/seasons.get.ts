import { and, desc, gte, isNotNull, isNull, lte, or } from 'drizzle-orm';
import db from '~~/server/db';
import { seasonsTable } from '~~/server/db/schema';

function isActive(date: string) {
  const { startDate, endDate } = seasonsTable;

  const hasStarted = and(isNotNull(startDate), lte(startDate, date));
  const hasNotEnded = or(isNull(endDate), gte(endDate, date));

  return and(hasStarted, hasNotEnded);
}

export default eventHandler(async (event): Promise<Season[]> => {
  const { showAll } = getQuery<{ showAll?: string }>(event);
  const today = new Date().toISOString().slice(0, 10);

  return await db.query.seasonsTable.findMany({
    where: showAll === 'true' ? undefined : isActive(today),
    orderBy: desc(seasonsTable.startDate),
  });
});
