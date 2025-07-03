import type * as THREE from 'three';
/**
 * Props for the MaterialController component.
 * @property {string} modelId - Unique identifier for the model to apply the material to.
 * @property {'basic' | 'phong' | 'standard' | 'physical'} materialType - Type of material to apply.
 * @property {THREE.MaterialParameters} materialOptions - Parameters for the material.
 * @property {boolean} [wireframe=false] - Whether to render the material in wireframe mode.
 * @typedef {Object} MaterialControllerProps
 */
interface MaterialControllerProps {
    modelId: string;
    materialType: 'basic' | 'phong' | 'standard' | 'physical';
    materialOptions: THREE.MaterialParameters;
    wireframe?: boolean;
}
export declare const MaterialController: ({ modelId, materialType, materialOptions, wireframe }: MaterialControllerProps) => null;
export {};
//# sourceMappingURL=MaterialController.d.ts.map