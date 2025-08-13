'use client';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';
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
export function TheaterLighting({ intensity = 1.0, lightCount = 8, radiusFactor = 1.8, height = 2.5, showHelpers = true }) {
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        sceneManager?.createTheatreLighting(intensity, lightCount, radiusFactor, height, showHelpers);
        return () => {
            sceneManager?.removeTheatreLighting();
        };
    }, [sceneManager?.activeModelId, intensity, lightCount, radiusFactor, height, showHelpers, sceneManager]);
    return null;
}
;
//# sourceMappingURL=TheaterLighting.js.map