'use client';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';
/**
 * Component to set up OrbitControls for a 3D model in the scene.
 * This component uses the SceneContext to access the SceneManager and set up controls.
 * @param {OrbitControlsProps} props - Component properties
 * @param {Object} props.options - Configuration options for the controls
 * @param {boolean} [props.options.enableRotate=true] - Enable rotation controls
 * @param {boolean} [props.options.enableZoom=true] - Enable zoom controls
 * @param {boolean} [props.options.enablePan=true] - Enable pan controls
 * @returns {null} This component does not render anything directly
 * @throws {Error} If the SceneManager is not available in the context
 */
export function OrbitControls({ options }) {
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager) {
            sceneManager.setupModelOrbitControls(sceneManager.getModelActiveId(), options);
        }
    }, [sceneManager, options]);
    return null;
}
//# sourceMappingURL=OrbitControls.js.map