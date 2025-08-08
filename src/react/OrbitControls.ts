'use client';
import { useEffect, useRef } from 'react';
import { useSceneContext } from './SceneContext';
import type { OrbitControls as OrbitControlsType } from 'three/examples/jsm/Addons';

/**
 * Props for the OrbitControls component.
 * @property {boolean} [enableRotate=false] - Enable rotation controls
 * @property {boolean} [enableZoom=false] - Enable zoom controls
 * @property {boolean} [enablePan=false] - Enable pan controls
 * @typedef {Object} OrbitControlsProps
 */
interface OrbitControlsProps {
  id: string | null;
  enableRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
}

/**
 * Component to manage orbit controls for a 3D scene.
 * It sets up controls based on the active model and allows customization of control options.
 * @param {OrbitControlsProps} props - Component properties
 * @param {boolean} [props.enableRotate=false] - Enable rotation controls
 * @param {boolean} [props.enableZoom=false] - Enable zoom controls
 * @param {boolean} [props.enablePan=false] - Enable pan controls
 * @returns {null} This component does not render anything directly, it sets up controls in the scene.
 * @example
 * <OrbitControls enableRotate={true} enableZoom={true} enablePan={false} />
 * @description
 * The OrbitControls component sets up Three.js orbit controls for the active model in the scene.
 * It allows users to rotate, zoom, and pan the camera around the model based on the provided options.
 * The controls are automatically cleaned up when the component is unmounted or when the active model changes.
 * This component is useful for providing interactive camera controls in 3D applications.
 */
export function OrbitControls({
    id,
    enableRotate = false,
    enableZoom = false,
    enablePan = false,
}: OrbitControlsProps): null {
  const { sceneManager } = useSceneContext();
  const controlsRef = useRef<OrbitControlsType | null>(null);

  useEffect(() => {
    if (!sceneManager || !id) {return;}

    // Cleaning previous controls if they exist
    if (controlsRef.current) {
      sceneManager.cleanupControls();
      controlsRef.current = null;
    }

    // Create new controls
    controlsRef.current = sceneManager.setupOrbitControls(
      { enableRotate, enableZoom, enablePan }
    );

    // Cleaning when disassembling
    return () => {
      if (controlsRef.current) {
        sceneManager.cleanupControls();
        controlsRef.current = null;
      }
    };
  }, [sceneManager, id, enableRotate, enableZoom, enablePan]);
  
  return null;
}