import db from '~~/server/db';

export default defineTask({
  meta: {
    name: 'cleanup:uploads',
    description: 'Delete blobs not referenced by any DB row',
  },
  async run() {
    const store = getUploadStore();

    const seasons = await db.query.seasonsTable.findMany({
      columns: { coverImage: true },
    });

    const referenced = new Set<string>();

    for (const { coverImage } of seasons) {
      const key = keyFromUrl(coverImage);
      if (key) referenced.add(key);
    }

    let deleted = 0;
    let scanned = 0;

    for await (const { blobs } of store.list({ paginate: true })) {
      for (const blob of blobs) {
        scanned++;
        if (!referenced.has(blob.key)) {
          await store.delete(blob.key);
          deleted++;
        }
      }
    }

    return { result: { scanned, deleted, referenced: referenced.size } };
  },
});
