'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';

type PointLightProps = {
  intensity?: number;
  color?: THREE.ColorRepresentation;
  position?: [number, number, number];
  distance?: number;
  decay?: number;
};

export const PointLight: React.FC<PointLightProps> = ({
  intensity = 1,
  color = 0xffffff,
  position = [0, 5, 0],
  distance = 0,
  decay = 2,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    scene.add(light);

    if (process.env.NODE_ENV === 'development') {
      const helper = new THREE.PointLightHelper(light, 0.5);
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
  }, [intensity, color, position, distance, decay]);

  return null;
};
