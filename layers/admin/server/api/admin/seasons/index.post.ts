import db from '~~/server/db';
import { seasonsTable } from '~~/server/db/schema';

export default eventHandler(async (event) => {
  const { data, coverImage } = await readSeasonMultipart(event);

  if (!coverImage) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: "La stagione deve avere un'immagine tematica",
    });
  }

  const coverImageUrl = await uploadImageBlob(coverImage);

  const body = validateInput(seasonSchema, {
    ...(data as object),
    coverImage: coverImageUrl,
  });

  const [inserted] = await db
    .insert(seasonsTable)
    .values(body)
    .returning({ name: seasonsTable.name });

  return inserted;
});
