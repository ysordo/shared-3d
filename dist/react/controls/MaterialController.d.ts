import type { ReactNode } from 'react';
import React from 'react';
import { THREE } from '../../lib';
export type CustomMaterialFactory = (originalMaterial: THREE.Material) => THREE.Material;
export type MaterialConfig = {
    name: string;
    type: 'textured';
} | {
    name: string;
    type: 'solid';
    color?: THREE.ColorRepresentation;
    metalness?: number;
    roughness?: number;
} | {
    name: string;
    type: 'wireframe';
    color?: THREE.ColorRepresentation;
    lineColor?: THREE.ColorRepresentation;
    [key: string]: any;
} | {
    name: string;
    type: 'custom';
    factory: CustomMaterialFactory;
};
type MaterialItem = {
    name: string;
    apply: () => void;
    isActive: boolean;
};
type MaterialControllerProps = {
    materials: MaterialConfig[];
    transitionDuration?: number;
    children: (items: MaterialItem[]) => ReactNode;
    className?: string;
};
export declare const MaterialController: React.FC<MaterialControllerProps>;
export {};
//# sourceMappingURL=MaterialController.d.ts.map