import { ManifestEntry, ModelManifest } from '../cache/types.cjs';
import * as THREE from 'three';

type GLTFLoaderOptions = {
    draco?: boolean | undefined;
    decoderPath?: string | undefined;
};
type GLTFLoaderEvents = {
    onProgress?: (p: {
        loaded: number;
        total: number;
        percent: number;
        url: string;
    }) => void | undefined;
    onLoaded?: (obj: THREE.Group, entry: ManifestEntry) => void | undefined;
    onError?: (err: Error, url: string) => void | undefined;
};
declare class GLTFLoader {
    private static plainLoader;
    private static dracoLoaderInstance;
    private static dracoDecoder;
    private static isDracoInitialized;
    private static getLoader;
    private static fetchAndLoad;
    static load(entry: ManifestEntry, options?: GLTFLoaderOptions & GLTFLoaderEvents): Promise<THREE.Group>;
    static preload(entries: ModelManifest, options?: GLTFLoaderOptions, onProgress?: (completed: number, total: number) => void): Promise<void>;
    static invalidate(id: string): Promise<void>;
    static clearCache(): Promise<void>;
}

export { GLTFLoader, type GLTFLoaderEvents, type GLTFLoaderOptions };
