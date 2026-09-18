import type { MultiPartData } from 'h3';
import { randomUUID } from 'node:crypto';

// Mounted as an fs driver in nuxt.config. On the VPS the Openship volume
// declared in openship.json is what actually backs that path.
const STORAGE_KEY = 'uploads';

// The fs driver stores bytes and nothing else, so a blob's extension is the
// only thing left to serve it back with. Mirrors SeasonFormModal's accept list.
const EXTENSION_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const TYPE_BY_EXTENSION: Record<string, string> = Object.fromEntries(
  Object.entries(EXTENSION_BY_TYPE).map(([type, ext]) => [ext, type]),
);

export function getUploadStore() {
  return useStorage(STORAGE_KEY);
}

const UPLOADS_URL_PREFIX = '/uploads/';

export function urlForKey(key: string): string {
  return `${UPLOADS_URL_PREFIX}${key}`;
}

export function keyFromUrl(url: string): string | null {
  if (!url.startsWith(UPLOADS_URL_PREFIX)) return null;
  return url.slice(UPLOADS_URL_PREFIX.length);
}

export function contentTypeForKey(key: string): string {
  const ext = key.split('.').at(-1)?.toLowerCase();
  return TYPE_BY_EXTENSION[ext ?? ''] ?? 'application/octet-stream';
}

export async function uploadImageBlob(file: MultiPartData): Promise<string> {
  const ext = file.type && EXTENSION_BY_TYPE[file.type];

  if (!ext) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: "L'immagine deve essere in formato JPEG, PNG o WebP",
    });
  }

  const key = `${randomUUID()}.${ext}`;

  await getUploadStore().setItemRaw(key, file.data);

  return urlForKey(key);
}
