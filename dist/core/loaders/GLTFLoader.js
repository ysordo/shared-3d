/* eslint-disable no-console */
import { ObjectCache } from '../cache/ObjectCache';
import { THREE, ThreeGLTFLoader, ThreeDRACOLoader } from '../../lib';
export class GLTFLoader {
    static plainLoader = new ThreeGLTFLoader();
    static dracoLoaderInstance = new ThreeGLTFLoader();
    static dracoDecoder = new ThreeDRACOLoader();
    static isDracoInitialized = false;
    static getLoader(options = {}) {
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
    static async load(entry, options = {}) {
        const { id, url, hash } = entry;
        const { draco = false, decoderPath, onProgress, onLoaded, onError, } = options;
        const loader = this.getLoader({ draco, decoderPath });
        const cached = await ObjectCache.get(id);
        if (cached && cached.hash === hash) {
            console.info(`[GLTFLoader] Cache hit: ${id} (${draco ? 'draco' : 'standard'})`);
            const model = cached.data.clone(true);
            model.userData = { ...cached.data.userData, cached: true };
            onLoaded?.(model, entry);
            return model;
        }
        console.info(`[GLTFLoader] Loading: ${id} (${draco ? 'Draco' : 'Standard'})`);
        return new Promise((resolve, reject) => {
            loader.load(url, async (gltf) => {
                try {
                    const scene = gltf.scene;
                    scene.name = id;
                    scene.animations = gltf.animations || [];
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
                }
                catch (err) {
                    onError?.(err, url);
                    reject(err);
                }
            }, (progress) => {
                if (progress.lengthComputable) {
                    onProgress?.({
                        loaded: progress.loaded,
                        total: progress.total,
                        percent: (progress.loaded / progress.total) * 100,
                        url,
                    });
                }
            }, (error) => {
                console.error(`[GLTFLoader] Error: ${id}`, error);
                onError?.(error, url);
                reject(error);
            });
        });
    }
    static async preload(entries, options = {}, onProgress) {
        let completed = 0;
        const total = entries.length;
        await Promise.all(entries.map(entry => this.load(entry, {
            ...options,
            onLoaded: () => onProgress?.(++completed, total),
            onError: (err, url) => console.error(`Preload failed: ${url}`, err),
        })));
    }
    static async invalidate(id) {
        await ObjectCache.delete(id);
    }
    static async clearCache() {
        await ObjectCache.clearAll();
    }
}
//# sourceMappingURL=GLTFLoader.js.map