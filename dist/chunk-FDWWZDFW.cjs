"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkWXQKG26Gcjs = require('./chunk-WXQKG26G.cjs');



var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');


var _chunkUW5RKAXQcjs = require('./chunk-UW5RKAXQ.cjs');

// src/core/loaders/HDRILoader.ts
var HDRILoader = (_class = class {
  static __initStatic() {this.rgbeLoader = new (0, _chunkEA3XQ4KJcjs.RGBELoader)()}
  static __initStatic2() {this.webpLoader = new (0, _chunkWXQKG26Gcjs.WebPHDRLoader)()}
  static async load(entry, events = {}) {
    const { id, hash } = entry;
    const metadata = await _chunkUW5RKAXQcjs.ObjectCache.getMetadata(id);
    if (metadata && metadata.hash === hash) {
      console.info(`[HDRILoader] Cache hit: ${id}`);
      return this.fetchAndLoad(entry, events);
    }
    console.info(`[HDRILoader] Loading: ${id}`);
    const texture = await this.fetchAndLoad(entry, events);
    await _chunkUW5RKAXQcjs.ObjectCache.setMetadata(id, hash, entry.updatedAt);
    return texture;
  }
  static async fetchAndLoad(entry, events) {
    const { url } = entry;
    const { onProgress, onLoaded, onError } = events;
    const isWebP = url.toLowerCase().endsWith(".webp");
    const loader = isWebP ? this.webpLoader : this.rgbeLoader;
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (texture) => {
          texture.mapping = _chunkEA3XQ4KJcjs.THREE.EquirectangularReflectionMapping;
          texture.colorSpace = _chunkEA3XQ4KJcjs.THREE.LinearSRGBColorSpace;
          texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          texture.magFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.name = entry.id;
          texture.userData = {
            sourceUrl: url,
            manifestHash: entry.hash,
            format: isWebP ? "webp-hdr" : "rgbe",
            loadedAt: Date.now()
          };
          _optionalChain([onLoaded, 'optionalCall', _ => _(texture, entry)]);
          resolve(texture);
        },
        (progress) => {
          if (progress.lengthComputable) {
            _optionalChain([onProgress, 'optionalCall', _2 => _2({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            })]);
          }
        },
        (error) => {
          console.error(`[HDRILoader] Error loading ${entry.id}:`, error);
          _optionalChain([onError, 'optionalCall', _3 => _3(error, url)]);
          reject(error);
        }
      );
    });
  }
  static async preload(entries, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          onLoaded: () => {
            completed++;
            _optionalChain([onProgress, 'optionalCall', _4 => _4(completed, total)]);
          },
          onError: (err, url) => console.error(`HDRI preload failed: ${url}`, err)
        })
      )
    );
  }
  static async invalidate(id) {
    await _chunkUW5RKAXQcjs.ObjectCache.delete(id);
  }
}, _class.__initStatic(), _class.__initStatic2(), _class);



exports.HDRILoader = HDRILoader;
