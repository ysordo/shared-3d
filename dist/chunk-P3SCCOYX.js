import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/cache/ObjectCache.ts
import { get, set, del, keys, createStore } from "idb-keyval";
var CACHE_PREFIX = "shared-3d:asset:";
var store = typeof window !== "undefined" ? createStore("shared-3d-db", "keyval") : null;
var ObjectCache = class {
  static getKey(id) {
    return `${CACHE_PREFIX}${id}`;
  }
  static async set(id, data, hash, updatedAt = Date.now()) {
    if (!store) {
      return;
    }
    const key = this.getKey(id);
    const entry = {
      data,
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
      updatedAt
    };
    await set(key, entry, store);
  }
  static async get(id) {
    if (!store) {
      return null;
    }
    const key = this.getKey(id);
    return await get(key, store) ?? null;
  }
  static async has(id) {
    if (!store) {
      return false;
    }
    const key = this.getKey(id);
    const all = await keys(store);
    return all.includes(key);
  }
  static async delete(id) {
    if (!store) {
      return;
    }
    const key = this.getKey(id);
    const entry = await this.get(key);
    if (entry) {
      this.dispose(entry.data);
    }
    await del(key, store);
  }
  static async clearAll() {
    if (!store) {
      return;
    }
    const all = await keys(store);
    const ours = all.filter((k) => typeof k === "string" && k.startsWith(CACHE_PREFIX));
    await Promise.all(ours.map((k) => del(k, store)));
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
