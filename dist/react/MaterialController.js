'use client';
import { useEffect } from 'react';
import { useSceneContext } from './SceneContext';
export const MaterialController = ({ modelId, materialType, materialOptions, wireframe = false }) => {
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager) {
            sceneManager.setMaterial(modelId, materialType, materialOptions);
            sceneManager.setWireframe(modelId, wireframe);
        }
    }, [modelId, materialType, materialOptions, wireframe, sceneManager]);
    return null;
};
//# sourceMappingURL=MaterialController.js.map