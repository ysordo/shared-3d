import * as THREE from 'three';
import { EffectComposer, GLTFLoader, OrbitControls, RenderPass, SMAAPass, SSAARenderPass, TAARenderPass } from 'three/examples/jsm/Addons.js';
//import { CacheManager } from './CacheManager';


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
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private composer?: EffectComposer;
  private controls?: OrbitControls;
  private models: Map<string, THREE.Object3D> = new Map();
  private loadedModels = new Map<string, Promise<THREE.Object3D>>();
  private hasModelLoaded = new Map<string, boolean>();
  private resizeObserver: ResizeObserver;
  private parallaxEffects: Map<string, (progress: number) => void> = new Map();
  private MARGIN: number = 0.8;

  constructor(
    private canvas: HTMLCanvasElement,
    private config: {
      antialias?: boolean;
      postprocessing?: boolean;
      shadows?: boolean;
      pixelRatio?: number;
      background?: THREE.Color;
    } = {}
  ) {
    const pixelRatio = config.pixelRatio || Math.min(window.devicePixelRatio, 2);
    
    // 1. Inicializar renderizador
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
    
    // 2. Configurar escena y cámara
    this.scene = new THREE.Scene();
    if (config.background) {
      this.scene.background = config.background;
    } else {
      this.scene.background = null;
    }
    
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

    // 3. Configurar luces (ESENCIAL para ver modelos)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // 4. Configurar post-procesamiento si está habilitado
    if (config.postprocessing) {
      this.composer = new EffectComposer(this.renderer);
      this.composer.setSize(
        canvas.clientWidth * pixelRatio,
        canvas.clientHeight * pixelRatio
      );
      this.setupPostProcessing();
    }

    // 5. Manejar redimensionamiento
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(canvas);
  }


  private setupPostProcessing() {
    
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.enabled = true;

    this.composer?.addPass(new RenderPass(this.scene, this.camera));
    
    const smaaPass = new SMAAPass();
    smaaPass.enabled = true;
    this.composer?.addPass(smaaPass);
    
    const ssaaPass = new SSAARenderPass(this.scene, this.camera);
    ssaaPass.sampleLevel = 2;
    this.composer?.addPass(ssaaPass);
    
    const taaPass = new TAARenderPass(this.scene, this.camera);
    taaPass.accumulate = true;
    this.composer?.addPass(taaPass);
  }

  private handleResize = () => {
    const pixelRatio = this.config.pixelRatio || Math.min(window.devicePixelRatio, 2);
    const { canvas } = this;
    
    // 1. Actualizar tamaño del renderizador
    this.renderer.setSize(
      canvas.clientWidth * pixelRatio,
      canvas.clientHeight * pixelRatio,
      false
    );
    
    // 2. Actualizar parámetros de cámara
    const newAspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.aspect = newAspect;
    this.camera.updateProjectionMatrix();
    
    // 3. Reajustar cámara para modelos existentes
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
      
      // Mantener la dirección actual de la cámara
      const currentLookAt = new THREE.Vector3();
      this.camera.getWorldDirection(currentLookAt);
      
      this.camera.position.copy(currentLookAt.multiplyScalar(-cameraDistance));
      this.camera.lookAt(0, 0, 0);
    });
    
    // 4. Actualizar postprocesamiento si existe
    if (this.composer) {
      this.composer.setSize(
        canvas.clientWidth * pixelRatio,
        canvas.clientHeight * pixelRatio
      );
    }
  };

  public setupOrbitControls(options: {
    enableRotate?: boolean;
    enableZoom?: boolean;
    enablePan?: boolean;
  }) {
    this.controls = new OrbitControls(this.camera, this.canvas);
    Object.assign(this.controls, options);
    return this.controls;
  }

  public async loadModel(
    id: string,
    url: string,
    onProgress?: (download: string) => void
  ): Promise<THREE.Object3D> {
    // Si ya está cargando este modelo, retorna la promesa existente
    if (this.loadedModels.has(id)) {
      return this.loadedModels.get(id)!;
    }

    // Si el modelo ya está cargado, retórnalo directamente
    if (this.hasModelLoaded.get(id) && this.models.has(id)) {
      return this.models.get(id)!;
    }

    console.warn(`[SceneManager] Iniciando carga de modelo: ${id} desde ${url}`);
    
    const loadPromise = new Promise<THREE.Object3D>(async (resolve, reject) => {
      try {
        const loader = new GLTFLoader();
        
        loader.load(
          url,
          (gltf) => {
            const model = gltf instanceof THREE.Object3D ? gltf : gltf.scene;
            this.addModelToScene(id, model);
            this.hasModelLoaded.set(id, true);
            resolve(model);
          },
          (xhr) => {
            if (onProgress) {
              const k = 1024;
              const sizes = ['Bytes', 'KB', 'MB', 'GB'];
              const i = Math.floor(Math.log(xhr.loaded) / Math.log(k));
              onProgress(`${(xhr.loaded / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`);
            }
          },
          (error) => {
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
      }
    });

    this.loadedModels.set(id, loadPromise);
    return loadPromise;
  }

  public hasModel(id: string): boolean {
    return this.hasModelLoaded.get(id) || false;
  }

  private addModelToScene(id: string, model: THREE.Object3D) {
    console.warn(`[SceneManager] Añadiendo modelo a escena: ${id}`);
    
    // 1. Calcular el bounding box del modelo
    const box = new THREE.Box3().setFromObject(model, true);
    
    // 2. Crear vectores para el centro y tamaño
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    
    // 3. Centrar el modelo en el origen
    model.position.sub(center);
    
    // 4. Calcular el radio del bounding sphere
    const boundingSphere = new THREE.Sphere();
    box.getBoundingSphere(boundingSphere);
    const radius = boundingSphere.radius;
    
    // 5. Calcular la distancia óptima de la cámara
    const fovRad = this.camera.fov * (Math.PI / 180);
    const aspect = this.camera.aspect;
    
    // Considerar tanto el aspect ratio vertical como horizontal
    const horizontalFov = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
    
    // Calcular la distancia necesaria para encuadrar completamente el modelo
    const distanceV = radius / Math.tan(fovRad / 2);
    const distanceH = radius / Math.tan(horizontalFov / 2);
    const cameraDistance = Math.max(distanceV, distanceH) * this.MARGIN;
    
    // 6. Posicionar la cámara
    this.camera.position.set(0, 0, cameraDistance);
    this.camera.lookAt(0, 0, 0);
    
    // 7. Añadir el modelo a la escena
    this.models.set(id, model);
    this.scene.add(model);
    
    console.warn(`[SceneManager] Radio del modelo: ${radius.toFixed(2)}`);
    console.warn(`[SceneManager] Distancia cámara: ${cameraDistance.toFixed(2)}`);
    console.warn(`[SceneManager] Aspect ratio: ${aspect.toFixed(2)}`);
  }

  public getModel(id: string): THREE.Object3D | undefined {
    return this.models.get(id);
  }

  public updateModel(id: string, updater: (model: THREE.Object3D) => void) {
    const model = this.models.get(id);
    if (model) {updater(model);}
  }

  public setMaterial(
    id: string,
    materialType: 'basic' | 'phong' | 'standard' | 'physical',
    options: THREE.MaterialParameters
  ) {
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

  public setWireframe(id: string, enabled: boolean) {
    this.updateModel(id, (model) => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = enabled;
        }
      });
    });
  }

  public animate() {
    const render = () => {
      requestAnimationFrame(render);
      
      if (this.controls) {this.controls.update();}
      
      if (this.composer) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    };
    
    render();
  }

  public dispose() {
    this.resizeObserver.disconnect();
    this.renderer.dispose();
    this.models.forEach(model => this.scene.remove(model));
    if (this.controls) {this.controls.dispose();}
  }

  public setupParallaxEffect(
    intensity: number = 0.1,
    axis: 'x' | 'y' | 'z' | 'xy' | 'xyz' = 'y'
  ) {
    const originalPositions = new Map<string, THREE.Vector3>();
    
    // Guardar posiciones originales
    this.models.forEach((model, id) => {
      originalPositions.set(id, model.position.clone());
    });

    // Función para aplicar efecto parallax
    return (scrollProgress: number) => {
      this.models.forEach((model, id) => {
        const originalPos = originalPositions.get(id);
        if (!originalPos) {return;}

        const offset = scrollProgress * intensity;
        
        if (axis.includes('x')) {model.position.x = originalPos.x + offset;}
        if (axis.includes('y')) {model.position.y = originalPos.y + offset;}
        if (axis.includes('z')) {model.position.z = originalPos.z + offset;}
      });
    };
  }

  // Crear efecto parallax para un modelo específico
  public createParallaxEffect(
    modelId: string,
    intensity: number = 0.1,
    axis: 'x' | 'y' | 'z' | 'xy' | 'xyz' = 'y'
  ) {
    const model = this.models.get(modelId);
    if (!model) {return;}

    const originalPosition = model.position.clone();
    
    const effect = (progress: number) => {
      if (!this.models.has(modelId)) {return;}
      
      const offset = progress * intensity;
      model.position.copy(originalPosition);
      
      if (axis.includes('x')) {model.position.x += offset;}
      if (axis.includes('y')) {model.position.y += offset;}
      if (axis.includes('z')) {model.position.z += offset;}
    };

    this.parallaxEffects.set(modelId, effect);
    return effect;
  }

  // Aplicar efecto parallax a un modelo específico
  public applyParallaxEffect(modelId: string, progress: number) {
    const effect = this.parallaxEffects.get(modelId);
    if (effect) {effect(progress);}
  }

  // Aplicar efectos parallax a todos los modelos
  public applyAllParallaxEffects(progress: number) {
    this.parallaxEffects.forEach(effect => effect(progress));
  }

  public createRotationEffect(
    modelId: string,
    intensity: number = 0.01,
    axis: 'x' | 'y' | 'z' = 'y'
  ) {
    const model = this.models.get(modelId);
    if (!model) {return;}
  
    const effect = (progress: number) => {
      if (!this.models.has(modelId)) {return;}
      
      const rotation = progress * intensity;
      
      if (axis === 'x') {model.rotation.x = rotation;}
      if (axis === 'y') {model.rotation.y = rotation;}
      if (axis === 'z') {model.rotation.z = rotation;}
    };
  
    this.parallaxEffects.set(`${modelId}-rotation`, effect);
    return effect;
  }
}