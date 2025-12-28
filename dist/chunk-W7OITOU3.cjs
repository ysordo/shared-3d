"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkUW5RKAXQcjs = require('./chunk-UW5RKAXQ.cjs');




var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/loaders/GLTFLoader.ts
var GLTFLoader2 = (_class = class {
  static __initStatic() {this.plainLoader = new (0, _chunkEA3XQ4KJcjs.GLTFLoader)()}
  static __initStatic2() {this.dracoLoaderInstance = new (0, _chunkEA3XQ4KJcjs.GLTFLoader)()}
  static __initStatic3() {this.dracoDecoder = new (0, _chunkEA3XQ4KJcjs.DRACOLoader)()}
  static __initStatic4() {this.isDracoInitialized = false}
  static getLoader(options = {}) {
    const useDraco = options.draco === true;
    if (useDraco) {
      if (!this.isDracoInitialized) {
        const path = options.decoderPath || "/draco/";
        this.dracoDecoder.setDecoderPath(path);
        this.dracoDecoder.setDecoderConfig({ type: "js" });
        this.dracoDecoder.preload();
        this.dracoLoaderInstance.setDRACOLoader(this.dracoDecoder);
        this.isDracoInitialized = true;
        console.info(`[GLTFLoader] Draco decoder initialized: ${path}`);
      }
      return this.dracoLoaderInstance;
    }
    return this.plainLoader;
  }
  static async fetchAndLoad(entry, options) {
    const loader = this.getLoader(options);
    return new Promise((resolve, reject) => {
      loader.load(
        entry.url,
        (gltf) => {
          const scene = gltf.scene;
          scene.name = entry.id;
          scene.userData = {
            sourceUrl: entry.url,
            manifestHash: entry.hash,
            loadedAt: Date.now(),
            format: options.draco ? "gltf-draco" : "gltf"
          };
          scene.animations = gltf.animations;
          const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(scene);
          const center = box.getCenter(new _chunkEA3XQ4KJcjs.THREE.Vector3());
          scene.position.sub(center);
          _optionalChain([options, 'access', _ => _.onLoaded, 'optionalCall', _2 => _2(scene, entry)]);
          resolve(scene);
        },
        (progress) => {
          if (progress.lengthComputable) {
            const percent = progress.loaded / progress.total * 100;
            _optionalChain([options, 'access', _3 => _3.onProgress, 'optionalCall', _4 => _4({
              loaded: progress.loaded,
              total: progress.total,
              percent: Number.parseFloat(percent.toFixed(1)),
              url: entry.url
            })]);
          } else {
            const percent = progress.loaded / entry.size * 100;
            _optionalChain([options, 'access', _5 => _5.onProgress, 'optionalCall', _6 => _6({
              loaded: progress.loaded,
              total: entry.size,
              percent: Number.parseFloat(percent.toFixed(1)),
              url: entry.url
            })]);
          }
        },
        (error) => {
          _optionalChain([options, 'access', _7 => _7.onError, 'optionalCall', _8 => _8(error, entry.url)]);
          reject(error);
        }
      );
    });
  }
  static async load(entry, options = {}) {
    const opts = {
      draco: false,
      dracoDecoder: "/draco/",
      ...options
    };
    const metadata = await _chunkUW5RKAXQcjs.ObjectCache.getMetadata(entry.id);
    if (metadata && metadata.hash === entry.hash) {
      console.info(`[GLTFLoader] Cache hit: ${entry.id}`);
      return this.fetchAndLoad(entry, opts);
    }
    console.info(`[GLTFLoader] Loading: ${entry.id}`);
    const scene = await this.fetchAndLoad(entry, opts);
    await _chunkUW5RKAXQcjs.ObjectCache.setMetadata(entry.id, entry.hash, entry.updatedAt);
    return scene;
  }
  static async preload(entries, options = {}, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          ...options,
          onLoaded: (...prev) => _optionalChain([onProgress, 'optionalCall', _9 => _9(...prev, ++completed, total)]),
          onProgress: ({ percent }) => _optionalChain([onProgress, 'optionalCall', _10 => _10(void 0, entry, completed, total, percent)]),
          onError: (err, url) => console.error(`Preload failed: ${url}`, err)
        })
      )
    );
  }
  static async invalidate(id) {
    await _chunkUW5RKAXQcjs.ObjectCache.delete(id);
  }
  static async clearCache() {
    await _chunkUW5RKAXQcjs.ObjectCache.clearAll();
  }
}, _class.__initStatic(), _class.__initStatic2(), _class.__initStatic3(), _class.__initStatic4(), _class);



exports.GLTFLoader = GLTFLoader2;
