import {
  useScene
} from "./chunk-BYTQQZPW.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/primitives/SceneObject.tsx
import { useEffect } from "react";
var SceneObject = ({
  object,
  parent = "scene",
  name,
  position,
  rotation,
  scale = [1, 1, 1],
  visible = true,
  castShadow = false,
  receiveShadow = false
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
    let targetParent = null;
    if (parent === "scene") {
      targetParent = orchestrator.scene;
    } else if (parent === "model") {
      targetParent = orchestrator.getActiveModel();
    } else if (typeof parent === "string") {
      targetParent = orchestrator.scene.getObjectByName(parent) || null;
    } else if (parent instanceof THREE.Object3D) {
      targetParent = parent;
    }
    if (!targetParent) {
      console.warn("[SceneObject] Padre no encontrado:", parent);
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
    receiveShadow
  ]);
  return null;
};

export {
  SceneObject
};
