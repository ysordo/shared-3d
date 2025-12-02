import type { ManifestEntry } from '../core/cache/types';
import type { THREE } from '../lib';
type UseModelOptions = {
    draco?: boolean;
    autoLoad?: boolean;
};
export declare const useModel: (entry: ManifestEntry | null, options?: UseModelOptions) => {
    model: THREE.Group<THREE.Object3DEventMap> | null;
    loading: boolean;
    error: Error | null;
    load: () => Promise<THREE.Group<THREE.Object3DEventMap>> | null;
};
export {};
//# sourceMappingURL=useModel.d.ts.map