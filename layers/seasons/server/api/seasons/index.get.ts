import { and, gte, isNotNull, isNull, lte, or } from 'drizzle-orm';
import db from '~~/server/db';

export default eventHandler(async (): Promise<Season[]> => {
  const today = new Date().toISOString().slice(0, 10);

  return await db.query.seasonsTable.findMany({
    where: ({ startDate, endDate }) =>
      and(
        isNotNull(startDate),
        lte(startDate, today),
        or(isNull(endDate), gte(endDate, today)),
      ),
    orderBy: ({ startDate }, { desc }) => desc(startDate),
  });
});
