import { eq } from 'drizzle-orm';
import db from '~~/server/db';
import { seasonsTable } from '~~/server/db/schema';

export default eventHandler(async (event) => {
  const name = getRouterParam(event, 'name');

  if (!name) {
    throw createError({ status: 400, message: 'Nome stagione mancante' });
  }

  const { data, coverImage } = await readSeasonMultipart(event);

  let coverImageUrl: string;

  if (coverImage) {
    coverImageUrl = await uploadImageBlob(coverImage);
  } else {
    const existing = await db.query.seasonsTable.findFirst({
      where: eq(seasonsTable.name, name),
      columns: { coverImage: true },
    });

    if (!existing) {
      throw createError({ status: 404, message: 'Stagione non trovata' });
    }

    coverImageUrl = existing.coverImage;
  }

  const body = validateInput(seasonSchema, {
    ...(data as object),
    coverImage: coverImageUrl,
  });

  const [updated] = await db
    .update(seasonsTable)
    .set(body)
    .where(eq(seasonsTable.name, name))
    .returning({ name: seasonsTable.name });

  if (!updated) {
    throw createError({ status: 404, message: 'Stagione non trovata' });
  }

  return updated;
});
