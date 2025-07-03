'use client';
import { useEffect, useRef } from 'react';
import { useSceneContext } from './SceneContext';
/**
 * Component to load a 3D model into the scene.
 * It uses the SceneManager from the SceneContext to load the model.
 * @param {ModelLoaderProps} props - Properties for the ModelLoader component.
 * @returns {null} - This component does not render anything to the DOM.
 * @example
 * ```jsx
 * <ModelLoader
 *   id="myModel"
 *   url="/path/to/model.gltf"
 *   onLoaded={(model) => console.log('Model loaded:', model)}
 *   onProgress={(download) => console.log('Download:', download)}
 *   onError={(error) => console.error('Error loading model:', error)}
 * />
 * ```
 */
export const ModelLoader = ({ id, url, onLoaded, onProgress, onError }) => {
    const { sceneManager } = useSceneContext();
    const hasLoadedRef = useRef(false);
    useEffect(() => {
        if (!sceneManager || !url || hasLoadedRef.current) {
            return;
        }
        // Verify if the model is already loaded
        if (sceneManager.getModel(id)) {
            onLoaded?.(sceneManager.getModel(id));
            return;
        }
        hasLoadedRef.current = true;
        sceneManager
            .loadModel(id, url, onProgress)
            .then((model) => {
            onLoaded?.(model);
        })
            .catch((error) => {
            onError?.(error);
        });
        return () => {
            hasLoadedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, url, sceneManager]);
    return null;
};
//# sourceMappingURL=ModelLoader.js.map