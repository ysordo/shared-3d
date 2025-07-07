'use client';
import { useEffect, useRef } from 'react';
import { useSceneContext } from './SceneContext';
import type * as THREE from 'three';

/**
 * Props for the ModelLoader component.
 * @property {string} id - Unique identifier for the model.
 * @property {string} url - URL of the model to load.
 * @property {(model: THREE.Object3D) => void} [onLoaded] - Callback function called when the model is loaded.
 * @property {(download: string) => void} [onProgress] - Callback function called to report download progress.
 * @property {(error: Error) => void} [onError] - Callback function called when an error occurs during loading.
 * @property {boolean} [preloadOnly=false] - If true, the model is loaded but not added to the scene immediately (useful for preloading).
 * @property {boolean} [setAsActive=false] - If true, the model will be set as the active model in the scene after loading.
 * @typedef {Object} ModelLoaderProps
 */
interface ModelLoaderProps {
  id: string;
  url: string;
  onLoaded?: (model: THREE.Object3D) => void;
  onProgress?: (download: string) => void;
  onError?: (error: Error) => void;
  preloadOnly?: boolean; // Nueva prop para precarga
  setAsActive?: boolean; // Nueva prop para activar al cargar
}

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
export const ModelLoader = ({
  id,
  url,
  onLoaded,
  onProgress,
  onError,
  preloadOnly = false,
  setAsActive = false
}: ModelLoaderProps) => {
  const { sceneManager } = useSceneContext();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!sceneManager || !url || hasLoadedRef.current) {return;}

    hasLoadedRef.current = true;

    // Modificado para soportar precarga
    sceneManager.loadModel(id, url, onProgress)
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
};