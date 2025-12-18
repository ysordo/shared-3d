'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';

type AmbientLightProps = {
  intensity?: number;
  color?: THREE.ColorRepresentation;
};

export const AmbientLight: React.FC<AmbientLightProps> = ({
  intensity = 0.5,
  color = 0xffffff,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    if(!orchestrator){return;}
    const light = new THREE.AmbientLight(color, intensity);
    orchestrator.scene.add(light);

    return () => {
      orchestrator.scene.remove(light);
      light.dispose();
    };
  }, [intensity, color,orchestrator]);

  return null;
};
