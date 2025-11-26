/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as THREE from 'three';

export type CacheEntry<T = any> = {
  data: T;
  hash: string;
  timestamp: number;
  size: number;
};

export type ModelManifestEntry = {
  id: string;
  url: string;
  hash: string;        // sha256 del archivo original
  size?: number;
  version?: string;
};

export type ModelManifest = ModelManifestEntry[];

export type CachedModelData = {
  object: THREE.Group | THREE.Object3D;
  hash: string;
  timestamp: number;
  size: number;
};

export type CacheReport = {
  validated: boolean;
  updated: string[];
  removed: string[];
  added: string[];
  errors: string[];
  durationMs: number;
};