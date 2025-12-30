import * as THREE from 'three';
import { ManifestEntry } from '../../core/cache/types.js';

declare const useModelSuspense: (entry: ManifestEntry) => THREE.Group | undefined;

export { useModelSuspense };
