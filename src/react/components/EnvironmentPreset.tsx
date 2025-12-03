'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE, ThreeEXRLoader } from '../../lib';

type EnvironmentPresetName =
  | 'studio'
  | 'sunset'
  | 'dawn'
  | 'night'
  | 'warehouse'
  | 'forest'
  | 'apartment'
  | 'city'
  | 'park'
  | 'lobby';

type EnvironmentPresetProps = {
  name: EnvironmentPresetName;
  intensity?: number;
  blur?: number;
};

const PRESETS: Record<EnvironmentPresetName, string> = {
  studio:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/studio.exr',
  sunset:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/sunset.exr',
  dawn: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/dawn.exr',
  night:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/night.exr',
  warehouse:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/warehouse.exr',
  forest:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/forest.exr',
  apartment:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/apartment.exr',
  city: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/city.exr',
  park: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/park.exr',
  lobby:
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/lobby.exr',
};

export const EnvironmentPreset: React.FC<EnvironmentPresetProps> = ({
  name,
  intensity = 1,
  blur = 0,
}) => {
  const orchestrator = useScene();

  useEffect(() => {
    const url = PRESETS[name];
    if (!url) {
      console.warn(`EnvironmentPreset: "${name}" no encontrado`);
      return;
    }

    const loader = new ThreeEXRLoader();
    loader.setDataType(THREE.HalfFloatType);

    loader.load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      orchestrator.scene.environment = texture;
      orchestrator.scene.background = texture;
      orchestrator.scene.backgroundBlurriness = blur;
      orchestrator.scene.environmentIntensity = intensity;
    });

    return () => {
      if (orchestrator.scene.environment) {
        orchestrator.scene.environment.dispose();
        orchestrator.scene.environment = null;
      }
      if (orchestrator.scene.background) {
        if (!(orchestrator.scene.background instanceof THREE.Color)) {
          orchestrator.scene.background.dispose();
        }
        orchestrator.scene.background = null;
      }
    };
  }, [name, intensity, blur]);

  return null;
};
