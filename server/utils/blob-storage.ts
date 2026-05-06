import { getStore, type Store } from '@netlify/blobs';
import type { MultiPartData } from 'h3';
import { randomUUID } from 'node:crypto';

const STORE_NAME = 'uploads';

export function getUploadStore(): Store {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;

  // On Netlify, env is auto-injected and manual config is unnecessary.
  // Off-platform (local dev, Vercel), we must pass siteID + token explicitly.
  if (siteID && token) {
    return getStore({ name: STORE_NAME, siteID, token });
  }

  return getStore(STORE_NAME);
}

const UPLOADS_URL_PREFIX = '/uploads/';

export function urlForKey(key: string): string {
  return `${UPLOADS_URL_PREFIX}${key}`;
}

export function keyFromUrl(url: string): string | null {
  if (!url.startsWith(UPLOADS_URL_PREFIX)) return null;
  return url.slice(UPLOADS_URL_PREFIX.length);
}

export async function uploadImageBlob(file: MultiPartData): Promise<string> {
  return '/img/wh.webp'; // temporary workaround before Netlify

  const ext = file.filename?.split('.').at(-1);
  const key = `${randomUUID()}.${ext}`;
  const body = file.data.buffer.slice(
    file.data.byteOffset,
    file.data.byteOffset + file.data.byteLength,
  ) as ArrayBuffer;

  await getUploadStore().set(key, body, {
    metadata: { contentType: file.type },
  });

  return urlForKey(key);
}
