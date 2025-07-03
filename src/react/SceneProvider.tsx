'use client';
import type { ForwardedRef } from 'react';
import { useRef, useState, useEffect, forwardRef } from 'react';
import { SceneManager } from '../core/SceneManager';
import { SceneContext } from './SceneContext';
import type { THREE } from '..';

/**
 * Props for the SceneRenderer component.
 * @property {string} [id] - Optional ID for the canvas element.
 * @property {string} [className] - Optional class name for the canvas element.
 * @typedef {Object} SceneRendererProps
 */
interface SceneRendererProps {
  id?: string;
  className?: string;
}

/**
 * SceneRenderer component that renders a canvas for the 3D scene.
 * @param {SceneRendererProps} props - Properties for the canvas element.
 * @param {ForwardedRef<HTMLCanvasElement>} ref - Ref to the canvas element.
 * @returns {JSX.Element} A canvas element for rendering the scene.
 * @example
 * <SceneRenderer id="myCanvas" className="scene-canvas" />
 * @see {@link SceneManager} for managing the 3D scene.
 * @see {@link SceneContext} for accessing the scene manager and canvas.
 * @see {@link SceneProvider} for providing the scene context to child components.
 * @see {@link useScene} for accessing the scene manager in functional components.
 */
const SceneRenderer = forwardRef<HTMLCanvasElement, SceneRendererProps>(
  (props: SceneRendererProps, ref: ForwardedRef<HTMLCanvasElement>) => {
    return <canvas ref={ref} {...props} />;
  }
);
SceneRenderer.displayName = 'SceneRenderer';

/**
 * Props for the SceneProvider component.
 * @property {SceneRendererProps} props - Properties for the SceneRenderer component.
 * @property {React.ReactNode} [children] - Optional children to render inside the provider.
 * @property {Object} [config] - Optional configuration for the scene.
 * @property {boolean} [config.antialias] - Whether to enable antialiasing.
 * @property {boolean} [config.postprocessing] - Whether to enable post-processing effects.
 * @property {boolean} [config.shadows] - Whether to enable shadows in the scene.
 * @property {number} [config.pixelRatio] - The pixel ratio for the canvas.
 * @property {THREE.Color} [config.background] - The background color of the scene.
 * @typedef {Object} SceneProviderProps
 * @extends SceneRendererProps
 */
export interface SceneProviderProps extends SceneRendererProps {
  children?: React.ReactNode;
  config?: {
    antialias?: boolean;
    postprocessing?: boolean;
    shadows?: boolean;
    pixelRatio?: number;
    background?: THREE.Color;
  };
}

/**
 * SceneProvider component that initializes and provides the SceneManager context.
 * @param {SceneProviderProps} props - Properties for the SceneProvider component.
 * @returns {JSX.Element} A provider that wraps the SceneRenderer and provides the scene context.
 * @example
 * <SceneProvider config={{ antialias: true, shadows: true }}>
 *   <My3DComponent />
 * </SceneProvider>
 * @see {@link SceneContext} for accessing the scene manager and canvas.
 * @see {@link SceneManager} for managing the 3D scene.
 */
export function SceneProvider({
  children,
  config,
  ...props
}: SceneProviderProps) {
  const [sceneManager, setSceneManager] = useState<SceneManager | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && !initializedRef.current) {
      try {
        initializedRef.current = true;
        const manager = new SceneManager(canvas, config);
        manager.animate();
        setSceneManager(manager);
      } catch (error) {
        console.error('Error initializing scene:', error);
      }
    }

    return () => {
      if (sceneManager) {
        sceneManager.dispose();
        setSceneManager(null);
      }
      initializedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return (
    <SceneContext.Provider value={{ sceneManager, canvas: canvasRef.current }}>
      <SceneRenderer ref={canvasRef} {...props} />
      {children}
    </SceneContext.Provider>
  );
}
