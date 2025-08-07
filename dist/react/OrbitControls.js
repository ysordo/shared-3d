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
export function OrbitControls({ id, options }) {
    const { sceneManager } = useSceneContext();
    const defaultOptions = {
        enableRotate: false,
        enableZoom: false,
        enablePan: false,
    };
    options = { ...defaultOptions, ...options };
    useEffect(() => {
        if (!sceneManager || !id) {
            return;
        }
        sceneManager.setupModelOrbitControls(id, options);
    }, [sceneManager, options, id]);
    return null;
}
//# sourceMappingURL=OrbitControls.js.map