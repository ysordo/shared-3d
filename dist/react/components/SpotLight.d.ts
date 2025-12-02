import type React from 'react';
import { THREE } from '../../lib';
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
export declare const SpotLight: React.FC<SpotLightProps>;
export {};
//# sourceMappingURL=SpotLight.d.ts.map