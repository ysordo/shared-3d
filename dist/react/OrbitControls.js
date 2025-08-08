/* eslint-disable no-console */
'use client';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';
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
export function OrbitControls({ enableRotate = false, enableZoom = false, enablePan = false, }) {
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (!sceneManager) {
            console.info('[OrbitControls] SceneManager is not available.');
            return;
        }
        if (sceneManager.activeModelId === null) {
            console.info('[OrbitControls] No active model found. Controls will not be set up.');
            return;
        }
        // Configurar controles
        sceneManager.setupOrbitControls({ enableRotate, enableZoom, enablePan });
        // Limpieza al desmontar o cuando cambien las dependencias
        return () => {
            sceneManager.getOrbitControls()?.dispose();
        };
    }, [sceneManager, sceneManager?.activeModelId, enableRotate, enableZoom, enablePan]);
    return null;
}
//# sourceMappingURL=OrbitControls.js.map