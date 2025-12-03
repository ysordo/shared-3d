export type ManifestEntry = {
  id: string;
  url: string;
  hash: string;
  size: number;
  updatedAt: number;
};

export type CacheEntry<T = any> = {
  data: T;
  hash: string;
  timestamp: number;
  size: number;
  updatedAt: number;
};

export type CacheReport = {
  validated: boolean;
  updated: string[];
  removed: string[];
  added: string[];
  errors: string[];
  durationMs: number;
};

export type ModelManifest = ManifestEntry[];