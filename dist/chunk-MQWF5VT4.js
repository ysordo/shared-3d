import {
  WebPHDRLoader
} from "./chunk-J3SAIRP2.js";
import {
  ObjectCache
} from "./chunk-D5LBHGVM.js";
import {
  RGBELoader,
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/loaders/HDRILoader.ts
var HDRILoader = class {
  static rgbeLoader = new RGBELoader();
  static webpLoader = new WebPHDRLoader();
  /**
   * Carga un HDRI de forma inteligente (con caché + hash)
   */
  static async load(entry, events = {}) {
    const { id, url, hash } = entry;
    const { onProgress, onLoaded, onError } = events;
    const cached = await ObjectCache.get(id);
    if (cached && cached.hash === hash && cached.data instanceof THREE.Texture) {
      console.warn(`[HDRILoader] Cache hit: ${id}`);
      const texture = cached.data.clone();
      texture.userData = { ...cached.data.userData, cached: true };
      onLoaded?.(texture, entry);
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
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.LinearSRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            texture.name = id;
            texture.userData = {
              sourceUrl: url,
              manifestHash: hash,
              format: isWebP ? "webp-hdr" : "rgbe",
              loadedAt: Date.now()
            };
            await ObjectCache.set(id, texture, hash);
            onLoaded?.(texture, entry);
            resolve(texture);
          } catch (err) {
            onError?.(err, url);
            reject(err);
          }
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
          console.error(`[HDRILoader] Error loading ${id}:`, error);
          onError?.(error, url);
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
            onProgress?.(completed, total);
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
    const cached = await ObjectCache.get(id);
    if (cached?.data instanceof THREE.Texture) {
      cached.data.dispose();
    }
    await ObjectCache.delete(id);
  }
};

export {
  HDRILoader
};
