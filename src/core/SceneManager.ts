/* eslint-disable no-console */
import * as THREE from 'three';
import type { GLTF, EffectComposer} from 'three/examples/jsm/Addons.js';
import { DRACOLoader, GLTFLoader, RenderPass, SMAAPass, SSAARenderPass } from 'three/examples/jsm/Addons.js';
import { CacheManager } from './CacheManager';
import { OrbitControlsManager } from './OrbitControlsManager';
import { ParallaxManager } from './ParallaxManager';
import { AnimationManager } from './AnimationManager';
import { CameraManager } from './CameraManager';


export type LoadState = 
  | 'checking_cache'
  | 'cache_hit'
  | 'cache_miss'
  | 'downloading'
  | 'parsing'
  | 'caching'
  | 'adding_to_scene'
  | 'model_ready'
  | 'error';

  interface IAmbientLight {
    get: THREE.AmbientLight,
    set: (color: THREE.Color | number ,intensity: number)=>void
  }

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
  public scene: THREE.Scene;
  private camera: CameraManager;
  private renderer: THREE.WebGLRenderer;
  private composer?: EffectComposer;
  private controls?: OrbitControlsManager;
  private models: Map<string, THREE.Object3D> = new Map();
  private loadedModels = new Map<string, Promise<THREE.Object3D>>();
  private hasModelLoaded = new Map<string, boolean>();
  private resizeObserver: ResizeObserver;
  private parallaxEffects: Map<string, (progress: number) => void> = new Map();
  private parallaxManager?: ParallaxManager;
  private MARGIN: number = 0.8;
  public activeModelId: string | null = null;
  private transitionProgress: number = 0;
  public transitionDuration: number = 1000; // ms
  private transitionModels: Map<string, THREE.Object3D> = new Map();
  private initialCameraPositions = new Map<string, THREE.Vector3>();
  private initialCameraTargets = new Map<string, THREE.Vector3>();
  private modelBoundingRadii = new Map<string, number>();
  private NEAR_MARGIN = 0.1; // Margen adicional para evitar clipping
  private FAR_MULTIPLIER = 10; // Multiplicador para el plano far
  private lightsRef : THREE.DirectionalLight[] = [];
  private helpersRef: THREE.DirectionalLightHelper[] = [];
  private fillLightRef: THREE.DirectionalLight | null = null;
  private ambientLightRef: IAmbientLight = {
    get: new THREE.AmbientLight(),
    set(color, intensity) {
        this.get.intensity=intensity;
        this.get.color= new THREE.Color(color);
    },
  };
   private animationManagers: Map<string, AnimationManager> = new Map();
   private clock: THREE.Clock;

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
  constructor(
    private canvas: HTMLCanvasElement,
    private config: {
      antialias?: boolean;
      postprocessing?: boolean;
      shadows?: boolean;
      pixelRatio?: number;
      background?: THREE.Color;
      parallax?: boolean;
    } = {}
  ) {
    const pixelRatio = config.pixelRatio || Math.min(window.devicePixelRatio, 2);
    this.clock = new THREE.Clock();

    // 1. Initialization of the renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: config.antialias ?? true,
      context: canvas.getContext('webgl2', { antialias: true }) || undefined,
      powerPreference: 'high-performance',
    });
    
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(
      canvas.clientWidth,
      canvas.clientHeight,
      false
    );
    
    // 2. Configuration of the scene and camera
    this.scene = new THREE.Scene();
    if (config.background) {
      this.scene.background = config.background;
    } else {
      this.scene.background = null;
    }
    
    this.camera = new CameraManager(
      canvas,
      'MainCamera',
    );

    this.controls = new OrbitControlsManager(this.camera, canvas);
    this.controls.enableRotate = false;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;

    // 4. Config post-processing effects if enabled
    this.camera.postProcessingEnabled = config.postprocessing || false;
    this.camera.setupPostProcessing(this.scene, this.renderer);


    // 5. Setup resize observer to handle canvas resizing
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(canvas);

    // 6. Create a ParallaxManager instance if needed
    if(config.parallax){
      this.parallaxManager = new ParallaxManager(this.camera);
    }

     // ✅ LUZ PRINCIPAL - Alta calidad
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    
    // ✅ SOMBRAS DE ALTA DEFINICIÓN
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.001;
    
    // ✅ LUZ AMBIENTAL para detalles
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    
    this.scene.add(directionalLight);
    this.scene.add(ambientLight);
    
    // ✅ LUZ DE RELLENO para mejor definición
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }

  /**
   * Handles canvas resizing by updating the renderer size, camera aspect ratio,
   * and recalculating camera position for all models in the scene.
   * It also updates the post-processing composer size if it exists.
   * @returns {void}
   * @private
   */
  private handleResize = (): void => {
    const pixelRatio = this.config.pixelRatio || Math.min(window.devicePixelRatio, 2);
    const { canvas } = this;
    
    // 1. Update renderer size
    this.renderer.setSize(
      canvas.clientWidth * pixelRatio,
      canvas.clientHeight * pixelRatio,
      false
    );
    this.models.forEach(model=>
      this.camera.resize(new THREE.Box3().setFromObject(model), pixelRatio)
    );
  };

  /**
   * Sets up orbit controls for the camera.
   * This allows the user to rotate, zoom, and pan the camera around the scene.
   * @param {Object} options - Options for configuring the orbit controls.
   * @param {boolean} [options.enableRotate=true] - Whether to enable rotation of the camera.
   * @param {boolean} [options.enableZoom=true] - Whether to enable zooming of the camera.
   * @param {boolean} [options.enablePan=true] - Whether to enable panning of the camera.
   * @returns {OrbitControls} The configured OrbitControls instance.
   */
  public setupOrbitControls(options: {
  enableRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  maxDistance?: number;
  minDistance?: number
} = { enableRotate: false, enableZoom: false, enablePan: false }): void {
  this.controls!.enablePan = options.enablePan ?? false;
  this.controls!.enableZoom = options.enableZoom ?? false;
  this.controls!.controls!.enableZoom = options.enableZoom ?? false;
  this.controls!.enableRotate = options.enableRotate ?? false;
  this.controls!.controls!.maxDistance = options.maxDistance ?? Infinity;
  this.controls!.controls!.minDistance = options.minDistance ?? 0;
}

  /**
   * Gets the current OrbitControls instance.
   * This method returns the OrbitControls instance if it has been set up,
   * otherwise it returns undefined.
   */
  public getOrbitControls(): OrbitControlsManager | undefined {
    return this.controls;
  }

  /**
   * Preloads models by their IDs and URLs.
   * This method loads models in the background without adding them to the scene immediately.
   * It allows for faster transitions later by preloading models that will be used frequently.
   * @param {Array<{id: string; url: string}>} models - Array of model objects with id and url.
   * @returns {void}
   */
   public preloadModels(models: {id: string; url: string}[]): void {
    models.forEach(({id, url}) => {
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
   * Transitions to a model with a specified ID.
   * This method handles the transition effect between the currently active model and the target model.
   * It uses a fade-in and fade-out effect to smoothly switch between models.
   * @param {string} targetId - The ID of the model to transition to.
   * @returns {void}
   */
  public transitionToModel(targetId: string): void {
    if (!this.models.has(targetId) || this.activeModelId === targetId) {return;}

    this.activeModelId = targetId;
    const startTime = performance.now();
    const startModel = this.activeModelId ? this.models.get(this.activeModelId)! : null;
    const targetModel = this.models.get(targetId)!;

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
         this.camera.toAnimIPos(
          this.controls,
          this.initialCameraPositions.get(targetId),
          this.initialCameraTargets.get(targetId),
          this.transitionDuration * 0.5
        );
    
        // Adjust plans immediately when changing model
        //const model = this.models.get(this.activeModelId!);
        const modelCenter = new THREE.Vector3();
        targetModel.getWorldPosition(modelCenter);
        this.camera.adjustClippingPlanes(modelCenter,this.modelBoundingRadii.get(this.activeModelId!));
      }

      if (this.transitionProgress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        // Finish transition
        if (startModel) {startModel.visible = false;}
        targetModel.visible = true;
        //this.activeModelId = targetId;
        this.transitionProgress = 0;
        
        // Restore opacity
        targetModel.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material.opacity = 1;
          }
        });

        this.camera.reset(
          this.controls,
          this.initialCameraPositions.get(targetId),
          this.initialCameraTargets.get(targetId),
        );
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
  public async loadModel(
    id: string,
    url: string,
    onStateChange?: (status: LoadState, details: string) => void
  ): Promise<THREE.Object3D> {
    // Si ya está cargando este modelo, retorna la promesa existente
    if (this.loadedModels.has(id)) {
      return this.loadedModels.get(id)!;
    }

    // Si el modelo ya está cargado, retórnalo directamente
    if (this.hasModelLoaded.get(id) && this.models.has(id)) {
      if(onStateChange) {onStateChange('model_ready', `Model ${id} is already loaded.`);}
      return this.models.get(id)!;
    }

    console.info(`[SceneManager] Change model using: ${id} for url: ${url}`);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const useDraco = url.includes('draco') || url.includes('compressed');


    const loadPromise = new Promise<THREE.Object3D>(async (resolve, reject) => {
      try {
        const cache = await CacheManager.getModel(url);

        if(cache) {
          console.info(`[SceneManager] Modelo ${id} encontrado en caché.`);
          if(onStateChange) {onStateChange('cache_hit', `Model ${id} found in cache.`);}
          const loader = new GLTFLoader();
          if (useDraco) {
            loader.setDRACOLoader(dracoLoader);
          }
          loader.parse(
            cache,
            url,
            (gltf) => {
                /*[State Change]*/ if(onStateChange) {onStateChange('parsing', `Parsing model ${id} from cache.`);}
                const model = gltf instanceof THREE.Object3D ? gltf : gltf.scene;
                /*[State Change]*/ if(onStateChange) {onStateChange('adding_to_scene', `Adding model ${id} to scene.`);}
                model.traverse((child) => {
                  if (child instanceof THREE.Mesh) {
                    child.geometry.computeBoundingBox();
    
                    // Optimizaciones críticas:
                    child.geometry.computeVertexNormals(); // Para sombreado suave
                    child.geometry.attributes.position.needsUpdate = true;
                  }
                });
                this.addModelToScene(id, model, gltf);
                /*[State Change]*/ if(onStateChange) {onStateChange('model_ready', `Model ${id} loaded from cache.`);}
                this.hasModelLoaded.set(id, true);
                resolve(model);
            },
            (error) => {
              reject(error);
            }
          );
        }
        else{
        const loader = new GLTFLoader();
        if (useDraco) {
          loader.setDRACOLoader(dracoLoader);
        }
              
        loader.load(
          url,
          (gltf) => {
            /*[State Change]*/ if(onStateChange) {onStateChange('parsing', `Parsing model ${id} from URL.`);}
            const model = gltf instanceof THREE.Object3D ? gltf : gltf.scene;
            /*[State Change]*/ if(onStateChange) {onStateChange('adding_to_scene', `Adding model ${id} to scene.`);}
            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.geometry.computeBoundingBox();
    
                // Optimizaciones críticas:
                child.geometry.computeVertexNormals(); // Para sombreado suave
                child.geometry.attributes.position.needsUpdate = true;
              }
            });
            this.addModelToScene(id, model, gltf);
            /*[State Change]*/ if(onStateChange) {onStateChange('model_ready', `Model ${id} loaded successfully.`);}
            this.hasModelLoaded.set(id, true);
            resolve(model);
          },
          (xhr) => {
            if (onStateChange) {
              const k = 1024;
              const sizes = ['Bytes', 'KB', 'MB', 'GB'];
              const i = Math.floor(Math.log(xhr.loaded) / Math.log(k));
              onStateChange('downloading',`Download: ${(xhr.loaded / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`);
            }
          },
          (error) => {
            reject(error);
          }
        );
        console.info(`[SceneManager] Model save to cache: ${url}`);
        /*[State Change]*/ if(onStateChange) {onStateChange('checking_cache', `Checking cache for model ${id}.`);}
        await CacheManager.saveModel(url, await (await fetch(url)).arrayBuffer());
        /*[State Change]*/ if(onStateChange) {onStateChange('caching', `Model ${id} cached successfully.`);}
      
      }
      } catch (error) {
        console.error(`[SceneManager] Error loading model ${id}:`, error);
        /*[State Change]*/ if(onStateChange) {onStateChange('error', `Error loading model ${id}: ${error}`);}
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
  public hasModel(id: string): boolean {
    return this.hasModelLoaded.get(id) || false;
  }

  /**
   * 
   */
  public createTheatreLighting(
    intensity:number = 1.0,
    lightCount: number = 8,
    radiusFactor: number = 1.8,
    height: number = 2.5,
    showHelpers:boolean = false
  ): boolean{
    console.info('[SceneManager] Create Theatre Lighting');
    const {canvas} = this;
    if(!this.hasModel(this.activeModelId!)){
      return false;
    }
    console.info(`[SceneManager] Active Model ${this.activeModelId}`);
    // Calculate the center and radio of the model
    const box = new THREE.Box3().setFromObject(this.models.get(this.activeModelId!)!);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) * 0.5;
    
    
    // Create the circle of lights
    const lights: THREE.DirectionalLight[] = [];
    const helpers: THREE.DirectionalLightHelper[] = [];
    
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
  public removeTheatreLighting(): ()=>void {
    return () => {
          // Limpiar al desmontar
          if(this.lightsRef){
            this.lightsRef.forEach(light => {
              this.scene.remove(light);
              light.dispose();
            });
            this.lightsRef = [];
          }
          if(this.helpersRef){
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
  private addModelToScene(id: string, model: THREE.Object3D, gltf: GLTF): void {
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
  const {radius, position} = this.camera.recalculate(box);
  
   // Save the radius of Bounding Sphere to use at the clipping
    this.modelBoundingRadii.set(id, radius);
  
  // Guardar posición inicial de la cámara para este modelo
  this.initialCameraPositions.set(id, position);
  this.initialCameraTargets.set(id, new THREE.Vector3(0, 0, 0));
  
  // 7. Add the model to the scene
  this.models.set(id, container);
  this.scene.add(container);
  if(this.config.parallax){
    this.parallaxManager?.register(id, container, this.transitionDuration/1000);
  }
   if (gltf.animations.length > 0) {
            this.setupAnimations(id, model, gltf.animations);
          }

  console.info(`[SceneManager] Model with ID: ${id} added to the scene and camera positioned.`);
}

setupAnimations(modelId: string, model: THREE.Object3D, animations: THREE.AnimationClip[]) {
  const manager = new AnimationManager(model, animations);
  this.animationManagers.set(modelId, manager);
}

getAnimationManager(modelId?: string): AnimationManager | null {
  const id = modelId ?? this.activeModelId;
  if (!id) {return null;}
  return this.animationManagers.get(id) || null;
}

  /**
   * Retrieves a model by its ID.
   * @param {string} id - Unique identifier for the model.
   * @returns {THREE.Object3D | undefined} The model if found, otherwise undefined.
   */
  public getModel(id: string): THREE.Object3D | undefined {
    return this.models.get(id);
  }

  /**
   * Updates a model by its ID using a provided updater function.
   * The updater function receives the model as an argument and can modify it.
   * @param {string} id - Unique identifier for the model.
   * @param {(model: THREE.Object3D) => void} updater - Function to update the model.
   * @returns {void}
   */
  public updateModel(id: string, updater: (model: THREE.Object3D) => void): void {
    const model = this.models.get(id);
    if (model) {updater(model);}
  }

  /**
   * Sets the material of a model by its ID.
   * It traverses the model's children and applies the specified material type with options.
   * @param {string} id - Unique identifier for the model.
   * @param {'basic' | 'phong' | 'standard' | 'physical'} materialType - Type of material to apply.
   * @param {THREE.MaterialParameters} options - Parameters for the material.
   * @returns {void}
   */
  public setMaterial(
    id: string,
    materialType: 'basic' | 'phong' | 'standard' | 'physical',
    options: THREE.MaterialParameters
  ): void {
    this.updateModel(id, (model) => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          let newMaterial: THREE.Material;
          
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
  public setWireframe(id: string, enabled: boolean): void {
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
  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  /**
   * Starts the animation loop for rendering the scene.
   * It uses requestAnimationFrame to continuously render the scene and update controls if available.
   * If post-processing is enabled, it renders through the composer, otherwise directly through the renderer.
   * @returns {void}
   */
    public animate(): void {
        const render = () => {
        requestAnimationFrame(render);
        
        if (this.controls) { this.controls.update(); }
        
        // Adjust clipping plans before rendering
        const model = this.models.get(this.activeModelId!);
        const modelCenter = new THREE.Vector3();
        model?.getWorldPosition(modelCenter);
        this.camera.adjustClippingPlanes(modelCenter,this.modelBoundingRadii.get(this.activeModelId!));
        
        const delta = this.clock.getDelta();
        this?.animationManagers?.get(this!.activeModelId!)?.update(delta);

        if (this.composer) {
          this.composer.render();
        } else {
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
  public dispose(): void {
    this.resizeObserver.disconnect();
    this.renderer.dispose();
    this.models.forEach(model => this.scene.remove(model));
    if (this.controls) {this.controls.dispose();}
  }


  public handleParallaxEffects(onProgress: (
    progress: number, 
    effect: (arg0: (mesh: THREE.Object3D)=> void) => void
  )=>void): void {
    if (this.parallaxManager && this.activeModelId) {
      this.parallaxManager.idActive = this.activeModelId;
      this.parallaxManager.parallaxEffect = onProgress;
    }
  }
}