import { ManifestEntry } from '../cache/types.js';
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
type HDRILoaderOptions = {
    dataType?: typeof THREE.FloatType | typeof THREE.HalfFloatType;
    exposure?: number;
    maxLuminance?: number;
    preserveHDR?: boolean;
    rgbeLoaderOptions?: any;
};
declare class HDRILoader {
    private static rgbeLoader;
    private static webpLoader;
    private static defaultOptions;
    private static currentOptions;
    /**
     * Configura las opciones globales del loader
     */
    static configure(options: HDRILoaderOptions): void;
    /**
     * Restaura las opciones por defecto
     */
    static reset(): void;
    /**
     * Obtiene las opciones actuales
     */
    static getOptions(): HDRILoaderOptions;
    static load(entry: ManifestEntry, events?: HDRIEvents, customOptions?: HDRILoaderOptions): Promise<THREE.Texture>;
    private static fetchAndLoad;
    static preload(entries: ManifestEntry[], onProgress?: (completed: number, total: number) => void, customOptions?: HDRILoaderOptions): Promise<void>;
    static invalidate(id: string): Promise<void>;
}

export { type HDRIEvents, HDRILoader, type HDRILoaderOptions, type HDRIProgress };
