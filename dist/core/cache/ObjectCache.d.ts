import { CacheEntry } from './types.js';

declare class ObjectCache {
    private static getKey;
    static set<T>(id: string, data: T, hash: string, updatedAt?: number): Promise<void>;
    static get<T>(id: string): Promise<CacheEntry<T> | null>;
    static has(id: string): Promise<boolean>;
    static delete(id: string): Promise<void>;
    static clearAll(): Promise<void>;
    private static dispose;
    private static estimateSize;
}

export { ObjectCache };
