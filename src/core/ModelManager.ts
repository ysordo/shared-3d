import type * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { AnimationManager } from './AnimationManager';
import { CacheManager } from './CacheManager'; // Asegúrate de que la ruta sea correcta

interface AnimationClipDict {
    [key: string]: string;
}

export class ModelManager {
    public model: THREE.Object3D | null = null;
    public animKey: AnimationClipDict = {};
    public animate: AnimationManager | null = null;
    
    private dracoLoader: DRACOLoader;
    private gltfLoader: GLTFLoader;
    private currentModelUrl: string | null = null;

    constructor() {
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('draco/');
        
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(this.dracoLoader);
    }

    private handleModelLoaded(resolve: (value: THREE.Object3D) => void, gltf: GLTF): void {
        this.model = gltf.scene as THREE.Object3D;
        
        if (gltf.animations?.length > 0) {
            this.animate = new AnimationManager(this.model, gltf.animations);
            this.animKey = this.createAnimationDictionary(gltf.animations);
        }
        
        resolve(this.model);
    }

    private createAnimationDictionary(animations: THREE.AnimationClip[]): AnimationClipDict {
        return animations.reduce((dict: AnimationClipDict, clip: THREE.AnimationClip, index: number) => {
            dict[`${index}`] = clip.name;
            return dict;
        }, {});
    }

    async loadModel(url: string, useCache: boolean = true, onLoad?: (model: ModelManager)=> void, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D> {
        // Si ya tenemos este modelo cargado, verificar si hay actualizaciones
        if (this.currentModelUrl === url && useCache) {
            const hasUpdates = await CacheManager.validateAndUpdateCache(url);
            if (hasUpdates) {
                // Si hay actualizaciones, recargar el modelo
                this.dispose();
            } else {
                // Si no hay actualizaciones, devolver el modelo actual
                return Promise.resolve(this.model!);
            }
        }
        
        this.currentModelUrl = url;
        
        return new Promise(async (resolve, reject) => {
            try {
                let modelData: ArrayBuffer | null = null;
                
                // Si estamos usando caché, intentar obtener del caché primero
                if (useCache) {
                    modelData = await CacheManager.getModel(url);
                }
                
                const callback = (gltf: GLTF) => {
                    this.handleModelLoaded(resolve, gltf);
                    onLoad?.(this);
                };
                
                if (modelData) {
                    // Usar datos del caché
                    this.gltfLoader.parse(modelData as ArrayBuffer, url, callback, reject);
                } else {
                    // Cargar directamente desde la URL
                    this.gltfLoader.load(url, callback, onProgress, reject);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Método para forzar la verificación de actualizaciones del modelo actual
     */
    async checkForUpdates(): Promise<boolean> {
        if (!this.currentModelUrl) {return false;}
        
        try {
            const hasUpdates = await CacheManager.validateAndUpdateCache(this.currentModelUrl);
            if (hasUpdates) {
                // Recargar el modelo si hay actualizaciones
                await this.loadModel(this.currentModelUrl);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking for updates:', error);
            return false;
        }
    }

    dispose(): void {
        this.disposeModel();
        this.disposeAnimations();
        this.clearReferences();
    }

    private disposeModel(): void {
        if (!this.model) {return;}

        this.model.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                this.disposeMesh(child as THREE.Mesh);
            }
        });
    }

    private disposeMesh(mesh: THREE.Mesh): void {
        mesh.geometry?.dispose();
        
        if (mesh.material) {
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(material => material.dispose());
            } else {
                mesh.material.dispose();
            }
        }
    }

    private disposeAnimations(): void {
        this.animate?.dispose();
        this.animate = null;
    }

    private clearReferences(): void {
        this.model = null;
        this.animKey = {};
        this.currentModelUrl = null;
    }
}