import {
  WebPHDRLoader
} from "./chunk-W5OYT3BE.js";
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
  // Opciones globales por defecto
  static defaultOptions = {
    dataType: THREE.FloatType,
    exposure: 1,
    maxLuminance: 16,
    preserveHDR: true
  };
  // Opciones actuales
  static currentOptions = { ...this.defaultOptions };
  /**
   * Configura las opciones globales del loader
   */
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
    if (options.rgbeLoaderOptions) {
    }
  }
  /**
   * Restaura las opciones por defecto
   */
  static reset() {
    this.currentOptions = { ...this.defaultOptions };
    this.webpLoader.setDataType(this.defaultOptions.dataType);
    this.webpLoader.setExposure(this.defaultOptions.exposure);
    this.webpLoader.setMaxLuminance(this.defaultOptions.maxLuminance);
    this.webpLoader.setPreserveHDR(this.defaultOptions.preserveHDR);
  }
  /**
   * Obtiene las opciones actuales
   */
  static getOptions() {
    return { ...this.currentOptions };
  }
  static async load(entry, events = {}, customOptions) {
    const { id, hash } = entry;
    const metadata = await ObjectCache.getMetadata(id);
    if (metadata && metadata.hash === hash) {
      return this.fetchAndLoad(entry, events, customOptions);
    }
    const texture = await this.fetchAndLoad(entry, events, customOptions);
    await ObjectCache.setMetadata(id, hash, entry.updatedAt);
    return texture;
  }
  static async fetchAndLoad(entry, events, customOptions) {
    const { url } = entry;
    const { onProgress, onLoaded, onError } = events;
    const isWebP = url.toLowerCase().endsWith(".webp");
    const options = customOptions ? { ...this.currentOptions, ...customOptions } : this.currentOptions;
    let loader = isWebP ? this.webpLoader : this.rgbeLoader;
    if (isWebP && customOptions) {
      const tempLoader = new WebPHDRLoader();
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
      const texture = loader.load(
        url,
        (loadedTexture, data) => {
          loadedTexture.mapping = THREE.EquirectangularReflectionMapping;
          loadedTexture.colorSpace = THREE.LinearSRGBColorSpace;
          loadedTexture.minFilter = THREE.LinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
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
          onLoaded?.(loadedTexture, entry);
          resolve(loadedTexture);
        },
        (progress) => {
          if (progress.lengthComputable) {
            onProgress?.({
              loaded: progress.loaded,
              total: progress.total,
              percent: Number.parseFloat((progress.loaded / progress.total * 100).toFixed(1)),
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
  static async preload(entries, onProgress, customOptions) {
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
        }, customOptions)
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
