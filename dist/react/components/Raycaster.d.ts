import * as THREE from 'three';

type RaycasterProps = {
    enabled?: boolean;
    objects?: THREE.Object3D[];
    onClick?: (obj: THREE.Object3D) => void;
    onHover?: (obj: THREE.Object3D) => void;
};
declare const Raycaster: React.FC<RaycasterProps>;

export { Raycaster };
