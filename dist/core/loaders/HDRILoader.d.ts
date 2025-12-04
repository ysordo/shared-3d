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
declare class HDRILoader {
    private static rgbeLoader;
    private static webpLoader;
    static load(entry: ManifestEntry, events?: HDRIEvents): Promise<THREE.Texture>;
    private static fetchAndLoad;
    static preload(entries: ManifestEntry[], onProgress?: (completed: number, total: number) => void): Promise<void>;
    static invalidate(id: string): Promise<void>;
}

export { type HDRIEvents, HDRILoader, type HDRIProgress };
