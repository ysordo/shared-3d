import type React from 'react';
import type { THREE } from '../../lib';
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
export declare const AdvancedRaycaster: React.FC<AdvancedRaycasterProps>;
export {};
//# sourceMappingURL=AdvancedRaycaster.d.ts.map