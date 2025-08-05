'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSceneContext } from './SceneContext';

/**
 * Props for the DistanceDisplay component.
 * @property {string} [className] - Additional CSS classes for styling
 * @typedef {Object} DistanceDisplayProps
 */
type DistanceDisplayProps = {
  className?: string;
};

/**
 * Component to display the distance from the camera to the active model in a 3D scene.
 * It shows the distance in meters, centimeters, or kilometers, and includes a scale bar.
 * @param {DistanceDisplayProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Rendered component showing distance and scale bar
 */
export const DistanceDisplay = ({ className }: DistanceDisplayProps) => {
  const [distance, setDistance] = useState<number>(0);
  const [roundedDistance, setRoundedDistance] = useState<number>(0);
  const { sceneManager } = useSceneContext();
  const animationRef = useRef<number>(0);

  // Función para formatear la distancia
  const formatDistance = (dist: number): string => {
    if (dist < 1) {
      return `${Math.round(dist * 100)} cm`;
    } else if (dist < 1000) {
      return `${dist.toFixed(1)} m`;
    }
    return `${(dist / 1000).toFixed(1)} km`;
  };

  // Calcular distancia redondeada para la barra de escala
  const calculateRoundedDistance = (dist: number): number => {
    if (dist < 1) {
      return 0.5;
    }
    if (dist < 2) {
      return 1;
    }
    if (dist < 5) {
      return 2;
    }
    if (dist < 10) {
      return 5;
    }
    if (dist < 20) {
      return 10;
    }
    if (dist < 50) {
      return 20;
    }
    if (dist < 100) {
      return 50;
    }
    if (dist < 200) {
      return 100;
    }
    if (dist < 500) {
      return 200;
    }
    if (dist < 1000) {
      return 500;
    }
    return 1000;
  };

  // Calcular el ancho de la barra de escala
  const calculateScaleBarWidth = (dist: number): number => {
    // Factor de escala basado en la distancia actual
    const scaleFactor = Math.min(1, 100 / dist);
    return Math.max(50, Math.min(200, roundedDistance * scaleFactor * 100));
  };

  useEffect(() => {
    const updateDistance = () => {
      const activeModelId = sceneManager?.getModelActiveId();
      if (!activeModelId) {
        animationRef.current = requestAnimationFrame(updateDistance);
        return;
      }

      const model = sceneManager?.getModel(activeModelId);
      const camera = sceneManager?.getCamera();

      if (model && camera) {
        const modelPosition = new THREE.Vector3();
        model.getWorldPosition(modelPosition);

        const rawDistance = modelPosition.distanceTo(camera.position);
        setDistance(rawDistance);

        // Calcular distancia redondeada para la escala
        const rounded = calculateRoundedDistance(rawDistance);
        setRoundedDistance(rounded);
      }

      animationRef.current = requestAnimationFrame(updateDistance);
    };

    animationRef.current = requestAnimationFrame(updateDistance);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [sceneManager]);

  const scaleBarWidth = calculateScaleBarWidth(distance);

  return (
    <div
      className={`bg-white bg-opacity-85 rounded-sm shadow-md px-3 py-2 relative ${
        className || ''
      }`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700">Distancia</span>
        <span className="text-sm font-bold text-gray-900">
          {formatDistance(distance)}
        </span>
      </div>

      <div className="flex items-end">
        <div
          className="h-[3px] bg-black mr-2"
          style={{ width: `${scaleBarWidth}px` }}
        />
        <span className="text-xs text-gray-700">
          {formatDistance(roundedDistance)}
        </span>
      </div>

      {/* Barra azul inferior al estilo Google Maps */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-blue-500 rounded-b-sm" />
    </div>
  );
};
