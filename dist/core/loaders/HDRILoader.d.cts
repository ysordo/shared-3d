import { ManifestEntry, ModelManifest } from '../cache/types.cjs';
import * as THREE from 'three';

type HDRIProgress = {
    loaded: number;
    total: number;
    percent: number;
    url: string;
};
type HDRIEvents = {
    onProgress?: (progress: HDRIProgress) => void;
    onLoaded?: (texture: THREE.Texture, entry: ManifestEntry) => void;
    onError?: (error: Error, url: string) => void;
};
declare class HDRILoader {
    private static rgbeLoader;
    private static webpLoader;
    /**
     * Carga un HDRI de forma inteligente (con caché + hash)
     */
    static load(entry: ManifestEntry, events?: HDRIEvents): Promise<THREE.Texture>;
    /**
     * Precarga múltiples HDRIs
     */
    static preload(entries: ModelManifest, onProgress?: (completed: number, total: number) => void): Promise<void>;
    /**
     * Invalida caché de un HDRI específico
     */
    static invalidate(id: string): Promise<void>;
}

export { type HDRIEvents, HDRILoader, type HDRIProgress };
