import { ManifestEntry } from '../core/cache/types.js';
import * as THREE from 'three';

declare const useModelSuspense: (entry: ManifestEntry) => THREE.Group;

export { useModelSuspense };
