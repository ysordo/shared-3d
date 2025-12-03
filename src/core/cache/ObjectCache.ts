import { get, set, del, keys, createStore } from 'idb-keyval';
import type { CacheEntry } from './types';
import { THREE } from '../../lib';

const CACHE_PREFIX = 'shared-3d:asset:';
const store = typeof window !== 'undefined' 
  ? createStore('shared-3d-db', 'keyval')
  : null;

export class ObjectCache {
  private static getKey(id: string): string {
    return `${CACHE_PREFIX}${id}`;
  }

  static async set<T>(
    id: string,
    data: T,
    hash: string,
    updatedAt: number = Date.now()
  ): Promise<void> {
    if (!store) {return;}

    const key = this.getKey(id);
    const entry: CacheEntry<T> = {
      data,
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
      updatedAt,
    };

    await set(key, entry, store);
  }

  static async get<T>(id: string): Promise<CacheEntry<T> | null> {
    if (!store) {return null;}

    const key = this.getKey(id);
    return await get<CacheEntry<T>>(key, store) ?? null;
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
    const entry = await this.get(key);
    if (entry) {this.dispose(entry.data);}
    await del(key, store);
  }

  static async clearAll(): Promise<void> {
    if (!store) {return;}

    const all = await keys(store);
    const ours = all.filter(k => typeof k === 'string' && k.startsWith(CACHE_PREFIX));
    await Promise.all(ours.map(k => del(k, store)));
  }

  private static dispose(data: any): void {
    if (data instanceof THREE.Object3D) {
      data.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    } else if (data instanceof THREE.Texture) {
      data.dispose();
    }
  }

  private static estimateSize(data: any): number {
    if (data instanceof THREE.Object3D) {
      let size = 0;
      data.traverse((child: any) => {
        if (child.isMesh && child.geometry?.attributes?.position?.array) {
          size += child.geometry.attributes.position.array.byteLength;
        }
      });
      return size;
    }
    if (data instanceof THREE.Texture) {
      const array = data.source?.data || data.image?.data;
      return array?.byteLength || 0;
    }
    return 0;
  }
}