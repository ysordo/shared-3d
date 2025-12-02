import type React from 'react';
import { THREE } from '../../lib';
type DirectionalLightProps = {
    intensity?: number;
    color?: THREE.ColorRepresentation;
    position?: [number, number, number];
    castShadow?: boolean;
    shadowMapSize?: number;
};
export declare const DirectionalLight: React.FC<DirectionalLightProps>;
export {};
//# sourceMappingURL=DirectionalLight.d.ts.map