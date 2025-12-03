import { ManifestEntry } from '../core/cache/types.js';
import * as THREE from 'three';

type UseModelOptions = {
    draco?: boolean;
    autoLoad?: boolean;
};
declare const useModel: (entry: ManifestEntry | null, options?: UseModelOptions) => {
    model: THREE.Group<THREE.Object3DEventMap> | null;
    loading: boolean;
    error: Error | null;
    load: () => Promise<THREE.Group<THREE.Object3DEventMap>> | null;
};

export { useModel };
