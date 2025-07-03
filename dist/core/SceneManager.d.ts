import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
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
    private scene;
    private camera;
    private renderer;
    private composer?;
    private controls?;
    private models;
    private loadedModels;
    private hasModelLoaded;
    private resizeObserver;
    private parallaxEffects;
    private MARGIN;
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
    });
    /**
     * Sets up post-processing effects for the scene.
     * This includes configuring the renderer's tone mapping, shadow maps,
     * and adding passes for rendering and anti-aliasing.
     * @returns {void}
     * @private
     */
    private setupPostProcessing;
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
    setupOrbitControls(options: {
        enableRotate?: boolean;
        enableZoom?: boolean;
        enablePan?: boolean;
    }): OrbitControls;
    /**
     * Loads a 3D model from a given URL and adds it to the scene.
     * If the model is already loaded, it returns the existing model.
     * If the model is currently loading, it returns the existing promise.
     * @param {string} id - Unique identifier for the model.
     * @param {string} url - URL of the model to load.
     * @param {function} [onProgress] - Optional callback function to track download progress.
     * @returns {Promise<THREE.Object3D>} A promise that resolves to the loaded model.
     */
    loadModel(id: string, url: string, onProgress?: (download: string) => void): Promise<THREE.Object3D>;
    /**
     * Checks if a model with the given ID has been loaded.
     * @param {string} id - Unique identifier for the model.
     * @returns {boolean} True if the model is loaded, false otherwise.
     */
    hasModel(id: string): boolean;
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
    /**
     * Sets up a parallax effect for all models in the scene.
     * The effect is applied based on the scroll progress and can be configured for different axes.
     * @param {number} [intensity=0.1] - Intensity of the parallax effect.
     * @param {'x' | 'y' | 'z' | 'xy' | 'xyz'} [axis='y'] - Axis or axes to apply the parallax effect.
     * @returns {(scrollProgress: number) => void} Function to apply the parallax effect based on scroll progress.
     */
    setupParallaxEffect(intensity?: number, axis?: 'x' | 'y' | 'z' | 'xy' | 'xyz'): (scrollProgress: number) => void;
    /**
     * Creates a parallax effect for a specific model.
     * The effect is applied based on the scroll progress and can be configured for different axes.
     * @param {string} modelId - Unique identifier for the model.
     * @param {number} [intensity=0.1] - Intensity of the parallax effect.
     * @param {'x' | 'y' | 'z' | 'xy' | 'xyz'} [axis='y'] - Axis or axes to apply the parallax effect.
     * @returns {(progress: number) => void} Function to apply the parallax effect based on progress.
     */
    createParallaxEffect(modelId: string, intensity?: number, axis?: 'x' | 'y' | 'z' | 'xy' | 'xyz'): (progress: number) => void;
    /**
     * Applies a parallax effect to a specific model based on its ID and progress.
     * This function retrieves the effect from the map and applies it.
     * @param {string} modelId - Unique identifier for the model.
     * @param {number} progress - Progress value to apply the parallax effect.
     * @returns {void}
     */
    applyParallaxEffect(modelId: string, progress: number): void;
    /**
     * Applies all registered parallax effects based on the provided progress value.
     * This function iterates through all parallax effects and applies them.
     * @param {number} progress - Progress value to apply the parallax effects.
     * @returns {void}
     */
    applyAllParallaxEffects(progress: number): void;
    /**
     * Creates a rotation effect for a specific model based on its ID and intensity.
     * The effect rotates the model around a specified axis based on the progress value.
     * @param {string} modelId - Unique identifier for the model.
     * @param {number} [intensity=0.01] - Intensity of the rotation effect.
     * @param {'x' | 'y' | 'z'} [axis='y'] - Axis to rotate the model around.
     * @returns {(progress: number) => void} Function to apply the rotation effect based on progress.
     */
    createRotationEffect(modelId: string, intensity?: number, axis?: 'x' | 'y' | 'z'): (progress: number) => void;
}
//# sourceMappingURL=SceneManager.d.ts.map