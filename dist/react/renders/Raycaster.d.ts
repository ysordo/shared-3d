import type { THREE } from '../..';
interface RaycasterProps {
    enabled?: boolean;
    onObjectClick?: (object: THREE.Object3D, point: THREE.Vector3, distance: number, originalEvent?: Event) => void;
    onObjectHoverIn?: (object: THREE.Object3D, point: THREE.Vector3, distance: number, originalEvent?: Event) => void;
    onObjectHoverOut?: (object: THREE.Object3D, originalEvent?: Event) => void;
    onObjectHoverMove?: (object: THREE.Object3D, point: THREE.Vector3, distance: number, originalEvent?: Event) => void;
}
export declare function Raycaster({ enabled, onObjectClick, onObjectHoverIn, onObjectHoverOut, onObjectHoverMove, }: RaycasterProps): null;
export {};
//# sourceMappingURL=Raycaster.d.ts.map