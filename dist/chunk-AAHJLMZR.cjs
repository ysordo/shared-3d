"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunk6XZVAT27cjs = require('./chunk-6XZVAT27.cjs');




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
  static async load(entry, options = {}) {
    const { id, url, hash } = entry;
    const {
      draco = false,
      decoderPath,
      onProgress,
      onLoaded,
      onError
    } = options;
    const loader = this.getLoader({ draco, decoderPath });
    const cached = await _chunk6XZVAT27cjs.ObjectCache.get(id);
    if (cached && cached.hash === hash) {
      console.info(`[GLTFLoader] Cache hit: ${id} (${draco ? "draco" : "standard"})`);
      const model = cached.data.clone(true);
      model.userData = { ...cached.data.userData, cached: true };
      _optionalChain([onLoaded, 'optionalCall', _ => _(model, entry)]);
      return model;
    }
    console.info(`[GLTFLoader] Loading: ${id} (${draco ? "Draco" : "Standard"})`);
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        async (gltf) => {
          try {
            const scene = gltf.scene;
            scene.name = id;
            scene.animations = gltf.animations || [];
            const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(scene);
            scene.position.sub(box.getCenter(new _chunkEA3XQ4KJcjs.THREE.Vector3()));
            scene.userData = {
              sourceUrl: url,
              manifestHash: hash,
              loadedAt: Date.now(),
              format: draco ? "gltf-draco" : "gltf",
              draco
            };
            await _chunk6XZVAT27cjs.ObjectCache.set(id, scene, hash);
            _optionalChain([onLoaded, 'optionalCall', _2 => _2(scene, entry)]);
            resolve(scene);
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
          console.error(`[GLTFLoader] Error: ${id}`, error);
          _optionalChain([onError, 'optionalCall', _5 => _5(error, url)]);
          reject(error);
        }
      );
    });
  }
  static async preload(entries, options = {}, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          ...options,
          onLoaded: () => _optionalChain([onProgress, 'optionalCall', _6 => _6(++completed, total)]),
          onError: (err, url) => console.error(`Preload failed: ${url}`, err)
        })
      )
    );
  }
  static async invalidate(id) {
    await _chunk6XZVAT27cjs.ObjectCache.delete(id);
  }
  static async clearCache() {
    await _chunk6XZVAT27cjs.ObjectCache.clearAll();
  }
}, _class.__initStatic(), _class.__initStatic2(), _class.__initStatic3(), _class.__initStatic4(), _class);



exports.GLTFLoader = GLTFLoader2;
