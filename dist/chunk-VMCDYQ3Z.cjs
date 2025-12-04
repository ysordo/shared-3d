"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkQRVOSZH3cjs = require('./chunk-QRVOSZH3.cjs');


var _chunk6IV7O3J7cjs = require('./chunk-6IV7O3J7.cjs');



var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/loaders/HDRILoader.ts
var HDRILoader = (_class = class {
  static __initStatic() {this.rgbeLoader = new (0, _chunkEA3XQ4KJcjs.RGBELoader)()}
  static __initStatic2() {this.webpLoader = new (0, _chunkQRVOSZH3cjs.WebPHDRLoader)()}
  /**
   * Carga un HDRI de forma inteligente (con caché + hash)
   */
  static async load(entry, events = {}) {
    const { id, url, hash } = entry;
    const { onProgress, onLoaded, onError } = events;
    const cached = await _chunk6IV7O3J7cjs.ObjectCache.get(id);
    if (cached && cached.hash === hash && cached.data instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      console.warn(`[HDRILoader] Cache hit: ${id}`);
      const texture = cached.data.clone();
      texture.userData = { ...cached.data.userData, cached: true };
      _optionalChain([onLoaded, 'optionalCall', _ => _(texture, entry)]);
      return texture;
    }
    const isWebP = url.toLowerCase().endsWith(".webp");
    const loader = isWebP ? this.webpLoader : this.rgbeLoader;
    console.warn(`[HDRILoader] Loading: ${id} (${isWebP ? "WebP-HDR" : "RGBE"})`);
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        async (texture) => {
          try {
            texture.mapping = _chunkEA3XQ4KJcjs.THREE.EquirectangularReflectionMapping;
            texture.colorSpace = _chunkEA3XQ4KJcjs.THREE.LinearSRGBColorSpace;
            texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
            texture.magFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            texture.name = id;
            texture.userData = {
              sourceUrl: url,
              manifestHash: hash,
              format: isWebP ? "webp-hdr" : "rgbe",
              loadedAt: Date.now()
            };
            await _chunk6IV7O3J7cjs.ObjectCache.set(id, texture, hash);
            _optionalChain([onLoaded, 'optionalCall', _2 => _2(texture, entry)]);
            resolve(texture);
          } catch (err) {
            _optionalChain([onError, 'optionalCall', _3 => _3(err, url)]);
            reject(err);
          }
        },
        (progress) => {
          if (progress.lengthComputable) {
            _optionalChain([onProgress, 'optionalCall', _4 => _4({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            })]);
          }
        },
        (error) => {
          console.error(`[HDRILoader] Error loading ${id}:`, error);
          _optionalChain([onError, 'optionalCall', _5 => _5(error, url)]);
          reject(error);
        }
      );
    });
  }
  /**
   * Precarga múltiples HDRIs
   */
  static async preload(entries, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          onLoaded: () => {
            completed++;
            _optionalChain([onProgress, 'optionalCall', _6 => _6(completed, total)]);
          },
          onError: (err, url) => console.error(`HDRI preload failed: ${url}`, err)
        })
      )
    );
  }
  /**
   * Invalida caché de un HDRI específico
   */
  static async invalidate(id) {
    const cached = await _chunk6IV7O3J7cjs.ObjectCache.get(id);
    if (_optionalChain([cached, 'optionalAccess', _7 => _7.data]) instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      cached.data.dispose();
    }
    await _chunk6IV7O3J7cjs.ObjectCache.delete(id);
  }
}, _class.__initStatic(), _class.__initStatic2(), _class);



exports.HDRILoader = HDRILoader;
