'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
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
  const { sceneManager } = useSceneContext();
  const lightsRef = useRef<THREE.PointLight[]>([]);
  const helpersRef = useRef<THREE.PointLightHelper[]>([]);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  
  useEffect(() => {
    if (!sceneManager) {return;}
    
    const scene = sceneManager.getScene();
    const activeModelId = sceneManager.getModelActiveId();
    
    if (!activeModelId) {return;}
    
    const model = sceneManager.getModel(activeModelId);
    if (!model) {return;}
    
    // Calcular el centro y radio del modelo
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) * 0.5;
    
    // Crear el círculo de luces
    const lights: THREE.PointLight[] = [];
    const helpers: THREE.PointLightHelper[] = [];
    
    for (let i = 0; i < lightCount; i++) {
      const angle = (i / lightCount) * Math.PI * 2;
      const x = center.x + Math.cos(angle) * radius * radiusFactor;
      const z = center.z + Math.sin(angle) * radius * radiusFactor;
      const y = center.y + height;
      
      // Crear luz
      const light = new THREE.PointLight(0xffffff, intensity);
      light.position.set(x, y, z);
      light.castShadow = true;
      light.shadow.bias = -0.001;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      
      scene.add(light);
      lights.push(light);
      
      // Crear helper visual
      if (showHelpers) {
        const helper = new THREE.PointLightHelper(light, radius * 0.2);
        scene.add(helper);
        helpers.push(helper);
      }
    }
    
    // Luz ambiental
    ambientLightRef.current = new THREE.AmbientLight(0xffffff, intensity * 0.15);
    scene.add(ambientLightRef.current);
    
    // Luz de relleno
    fillLightRef.current = new THREE.DirectionalLight(0xffffff, intensity * 0.3);
    fillLightRef.current.position.set(0, height * 1.5, 0);
    fillLightRef.current.castShadow = true;
    scene.add(fillLightRef.current);
    
    // Guardar referencias
    lightsRef.current = lights;
    helpersRef.current = helpers;
    
    return () => {
      // Limpiar al desmontar
      lights.forEach(light => scene.remove(light));
      helpers.forEach(helper => scene.remove(helper));
      
      if (ambientLightRef.current) {
        scene.remove(ambientLightRef.current);
        ambientLightRef.current.dispose();
        ambientLightRef.current = null;
      }
      
      if (fillLightRef.current) {
        scene.remove(fillLightRef.current);
        fillLightRef.current.dispose();
        fillLightRef.current = null;
      }
    };
  }, [sceneManager, intensity, lightCount, radiusFactor, height, showHelpers]);
  
  return null;
};