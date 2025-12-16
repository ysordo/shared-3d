import React from 'react';
import * as THREE from 'three';

type AdvancedDragRaycasterProps = {
    children?: (state: {
        isEnabled: boolean;
        toggleEnabled: () => void;
        setEnabled: (value: boolean) => void;
        resetAll: () => void;
        isResetting: boolean;
    }) => React.ReactNode;
    defaultEnabled?: boolean;
    enableRotationCompensation?: boolean;
    transitionDuration?: number;
    onDragStart?: (object: THREE.Object3D) => void;
    onDrag?: (object: THREE.Object3D, delta: THREE.Vector3) => void;
    onDragEnd?: (object: THREE.Object3D) => void;
};
declare const AdvancedDragRaycaster: React.FC<AdvancedDragRaycasterProps>;

export { AdvancedDragRaycaster };
