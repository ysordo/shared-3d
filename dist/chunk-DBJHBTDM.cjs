"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkQPTSJCSBcjs = require('./chunk-QPTSJCSB.cjs');


var _chunkUW5RKAXQcjs = require('./chunk-UW5RKAXQ.cjs');



var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/loaders/HDRILoader.ts
var HDRILoader = (_class = class {
  static __initStatic() {this.rgbeLoader = new (0, _chunkEA3XQ4KJcjs.RGBELoader)()}
  static __initStatic2() {this.webpLoader = new (0, _chunkQPTSJCSBcjs.WebPHDRLoader)()}
  static __initStatic3() {this.defaultOptions = {
    dataType: _chunkEA3XQ4KJcjs.THREE.FloatType,
    exposure: 1,
    maxLuminance: 16,
    preserveHDR: true
  }}
  static __initStatic4() {this.currentOptions = { ...this.defaultOptions }}
  static configure(options) {
    this.currentOptions = { ...this.defaultOptions, ...options };
    if (options.dataType !== void 0) {
      this.webpLoader.setDataType(options.dataType);
    }
    if (options.exposure !== void 0) {
      this.webpLoader.setExposure(options.exposure);
    }
    if (options.maxLuminance !== void 0) {
      this.webpLoader.setMaxLuminance(options.maxLuminance);
    }
    if (options.preserveHDR !== void 0) {
      this.webpLoader.setPreserveHDR(options.preserveHDR);
    }
  }
  static reset() {
    this.currentOptions = { ...this.defaultOptions };
    this.webpLoader.setDataType(this.defaultOptions.dataType);
    this.webpLoader.setExposure(this.defaultOptions.exposure);
    this.webpLoader.setMaxLuminance(this.defaultOptions.maxLuminance);
    this.webpLoader.setPreserveHDR(this.defaultOptions.preserveHDR);
  }
  static getOptions() {
    return { ...this.currentOptions };
  }
  static async load(entry, events = {}, customOptions) {
    const { id, hash } = entry;
    const metadata = await _chunkUW5RKAXQcjs.ObjectCache.getMetadata(id);
    if (metadata && metadata.hash === hash) {
      return this.fetchAndLoad(entry, events, customOptions);
    }
    const texture = await this.fetchAndLoad(entry, events, customOptions);
    await _chunkUW5RKAXQcjs.ObjectCache.setMetadata(id, hash, entry.updatedAt);
    return texture;
  }
  static async fetchAndLoad(entry, events, customOptions) {
    const { url } = entry;
    const { onProgress, onLoaded, onError } = events;
    const isWebP = url.toLowerCase().endsWith(".webp");
    const options = customOptions ? { ...this.currentOptions, ...customOptions } : this.currentOptions;
    let loader = isWebP ? this.webpLoader : this.rgbeLoader;
    if (isWebP && customOptions) {
      const tempLoader = new (0, _chunkQPTSJCSBcjs.WebPHDRLoader)();
      if (customOptions.dataType !== void 0) {
        tempLoader.setDataType(customOptions.dataType);
      }
      if (customOptions.exposure !== void 0) {
        tempLoader.setExposure(customOptions.exposure);
      }
      if (customOptions.maxLuminance !== void 0) {
        tempLoader.setMaxLuminance(customOptions.maxLuminance);
      }
      if (customOptions.preserveHDR !== void 0) {
        tempLoader.setPreserveHDR(customOptions.preserveHDR);
      }
      loader = tempLoader;
    }
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (loadedTexture) => {
          loadedTexture.mapping = _chunkEA3XQ4KJcjs.THREE.EquirectangularReflectionMapping;
          loadedTexture.colorSpace = _chunkEA3XQ4KJcjs.THREE.LinearSRGBColorSpace;
          loadedTexture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          loadedTexture.magFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          loadedTexture.generateMipmaps = false;
          loadedTexture.needsUpdate = true;
          loadedTexture.name = entry.id;
          loadedTexture.userData = {
            ...loadedTexture.userData,
            sourceUrl: url,
            manifestHash: entry.hash,
            format: isWebP ? "webp-hdr" : "rgbe",
            loadedAt: Date.now(),
            loaderOptions: options
          };
          _optionalChain([onLoaded, 'optionalCall', _ => _(loadedTexture, entry)]);
          resolve(loadedTexture);
        },
        (progress) => {
          if (progress.lengthComputable) {
            _optionalChain([onProgress, 'optionalCall', _2 => _2({
              loaded: progress.loaded,
              total: progress.total,
              percent: Number.parseFloat((progress.loaded / progress.total * 100).toFixed(1)),
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
  static async preload(entries, onProgress, customOptions) {
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
        }, customOptions)
      )
    );
  }
  static async invalidate(id) {
    await _chunkUW5RKAXQcjs.ObjectCache.delete(id);
  }
}, _class.__initStatic(), _class.__initStatic2(), _class.__initStatic3(), _class.__initStatic4(), _class);



exports.HDRILoader = HDRILoader;
