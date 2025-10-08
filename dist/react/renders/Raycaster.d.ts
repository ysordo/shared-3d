import type { THREE } from '../..';
interface RaycasterProps {
    enabled?: boolean;
    onObjectClick?: (object: THREE.Object3D, point: THREE.Vector3, distance: number, originalEvent?: Event) => void;
    onObjectHoverIn?: (object: THREE.Object3D, point: THREE.Vector3, distance: number, originalEvent?: Event) => void;
    onObjectHoverOut?: (object: THREE.Object3D, originalEvent?: Event) => void;
    onObjectHoverMove?: (object: THREE.Object3D, point: THREE.Vector3, distance: number, originalEvent?: Event) => void;
    onObjectDragStart?: (object: THREE.Object3D, startPosition: THREE.Vector2, originalEvent?: Event) => void;
    onObjectDrag?: (object: THREE.Object3D, startPosition: THREE.Vector2, currentPosition: THREE.Vector2, delta: THREE.Vector2, normalizedDelta: THREE.Vector2, originalEvent?: Event) => void;
    onObjectDragEnd?: (object: THREE.Object3D, startPosition: THREE.Vector2, endPosition: THREE.Vector2, totalDelta: THREE.Vector2, originalEvent?: Event) => void;
}
export declare function Raycaster({ enabled, onObjectClick, onObjectHoverIn, onObjectHoverOut, onObjectHoverMove, onObjectDragStart, onObjectDrag, onObjectDragEnd, }: RaycasterProps): null;
export {};
//# sourceMappingURL=Raycaster.d.ts.map