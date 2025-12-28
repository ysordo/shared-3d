import React from 'react';
import { ManifestEntry } from '../../core/cache/types.js';
import * as THREE from 'three';

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
declare const InstancedModel: React.FC<InstancedModelProps>;

export { InstancedModel };
