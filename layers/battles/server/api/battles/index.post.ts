import db from '~~/server/db';
import { battlesTable } from '~~/server/db/schema';
import { battleSchema } from '~~/shared/types/battle';

export default eventHandler(async (event) => {
  await requireUserSession(event, {
    message: 'Devi accedere per registrare una partita',
  });

  const body = await validateBody(event, battleSchema);

  await assertPlayersExist([body.player1, body.player2]);

  const [inserted] = await db
    .insert(battlesTable)
    .values(body)
    .returning({ id: battlesTable.id });

  return inserted;
});
