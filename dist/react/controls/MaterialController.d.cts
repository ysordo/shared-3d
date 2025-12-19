import React, { ReactNode } from 'react';
import * as THREE from 'three';

type CustomMaterialFactory = (originalMaterial: THREE.Material) => THREE.Material;
type MaterialConfig = {
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
} | {
    name: string;
    type: 'custom';
    factory: CustomMaterialFactory;
};
type MaterialItem = {
    name: string;
    oldName: string;
    apply: () => void;
    isActive: boolean;
    percentage: number;
};
type MaterialControllerProps = {
    materials: MaterialConfig[];
    activeDefault?: string;
    transitionDuration?: number;
    children: (items: MaterialItem[]) => ReactNode;
    className?: string;
};
declare const MaterialController: React.FC<MaterialControllerProps>;

export { type CustomMaterialFactory, type MaterialConfig, MaterialController };
