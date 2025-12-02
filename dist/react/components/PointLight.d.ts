import type React from 'react';
import { THREE } from '../../lib';
type PointLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    distance?: number;
    decay?: number;
};
export declare const PointLight: React.FC<PointLightProps>;
export {};
//# sourceMappingURL=PointLight.d.ts.map