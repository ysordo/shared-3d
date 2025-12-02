import type React from 'react';
import * as THREE from 'three';
type HotspotData = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D | string;
    onClick: () => void;
    offset?: [number, number, number];
};
type HotspotsProps = {
    hotspots: HotspotData[];
};
export declare const Hotspots: React.FC<HotspotsProps>;
export {};
//# sourceMappingURL=Hotspots.d.ts.map