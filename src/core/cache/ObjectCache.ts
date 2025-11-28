/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, set, del, keys } from 'idb-keyval';
import type { CacheEntry } from './types';
import { THREE } from '../../lib';

const CACHE_PREFIX = 'shared-3d:asset:';

export class ObjectCache {
  private static async getKey(id: string): Promise<string> {
    return `${CACHE_PREFIX}${id}`;
  }

  static async set<T>(
    id: string,
    data: T,
    hash: string,
    updatedAt: number = Date.now()
  ): Promise<void> {
    const key = await this.getKey(id);
    const entry: CacheEntry<T> = {
      data,
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
      updatedAt,
    };
    await set(key, entry);
  }

  static async get<T>(id: string): Promise<CacheEntry<T> | null> {
    const key = await this.getKey(id);
    return await get<CacheEntry<T>>(key) ?? null;
  }

  static async has(id: string): Promise<boolean> {
    const key = await this.getKey(id);
    const all = await keys();
    return all.includes(key as string);
  }

  static async delete(id: string): Promise<void> {
    const key = await this.getKey(id);
    const entry = await this.get(key);
    if (entry) {
      this.dispose(entry.data);
    }
    await del(key);
  }

  static async clearAll(): Promise<void> {
    const allKeys = await keys();
    const ourKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(CACHE_PREFIX));
    await Promise.all(ourKeys.map(k => del(k)));
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