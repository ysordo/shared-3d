import type { ManifestEntry } from '../core/cache/types';
import type { THREE } from '../lib';
export declare const useHDRI: (entry: ManifestEntry | null) => {
    hdri: THREE.Texture | null;
    loading: boolean;
    clear: () => void;
};
//# sourceMappingURL=useHDRI.d.ts.map