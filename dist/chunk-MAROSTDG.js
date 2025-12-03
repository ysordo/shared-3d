import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/cache/ObjectCache.ts
import { get, set, del, keys } from "idb-keyval";
var CACHE_PREFIX = "shared-3d:asset:";
var ObjectCache = class {
  static async getKey(id) {
    return `${CACHE_PREFIX}${id}`;
  }
  static async set(id, data, hash, updatedAt = Date.now()) {
    const key = await this.getKey(id);
    const entry = {
      data,
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
      updatedAt
    };
    await set(key, entry);
  }
  static async get(id) {
    const key = await this.getKey(id);
    return await get(key) ?? null;
  }
  static async has(id) {
    const key = await this.getKey(id);
    const all = await keys();
    return all.includes(key);
  }
  static async delete(id) {
    const key = await this.getKey(id);
    const entry = await this.get(key);
    if (entry) {
      this.dispose(entry.data);
    }
    await del(key);
  }
  static async clearAll() {
    const allKeys = await keys();
    const ourKeys = allKeys.filter((k) => typeof k === "string" && k.startsWith(CACHE_PREFIX));
    await Promise.all(ourKeys.map((k) => del(k)));
  }
  static dispose(data) {
    if (data instanceof THREE.Object3D) {
      data.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    } else if (data instanceof THREE.Texture) {
      data.dispose();
    }
  }
  static estimateSize(data) {
    if (data instanceof THREE.Object3D) {
      let size = 0;
      data.traverse((child) => {
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
};

export {
  ObjectCache
};
