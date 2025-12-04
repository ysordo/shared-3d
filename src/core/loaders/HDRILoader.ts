import { WebPHDRLoader } from './WebPHDRLoader';
import { ObjectCache } from '../cache/ObjectCache';
import type { ManifestEntry, ModelManifest } from '../cache/types';
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

export class HDRILoader {
  private static rgbeLoader = new ThreeRGBELoader();
  private static webpLoader = new WebPHDRLoader();

  /**
   * Carga un HDRI de forma inteligente (con caché + hash)
   */
  static async load(
    entry: ManifestEntry,
    events: HDRIEvents = {}
  ): Promise<THREE.Texture> {
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

    const isWebP = url.toLowerCase().endsWith('.webp');
    const loader = isWebP ? this.webpLoader : this.rgbeLoader;

    console.warn(`[HDRILoader] Loading: ${id} (${isWebP ? 'WebP-HDR' : 'RGBE'})`);

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        async (texture: THREE.Texture) => {
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
              format: isWebP ? 'webp-hdr' : 'rgbe',
              loadedAt: Date.now(),
            };

            await ObjectCache.set<THREE.Texture>(id, texture, hash);

            onLoaded?.(texture, entry);
            resolve(texture);
          } catch (err) {
            onError?.(err as Error, url);
            reject(err);
          }
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
          console.error(`[HDRILoader] Error loading ${id}:`, error);
          onError?.(error as Error, url);
          reject(error);
        }
      );
    });
  }

  /**
   * Precarga múltiples HDRIs
   */
  static async preload(
    entries: ModelManifest,
    onProgress?: (completed: number, total: number) => void
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
        })
      )
    );
  }

  /**
   * Invalida caché de un HDRI específico
   */
  static async invalidate(id: string): Promise<void> {
    const cached = await ObjectCache.get(id);
    if (cached?.data instanceof THREE.Texture) {
      cached.data.dispose();
    }
    await ObjectCache.delete(id);
  }
}