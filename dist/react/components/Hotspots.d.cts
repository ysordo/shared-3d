import React from 'react';
import * as THREE from 'three';

type HotspotData = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D;
    onClick: () => void;
};
type HotspotsProps = {
    hotspots: HotspotData[];
};
declare const Hotspots: React.FC<HotspotsProps>;

export { Hotspots };
