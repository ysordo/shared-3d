'use client';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';
/**
 * Component to control the material of the active model in a 3D scene.
 * It applies the specified material type and options to the active model.
 * @param {MaterialControllerProps} props - Component properties
 * @param {'basic' | 'phong' | 'standard' | 'physical'} props.materialType - Type of material to apply
 * @param {THREE.MaterialParameters} props.materialOptions - Parameters for the material
 * @param {boolean} [props.wireframe=false] - Whether to render the material in wireframe mode
 * @returns {null} This component does not render anything directly
 */
export function MaterialController({ materialType, materialOptions, wireframe = false }) {
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager) {
            sceneManager.setMaterial(sceneManager.getModelActiveId(), materialType, materialOptions);
            sceneManager.setWireframe(sceneManager.getModelActiveId(), wireframe);
        }
    }, [materialType, materialOptions, wireframe, sceneManager]);
    return null;
}
;
//# sourceMappingURL=MaterialController.js.map