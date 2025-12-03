import React from 'react';
import * as THREE from 'three';

type DirectionalLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    castShadow?: boolean;
    shadowMapSize?: number;
};
declare const DirectionalLight: React.FC<DirectionalLightProps>;

export { DirectionalLight };
