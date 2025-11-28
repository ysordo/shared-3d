/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';

type DirectionalLightProps = {
  intensity?: number;
  color?: THREE.ColorRepresentation;
  position?: [number, number, number];
  castShadow?: boolean;
  shadowMapSize?: number;
};

export const DirectionalLight: React.FC<DirectionalLightProps> = ({
  intensity = 1,
  color = 0xffffff,
  position = [5, 10, 7.5],
  castShadow = true,
  shadowMapSize = 2048,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);

    if (castShadow) {
      light.castShadow = true;
      light.shadow.mapSize.width = shadowMapSize;
      light.shadow.mapSize.height = shadowMapSize;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 50;
      light.shadow.camera.left = -20;
      light.shadow.camera.right = 20;
      light.shadow.camera.top = 20;
      light.shadow.camera.bottom = -20;
      light.shadow.bias = -0.0001;
    }

    scene.add(light);

    if (process.env.NODE_ENV === 'development') {
      const helper = new THREE.DirectionalLightHelper(light, 2);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
        helper.dispose();
      };
    }

    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, position, castShadow, shadowMapSize]);

  return null;
};
