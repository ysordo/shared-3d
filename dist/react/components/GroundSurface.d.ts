import React from 'react';
import * as THREE from 'three';

type SurfaceType = 'mirror' | 'glass' | 'metal' | 'concrete' | 'water' | 'wood' | 'custom';
type GroundSurfaceProps = {
    type?: SurfaceType;
    size?: number;
    height?: number;
    blur?: number;
    resolution?: number;
    color?: THREE.ColorRepresentation;
    roughness?: number;
    metalness?: number;
    opacity?: number;
    transparent?: boolean;
    visible?: boolean;
};
declare const GroundSurface: React.FC<GroundSurfaceProps>;

export { GroundSurface };
