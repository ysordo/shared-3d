import * as THREE from 'three';

type TX = 'array' | 'map';
type TR = {
    array: {
        key: string;
        model: THREE.Group;
    }[];
    map: Map<string, THREE.Group<THREE.Object3DEventMap>>;
};
declare const usePreload: <T extends TX = "map">() => TR[T];

export { usePreload };
