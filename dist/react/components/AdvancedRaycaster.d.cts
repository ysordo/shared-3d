import * as THREE from 'three';

type AdvancedRaycasterProps = {
    model?: THREE.Object3D;
    onClick?: (e: any) => void;
    onHoverIn?: (e: any) => void;
    onHoverOut?: (e: any) => void;
    onHoverMove?: (e: any) => void;
    onDragStart?: (e: any) => void;
    onDrag?: (e: any) => void;
    onDragEnd?: (e: any) => void;
};
declare const AdvancedRaycaster: React.FC<AdvancedRaycasterProps>;

export { AdvancedRaycaster };
