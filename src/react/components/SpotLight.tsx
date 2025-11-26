/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import * as THREE from 'three';

type SpotLightProps = {
  intensity?: number;
  color?: THREE.ColorRepresentation;
  position?: [number, number, number];
  target?: THREE.Object3D | string; // objeto o nombre
  angle?: number;
  penumbra?: number;
  distance?: number;
  castShadow?: boolean;
};

export const SpotLight: React.FC<SpotLightProps> = ({
  intensity = 5,
  color = 0xffffff,
  position = [0, 10, 0],
  target,
  angle = Math.PI / 6,
  penumbra = 0.1,
  distance = 50,
  castShadow = true,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    const light = new THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra
    );
    light.position.set(...position);
    light.castShadow = castShadow;

    if (castShadow) {
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
    }

    scene.add(light);

    // Target
    if (target) {
      if (typeof target === 'string') {
        const obj = scene.getObjectByName(target);
        if (obj) {
          light.target = obj;
        }
      } else {
        light.target = target;
        scene.add(target); // si no está en la escena
      }
    }

    if (process.env.NODE_ENV === 'development') {
      const helper = new THREE.SpotLightHelper(light);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
      };
    }

    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [
    intensity,
    color,
    position,
    target,
    angle,
    penumbra,
    distance,
    castShadow,
  ]);

  return null;
};
