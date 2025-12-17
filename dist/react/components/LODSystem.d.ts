import * as THREE from 'three';

type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODSystemProps = {
    levels: LODLevel[];
    hysteresis?: number;
    enabled?: boolean;
};
declare const LODSystem: React.FC<LODSystemProps>;

export { LODSystem };
