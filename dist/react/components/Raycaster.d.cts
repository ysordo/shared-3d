import React from 'react';
import * as THREE from 'three';

type RaycasterProps = {
    onClick?: (obj: THREE.Object3D) => void;
    onHover?: (obj: THREE.Object3D) => void;
};
declare const Raycaster: React.FC<RaycasterProps>;

export { Raycaster };
