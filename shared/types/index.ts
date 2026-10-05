import * as v from 'valibot';

export type LeafPartial<T> = {
  [K in keyof T]: T[K] extends object ? LeafPartial<T[K]> : T[K] | undefined;
};

export const dateSchema = v.pipe(
  v.string(),
  v.isoDate(ErrorMessages.INVALID_DATE),
);
