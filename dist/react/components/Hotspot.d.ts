import * as THREE from 'three';

type HotspotProps = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D;
    onClick: () => void;
};
declare const Hotspot: React.FC<HotspotProps>;

export { Hotspot };
