import * as v from 'valibot';
import type { seasonsTable } from '~~/server/db/schema';

export type Season = typeof seasonsTable.$inferSelect;
export type NewSeason = typeof seasonsTable.$inferInsert;

const MAX_COVER_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const sharedFields = {
  name: v.pipe(v.string(), v.nonEmpty(ErrorMessages.SEASON_NAME_REQUIRED)),
  description: v.pipe(
    v.string(),
    v.nonEmpty(ErrorMessages.SEASON_DESCRIPTION_REQUIRED),
  ),
  startDate: v.nullish(dateSchema),
  endDate: v.nullish(dateSchema),
};

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
    coverImage: v.pipe(
      v.string(),
      v.nonEmpty(ErrorMessages.SEASON_COVER_REQUIRED),
    ),
  }),
  v.forward(
    v.partialCheck(
      [['startDate'], ['endDate']],
      isValidDateOrder,
      ErrorMessages.SEASON_DATE_ORDER,
    ),
    ['endDate'],
  ),
) satisfies v.GenericSchema<NewSeason>;

export const seasonFormSchema = v.pipe(
  v.object({
    ...sharedFields,
    coverImage: v.pipe(
      v.instance(File, ErrorMessages.SEASON_COVER_REQUIRED),
      v.mimeType(
        ['image/jpeg', 'image/png', 'image/webp'],
        ErrorMessages.INVALID_IMAGE_TYPE,
      ),
      v.maxSize(
        MAX_COVER_IMAGE_BYTES,
        ErrorMessages.IMAGE_TOO_LARGE(MAX_COVER_IMAGE_BYTES / 1024 / 1024),
      ),
    ),
  }),
  v.forward(
    v.partialCheck(
      [['startDate'], ['endDate']],
      isValidDateOrder,
      ErrorMessages.SEASON_DATE_ORDER,
    ),
    ['endDate'],
  ),
);
