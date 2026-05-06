import * as v from 'valibot';
import type { seasonsTable } from '~~/server/db/schema';

export type Season = typeof seasonsTable.$inferSelect;
export type NewSeason = typeof seasonsTable.$inferInsert;

const MAX_COVER_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const COVER_IMAGE_REQUIRED_MESSAGE =
  "La stagione deve avere un'immagine tematica";

const sharedFields = {
  name: v.pipe(
    v.string(),
    v.nonEmpty('La stagione deve avere un nome tematico'),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty('La stagione deve avere una descrizione tematica'),
  ),
  startDate: v.nullish(dateSchema),
  endDate: v.nullish(dateSchema),
};

const DATE_ORDER_MESSAGE =
  "La data di fine deve essere successiva alla data d'inizio";
const isValidDateOrder = ({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) => {
  if (!startDate && !endDate) return true;
  if (startDate && !endDate) return true;
  if (startDate && endDate) return endDate > startDate;
  return false;
};

export const seasonSchema = v.pipe(
  v.object({
    ...sharedFields,
    coverImage: v.pipe(v.string(), v.nonEmpty(COVER_IMAGE_REQUIRED_MESSAGE)),
  }),
  v.forward(
    v.partialCheck(
      [['startDate'], ['endDate']],
      isValidDateOrder,
      DATE_ORDER_MESSAGE,
    ),
    ['endDate'],
  ),
) satisfies v.GenericSchema<NewSeason>;

export const seasonFormSchema = v.pipe(
  v.object({
    ...sharedFields,
    coverImage: v.pipe(
      v.instance(File, COVER_IMAGE_REQUIRED_MESSAGE),
      v.mimeType(
        ['image/jpeg', 'image/png', 'image/webp'],
        'Sono ammessi solo JPG, PNG o WEBP',
      ),
      v.maxSize(
        MAX_COVER_IMAGE_BYTES,
        `L'immagine supera il limite di ${MAX_COVER_IMAGE_BYTES / 1024 / 1024} MB`,
      ),
    ),
  }),
  v.forward(
    v.partialCheck(
      [['startDate'], ['endDate']],
      isValidDateOrder,
      DATE_ORDER_MESSAGE,
    ),
    ['endDate'],
  ),
);
