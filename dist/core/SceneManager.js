/* eslint-disable no-console */
import * as THREE from 'three';
import { EffectComposer, GLTFLoader, RenderPass, SMAAPass, SSAARenderPass } from 'three/examples/jsm/Addons.js';
import { CacheManager } from './CacheManager';
import { OrbitControlsManager } from './OrbitControlsManager';
import { ParallaxManager } from './ParallaxManager';
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
export class SceneManager {
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
    constructor(canvas, config = {}) {
        this.canvas = canvas;
        this.config = config;
        this.models = new Map();
        this.loadedModels = new Map();
        this.hasModelLoaded = new Map();
        this.parallaxEffects = new Map();
        this.MARGIN = 0.8;
        this.activeModelId = null;
        this.transitionProgress = 0;
        this.transitionDuration = 1000; // ms
        this.transitionModels = new Map();
        this.initialCameraPositions = new Map();
        this.initialCameraTargets = new Map();
        this.modelBoundingRadii = new Map();
        this.NEAR_MARGIN = 0.1; // Margen adicional para evitar clipping
        this.FAR_MULTIPLIER = 10; // Multiplicador para el plano far
        this.lightsRef = [];
        this.helpersRef = [];
        this.fillLightRef = null;
        this.ambientLightRef = {
            get: new THREE.AmbientLight(),
            set(color, intensity) {
                this.get.intensity = intensity;
                this.get.color = new THREE.Color(color);
            },
        };
        /**
         * Handles canvas resizing by updating the renderer size, camera aspect ratio,
         * and recalculating camera position for all models in the scene.
         * It also updates the post-processing composer size if it exists.
         * @returns {void}
         * @private
         */
        this.handleResize = () => {
            const pixelRatio = this.config.pixelRatio || Math.min(window.devicePixelRatio, 2);
            const { canvas } = this;
            // 1. Update renderer size
            this.renderer.setSize(canvas.clientWidth * pixelRatio, canvas.clientHeight * pixelRatio, false);
            // 2. Update camera aspect ratio
            const newAspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.aspect = newAspect;
            this.camera.updateProjectionMatrix();
            // 3. Recalculate camera position for all models
            this.models.forEach(model => {
                const box = new THREE.Box3().setFromObject(model);
                const boundingSphere = new THREE.Sphere();
                box.getBoundingSphere(boundingSphere);
                const radius = boundingSphere.radius;
                const fovRad = this.camera.fov * (Math.PI / 180);
                const horizontalFov = 2 * Math.atan(Math.tan(fovRad / 2) * newAspect);
                const distanceV = radius / Math.tan(fovRad / 2);
                const distanceH = radius / Math.tan(horizontalFov / 2);
                const cameraDistance = Math.max(distanceV, distanceH) * this.MARGIN;
                // Change camera position based on the bounding sphere
                const currentLookAt = new THREE.Vector3();
                this.camera.getWorldDirection(currentLookAt);
                this.camera.position.copy(currentLookAt.multiplyScalar(-cameraDistance));
                this.camera.lookAt(0, 0, 0);
            });
            // 4. Upadate post-processing composer size
            // If composer is defined, update its size and reset it to force a re-render
            // This is useful for effects like TAA (Temporal Anti-Aliasing) or SSAA (Super Sampling Anti Aliasing)
            // that require the composer to be aware of the new canvas size.
            // This ensures that the post-processing effects are applied correctly after a resize.
            // This is especially important for effects that depend on the canvas size, like TAA or SSAA.
            // If the composer is not defined, this step is skipped.
            if (this.composer) {
                this.composer.setSize(canvas.clientWidth * pixelRatio, canvas.clientHeight * pixelRatio);
                this.composer.reset();
                this.composer.render();
            }
        };
        const pixelRatio = config.pixelRatio || Math.min(window.devicePixelRatio, 2);
        // 1. Initialization of the renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: config.antialias ?? true,
            context: canvas.getContext('webgl2', { antialias: true }) || undefined,
            powerPreference: 'high-performance',
        });
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        // 2. Configuration of the scene and camera
        this.scene = new THREE.Scene();
        if (config.background) {
            this.scene.background = config.background;
        }
        else {
            this.scene.background = null;
        }
        this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.controls = new OrbitControlsManager(this.camera, canvas);
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        // 4. Config post-processing effects if enabled
        if (config.postprocessing) {
            this.composer = new EffectComposer(this.renderer);
            this.composer.setSize(canvas.clientWidth * pixelRatio, canvas.clientHeight * pixelRatio);
            this.setupPostProcessing();
        }
        // 5. Setup resize observer to handle canvas resizing
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(canvas);
        // 6. Create a ParallaxManager instance if needed
        if (config.parallax) {
            this.parallaxManager = new ParallaxManager(this.camera);
        }
    }
    /**
     * Sets up post-processing effects for the scene.
     * This includes configuring the renderer's tone mapping, shadow maps,
     * and adding passes for rendering and anti-aliasing.
     * @returns {void}
     * @private
     */
    setupPostProcessing() {
        const { canvas } = this;
        if (!this.composer) {
            return;
        }
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.enabled = true;
        // 1. Send to the composer the render pass
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer?.addPass(renderPass);
        // SMAA (Subpixel Morphological Antialiasing) and SSAA (Super Sampling Anti Aliasing)
        // These passes are used to improve the visual quality of the scene.
        // SMAA is a post-processing effect that reduces aliasing artifacts.
        // SSAA is a technique that renders the scene at a higher resolution and then downsamples
        // it to the display resolution, providing a smoother appearance.
        // Both passes are added to the composer to be applied during rendering.
        const smaaPass = new SMAAPass();
        smaaPass.enabled = true;
        smaaPass.renderToScreen = true;
        smaaPass.setSize(canvas.clientWidth * this.renderer.getPixelRatio(), canvas.clientHeight * this.renderer.getPixelRatio());
        this.composer?.addPass(smaaPass);
        const ssaaPass = new SSAARenderPass(this.scene, this.camera);
        ssaaPass.sampleLevel = 2;
        this.composer?.addPass(ssaaPass);
    }
    /**
     * Sets up orbit controls for the camera.
     * This allows the user to rotate, zoom, and pan the camera around the scene.
     * @param {Object} options - Options for configuring the orbit controls.
     * @param {boolean} [options.enableRotate=true] - Whether to enable rotation of the camera.
     * @param {boolean} [options.enableZoom=true] - Whether to enable zooming of the camera.
     * @param {boolean} [options.enablePan=true] - Whether to enable panning of the camera.
     * @returns {OrbitControls} The configured OrbitControls instance.
     */
    setupOrbitControls(options = { enableRotate: false, enableZoom: false, enablePan: false }) {
        this.controls.enablePan = options.enablePan ?? false;
        this.controls.enableZoom = options.enableZoom ?? false;
        this.controls.controls.enableZoom = options.enableZoom ?? false;
        this.controls.enableRotate = options.enableRotate ?? false;
        this.controls.controls.maxDistance = options.maxDistance ?? Infinity;
        this.controls.controls.minDistance = options.minDistance ?? 0;
    }
    /**
     * Gets the current OrbitControls instance.
     * This method returns the OrbitControls instance if it has been set up,
     * otherwise it returns undefined.
     */
    getOrbitControls() {
        return this.controls;
    }
    /**
     * Preloads models by their IDs and URLs.
     * This method loads models in the background without adding them to the scene immediately.
     * It allows for faster transitions later by preloading models that will be used frequently.
     * @param {Array<{id: string; url: string}>} models - Array of model objects with id and url.
     * @returns {void}
     */
    preloadModels(models) {
        models.forEach(({ id, url }) => {
            if (!this.models.has(id) && !this.loadedModels.has(id)) {
                this.loadModel(id, url)
                    .then(model => {
                    model.visible = false;
                    this.transitionModels.set(id, model);
                })
                    .catch(error => {
                    console.error(`Error preloading model ${id}:`, error);
                });
            }
        });
    }
    /**
     * Animates the camera to the initial position for a model
     * @param {string} modelId - ID of the model to reset camera for
     * @param {number} duration - Animation duration in milliseconds
     */
    animateCameraToInitialPosition(modelId, duration = 1000) {
        const initialPosition = this.initialCameraPositions.get(modelId);
        const initialTarget = this.initialCameraTargets.get(modelId);
        if (!initialPosition || !initialTarget) {
            return;
        }
        const startPosition = this.camera.position.clone();
        const startTarget = this.controls?.controls.target.clone() || new THREE.Vector3();
        const startTime = performance.now();
        const animate = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function: easeOutCubic
            const t = 1 - Math.pow(1 - progress, 3);
            // Interpolate position
            this.camera.position.lerpVectors(startPosition, initialPosition, t);
            // Interpolate target
            const currentTarget = new THREE.Vector3();
            currentTarget.lerpVectors(startTarget, initialTarget, t);
            // Update camera and controls
            this.camera.lookAt(currentTarget);
            if (this.controls) {
                this.controls.controls.target.copy(currentTarget);
                this.controls.update();
            }
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }
    /**
     * Transitions to a model with a specified ID.
     * This method handles the transition effect between the currently active model and the target model.
     * It uses a fade-in and fade-out effect to smoothly switch between models.
     * @param {string} targetId - The ID of the model to transition to.
     * @returns {void}
     */
    transitionToModel(targetId) {
        if (!this.models.has(targetId) || this.activeModelId === targetId) {
            return;
        }
        this.activeModelId = targetId;
        const startTime = performance.now();
        const startModel = this.activeModelId ? this.models.get(this.activeModelId) : null;
        const targetModel = this.models.get(targetId);
        const animateTransition = () => {
            const elapsed = performance.now() - startTime;
            this.transitionProgress = Math.min(elapsed / this.transitionDuration, 1);
            // Apply molten effect during the transition
            if (startModel) {
                startModel.visible = this.transitionProgress < 0.8;
                startModel.traverse(child => {
                    if (child instanceof THREE.Mesh) {
                        child.material.opacity = 1 - this.transitionProgress;
                        child.material.transparent = true;
                    }
                });
            }
            targetModel.visible = this.transitionProgress > 0.2;
            targetModel.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.material.opacity = this.transitionProgress;
                    child.material.transparent = true;
                }
            });
            // Encourage the camera during the transition
            if (this.transitionProgress > 0.5 && this.activeModelId !== targetId) {
                this.animateCameraToInitialPosition(targetId, this.transitionDuration * 0.5);
                // Adjust plans immediately when changing model
                this.adjustClippingPlanes();
            }
            if (this.transitionProgress < 1) {
                requestAnimationFrame(animateTransition);
            }
            else {
                // Finish transition
                if (startModel) {
                    startModel.visible = false;
                }
                targetModel.visible = true;
                //this.activeModelId = targetId;
                this.transitionProgress = 0;
                // Restore opacity
                targetModel.traverse(child => {
                    if (child instanceof THREE.Mesh) {
                        child.material.opacity = 1;
                    }
                });
                this.controls?.setModel(targetModel);
                this.controls?.update();
            }
        };
        animateTransition();
    }
    /**
     * Loads a 3D model from a given URL and adds it to the scene.
     * If the model is already loaded, it returns the existing model.
     * If the model is currently loading, it returns the existing promise.
     * @param {string} id - Unique identifier for the model.
     * @param {string} url - URL of the model to load.
     * @param {function} [onStateChange] - Optional callback function to report loading state changes.
     * @returns {Promise<THREE.Object3D>} A promise that resolves to the loaded model.
     */
    async loadModel(id, url, onStateChange) {
        // Si ya está cargando este modelo, retorna la promesa existente
        if (this.loadedModels.has(id)) {
            return this.loadedModels.get(id);
        }
        // Si el modelo ya está cargado, retórnalo directamente
        if (this.hasModelLoaded.get(id) && this.models.has(id)) {
            if (onStateChange) {
                onStateChange('model_ready', `Model ${id} is already loaded.`);
            }
            return this.models.get(id);
        }
        console.info(`[SceneManager] Change model using: ${id} for url: ${url}`);
        const loadPromise = new Promise(async (resolve, reject) => {
            try {
                const cache = await CacheManager.getModel(url);
                if (cache) {
                    console.info(`[SceneManager] Modelo ${id} encontrado en caché.`);
                    if (onStateChange) {
                        onStateChange('cache_hit', `Model ${id} found in cache.`);
                    }
                    const loader = new GLTFLoader();
                    loader.parse(cache, url, (gltf) => {
                        /*[State Change]*/ if (onStateChange) {
                            onStateChange('parsing', `Parsing model ${id} from cache.`);
                        }
                        const model = gltf instanceof THREE.Object3D ? gltf : gltf.scene;
                        /*[State Change]*/ if (onStateChange) {
                            onStateChange('adding_to_scene', `Adding model ${id} to scene.`);
                        }
                        model.traverse((child) => {
                            if (child instanceof THREE.Mesh) {
                                child.geometry.computeBoundingBox();
                            }
                        });
                        this.addModelToScene(id, model);
                        /*[State Change]*/ if (onStateChange) {
                            onStateChange('model_ready', `Model ${id} loaded from cache.`);
                        }
                        this.hasModelLoaded.set(id, true);
                        resolve(model);
                    }, (error) => {
                        reject(error);
                    });
                }
                else {
                    const loader = new GLTFLoader();
                    loader.load(url, (gltf) => {
                        /*[State Change]*/ if (onStateChange) {
                            onStateChange('parsing', `Parsing model ${id} from URL.`);
                        }
                        const model = gltf instanceof THREE.Object3D ? gltf : gltf.scene;
                        /*[State Change]*/ if (onStateChange) {
                            onStateChange('adding_to_scene', `Adding model ${id} to scene.`);
                        }
                        model.traverse((child) => {
                            if (child instanceof THREE.Mesh) {
                                child.geometry.computeBoundingBox();
                            }
                        });
                        this.addModelToScene(id, model);
                        /*[State Change]*/ if (onStateChange) {
                            onStateChange('model_ready', `Model ${id} loaded successfully.`);
                        }
                        this.hasModelLoaded.set(id, true);
                        resolve(model);
                    }, (xhr) => {
                        if (onStateChange) {
                            const k = 1024;
                            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                            const i = Math.floor(Math.log(xhr.loaded) / Math.log(k));
                            onStateChange('downloading', `Download: ${(xhr.loaded / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`);
                        }
                    }, (error) => {
                        reject(error);
                    });
                    console.info(`[SceneManager] Model save to cache: ${url}`);
                    /*[State Change]*/ if (onStateChange) {
                        onStateChange('checking_cache', `Checking cache for model ${id}.`);
                    }
                    await CacheManager.saveModel(url, await (await fetch(url)).arrayBuffer());
                    /*[State Change]*/ if (onStateChange) {
                        onStateChange('caching', `Model ${id} cached successfully.`);
                    }
                }
            }
            catch (error) {
                console.error(`[SceneManager] Error loading model ${id}:`, error);
                /*[State Change]*/ if (onStateChange) {
                    onStateChange('error', `Error loading model ${id}: ${error}`);
                }
                reject(error);
            }
        });
        this.loadedModels.set(id, loadPromise);
        return loadPromise;
    }
    /**
     * Checks if a model with the given ID has been loaded.
     * @param {string} id - Unique identifier for the model.
     * @returns {boolean} True if the model is loaded, false otherwise.
     */
    hasModel(id) {
        return this.hasModelLoaded.get(id) || false;
    }
    /**
     *
     */
    createTheatreLighting(intensity = 1.0, lightCount = 8, radiusFactor = 1.8, height = 2.5, showHelpers = false) {
        console.info('[SceneManager] Create Theatre Lighting');
        const { canvas } = this;
        if (!this.hasModel(this.activeModelId)) {
            return false;
        }
        console.info(`[SceneManager] Active Model ${this.activeModelId}`);
        // Calculate the center and radio of the model
        const box = new THREE.Box3().setFromObject(this.models.get(this.activeModelId));
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        const radius = Math.max(size.x, size.y, size.z) * 0.5;
        // Create the circle of lights
        const lights = [];
        const helpers = [];
        for (let i = 0; i < lightCount; i++) {
            const angle = (i / lightCount) * Math.PI * 2;
            const x = center.x + Math.cos(angle) * radius * radiusFactor;
            const z = center.z + Math.sin(angle) * radius * radiusFactor;
            const y = center.y + height;
            // Crear luz
            const light = new THREE.DirectionalLight(0xffffff, intensity);
            light.position.set(x, y, z);
            light.castShadow = true;
            light.shadow.bias = -0.001;
            light.shadow.mapSize.width = canvas.clientWidth * Math.min(window.devicePixelRatio, 2);
            light.shadow.mapSize.height = canvas.clientHeight * Math.min(window.devicePixelRatio, 2);
            light.lookAt(center);
            console.info(`[SceneManager] Create Directional Light in position: (${x},${y},${z})`);
            this.scene.add(light);
            lights.push(light);
            // Crear helper visual
            if (showHelpers) {
                const helper = new THREE.DirectionalLightHelper(light, radius * 0.2);
                this.scene.add(helper);
                helpers.push(helper);
            }
        }
        console.info('[SceneManager] Add Ambient Light');
        // Luz ambiental
        this.ambientLightRef.set(0xffffff, intensity * 0.15);
        this.scene.add(this.ambientLightRef.get);
        console.info('[SceneManager] Add Fill Light');
        // Luz de relleno
        this.fillLightRef = new THREE.DirectionalLight(0xffffff, intensity * 0.3);
        this.fillLightRef.position.set(0, height * 1.5, 0);
        this.fillLightRef.castShadow = true;
        this.scene.add(this.fillLightRef);
        // Guardar referencias
        this.lightsRef = lights;
        this.helpersRef = helpers;
        console.info('[SceneManager] Create Theatre Lighting finish');
        return true;
    }
    /**
     *
     */
    removeTheatreLighting() {
        return () => {
            // Limpiar al desmontar
            if (this.lightsRef) {
                this.lightsRef.forEach(light => {
                    this.scene.remove(light);
                    light.dispose();
                });
                this.lightsRef = [];
            }
            if (this.helpersRef) {
                this.helpersRef.forEach(helper => {
                    this.scene.remove(helper);
                    helper.dispose();
                });
                this.helpersRef = [];
            }
            if (this.ambientLightRef.get) {
                this.scene.remove(this.ambientLightRef.get);
            }
            if (this.fillLightRef) {
                this.scene.remove(this.fillLightRef);
                this.fillLightRef.dispose();
                this.fillLightRef = null;
            }
        };
    }
    /**
     * Adds a model to the scene and positions the camera to fit the model.
     * It calculates the bounding box of the model, centers it, and adjusts the camera distance accordingly.
     * @param {string} id - Unique identifier for the model.
     * @param {THREE.Object3D} model - The model to add to the scene.
     * @returns {void}
     * @private
     */
    addModelToScene(id, model) {
        console.info(`[SceneManager] Adding model with ID: ${id} to the scene.`);
        const container = new THREE.Group();
        // 1. Calculate the bounding box of the model
        const box = new THREE.Box3().setFromObject(model, true);
        // 2. Create a bounding box to center the model
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        // 3. Center the model at the origin
        //model.position.sub(center);
        container.position.copy(center.negate());
        container.add(model);
        // Actualizar matrices
        container.updateMatrixWorld(true);
        // 4. Calculate the bounding sphere of the model
        const boundingSphere = new THREE.Sphere();
        box.getBoundingSphere(boundingSphere);
        const radius = boundingSphere.radius;
        // Save the radius of Bounding Sphere to use at the clipping
        this.modelBoundingRadii.set(id, radius);
        // 5. Calculate the camera distance based on the bounding sphere radius
        const fovRad = this.camera.fov * (Math.PI / 180);
        const aspect = this.camera.aspect;
        // Calculate the horizontal field of view
        const horizontalFov = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
        // Calculate the distance based on the bounding sphere radius
        const distanceV = radius / Math.tan(fovRad / 2);
        const distanceH = radius / Math.tan(horizontalFov / 2);
        const cameraDistance = Math.max(distanceV, distanceH) * this.MARGIN;
        // 6. Position the camera
        this.camera.position.set(0, 0, cameraDistance);
        this.camera.lookAt(0, 0, 0);
        // Guardar posición inicial de la cámara para este modelo
        this.initialCameraPositions.set(id, this.camera.position.clone());
        this.initialCameraTargets.set(id, new THREE.Vector3(0, 0, 0));
        // 7. Add the model to the scene
        this.models.set(id, container);
        this.scene.add(container);
        if (this.config.parallax) {
            this.parallaxManager?.register(id, container, this.transitionDuration / 1000);
        }
        console.info(`[SceneManager] Model with ID: ${id} added to the scene and camera positioned.`);
    }
    /**
     * Adjusts the camera clipping planes based on the active model's bounding sphere.
     * It calculates the near and far clipping planes based on the model's radius and distance from the camera.
     * This helps to avoid clipping issues when rendering large models.
     * @returns {void}
     */
    adjustClippingPlanes() {
        if (!this.activeModelId) {
            return;
        }
        const radius = this.modelBoundingRadii.get(this.activeModelId);
        if (!radius) {
            return;
        }
        const model = this.models.get(this.activeModelId);
        if (!model) {
            return;
        }
        // Calculate distance from the camera to the center of the model
        const modelCenter = new THREE.Vector3();
        model.getWorldPosition(modelCenter);
        const distance = this.camera.position.distanceTo(modelCenter);
        // Calculate new cuts of cuts
        const near = Math.max(0.001, distance - radius - this.NEAR_MARGIN);
        const far = distance + radius * this.FAR_MULTIPLIER;
        // Update camera only if there are significant changes
        if (Math.abs(this.camera.near - near) > 0.001 ||
            Math.abs(this.camera.far - far) > 0.001) {
            this.camera.near = near;
            this.camera.far = far;
            this.camera.updateProjectionMatrix();
        }
    }
    /**
     * Resets the camera position for a specific model
     * @param {string} modelId - ID of the model to reset camera for
     */
    resetCameraForModel(modelId) {
        const initialPosition = this.initialCameraPositions.get(modelId);
        const initialTarget = this.initialCameraTargets.get(modelId);
        if (initialPosition && initialTarget) {
            this.camera.position.copy(initialPosition);
            this.camera.lookAt(initialTarget);
            if (this.controls) {
                this.controls.controls.target.copy(initialTarget);
                this.controls.update();
            }
            console.info(`[SceneManager] Camera reset for model: ${modelId}`);
        }
    }
    /**
     * Retrieves a model by its ID.
     * @param {string} id - Unique identifier for the model.
     * @returns {THREE.Object3D | undefined} The model if found, otherwise undefined.
     */
    getModel(id) {
        return this.models.get(id);
    }
    /**
     * Updates a model by its ID using a provided updater function.
     * The updater function receives the model as an argument and can modify it.
     * @param {string} id - Unique identifier for the model.
     * @param {(model: THREE.Object3D) => void} updater - Function to update the model.
     * @returns {void}
     */
    updateModel(id, updater) {
        const model = this.models.get(id);
        if (model) {
            updater(model);
        }
    }
    /**
     * Sets the material of a model by its ID.
     * It traverses the model's children and applies the specified material type with options.
     * @param {string} id - Unique identifier for the model.
     * @param {'basic' | 'phong' | 'standard' | 'physical'} materialType - Type of material to apply.
     * @param {THREE.MaterialParameters} options - Parameters for the material.
     * @returns {void}
     */
    setMaterial(id, materialType, options) {
        this.updateModel(id, (model) => {
            model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    let newMaterial;
                    switch (materialType) {
                        case 'phong':
                            newMaterial = new THREE.MeshPhongMaterial(options);
                            break;
                        case 'standard':
                            newMaterial = new THREE.MeshStandardMaterial(options);
                            break;
                        case 'physical':
                            newMaterial = new THREE.MeshPhysicalMaterial(options);
                            break;
                        default:
                            newMaterial = new THREE.MeshBasicMaterial(options);
                    }
                    child.material = newMaterial;
                }
            });
        });
    }
    /**
     * Sets the wireframe mode for a model by its ID.
     * It traverses the model's children and enables or disables wireframe mode.
     * @param {string} id - Unique identifier for the model.
     * @param {boolean} enabled - Whether to enable wireframe mode.
     * @returns {void}
     */
    setWireframe(id, enabled) {
        this.updateModel(id, (model) => {
            model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.wireframe = enabled;
                }
            });
        });
    }
    /**
     * Gets the Three.js scene object.
     * This is the main container for all objects, lights, and cameras in the scene.
     * @returns {THREE.Scene} The Three.js scene object.
     */
    getCamera() {
        return this.camera;
    }
    /**
     * Starts the animation loop for rendering the scene.
     * It uses requestAnimationFrame to continuously render the scene and update controls if available.
     * If post-processing is enabled, it renders through the composer, otherwise directly through the renderer.
     * @returns {void}
     */
    animate() {
        const render = () => {
            requestAnimationFrame(render);
            if (this.controls) {
                this.controls.update();
            }
            // Adjust clipping plans before rendering
            this.adjustClippingPlanes();
            if (this.composer) {
                this.composer.render();
            }
            else {
                this.renderer.render(this.scene, this.camera);
            }
        };
        render();
    }
    /**
     * Disposes of the scene manager resources.
     * It disconnects the resize observer, disposes of the renderer,
     * removes all models from the scene, and disposes of controls if they exist.
     * @returns {void}
     */
    dispose() {
        this.resizeObserver.disconnect();
        this.renderer.dispose();
        this.models.forEach(model => this.scene.remove(model));
        if (this.controls) {
            this.controls.dispose();
        }
    }
    handleParallaxEffects(onProgress) {
        if (this.parallaxManager && this.activeModelId) {
            this.parallaxManager.idActive = this.activeModelId;
            this.parallaxManager.parallaxEffect = onProgress;
        }
    }
}
//# sourceMappingURL=SceneManager.js.map