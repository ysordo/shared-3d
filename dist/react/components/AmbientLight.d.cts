import React from 'react';
import * as THREE from 'three';

type AmbientLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
};
declare const AmbientLight: React.FC<AmbientLightProps>;

export { AmbientLight };
