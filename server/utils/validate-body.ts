import type { H3Event } from 'h3';
import * as v from 'valibot';

export function validateInput<TSchema extends v.GenericSchema>(
  schema: TSchema,
  input: unknown,
): v.InferOutput<TSchema> {
  const result = v.safeParse(schema, input);

  if (!result.success) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: v.summarize(result.issues),
    });
  }

  return result.output;
}

export async function validateBody<TSchema extends v.GenericSchema>(
  event: H3Event,
  schema: TSchema,
): Promise<v.InferOutput<TSchema>> {
  return validateInput(schema, await readBody(event));
}
