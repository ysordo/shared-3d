import type { ManifestEntry, ModelManifest } from '../cache/types';
import { THREE } from '../../lib';
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
export declare class HDRILoader {
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
//# sourceMappingURL=HDRILoader.d.ts.map