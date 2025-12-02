import type React from 'react';
import type { ManifestEntry } from '../../core/cache/types';
import { THREE } from '../../lib';
type InstanceData = {
    position: THREE.Vector3;
    rotation?: THREE.Euler | THREE.Quaternion;
    scale?: THREE.Vector3 | number;
    color?: THREE.Color;
    visible?: boolean;
};
type InstancedModelProps = {
    entry: ManifestEntry;
    instances: InstanceData[];
    draco?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
};
export declare const InstancedModel: React.FC<InstancedModelProps>;
export {};
//# sourceMappingURL=InstancedModel.d.ts.map