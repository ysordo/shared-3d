import { ManifestEntry, ManifestEntries } from '../cache/types.cjs';
import * as THREE from 'three';
import { GLTFLoaderOptions, GLTFLoaderEvents } from './loaders.d.cjs';

declare class GLTFLoader {
    private static plainLoader;
    private static dracoLoaderInstance;
    private static dracoDecoder;
    private static isDracoInitialized;
    private static getLoader;
    private static fetchAndLoad;
    static load(entry: ManifestEntry, options?: GLTFLoaderOptions & GLTFLoaderEvents): Promise<THREE.Group>;
    static preload(entries: ManifestEntries, options?: GLTFLoaderOptions, onProgress?: (obj: THREE.Group | undefined, entry: ManifestEntry, completed: number, total: number, percent?: number) => void): Promise<void>;
    static invalidate(id: string): Promise<void>;
    static clearCache(): Promise<void>;
}

export { GLTFLoader };
