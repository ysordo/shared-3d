import React from 'react';
import * as THREE from 'three';

type LODLevel = {
    distance: number;
    model: THREE.Object3D;
};
type LODSystemProps = {
    levels: LODLevel[];
    hysteresis?: number;
};
declare const LODSystem: React.FC<LODSystemProps>;

export { LODSystem };
