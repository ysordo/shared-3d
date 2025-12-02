import type { ModelManifest, ManifestEntry } from '../cache/types';
import { THREE } from '../../lib';
export type GLTFLoaderOptions = {
    draco?: boolean | undefined;
    decoderPath?: string | undefined;
};
export type GLTFLoaderEvents = {
    onProgress?: (p: {
        loaded: number;
        total: number;
        percent: number;
        url: string;
    }) => void | undefined;
    onLoaded?: (obj: THREE.Group, entry: ManifestEntry) => void | undefined;
    onError?: (err: Error, url: string) => void | undefined;
};
export declare class GLTFLoader {
    private static plainLoader;
    private static dracoLoaderInstance;
    private static dracoDecoder;
    private static isDracoInitialized;
    private static getLoader;
    static load(entry: ManifestEntry, options?: GLTFLoaderOptions & GLTFLoaderEvents): Promise<THREE.Group>;
    static preload(entries: ModelManifest, options?: GLTFLoaderOptions, onProgress?: (completed: number, total: number) => void): Promise<void>;
    static invalidate(id: string): Promise<void>;
    static clearCache(): Promise<void>;
}
//# sourceMappingURL=GLTFLoader.d.ts.map