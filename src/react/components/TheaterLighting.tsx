'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';

type TheaterLightingProps = {
  intensity?: number;
  count?: number;
};

export const TheaterLighting: React.FC<TheaterLightingProps> = ({
  intensity = 2,
  count = 8,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    if(!orchestrator){return;}
    const lights: THREE.Light[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const light = new THREE.PointLight(0xffffff, intensity);
      light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
      orchestrator.scene.add(light);
      lights.push(light);
    }

    return () => {
      lights.forEach((l) => {
        orchestrator.scene.remove(l);
        l.dispose();
      });
    };
  }, [orchestrator, intensity, count]);

  return null;
};
