import type { SceneManager } from '../core/SceneManager';
/**
 * Context to handle the scene and canvas in the React application.
 * It provides access to the SceneManager and Canvas HTML.
 * @example
 * ```tsx
 * import { useSceneContext } from './SceneContext';
 * const MyComponent = () => {
 *   const { sceneManager, canvas } = useSceneContext();
 *   // Puedes usar sceneManager y canvas aquí
 *   return <div>My Scene Component</div>;
 * };
 * ```
 * @typedef {Object} SceneContextType
 * @property {SceneManager | null} sceneManager -Scenemanager instance to handle the scene.
 * @property {HTMLCanvasElement | null} canvas -Canvas HTML element where the scene is rendered.
 * @see {@link SceneManager} For more details on how to handle the scene.
 * @see {@link useSceneContext} to access the context in functional components.
 * @see {@link SceneProvider} to provide the context to the children components.
 * @see {@link SceneRenderer} To render the canvas of the scene.
 * @see {@link ModelLoader} To load models on the scene.
 * @see {@link MaterialController} To control the materials of the models on the scene.
 * @see {@link useScene} to access SceneManager in functional components.
 * @see {@link SceneProviderProps} for the properties of the scene provider.
 * @see {@link SceneRendererProps} For the properties of the scene rendering.
 */
export declare const SceneContext: import("react").Context<{
    sceneManager: SceneManager | null;
    canvas: HTMLCanvasElement | null;
}>;
export declare const useSceneContext: () => {
    sceneManager: SceneManager | null;
    canvas: HTMLCanvasElement | null;
};
//# sourceMappingURL=SceneContext.d.ts.map