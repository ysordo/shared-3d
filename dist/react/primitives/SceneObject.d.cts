import React from 'react';
import * as THREE from 'three';

type SceneObjectProps = {
    object: THREE.Object3D;
    parent?: 'scene' | 'model' | THREE.Object3D | string;
    name?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    visible?: boolean;
    castShadow?: boolean;
    receiveShadow?: boolean;
};
/**
 * Primitiva universal para añadir cualquier objeto 3D
 * Puede ir en:
 * - La escena (scene)
 * - El modelo activo (model)
 * - Un objeto específico por nombre o referencia
 */
declare const SceneObject: React.FC<SceneObjectProps>;

export { SceneObject };
