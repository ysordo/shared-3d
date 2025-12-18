'use client';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { THREE } from '../../lib';

type SurfaceType =
  | 'mirror'
  | 'glass'
  | 'metal'
  | 'concrete'
  | 'water'
  | 'wood'
  | 'custom';

type GroundSurfaceProps = {
  type?: SurfaceType;
  size?: number; // si no se pasa → infinito
  height?: number;
  blur?: number;
  resolution?: number;
  color?: THREE.ColorRepresentation;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  transparent?: boolean;
  visible?: boolean;
};

const PRESETS: Record<
  SurfaceType,
  {
    reflective: boolean;
    color: number;
    roughness: number;
    metalness: number;
    opacity?: number;
    transparent?: boolean;
  }
> = {
  mirror: { reflective: true, color: 0xffffff, roughness: 0, metalness: 1 },
  glass: {
    reflective: true,
    color: 0x88ccff,
    roughness: 0,
    metalness: 0,
    opacity: 0.3,
    transparent: true,
  },
  metal: { reflective: true, color: 0x888888, roughness: 0.1, metalness: 1 },
  concrete: {
    reflective: false,
    color: 0x999999,
    roughness: 0.9,
    metalness: 0,
  },
  wood: { reflective: false, color: 0x8b4513, roughness: 0.8, metalness: 0 },
  water: {
    reflective: true,
    color: 0x0088ff,
    roughness: 0,
    metalness: 0.1,
    opacity: 0.7,
    transparent: true,
  },
  custom: { reflective: true, color: 0xffffff, roughness: 0, metalness: 1 },
};

export const GroundSurface: React.FC<GroundSurfaceProps> = ({
  type = 'mirror',
  size,
  height = 0,
  blur = 0.8,
  resolution = 1024,
  visible = true,
  ...custom
}) => {
  const orchestrator = useScene();
  const ground = useRef<THREE.Mesh | Reflector>(null);

  useEffect(() => {
    if (!orchestrator) {
      return;
    }

    const scene = orchestrator.scene;
    const camera = orchestrator.camera;
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
        clipBias: 0.003,
        textureWidth: resolution,
        textureHeight: resolution,
        color: new THREE.Color(finalColor),
      });

      if (Array.isArray(ground.current.material)) {
        ground.current.material.forEach((mat) => {
          (mat as any).roughness = finalRoughness;
          (mat as any).metalness = finalMetalness;
          mat.opacity = finalOpacity;
          mat.transparent = finalTransparent;
        });
        ground.current.castShadow = true;
      } else {
        (ground.current.material as any).roughness = finalRoughness;
        (ground.current.material as any).metalness = finalMetalness;
        ground.current.material.opacity = finalOpacity;
        ground.current.material.transparent = finalTransparent;
        ground.current.castShadow = true;
      }
    } else {
      const geometry = size
        ? new THREE.PlaneGeometry(size, size)
        : new THREE.PlaneGeometry(2, 2);

      const material = new THREE.MeshStandardMaterial({
        color: finalColor,
        roughness: finalRoughness,
        metalness: finalMetalness,
        opacity: finalOpacity,
        transparent: finalTransparent,
        side: THREE.DoubleSide,
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
        if ('material' in ground.current) {
          if (Array.isArray(ground.current.material)) {
            ground.current.material.forEach((mat) => mat.dispose());
          } else {
            ground.current.material.dispose();
          }
        }
        ground.current.geometry.dispose();
      }
    };
  }, [orchestrator, type, size, height, blur, resolution, ...Object.values(custom)]);

  useEffect(() => {
    if (ground.current) {
      ground.current.visible = visible;
    }
  }, [visible]);

  return null;
};
