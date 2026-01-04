'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../../lib';

type AmbientLightProps = {
  intensity?: number;
  color?: THREE.ColorRepresentation;
};

export const AmbientLight: React.FC<AmbientLightProps> = ({
  intensity = 0.5,
  color = 0xffffff,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, scene]);

  return null;
};
