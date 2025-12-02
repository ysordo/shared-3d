import type React from 'react';
import type { THREE } from '../../lib';
type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODSystemProps = {
    levels: LODLevel[];
    hysteresis?: number;
};
export declare const LODSystem: React.FC<LODSystemProps>;
export {};
//# sourceMappingURL=LODSystem.d.ts.map