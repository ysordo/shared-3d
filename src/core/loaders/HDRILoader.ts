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

export class HDRILoader {
  private static rgbeLoader = new ThreeRGBELoader();
  private static webpLoader = new WebPHDRLoader();

  static async load(
    entry: ManifestEntry,
    events: HDRIEvents = {}
  ): Promise<THREE.Texture> {
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

  private static async fetchAndLoad(
    entry: ManifestEntry,
    events: HDRIEvents
  ): Promise<THREE.Texture> {
    const { url } = entry;
    const { onProgress, onLoaded, onError } = events;

    const isWebP = url.toLowerCase().endsWith('.webp');
    const loader = isWebP ? this.webpLoader : this.rgbeLoader;

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

  static async invalidate(id: string): Promise<void> {
    await ObjectCache.delete(id);
  }
}