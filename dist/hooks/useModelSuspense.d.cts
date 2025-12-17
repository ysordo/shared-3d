import { ManifestEntry } from '../core/cache/types.cjs';
import * as THREE from 'three';

declare const useModelSuspense: (entry: ManifestEntry) => THREE.Group;

export { useModelSuspense };
