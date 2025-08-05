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
export function ModelLoader({ id, url, onLoaded, onStateChange, onError, preloadOnly = false, setAsActive = false }) {
    const { sceneManager } = useSceneContext();
    const hasLoadedRef = useRef(false);
    useEffect(() => {
        if (!sceneManager || !url || hasLoadedRef.current) {
            return;
        }
        hasLoadedRef.current = true;
        // Modificado para soportar precarga
        sceneManager.loadModel(id, url, onStateChange)
            .then((model) => {
            if (preloadOnly) {
                model.visible = false;
            }
            onLoaded?.(model);
            if (setAsActive) {
                sceneManager.transitionToModel(id);
            }
        })
            .catch(onError);
        return () => {
            hasLoadedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, url, sceneManager, preloadOnly, setAsActive]);
    return null;
}
;
//# sourceMappingURL=ModelLoader.js.map