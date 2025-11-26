/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/cache/ObjectCache.ts → VERSIÓN DEFINITIVA v1.0.5
import { get, set, del, keys } from 'idb-keyval';
import * as THREE from 'three';
import type { CacheEntry } from './types';



const CACHE_PREFIX = 'shared-3d:asset:'; // ← Cambiado para incluir texturas

export class ObjectCache {
  private static async getKey(id: string): Promise<string> {
    return `${CACHE_PREFIX}${id}`;
  }

  // === SET: ahora genérico ===
  static async set<T>(id: string, data: T, hash: string): Promise<void> {
    const key = await this.getKey(id);
    const entry: CacheEntry<T> = {
      data: structuredClone ? structuredClone(data) : this.deepClone(data), // ← Mejor que .clone() en algunos casos
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
    };
    await set(key, entry);
  }

  // === GET: ahora genérico ===
  static async get<T>(id: string): Promise<CacheEntry<T> | null> {
    const key = await this.getKey(id);
    const entry = await get<CacheEntry<T>>(key);
    return entry || null;
  }

  static async has(id: string): Promise<boolean> {
    const key = await this.getKey(id);
    const all = await keys();
    return all.includes(key as string);
  }

  // === DELETE: ahora con dispose inteligente ===
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

  // === DISPOSE INTELIGENTE (soporta Object3D y Texture) ===
  private static dispose(data: any): void {
    if (data instanceof THREE.Object3D) {
      data.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            ((child as THREE.Mesh).material as THREE.Material[]).forEach(m => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    } else if (data instanceof THREE.Texture) {
      data.dispose();
    } else if (data instanceof THREE.BufferGeometry) {
      data.dispose();
    }
  }

  // === ESTIMAR TAMAÑO (mejorado) ===
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
    return  0;
  }

  // === CLONE PROFUNDO (fallback si no hay structuredClone) ===
  private static deepClone<T>(obj: T): T {
    if (obj instanceof THREE.Object3D) {
      return obj.clone() as T;
    }
    if (obj instanceof THREE.Texture) {
      return obj.clone() as T;
    }
    return JSON.parse(JSON.stringify(obj));
  }
}