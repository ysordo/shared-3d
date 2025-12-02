import React from 'react';
import type { ManifestEntry } from '../../core/cache/types';
import type { THREE } from '../../lib';
type SuspenseModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    fallback?: React.ReactNode;
    children?: (model: THREE.Group) => React.ReactNode;
};
export declare const SuspenseModel: React.FC<SuspenseModelProps>;
export {};
//# sourceMappingURL=SuspenseModel.d.ts.map