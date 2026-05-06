import { getUploadStore } from '~~/server/utils/blob-storage';

export default eventHandler(async (event) => {
  const key = getRouterParam(event, 'key');

  if (!key) {
    throw createError({ status: 404 });
  }

  const store = getUploadStore();
  const result = await store.getWithMetadata(key, { type: 'arrayBuffer' });

  if (!result) {
    throw createError({ status: 404 });
  }

  const contentType =
    (result.metadata?.contentType as string | undefined) ??
    'application/octet-stream';

  setResponseHeader(event, 'Content-Type', contentType);
  setResponseHeader(
    event,
    'Cache-Control',
    'public, max-age=31536000, immutable',
  );

  if (result.etag) setResponseHeader(event, 'ETag', result.etag);

  return new Uint8Array(result.data);
});
