import db from '~~/server/db';

export default eventHandler(async (): Promise<Season[]> => {
  return await db.query.seasonsTable.findMany({
    orderBy: ({ startDate }, { desc }) => desc(startDate),
  });
});
