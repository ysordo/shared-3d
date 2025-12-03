import React from 'react';
import * as THREE from 'three';

type SpotLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    target?: THREE.Object3D | string;
    angle?: number;
    penumbra?: number;
    distance?: number;
    castShadow?: boolean;
};
declare const SpotLight: React.FC<SpotLightProps>;

export { SpotLight };
