'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../hooks/useScene';
import { THREE } from '../../lib';

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
export const SceneObject: React.FC<SceneObjectProps> = ({
  object,
  parent = 'scene',
  name,
  position,
  rotation,
  scale = [1, 1, 1],
  visible = true,
  castShadow = false,
  receiveShadow = false,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (name) {
      object.name = name;
    }
    object.visible = visible;
    object.castShadow = castShadow;
    object.receiveShadow = receiveShadow;

    if (position) {
      object.position.set(...position);
    }
    if (rotation) {
      object.rotation.set(...rotation);
    }
    if (scale) {
      object.scale.set(...scale);
    }

    let targetParent: THREE.Object3D | null = null;

    if (parent === 'scene') {
      targetParent = orchestrator.scene;
    } else if (parent === 'model') {
      targetParent = orchestrator.activeModel.get();
    } else if (typeof parent === 'string') {
      targetParent = orchestrator.scene.getObjectByName(parent) || null;
    } else if (parent instanceof THREE.Object3D) {
      targetParent = parent;
    }

    if (!targetParent) {
      console.warn('[SceneObject] Padre no encontrado:', parent);
      return;
    }

    targetParent.add(object);

    return () => {
      if (object.parent) {
        object.parent.remove(object);
      }
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };
  }, [
    orchestrator,
    object,
    parent,
    name,
    position,
    rotation,
    scale,
    visible,
    castShadow,
    receiveShadow,
  ]);

  return null;
};
