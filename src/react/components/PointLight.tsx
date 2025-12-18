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
  const orchestrator = useScene();

  useEffect(() => {
    if(!orchestrator){return;}
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    orchestrator.scene.add(light);

    if (process.env.NODE_ENV === 'development') {
      const helper = new THREE.PointLightHelper(light, 0.5);
      orchestrator.scene.add(helper);
      return () => {
        orchestrator.scene.remove(light);
        orchestrator.scene.remove(helper);
        light.dispose();
      };
    }

    return () => {
      orchestrator.scene.remove(light);
      light.dispose();
    };
  }, [orchestrator,intensity, color, position, distance, decay]);

  return null;
};
