import {
  useScene
} from "./chunk-EABNOBME.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/GroundSurface.tsx
import { useEffect, useRef } from "react";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
var PRESETS = {
  mirror: { reflective: true, color: 16777215, roughness: 0, metalness: 1 },
  glass: {
    reflective: true,
    color: 8965375,
    roughness: 0,
    metalness: 0,
    opacity: 0.3,
    transparent: true
  },
  metal: { reflective: true, color: 8947848, roughness: 0.1, metalness: 1 },
  concrete: {
    reflective: false,
    color: 10066329,
    roughness: 0.9,
    metalness: 0
  },
  wood: { reflective: false, color: 9127187, roughness: 0.8, metalness: 0 },
  water: {
    reflective: true,
    color: 35071,
    roughness: 0,
    metalness: 0.1,
    opacity: 0.7,
    transparent: true
  },
  custom: { reflective: true, color: 16777215, roughness: 0, metalness: 1 }
};
var GroundSurface = ({
  type = "mirror",
  size,
  height = 0,
  blur = 0.8,
  resolution = 1024,
  visible = true,
  ...custom
}) => {
  const orchestrator = useScene();
  const scene = orchestrator.scene;
  const camera = orchestrator.camera;
  const ground = useRef(null);
  useEffect(() => {
    if (!camera) {
      return;
    }
    const preset = PRESETS[type];
    const finalColor = custom.color ?? preset.color;
    const finalRoughness = custom.roughness ?? preset.roughness;
    const finalMetalness = custom.metalness ?? preset.metalness;
    const finalOpacity = custom.opacity ?? preset.opacity ?? 1;
    const finalTransparent = custom.transparent ?? preset.transparent ?? false;
    if (preset.reflective && size) {
      const geometry = new THREE.PlaneGeometry(size, size);
      ground.current = new Reflector(geometry, {
        clipBias: 3e-3,
        textureWidth: resolution,
        textureHeight: resolution,
        color: new THREE.Color(finalColor)
      });
      if (Array.isArray(ground.current.material)) {
        ground.current.material.forEach((mat) => {
          mat.roughness = finalRoughness;
          mat.metalness = finalMetalness;
          mat.opacity = finalOpacity;
          mat.transparent = finalTransparent;
        });
        ground.current.castShadow = true;
      } else {
        ground.current.material.roughness = finalRoughness;
        ground.current.material.metalness = finalMetalness;
        ground.current.material.opacity = finalOpacity;
        ground.current.material.transparent = finalTransparent;
        ground.current.castShadow = true;
      }
    } else {
      const geometry = size ? new THREE.PlaneGeometry(size, size) : new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshStandardMaterial({
        color: finalColor,
        roughness: finalRoughness,
        metalness: finalMetalness,
        opacity: finalOpacity,
        transparent: finalTransparent,
        side: THREE.DoubleSide
      });
      ground.current = new THREE.Mesh(geometry, material);
      ground.current.receiveShadow = true;
      if (!size) {
        ground.current.onBeforeRender = () => {
          const dist = camera.position.length();
          const scale = dist * 10;
          ground.current?.scale.set(scale, scale, 1);
        };
      }
    }
    ground.current.rotation.x = -Math.PI / 2;
    ground.current.position.y = height;
    scene.add(ground.current);
    return () => {
      if (ground.current) {
        scene.remove(ground.current);
        if ("material" in ground.current) {
          if (Array.isArray(ground.current.material)) {
            ground.current.material.forEach((mat) => mat.dispose());
          } else {
            ground.current.material.dispose();
          }
        }
        ground.current.geometry.dispose();
      }
    };
  }, [type, size, height, blur, resolution, ...Object.values(custom)]);
  useEffect(() => {
    if (ground.current) {
      ground.current.visible = visible;
    }
  }, [visible]);
  return null;
};

export {
  GroundSurface
};
