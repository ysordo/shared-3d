import type React from 'react';
import { THREE } from '../../lib';
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
};
export declare const GroundSurface: React.FC<GroundSurfaceProps>;
export {};
//# sourceMappingURL=GroundSurface.d.ts.map