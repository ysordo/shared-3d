import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { AnimationManager } from './AnimationManager';
import { CacheManager } from './CacheManager'; // Asegúrate de que la ruta sea correcta
export class ModelManager {
    constructor() {
        this.model = null;
        this.animKey = {};
        this.animate = null;
        this.currentModelUrl = null;
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('draco/');
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(this.dracoLoader);
    }
    handleModelLoaded(resolve, gltf) {
        this.model = gltf.scene;
        if (gltf.animations?.length > 0) {
            this.animate = new AnimationManager(this.model, gltf.animations);
            this.animKey = this.createAnimationDictionary(gltf.animations);
        }
        resolve(this.model);
    }
    createAnimationDictionary(animations) {
        return animations.reduce((dict, clip, index) => {
            dict[`${index}`] = clip.name;
            return dict;
        }, {});
    }
    async loadModel(url, useCache = true, onLoad, onProgress) {
        // Si ya tenemos este modelo cargado, verificar si hay actualizaciones
        if (this.currentModelUrl === url && useCache) {
            const hasUpdates = await CacheManager.validateAndUpdateCache(url);
            if (hasUpdates) {
                // Si hay actualizaciones, recargar el modelo
                this.dispose();
            }
            else {
                // Si no hay actualizaciones, devolver el modelo actual
                return Promise.resolve(this.model);
            }
        }
        this.currentModelUrl = url;
        return new Promise(async (resolve, reject) => {
            try {
                let modelData = null;
                // Si estamos usando caché, intentar obtener del caché primero
                if (useCache) {
                    modelData = await CacheManager.getModel(url);
                }
                const callback = (gltf) => {
                    this.handleModelLoaded(resolve, gltf);
                    onLoad?.bind?.(this);
                };
                if (modelData) {
                    // Usar datos del caché
                    this.gltfLoader.parse(modelData, url, callback, reject);
                }
                else {
                    // Cargar directamente desde la URL
                    this.gltfLoader.load(url, callback, onProgress, reject);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Método para forzar la verificación de actualizaciones del modelo actual
     */
    async checkForUpdates() {
        if (!this.currentModelUrl) {
            return false;
        }
        try {
            const hasUpdates = await CacheManager.validateAndUpdateCache(this.currentModelUrl);
            if (hasUpdates) {
                // Recargar el modelo si hay actualizaciones
                await this.loadModel(this.currentModelUrl);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error checking for updates:', error);
            return false;
        }
    }
    dispose() {
        this.disposeModel();
        this.disposeAnimations();
        this.clearReferences();
    }
    disposeModel() {
        if (!this.model) {
            return;
        }
        this.model.traverse((child) => {
            if (child.isMesh) {
                this.disposeMesh(child);
            }
        });
    }
    disposeMesh(mesh) {
        mesh.geometry?.dispose();
        if (mesh.material) {
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(material => material.dispose());
            }
            else {
                mesh.material.dispose();
            }
        }
    }
    disposeAnimations() {
        this.animate?.dispose();
        this.animate = null;
    }
    clearReferences() {
        this.model = null;
        this.animKey = {};
        this.currentModelUrl = null;
    }
}
//# sourceMappingURL=ModelManager.js.map