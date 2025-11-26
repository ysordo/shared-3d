'use client';
import React, { useState } from 'react';
import { useScene } from '../../hooks/useScene';
import * as THREE from 'three';

export const LightingController: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { scene } = useScene();
  const [intensity, setIntensity] = useState(1);

  const updateLights = (value: number) => {
    setIntensity(value);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.intensity = value * (obj.userData.baseIntensity || 1);
      }
    });
  };

  // Guardar intensidad base
  React.useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.userData.baseIntensity = obj.intensity;
      }
    });
  }, [scene]);

  return (
    <div className={`bg-black/80 text-white p-4 rounded-lg ${className || ''}`}>
      <h3 className="text-lg font-bold mb-3">Iluminación Global</h3>
      <label className="block">
        <span className="text-sm">Intensidad: {intensity.toFixed(2)}</span>
        <input
          type="range"
          min="0"
          max="3"
          step="0.01"
          value={intensity}
          onChange={(e) => updateLights(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </label>
    </div>
  );
};
