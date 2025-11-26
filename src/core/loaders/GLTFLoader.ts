/* eslint-disable no-console */
// src/core/loaders/GLTFLoader.ts
import * as THREE from 'three';
import { GLTFLoader as ThreeGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader as ThreeDRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { ObjectCache } from '../cache/ObjectCache';
import type { ModelManifestEntry } from '../cache/types';

export type GLTFLoaderOptions = {
  draco?: boolean | undefined;        // ← ¡La magia!
  decoderPath?: string | undefined;   // opcional: /draco/ por defecto
};

export type GLTFLoaderEvents = {
  onProgress?: (p: { loaded: number; total: number; percent: number; url: string }) => void | undefined;
  onLoaded?: (obj: THREE.Group, entry: ModelManifestEntry) => void | undefined;
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
      // Solo inicializamos UNA vez
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

  static async load(
    entry: ModelManifestEntry,
    options: GLTFLoaderOptions & GLTFLoaderEvents = {}
  ): Promise<THREE.Group> {
    const { id, url, hash } = entry;
    const {
      draco = false,
      decoderPath,
      onProgress,
      onLoaded,
      onError,
    } = options;

    const loader = this.getLoader({ draco, decoderPath });

    // Cache hit (igual para ambos)
    const cached = await ObjectCache.get<THREE.Group>(id);
    if (cached && cached.hash === hash) {
      console.info(`[GLTFLoader] Cache hit: ${id} (${draco ? 'draco' : 'standard'})`);
      const model = cached.data.clone(true);
      model.userData = { ...cached.data.userData, cached: true };
      onLoaded?.(model, entry);
      return model;
    }

    console.info(`[GLTFLoader] Loading: ${id} (${draco ? 'Draco' : 'Standard'})`);

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        async (gltf) => {
          try {
            const scene = gltf.scene as THREE.Group;
            scene.name = id;
            scene.animations = gltf.animations || [];

            // Centrado automático
            const box = new THREE.Box3().setFromObject(scene);
            scene.position.sub(box.getCenter(new THREE.Vector3()));

            scene.userData = {
              sourceUrl: url,
              manifestHash: hash,
              loadedAt: Date.now(),
              format: draco ? 'gltf-draco' : 'gltf',
              draco,
            };

            await ObjectCache.set(id, scene, hash);
            onLoaded?.(scene, entry);
            resolve(scene);
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
          console.error(`[GLTFLoader] Error: ${id}`, error);
          onError?.(error as Error, url);
          reject(error);
        }
      );
    });
  }

  // preload unificado
  static async preload(
    entries: ModelManifestEntry[],
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