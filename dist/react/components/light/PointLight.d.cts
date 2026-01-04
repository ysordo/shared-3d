import React from 'react';
import * as THREE from 'three';

type PointLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    distance?: number;
    decay?: number;
};
declare const PointLight: React.FC<PointLightProps>;

export { PointLight };
