"use strict";Object.defineProperty(exports, "__esModule", {value: true}); async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/cache/ObjectCache.ts
var _idbkeyval = require('idb-keyval');
var CACHE_PREFIX = "shared-3d:asset:";
var store = typeof window !== "undefined" ? _idbkeyval.createStore.call(void 0, "shared-3d-db", "keyval") : null;
var ObjectCache = class {
  static getKey(id) {
    return `${CACHE_PREFIX}${id}`;
  }
  static async set(id, data, hash, updatedAt = Date.now()) {
    if (!store) {
      return;
    }
    const key = this.getKey(id);
    const t = await _asyncNullishCoalesce(await _idbkeyval.get.call(void 0, key, store), async () => ( null));
    if (t) {
      return;
    }
    const entry = {
      data,
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
      updatedAt
    };
    await _idbkeyval.set.call(void 0, key, entry, store);
  }
  static async get(id) {
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
    const entry = await this.get(key);
    if (entry) {
      this.dispose(entry.data);
    }
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
  static dispose(data) {
    if (data instanceof _chunkEA3XQ4KJcjs.THREE.Object3D) {
      data.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _ => _.geometry, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _4 => _4.material, 'optionalAccess', _5 => _5.dispose, 'call', _6 => _6()]);
          }
        }
      });
    } else if (data instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      data.dispose();
    }
  }
  static estimateSize(data) {
    if (data instanceof _chunkEA3XQ4KJcjs.THREE.Object3D) {
      let size = 0;
      data.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && _optionalChain([child, 'access', _7 => _7.geometry, 'optionalAccess', _8 => _8.attributes, 'optionalAccess', _9 => _9.position, 'optionalAccess', _10 => _10.array])) {
          size += child.geometry.attributes.position.array.byteLength;
        }
      });
      return size;
    }
    if (data instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      const array = _optionalChain([data, 'access', _11 => _11.source, 'optionalAccess', _12 => _12.data]) || _optionalChain([data, 'access', _13 => _13.image, 'optionalAccess', _14 => _14.data]);
      return _optionalChain([array, 'optionalAccess', _15 => _15.byteLength]) || 0;
    }
    return 0;
  }
};



exports.ObjectCache = ObjectCache;
