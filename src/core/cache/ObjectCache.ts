import { get, set, del, keys, createStore } from 'idb-keyval';

const CACHE_PREFIX = 'shared-3d:asset:';
const store = typeof window !== 'undefined' 
  ? createStore('shared-3d-db', 'keyval')
  : null;

export class ObjectCache {
  private static getKey(id: string): string {
    return `${CACHE_PREFIX}${id}`;
  }

  static async setMetadata(
    id: string,
    hash: string,
    updatedAt: number = Date.now()
  ): Promise<void> {
    if (!store) {return;}

    const key = this.getKey(id);
    const t = await get(key, store);
    if (t && t.hash === hash) {return;}
    const entry = {
      hash,
      timestamp: Date.now(),
      updatedAt,
    };

    await set(key, entry, store);
  }

  static async getMetadata(id: string): Promise<{ hash: string; updatedAt: number } | null> {
    if (!store) {return null;}

    const key = this.getKey(id);
    return await get(key, store) ?? null;
  }

  static async has(id: string): Promise<boolean> {
    if (!store) {return false;}

    const key = this.getKey(id);
    const all = await keys(store);
    return all.includes(key);
  }

  static async delete(id: string): Promise<void> {
    if (!store) {return;}

    const key = this.getKey(id);
    await del(key, store);
  }

  static async clearAll(): Promise<void> {
    if (!store) {return;}

    const all = await keys(store);
    const ours = all.filter(k => typeof k === 'string' && k.startsWith(CACHE_PREFIX));
    await Promise.all(ours.map(k => del(k, store)));
  }
}