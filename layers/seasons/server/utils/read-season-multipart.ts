import type { H3Event, MultiPartData } from 'h3';

export async function readSeasonMultipart(
  event: H3Event,
): Promise<{ data: unknown; coverImage?: MultiPartData }> {
  const parts = await readMultipartFormData(event);

  if (!parts) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: ErrorMessages.FORM_DATA_MISSING,
    });
  }

  const dataPart = parts.find((p) => p.name === 'data' && !p.filename);
  const coverImage = parts.find((p) => p.name === 'coverImage' && p.filename);

  if (!dataPart) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: ErrorMessages.FORM_DATA_FIELD_MISSING,
    });
  }

  let data: unknown;
  try {
    data = JSON.parse(dataPart.data.toString('utf-8'));
  } catch {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: ErrorMessages.FORM_DATA_FIELD_INVALID_JSON,
    });
  }

  return { data, coverImage };
}
