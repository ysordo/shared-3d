'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSceneContext } from './SceneContext';

/**
 * Props for the AmbientLight component.
 * @property {THREE.ColorRepresentation} [color=0xffffff] - Color of the ambient light
 * @property {number} [intensity=1] - Intensity of the ambient light
 * @property {boolean} [visible=true] - Visibility of the ambient light
 * @property {boolean} [castShadow=false] - Whether the light casts shadows
 * @property {(light: THREE.AmbientLight) => void} [onCreated] - Callback when the light is created
 * @typedef {Object} AmbientLightProps
 */
interface AmbientLightProps {
  color?: THREE.ColorRepresentation;
  intensity?: number;
  visible?: boolean;
  castShadow?: boolean;
  onCreated?: (light: THREE.AmbientLight) => void;
}

/**
 * Component to create and manage an ambient light in a 3D scene.
 * @param {AmbientLightProps} props - Component properties
 * @param {THREE.ColorRepresentation} [props.color=0xffffff] - Color of the ambient light
 * @param {number} [props.intensity=1] - Intensity of the ambient light
 * @param {boolean} [props.visible=true] - Visibility of the ambient light
 * @param {boolean} [props.castShadow=false] - Whether the light casts shadows
 * @param {(light: THREE.AmbientLight) => void} [props.onCreated] - Callback when the light is created
 * @returns {null} This component does not render anything directly
 */
export function AmbientLight({
  color = 0xffffff,
  intensity = 1,
  visible = true,
  castShadow = false,
  onCreated
}: AmbientLightProps): null {
  const { sceneManager } = useSceneContext();
  const lightRef = useRef<THREE.AmbientLight | null>(null);
  
  useEffect(() => {
    if (!sceneManager) {return;}
    
    const scene = sceneManager.getScene();
    
    // Crear o actualizar la luz
    if (!lightRef.current) {
      lightRef.current = new THREE.AmbientLight(color, intensity);
      lightRef.current.visible = visible;
      lightRef.current.castShadow = castShadow;
      
      scene.add(lightRef.current);
      
      if (onCreated) {
        onCreated(lightRef.current);
      }
    } else {
      lightRef.current.color.set(color);
      lightRef.current.intensity = intensity;
      lightRef.current.visible = visible;
      lightRef.current.castShadow = castShadow;
    }
    
    return () => {
      // Limpiar al desmontar
      if (lightRef.current) {
        scene.remove(lightRef.current);
        lightRef.current.dispose();
        lightRef.current = null;
      }
    };
  }, [sceneManager, color, intensity, visible, castShadow, onCreated]);
  
  return null;
};