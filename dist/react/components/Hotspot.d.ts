import type React from 'react';
import { THREE } from '../../lib';
type HotspotProps = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D;
    onClick: () => void;
};
export declare const Hotspot: React.FC<HotspotProps>;
export {};
//# sourceMappingURL=Hotspot.d.ts.map