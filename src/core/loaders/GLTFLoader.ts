import { ObjectCache } from '../cache/ObjectCache';
import type { ModelManifest, ManifestEntry } from '../cache/types';
import { THREE, ThreeGLTFLoader, ThreeDRACOLoader } from '../../lib';

export type GLTFLoaderOptions = {
  draco?: boolean | undefined;
  decoderPath?: string | undefined;
};

export type GLTFLoaderEvents = {
  onProgress?: (p: { loaded: number; total: number; percent: number; url: string }) => void | undefined;
  onLoaded?: (obj: THREE.Group, entry: ManifestEntry) => void | undefined;
  onError?: (err: Error, url: string) => void | undefined;
};

export class GLTFLoader {
  private static plainLoader = new ThreeGLTFLoader();
  private static dracoLoaderInstance = new ThreeGLTFLoader();
  private static dracoDecoder = new ThreeDRACOLoader();
  private static isDracoInitialized = false;

  private static getLoader(options: GLTFLoaderOptions = {}): ThreeGLTFLoader {
    const useDraco = options.draco === true;

    if (useDraco) {
      if (!this.isDracoInitialized) {
        const path = options.decoderPath || '/draco/';
        this.dracoDecoder.setDecoderPath(path);
        this.dracoDecoder.setDecoderConfig({ type: 'js' });
        this.dracoDecoder.preload();
        this.dracoLoaderInstance.setDRACOLoader(this.dracoDecoder);
        this.isDracoInitialized = true;
        console.info(`[GLTFLoader] Draco decoder initialized: ${path}`);
      }
      return this.dracoLoaderInstance;
    }

    return this.plainLoader;
  }


  private static async fetchAndLoad(entry: ManifestEntry, options: GLTFLoaderOptions & GLTFLoaderEvents) {
  const loader = this.getLoader(options);

  return new Promise<THREE.Group>((resolve, reject) => {
    loader.load(
      entry.url,
      (gltf) => {
        const scene = gltf.scene;
        scene.name = entry.id;
        scene.userData = {
          sourceUrl: entry.url,
          manifestHash: entry.hash,
          loadedAt: Date.now(),
          format: options.draco ? 'gltf-draco' : 'gltf',
        };

        scene.animations= gltf.animations;

        // Centrar modelo
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);
        options.onLoaded?.(scene, entry);

        resolve(scene);
      },
      (progress) => {
        if (progress.lengthComputable) {
          const percent = (progress.loaded / progress.total) * 100;
          options.onProgress?.({
            loaded: progress.loaded,
            total: progress.total,
            percent,
            url: entry.url,
          });
          console.info(`[GLTFLoader] ${entry.id}: ${percent.toFixed(1)}%`);
        }
      },
      (error) => {
        console.error(`[GLTFLoader] Error loading ${entry.id}:`, error);
        options.onError?.(error as Error, entry.url);
        reject(error);
      }
    );
  });
}

  static async load(
    entry: ManifestEntry,
    options: GLTFLoaderOptions & GLTFLoaderEvents = {}
  ): Promise<THREE.Group> {
    const opts = {
      draco: false,
      dracoDecoder: '/draco/',
      ...options,
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

  static async preload(
    entries: ModelManifest,
    options: GLTFLoaderOptions = {},
    onProgress?: (completed: number, total: number) => void
  ) {
    let completed = 0;
    const total = entries.length;

    await Promise.all(
      entries.map(entry =>
        this.load(entry, {
          ...options,
          onLoaded: () => onProgress?.(++completed, total),
          onError: (err, url) => console.error(`Preload failed: ${url}`, err),
        })
      )
    );
  }

  static async invalidate(id: string) {
    await ObjectCache.delete(id);
  }

  static async clearCache() {
    await ObjectCache.clearAll();
  }
}