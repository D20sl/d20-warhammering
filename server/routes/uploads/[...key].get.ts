import {
  contentTypeForKey,
  getUploadStore,
} from '~~/server/utils/blob-storage';

export default eventHandler(async (event) => {
  const key = getRouterParam(event, 'key');

  if (!key) {
    throw createError({ status: 404 });
  }

  // Blobs are flat `<uuid>.<ext>` keys. The fs driver throws on `..`
  // segments, which surfaces as a 500, so treat path-shaped keys as a miss.
  if (key.includes('/') || key.includes('\\') || key.includes('..')) {
    throw createError({ status: 404 });
  }

  const store = getUploadStore();
  const data = await store.getItemRaw<Buffer>(key);

  if (!data) {
    throw createError({ status: 404 });
  }

  setResponseHeader(event, 'Content-Type', contentTypeForKey(key));
  setResponseHeader(
    event,
    'Cache-Control',
    'public, max-age=31536000, immutable',
  );

  // Keys are content-addressed by UUID, so size + mtime is enough to tell two
  // blobs apart without hashing the bytes on every request.
  const meta = await store.getMeta(key);

  if (meta?.size && meta?.mtime) {
    setResponseHeader(
      event,
      'ETag',
      `"${meta.size}-${new Date(meta.mtime).getTime()}"`,
    );
  }

  return data;
});
