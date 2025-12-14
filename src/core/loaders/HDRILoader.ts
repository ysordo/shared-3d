// src/core/loaders/HDRILoader.ts
import { WebPHDRLoader } from './WebPHDRLoader';
import { ObjectCache } from '../cache/ObjectCache';
import type { ManifestEntry } from '../cache/types';
import { THREE, ThreeRGBELoader } from '../../lib';

export type HDRIProgress = {
  loaded: number;
  total: number;
  percent: number;
  url: string;
};

export type HDRIEvents = {
  onProgress?: (progress: HDRIProgress) => void;
  onLoaded?: (texture: THREE.Texture, entry: ManifestEntry) => void;
  onError?: (error: Error, url: string) => void;
};

export type HDRILoaderOptions = {
  // Opciones para WebPHDRLoader
  dataType?: typeof THREE.FloatType | typeof THREE.HalfFloatType;
  exposure?: number;
  maxLuminance?: number;
  preserveHDR?: boolean;
  
  // Opciones para RGBELoader (si aplican)
  rgbeLoaderOptions?: any;
};

export class HDRILoader {
  private static rgbeLoader = new ThreeRGBELoader();
  private static webpLoader = new WebPHDRLoader();
  
  // Opciones globales por defecto
  private static defaultOptions: HDRILoaderOptions = {
    dataType: THREE.FloatType,
    exposure: 1.0,
    maxLuminance: 16.0,
    preserveHDR: true,
  };
  
  // Opciones actuales
  private static currentOptions = { ...this.defaultOptions };

  /**
   * Configura las opciones globales del loader
   */
  static configure(options: HDRILoaderOptions): void {
    this.currentOptions = { ...this.defaultOptions, ...options };
    
    // Aplica las opciones a los loaders existentes
    if (options.dataType !== undefined) {
      this.webpLoader.setDataType(options.dataType);
    }
    if (options.exposure !== undefined) {
      this.webpLoader.setExposure(options.exposure);
    }
    if (options.maxLuminance !== undefined) {
      this.webpLoader.setMaxLuminance(options.maxLuminance);
    }
    if (options.preserveHDR !== undefined) {
      this.webpLoader.setPreserveHDR(options.preserveHDR);
    }
    
    // Aplicar opciones al RGBE loader si es necesario
    if (options.rgbeLoaderOptions) {
      // Configurar RGBELoader según sea necesario
      // this.rgbeLoader.setSomething(options.rgbeLoaderOptions.something);
    }
  }

  /**
   * Restaura las opciones por defecto
   */
  static reset(): void {
    this.currentOptions = { ...this.defaultOptions };
    this.webpLoader.setDataType(this.defaultOptions.dataType!);
    this.webpLoader.setExposure(this.defaultOptions.exposure!);
    this.webpLoader.setMaxLuminance(this.defaultOptions.maxLuminance!);
    this.webpLoader.setPreserveHDR(this.defaultOptions.preserveHDR!);
  }

  /**
   * Obtiene las opciones actuales
   */
  static getOptions(): HDRILoaderOptions {
    return { ...this.currentOptions };
  }

  static async load(
    entry: ManifestEntry,
    events: HDRIEvents = {},
    customOptions?: HDRILoaderOptions
  ): Promise<THREE.Texture> {
    const { id, hash } = entry;

    const metadata = await ObjectCache.getMetadata(id);
    if (metadata && metadata.hash === hash) {
      console.info(`[HDRILoader] Cache hit: ${id}`);
      return this.fetchAndLoad(entry, events, customOptions);
    }

    console.info(`[HDRILoader] Loading: ${id}`);
    const texture = await this.fetchAndLoad(entry, events, customOptions);

    await ObjectCache.setMetadata(id, hash, entry.updatedAt);

    return texture;
  }

  private static async fetchAndLoad(
    entry: ManifestEntry,
    events: HDRIEvents,
    customOptions?: HDRILoaderOptions
  ): Promise<THREE.Texture> {
    const { url } = entry;
    const { onProgress, onLoaded, onError } = events;

    const isWebP = url.toLowerCase().endsWith('.webp');
    
    // Usa opciones personalizadas si se proporcionan, de lo contrario usa las globales
    const options = customOptions ? { ...this.currentOptions, ...customOptions } : this.currentOptions;
    
    // Configura los loaders con las opciones apropiadas
    let loader = isWebP ? this.webpLoader : this.rgbeLoader;
    
    if (isWebP && customOptions) {
      // Para WebP, crea un loader temporal con las opciones personalizadas
      const tempLoader = new WebPHDRLoader();
      
      // Aplica todas las opciones relevantes
      if (customOptions.dataType !== undefined) {
        tempLoader.setDataType(customOptions.dataType);
      }
      if (customOptions.exposure !== undefined) {
        tempLoader.setExposure(customOptions.exposure);
      }
      if (customOptions.maxLuminance !== undefined) {
        tempLoader.setMaxLuminance(customOptions.maxLuminance);
      }
      if (customOptions.preserveHDR !== undefined) {
        tempLoader.setPreserveHDR(customOptions.preserveHDR);
      }
      
      loader = tempLoader;
    }

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (texture: THREE.Texture) => {
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
            format: isWebP ? 'webp-hdr' : 'rgbe',
            loadedAt: Date.now(),
            loaderOptions: options, // Guarda las opciones usadas
            ...(isWebP ? {
              hdrStats: texture.userData?.maxLuminance ? {
                maxLuminance: texture.userData.maxLuminance,
                averageLuminance: texture.userData.averageLuminance,
                exposure: options.exposure
              } : undefined
            } : {})
          };

          onLoaded?.(texture, entry);
          resolve(texture);
        },
        (progress) => {
          if (progress.lengthComputable) {
            onProgress?.({
              loaded: progress.loaded,
              total: progress.total,
              percent: (progress.loaded / progress.total) * 100,
              url,
            });
          }
        },
        (error) => {
          console.error(`[HDRILoader] Error loading ${entry.id}:`, error);
          onError?.(error as Error, url);
          reject(error);
        }
      );
    });
  }

  static async preload(
    entries: ManifestEntry[],
    onProgress?: (completed: number, total: number) => void,
    customOptions?: HDRILoaderOptions
  ): Promise<void> {
    let completed = 0;
    const total = entries.length;

    await Promise.all(
      entries.map((entry) =>
        this.load(entry, {
          onLoaded: () => {
            completed++;
            onProgress?.(completed, total);
          },
          onError: (err, url) => console.error(`HDRI preload failed: ${url}`, err),
        }, customOptions)
      )
    );
  }

  static async invalidate(id: string): Promise<void> {
    await ObjectCache.delete(id);
  }
}