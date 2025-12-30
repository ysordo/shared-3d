import { ManifestEntry } from '../cache/types.cjs';
import * as THREE from 'three';
import { HDRILoaderOptions, HDRIEvents } from './loaders.d.cjs';

declare class HDRILoader {
    private static rgbeLoader;
    private static webpLoader;
    private static defaultOptions;
    private static currentOptions;
    static configure(options: HDRILoaderOptions): void;
    static reset(): void;
    static getOptions(): HDRILoaderOptions;
    static load(entry: ManifestEntry, events?: HDRIEvents, customOptions?: HDRILoaderOptions): Promise<THREE.Texture>;
    private static fetchAndLoad;
    static preload(entries: ManifestEntry[], onProgress?: (completed: number, total: number) => void, customOptions?: HDRILoaderOptions): Promise<void>;
    static invalidate(id: string): Promise<void>;
}

export { HDRILoader };
