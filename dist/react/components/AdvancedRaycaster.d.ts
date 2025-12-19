import * as THREE from 'three';

type AdvancedRaycasterProps = {
    model?: THREE.Object3D;
    onClick?: (event: any) => void;
    onHoverIn?: (event: any) => void;
    onHoverOut?: (event: any) => void;
    onHoverMove?: (event: any) => void;
    onDragStart?: (event: any) => void;
    onDrag?: (event: any) => void;
    onDragEnd?: (event: any) => void;
};
declare const AdvancedRaycaster: React.FC<AdvancedRaycasterProps>;

export { AdvancedRaycaster };
