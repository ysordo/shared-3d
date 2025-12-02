import type React from 'react';
import type { ManifestEntry } from '../../core/cache/types';
import type { THREE } from '../../lib';
type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    children?: (model: THREE.Group) => React.ReactNode;
};
export declare const Model: React.FC<ModelProps>;
export {};
//# sourceMappingURL=Model.d.ts.map