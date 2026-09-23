import db from '~~/server/db';

export default eventHandler(async (): Promise<Player[]> => {
  return await db.query.playersTable.findMany();
});
