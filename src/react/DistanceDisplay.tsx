'use client';
import { type JSX, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSceneContext } from './SceneContext';

/**
 * Props for the DistanceDisplay component.
 * @property {string} [className] - Additional CSS classes for styling
 * @typedef {Object} DistanceDisplayProps
 */
type DistanceDisplayProps = {
  className?: string;
  children?: React.ReactNode;
  setDistance?: (distance: number) => void;
};

/**
 * Component to display the distance from the camera to the active model in a 3D scene.
 * It shows the distance in meters, centimeters, or kilometers, and includes a scale bar.
 * @param {DistanceDisplayProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Rendered component showing distance and scale bar
 */
export function DistanceDisplay({ children, className, setDistance }: DistanceDisplayProps): JSX.Element {
  const { sceneManager } = useSceneContext();
  const animationRef = useRef<number>(0);

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
        setDistance?.(rawDistance);
      }

      animationRef.current = requestAnimationFrame(updateDistance);
    };

    animationRef.current = requestAnimationFrame(updateDistance);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [sceneManager, setDistance]);

  return <div className={className}>{children}</div>;
}
