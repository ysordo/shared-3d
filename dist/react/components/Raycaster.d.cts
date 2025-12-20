import * as THREE from 'three';

type RaycasterProps = {
    enabled?: boolean;
    objects?: THREE.Object3D[];
    /** Callback para clicks sobre objetos */
    onClick?: (obj: THREE.Object3D) => void;
    /** Callback para hover (enter + move + leave implícito en plugin) */
    onHover?: (obj: THREE.Object3D) => void;
};
declare const Raycaster: React.FC<RaycasterProps>;

export { Raycaster };
