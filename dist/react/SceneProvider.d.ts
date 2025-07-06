import type { JSX } from 'react';
import { type THREE } from '..';
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
export declare function SceneProvider({ children, config, ...props }: SceneProviderProps): JSX.Element;
export {};
//# sourceMappingURL=SceneProvider.d.ts.map