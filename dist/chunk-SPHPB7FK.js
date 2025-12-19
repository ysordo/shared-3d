import {
  DRACOLoader,
  GLTFLoader,
  THREE
} from "./chunk-OVHQQSEK.js";
import {
  ObjectCache
} from "./chunk-5QJW7WE3.js";

// src/core/loaders/GLTFLoader.ts
var GLTFLoader2 = class {
  static plainLoader = new GLTFLoader();
  static dracoLoaderInstance = new GLTFLoader();
  static dracoDecoder = new DRACOLoader();
  static isDracoInitialized = false;
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
          const box = new THREE.Box3().setFromObject(scene);
          const center = box.getCenter(new THREE.Vector3());
          scene.position.sub(center);
          options.onLoaded?.(scene, entry);
          resolve(scene);
        },
        (progress) => {
          if (progress.lengthComputable) {
            const percent = progress.loaded / progress.total * 100;
            options.onProgress?.({
              loaded: progress.loaded,
              total: progress.total,
              percent: Number.parseFloat(percent.toFixed(1)),
              url: entry.url
            });
          } else {
            const percent = progress.loaded / entry.size * 100;
            options.onProgress?.({
              loaded: progress.loaded,
              total: entry.size,
              percent: Number.parseFloat(percent.toFixed(1)),
              url: entry.url
            });
          }
        },
        (error) => {
          options.onError?.(error, entry.url);
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
    const metadata = await ObjectCache.getMetadata(entry.id);
    if (metadata && metadata.hash === entry.hash) {
      console.info(`[GLTFLoader] Cache hit: ${entry.id}`);
      return this.fetchAndLoad(entry, opts);
    }
    console.info(`[GLTFLoader] Loading: ${entry.id}`);
    const scene = await this.fetchAndLoad(entry, opts);
    await ObjectCache.setMetadata(entry.id, entry.hash, entry.updatedAt);
    return scene;
  }
  static async preload(entries, options = {}, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          ...options,
          onLoaded: (...prev) => onProgress?.(...prev, ++completed, total),
          onError: (err, url) => console.error(`Preload failed: ${url}`, err)
        })
      )
    );
  }
  static async invalidate(id) {
    await ObjectCache.delete(id);
  }
  static async clearCache() {
    await ObjectCache.clearAll();
  }
};

export {
  GLTFLoader2 as GLTFLoader
};
