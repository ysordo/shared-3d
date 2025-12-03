type ManifestEntry = {
    id: string;
    url: string;
    hash: string;
    size: number;
    updatedAt: number;
};
type CacheEntry<T = any> = {
    data: T;
    hash: string;
    timestamp: number;
    size: number;
    updatedAt: number;
};
type CacheReport = {
    validated: boolean;
    updated: string[];
    removed: string[];
    added: string[];
    errors: string[];
    durationMs: number;
};
type ModelManifest = ManifestEntry[];

export type { CacheEntry, CacheReport, ManifestEntry, ModelManifest };
