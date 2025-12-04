import {
  WebPHDRLoader
} from "./chunk-J3SAIRP2.js";
import {
  RGBELoader,
  THREE
} from "./chunk-OVHQQSEK.js";
import {
  ObjectCache
} from "./chunk-5QJW7WE3.js";

// src/core/loaders/HDRILoader.ts
var HDRILoader = class {
  static rgbeLoader = new RGBELoader();
  static webpLoader = new WebPHDRLoader();
  static async load(entry, events = {}) {
    const { id, hash } = entry;
    const metadata = await ObjectCache.getMetadata(id);
    if (metadata && metadata.hash === hash) {
      console.info(`[HDRILoader] Cache hit: ${id}`);
      return this.fetchAndLoad(entry, events);
    }
    console.info(`[HDRILoader] Loading: ${id}`);
    const texture = await this.fetchAndLoad(entry, events);
    await ObjectCache.setMetadata(id, hash, entry.updatedAt);
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
          texture.mapping = THREE.EquirectangularReflectionMapping;
          texture.colorSpace = THREE.LinearSRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.name = entry.id;
          texture.userData = {
            sourceUrl: url,
            manifestHash: entry.hash,
            format: isWebP ? "webp-hdr" : "rgbe",
            loadedAt: Date.now()
          };
          onLoaded?.(texture, entry);
          resolve(texture);
        },
        (progress) => {
          if (progress.lengthComputable) {
            onProgress?.({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            });
          }
        },
        (error) => {
          console.error(`[HDRILoader] Error loading ${entry.id}:`, error);
          onError?.(error, url);
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
            onProgress?.(completed, total);
          },
          onError: (err, url) => console.error(`HDRI preload failed: ${url}`, err)
        })
      )
    );
  }
  static async invalidate(id) {
    await ObjectCache.delete(id);
  }
};

export {
  HDRILoader
};
