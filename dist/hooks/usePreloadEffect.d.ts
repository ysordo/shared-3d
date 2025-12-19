import * as THREE from 'three';

declare const usePreloadEffect: (factory: (preload: Map<string, THREE.Group<THREE.Object3DEventMap>>) => void, deps?: readonly unknown[]) => void;

export { usePreloadEffect };
