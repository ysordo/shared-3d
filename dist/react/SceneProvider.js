'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect, forwardRef } from 'react';
import { SceneManager } from '../core/SceneManager';
import { SceneContext } from './SceneContext';
import { useCacheCleanup } from './useCacheCleanup';
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
const SceneRenderer = forwardRef((props, ref) => {
    return _jsx("canvas", { ref: ref, ...props });
});
SceneRenderer.displayName = 'SceneRenderer';
/**
 * SceneProvider component that initializes and provides the SceneManager context.
 * @param {SceneProviderProps} props - Properties for the SceneProvider component.
 * @returns {JSX.Element} A provider that wraps the SceneRenderer and provides the scene context.
 * @example
 * ```tsx
 * import { SceneProvider } from 'shared-3d';
 * import My3DComponent from './My3DComponent';
 * // Usage in a React component
 * // Wrap your 3D components with SceneProvider to provide the scene context
 * // and manage the 3D scene lifecycle.
 * // You can pass configuration options to the SceneProvider.
 * // For example, to enable antialiasing and shadows:
 * <SceneProvider config={{ antialias: true, shadows: true }}>
 *   <My3DComponent />
 * </SceneProvider>
 * ```
 * @see {@link SceneContext} for accessing the scene manager and canvas.
 * @see {@link SceneManager} for managing the 3D scene.
 */
export function SceneProvider({ children, config, ...props }) {
    useCacheCleanup();
    const [sceneManager, setSceneManager] = useState(null);
    const canvasRef = useRef(null);
    const initializedRef = useRef(false);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && !initializedRef.current) {
            try {
                initializedRef.current = true;
                const manager = new SceneManager(canvas, config);
                manager.animate();
                setSceneManager(manager);
            }
            catch (error) {
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
    return (_jsxs(SceneContext.Provider, { value: { sceneManager, canvas: canvasRef.current }, children: [_jsx(SceneRenderer, { ref: canvasRef, ...props }), children] }));
}
//# sourceMappingURL=SceneProvider.js.map