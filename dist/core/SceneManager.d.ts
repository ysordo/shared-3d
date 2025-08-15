import * as THREE from 'three';
import { OrbitControlsManager } from './OrbitControlsManager';
export type LoadState = 'checking_cache' | 'cache_hit' | 'cache_miss' | 'downloading' | 'parsing' | 'caching' | 'adding_to_scene' | 'model_ready' | 'error';
/**
 * SceneManager class that manages a 3D scene using Three.js.
 * It handles rendering, model loading, camera controls, and post-processing effects.
 * @class
 * @property {THREE.Scene} scene - The Three.js scene object.
 * @property {THREE.PerspectiveCamera} camera - The camera used to view the scene.
 * @property {THREE.WebGLRenderer} renderer - The renderer used to render the scene.
 * @property {EffectComposer} [composer] - Optional post-processing composer for advanced effects.
 * @property {OrbitControls} [controls] - Optional controls for orbiting the camera around the scene.
 * @property {Map<string, THREE.Object3D>} models - Map of loaded models by their IDs.
 * @property {Map<string, Promise<THREE.Object3D>>} loadedModels - Map of promises for loading models by their IDs.
 * @property {Map<string, boolean>} hasModelLoaded - Map to track if a model has been loaded.
 * @property {ResizeObserver} resizeObserver - Observer to handle canvas resizing.
 * @property {Map<string, (progress: number) => void>} parallaxEffects - Map of parallax effects for models.
 * @property {number} MARGIN - Margin factor for camera distance calculations.
 * @param {HTMLCanvasElement} canvas - The canvas element where the scene will be rendered.
 * @param {Object} [config] - Configuration options for the scene.
 * @param {boolean} [config.antialias=true] - Whether to enable antialiasing in the renderer.
 * @param {boolean} [config.postprocessing=false] - Whether to enable post-processing effects.
 * @param {boolean} [config.shadows=false] - Whether to enable shadows in the scene.
 * @param {number} [config.pixelRatio] - The pixel ratio for the renderer.
 * @param {THREE.Color} [config.background] - The background color of the scene.
 * @example
 * const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
 * const sceneManager = new SceneManager(canvas, {
 *   antialias: true,
 *   postprocessing: true,
 *   shadows: true,
 *   pixelRatio: window.devicePixelRatio,
 *   background: new THREE.Color(0x000000)
 * });
 * sceneManager.animate();
 * @see {@link https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene|Three.js Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/controls/OrbitControls|OrbitControls Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/postprocessing/EffectComposer|EffectComposer Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader|GLTFLoader Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/postprocessing/SMAAPass|SMAAPass Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/postprocessing/SSAARenderPass|SSAARenderPass Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/postprocessing/TAARenderPass|TAARenderPass Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/lights/AmbientLight|AmbientLight Documentation}
 * @see {@link https://threejs.org/docs/index.html#examples/en/lights/DirectionalLight|DirectionalLight Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/materials/Material|Material Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial|MeshBasicMaterial Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial|MeshPhongMaterial Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial|MeshStandardMaterial Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial|MeshPhysicalMaterial Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/math/Box3|Box3 Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/math/Sphere|Sphere Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/math/Vector3|Vector3 Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera|PerspectiveCamera Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer|WebGLRenderer Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/scenes/Scene|Scene Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/Object3D|Object3D Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/Material|Material Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/BufferGeometry|BufferGeometry Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/Geometry|Geometry Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/Loader|Loader Documentation}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/LoaderUtils|LoaderUtils Documentation}
 */
export declare class SceneManager {
    private canvas;
    private config;
    scene: THREE.Scene;
    private camera;
    private renderer;
    private composer?;
    private controls?;
    private models;
    private loadedModels;
    private hasModelLoaded;
    private resizeObserver;
    private parallaxEffects;
    private parallaxManager?;
    private MARGIN;
    activeModelId: string | null;
    private transitionProgress;
    transitionDuration: number;
    private transitionModels;
    private initialCameraPositions;
    private initialCameraTargets;
    private modelBoundingRadii;
    private NEAR_MARGIN;
    private FAR_MULTIPLIER;
    private lightsRef;
    private helpersRef;
    private fillLightRef;
    private ambientLightRef;
    /**
     * Creates an instance of SceneManager.
     * Initializes the Three.js scene, camera, renderer, and optional post-processing effects.
     * @param {HTMLCanvasElement} canvas - The canvas element where the scene will be rendered.
     * @param {Object} [config] - Configuration options for the scene.
     * @param {boolean} [config.antialias=true] - Whether to enable antialiasing in the renderer.
     * @param {boolean} [config.postprocessing=false] - Whether to enable post-processing effects.
     * @param {boolean} [config.shadows=false] - Whether to enable shadows in the scene.
     * @param {number} [config.pixelRatio] - The pixel ratio for the renderer.
     * @param {THREE.Color} [config.background] - The background color of the scene.
     * @returns {void}
     * @example
     * ´´´tsx
     * //Initializes a Three.js scene with a canvas and basic configuration.
     * import { SceneManager } from '@types/shared-3d';
     * import * as THREE from '@types/shared-3d';
     *
     * const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
     * const sceneManager = new SceneManager(canvas, {
     *   antialias: true,
     *   postprocessing: true,
     *   shadows: true,
     *   pixelRatio: window.devicePixelRatio,
     *   background: new THREE.Color(0x000000)
     * });
     * sceneManager.animate();
     * ´´´
     */
    constructor(canvas: HTMLCanvasElement, config?: {
        antialias?: boolean;
        postprocessing?: boolean;
        shadows?: boolean;
        pixelRatio?: number;
        background?: THREE.Color;
        parallax?: boolean;
    });
    /**
     * Sets up post-processing effects for the scene.
     * This includes configuring the renderer's tone mapping, shadow maps,
     * and adding passes for rendering and anti-aliasing.
     * @returns {void}
     * @private
     */
    private setupPostProcessing;
    /**
     * Handles canvas resizing by updating the renderer size, camera aspect ratio,
     * and recalculating camera position for all models in the scene.
     * It also updates the post-processing composer size if it exists.
     * @returns {void}
     * @private
     */
    private handleResize;
    /**
     * Sets up orbit controls for the camera.
     * This allows the user to rotate, zoom, and pan the camera around the scene.
     * @param {Object} options - Options for configuring the orbit controls.
     * @param {boolean} [options.enableRotate=true] - Whether to enable rotation of the camera.
     * @param {boolean} [options.enableZoom=true] - Whether to enable zooming of the camera.
     * @param {boolean} [options.enablePan=true] - Whether to enable panning of the camera.
     * @returns {OrbitControls} The configured OrbitControls instance.
     */
    setupOrbitControls(options?: {
        enableRotate?: boolean;
        enableZoom?: boolean;
        enablePan?: boolean;
        maxDistance?: number;
        minDistance?: number;
    }): void;
    /**
     * Gets the current OrbitControls instance.
     * This method returns the OrbitControls instance if it has been set up,
     * otherwise it returns undefined.
     */
    getOrbitControls(): OrbitControlsManager | undefined;
    /**
     * Preloads models by their IDs and URLs.
     * This method loads models in the background without adding them to the scene immediately.
     * It allows for faster transitions later by preloading models that will be used frequently.
     * @param {Array<{id: string; url: string}>} models - Array of model objects with id and url.
     * @returns {void}
     */
    preloadModels(models: {
        id: string;
        url: string;
    }[]): void;
    /**
     * Animates the camera to the initial position for a model
     * @param {string} modelId - ID of the model to reset camera for
     * @param {number} duration - Animation duration in milliseconds
     */
    private animateCameraToInitialPosition;
    /**
     * Transitions to a model with a specified ID.
     * This method handles the transition effect between the currently active model and the target model.
     * It uses a fade-in and fade-out effect to smoothly switch between models.
     * @param {string} targetId - The ID of the model to transition to.
     * @returns {void}
     */
    transitionToModel(targetId: string): void;
    /**
     * Loads a 3D model from a given URL and adds it to the scene.
     * If the model is already loaded, it returns the existing model.
     * If the model is currently loading, it returns the existing promise.
     * @param {string} id - Unique identifier for the model.
     * @param {string} url - URL of the model to load.
     * @param {function} [onStateChange] - Optional callback function to report loading state changes.
     * @returns {Promise<THREE.Object3D>} A promise that resolves to the loaded model.
     */
    loadModel(id: string, url: string, onStateChange?: (status: LoadState, details: string) => void): Promise<THREE.Object3D>;
    /**
     * Checks if a model with the given ID has been loaded.
     * @param {string} id - Unique identifier for the model.
     * @returns {boolean} True if the model is loaded, false otherwise.
     */
    hasModel(id: string): boolean;
    /**
     *
     */
    createTheatreLighting(intensity?: number, lightCount?: number, radiusFactor?: number, height?: number, showHelpers?: boolean): boolean;
    /**
     *
     */
    removeTheatreLighting(): () => void;
    /**
     * Adds a model to the scene and positions the camera to fit the model.
     * It calculates the bounding box of the model, centers it, and adjusts the camera distance accordingly.
     * @param {string} id - Unique identifier for the model.
     * @param {THREE.Object3D} model - The model to add to the scene.
     * @returns {void}
     * @private
     */
    private addModelToScene;
    /**
     * Adjusts the camera clipping planes based on the active model's bounding sphere.
     * It calculates the near and far clipping planes based on the model's radius and distance from the camera.
     * This helps to avoid clipping issues when rendering large models.
     * @returns {void}
     */
    private adjustClippingPlanes;
    /**
     * Resets the camera position for a specific model
     * @param {string} modelId - ID of the model to reset camera for
     */
    resetCameraForModel(modelId: string): void;
    /**
     * Retrieves a model by its ID.
     * @param {string} id - Unique identifier for the model.
     * @returns {THREE.Object3D | undefined} The model if found, otherwise undefined.
     */
    getModel(id: string): THREE.Object3D | undefined;
    /**
     * Updates a model by its ID using a provided updater function.
     * The updater function receives the model as an argument and can modify it.
     * @param {string} id - Unique identifier for the model.
     * @param {(model: THREE.Object3D) => void} updater - Function to update the model.
     * @returns {void}
     */
    updateModel(id: string, updater: (model: THREE.Object3D) => void): void;
    /**
     * Sets the material of a model by its ID.
     * It traverses the model's children and applies the specified material type with options.
     * @param {string} id - Unique identifier for the model.
     * @param {'basic' | 'phong' | 'standard' | 'physical'} materialType - Type of material to apply.
     * @param {THREE.MaterialParameters} options - Parameters for the material.
     * @returns {void}
     */
    setMaterial(id: string, materialType: 'basic' | 'phong' | 'standard' | 'physical', options: THREE.MaterialParameters): void;
    /**
     * Sets the wireframe mode for a model by its ID.
     * It traverses the model's children and enables or disables wireframe mode.
     * @param {string} id - Unique identifier for the model.
     * @param {boolean} enabled - Whether to enable wireframe mode.
     * @returns {void}
     */
    setWireframe(id: string, enabled: boolean): void;
    /**
     * Gets the Three.js scene object.
     * This is the main container for all objects, lights, and cameras in the scene.
     * @returns {THREE.Scene} The Three.js scene object.
     */
    getCamera(): THREE.PerspectiveCamera;
    /**
     * Starts the animation loop for rendering the scene.
     * It uses requestAnimationFrame to continuously render the scene and update controls if available.
     * If post-processing is enabled, it renders through the composer, otherwise directly through the renderer.
     * @returns {void}
     */
    animate(): void;
    /**
     * Disposes of the scene manager resources.
     * It disconnects the resize observer, disposes of the renderer,
     * removes all models from the scene, and disposes of controls if they exist.
     * @returns {void}
     */
    dispose(): void;
    handleParallaxEffects(onProgress: (progress: number, effect: (arg0: (mesh: THREE.Object3D) => void) => void) => void): void;
}
//# sourceMappingURL=SceneManager.d.ts.map