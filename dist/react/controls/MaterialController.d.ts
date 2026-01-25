import React from 'react';
import * as THREE from 'three';

type CustomMaterialFactory = (originalMaterial: THREE.Material) => THREE.Material;
type Texture = {
    name: string;
    type: 'textured';
};
type Solid = Omit<Texture, 'type'> & {
    type: 'solid';
    color?: THREE.ColorRepresentation;
    metalness?: number;
    roughness?: number;
};
type Wireframe = Omit<Solid, 'type'> & {
    type: 'wireframe';
    lineColor?: THREE.ColorRepresentation;
};
type MaterialConfig = Texture | Solid | Wireframe;
type MaterialItem = {
    name: string;
    oldName: string;
    nextName: string;
    apply: () => void;
    isActive: boolean;
    percentage: number;
};
type MaterialControllerProps = {
    materials: MaterialConfig[];
    activeDefault?: string;
    transitionDuration?: number;
    children: (items: MaterialItem[], isTransitioning?: boolean) => React.ReactNode;
    className?: string;
};
declare const MaterialController: React.FC<MaterialControllerProps>;

export { type CustomMaterialFactory, type MaterialConfig, MaterialController };
