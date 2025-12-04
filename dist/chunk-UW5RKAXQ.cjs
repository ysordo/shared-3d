"use strict";Object.defineProperty(exports, "__esModule", {value: true}); async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } }// src/core/cache/ObjectCache.ts
var _idbkeyval = require('idb-keyval');
var CACHE_PREFIX = "shared-3d:asset:";
var store = typeof window !== "undefined" ? _idbkeyval.createStore.call(void 0, "shared-3d-db", "keyval") : null;
var ObjectCache = class {
  static getKey(id) {
    return `${CACHE_PREFIX}${id}`;
  }
  static async setMetadata(id, hash, updatedAt = Date.now()) {
    if (!store) {
      return;
    }
    const key = this.getKey(id);
    const t = await _idbkeyval.get.call(void 0, key, store);
    if (t && t.hash === hash) {
      return;
    }
    const entry = {
      hash,
      timestamp: Date.now(),
      updatedAt
    };
    await _idbkeyval.set.call(void 0, key, entry, store);
  }
  static async getMetadata(id) {
    if (!store) {
      return null;
    }
    const key = this.getKey(id);
    return await _asyncNullishCoalesce(await _idbkeyval.get.call(void 0, key, store), async () => ( null));
  }
  static async has(id) {
    if (!store) {
      return false;
    }
    const key = this.getKey(id);
    const all = await _idbkeyval.keys.call(void 0, store);
    return all.includes(key);
  }
  static async delete(id) {
    if (!store) {
      return;
    }
    const key = this.getKey(id);
    await _idbkeyval.del.call(void 0, key, store);
  }
  static async clearAll() {
    if (!store) {
      return;
    }
    const all = await _idbkeyval.keys.call(void 0, store);
    const ours = all.filter((k) => typeof k === "string" && k.startsWith(CACHE_PREFIX));
    await Promise.all(ours.map((k) => _idbkeyval.del.call(void 0, k, store)));
  }
};



exports.ObjectCache = ObjectCache;
