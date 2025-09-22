import type * as THREE from 'three';
import { AnimationManager } from './AnimationManager';
interface AnimationClipDict {
    [key: string]: string;
}
export declare class ModelManager {
    model: THREE.Object3D | null;
    animKey: AnimationClipDict;
    animate: AnimationManager | null;
    private dracoLoader;
    private gltfLoader;
    private currentModelUrl;
    constructor();
    private handleModelLoaded;
    private createAnimationDictionary;
    loadModel(url: string, useCache?: boolean, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    /**
     * Método para forzar la verificación de actualizaciones del modelo actual
     */
    checkForUpdates(): Promise<boolean>;
    dispose(): void;
    private disposeModel;
    private disposeMesh;
    private disposeAnimations;
    private clearReferences;
}
export {};
//# sourceMappingURL=ModelManager.d.ts.map