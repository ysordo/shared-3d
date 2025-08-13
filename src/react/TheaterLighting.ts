'use client';
import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import { useSceneContext } from './SceneContext';

/**
 * Props for the TheaterLighting component.
 * @property {number} [intensity=1.0] - Intensity of the lights
 * @property {number} [lightCount=8] - Number of lights in the theater setup
 * @property {number} [radiusFactor=1.8] - Factor to adjust the radius of the light circle
 * @property {number} [height=2.5] - Height of the lights above the model
 * @property {boolean} [showHelpers=true] - Whether to show light helpers
 * @typedef {Object} TheaterLightingProps
 */
interface TheaterLightingProps {
  intensity?: number;
  lightCount?: number;
  radiusFactor?: number;
  height?: number;
  showHelpers?: boolean;
}

/**
 * Component to create a theater lighting setup around the active model in a 3D scene.
 * It creates multiple point lights arranged in a circle and adds ambient and fill lights.
 * @param {TheaterLightingProps} props - Component properties
 * @param {number} [props.intensity=1.0] - Intensity of the lights
 * @param {number} [props.lightCount=8] - Number of lights in the theater setup
 * @param {number} [props.radiusFactor=1.8] - Factor to adjust the radius of the light circle
 * @param {number} [props.height=2.5] - Height of the lights above the model
 * @param {boolean} [props.showHelpers=true] - Whether to show light helpers
 * @returns {null} This component does not render anything directly
 */
export function TheaterLighting ({
  intensity = 1.0,
  lightCount = 8,
  radiusFactor = 1.8,
  height = 2.5,
  showHelpers = true
}: TheaterLightingProps): null {
  const { sceneManager, canvas } = useSceneContext();
  
  useEffect(() => {
    if (!sceneManager) {return;}
    let animationFrameId = requestAnimationFrame(()=>sceneManager.createTheatreLighting(intensity,lightCount,radiusFactor,height,showHelpers) && cancelAnimationFrame(animationFrameId));
    return ()=> {
      sceneManager.removeTheatreLighting();
      cancelAnimationFrame(animationFrameId);
    };
  }, [sceneManager, intensity, lightCount, radiusFactor, height, showHelpers]);
  
  return null;
};