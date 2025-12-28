import { ManifestEntry } from '../core/cache/types.js';
import * as THREE from 'three';

declare const useHDRI: (entry: ManifestEntry | null) => {
    hdri: THREE.Texture | null;
    loading: boolean;
    clear: () => void;
};

export { useHDRI };
