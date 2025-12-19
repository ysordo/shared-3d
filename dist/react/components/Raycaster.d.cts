import * as THREE from 'three';

type RaycasterProps = {
    /** Callback para clicks sobre objetos */
    onClick?: (obj: THREE.Object3D) => void;
    /** Callback para hover (enter + move + leave implícito en plugin) */
    onHover?: (obj: THREE.Object3D) => void;
};
declare const Raycaster: React.FC<RaycasterProps>;

export { Raycaster };
