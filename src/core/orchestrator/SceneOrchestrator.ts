import type { HDRILoaderOptions } from '../loaders/HDRILoader';
import { HDRILoader } from '../loaders/HDRILoader';
import type { ManifestEntry } from '../cache/types';
import type { Plugin, PluginContext } from './types';
import { THREE } from '../../lib';
import type { AdvancedOrbitControlsPlugin, OrbitControlsPlugin } from './plugins';

export type SceneConfig = {
  antialias?: boolean;
  shadows?: boolean;
  toneMapping?: THREE.ToneMapping;
  toneMappingExposure?: number;
  background?: THREE.Color | string | THREE.Texture;
  clearColor?: THREE.ColorRepresentation;
};

/**
 * SceneOrchestrator
 * 
 * Núcleo central y singleton de la librería Three.js para React.
 * 
 * Responsabilidades:
 * - Gestión única de renderer, scene, camera y ciclo de vida global.
 * - Sistema de plugins moderno con loop de animación centralizado (preRender / postRender).
 * - Render delegable a PostProcessingPlugin cuando está activo.
 * - Resize global que notifica a todos los plugins.
 * - Intercepción segura de setModel para integración con controles orbitales.
 * - API pública estable y mínima exposición de internals.
 * 
 * Arquitectura alineada con principios de librería escalable:
 * - Core puro Three.js desacoplado de React.
 * - Ciclo de vida explícito y determinista.
 * - Optimización de rendimiento (un único requestAnimationFrame).
 * - Limpieza exhaustiva de recursos.
 */
export class SceneOrchestrator extends THREE.EventDispatcher {
  private static instance: SceneOrchestrator | null = null;

  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  public readonly renderer: THREE.WebGLRenderer;

  private activeModel: THREE.Group | null = null;
  private activeHDRI: THREE.Texture | null = null;
  private canvas: HTMLCanvasElement;

  private animationId: number | null = null;
  private plugins: Map<string, Plugin> = new Map();
  private resizeObserver!: ResizeObserver;

  private constructor(canvas: HTMLCanvasElement, config: SceneConfig = {}) {
    super();

    this.canvas = canvas;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: config.antialias ?? true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.shadowMap.enabled = config.shadows ?? true;
    this.renderer.toneMapping = config.toneMapping ?? THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = config.toneMappingExposure ?? 1.0;

    if (config.clearColor) {
      this.renderer.setClearColor(config.clearColor);
    }

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 1.6, 5);

    // Scene setup
    this.scene = new THREE.Scene();

    if (config.background instanceof THREE.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new THREE.Color(config.background);
    }

    // Global resize handling
    this.resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = this.canvas;
      const width = clientWidth;
      const height = clientHeight;

      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // Notify all plugins
      this.plugins.forEach((plugin) => plugin.resize?.(width, height));
    });
    this.resizeObserver.observe(canvas);

    // Start centralized animation loop
    this.startAnimationLoop();
  }

  /** Singleton access */
  static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator {
    if (!SceneOrchestrator.instance) {
      if (!canvas) {throw new Error('Canvas is required on first initialization');}
      SceneOrchestrator.instance = new SceneOrchestrator(canvas, config);
    }
    return SceneOrchestrator.instance;
  }

  /* ============================
   * Centralized Animation Loop
   * ============================ */
  private startAnimationLoop(): void {
    if (this.animationId !== null) {return;}

    const loop = () => {
      this.animationId = requestAnimationFrame(loop);

      // Pre-render phase: controls, LOD, camera collision, hotspots, etc.
      this.plugins.forEach((plugin) => plugin?.preRender?.());

      // Main render: delegate to PostProcessing if active
      if (!this.plugins.has('PostProcessing')) {
        this.renderer.render(this.scene, this.camera);
      }
      this.plugins.forEach((plugin) => plugin?.postRender?.());

    };

    loop();
  }

  /* ============================
   * Plugin System
   * ============================ */
  use(plugin: Plugin): this {
    if (this.plugins.has(plugin.name)) {
      console.info(`[Orchestrator] Plugin "${plugin.name}" ya instalado. Sobrescribiendo.`);
      this.remove(plugin.name);
    }

    const context: PluginContext = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      orchestrator: this,
    };

    try {
      plugin.install(context);
      this.plugins.set(plugin.name, plugin);
      console.info(`[Orchestrator] Plugin instalado: ${plugin.name}`);
    } catch (err) {
      console.error(`[Orchestrator] Error instalando plugin ${plugin.name}:`, err);
    }

    return this;
  }

  plugin<T extends Plugin = Plugin>(name: string): T | undefined {
    return this.plugins.get(name) as T | undefined;
  }

  has(name: string): boolean {
    return this.plugins.has(name);
  }

  remove(name: string): void {
    const plugin = this.plugins.get(name);
    if (plugin) {
      plugin.dispose?.();
      this.plugins.delete(name);
      console.info(`[Orchestrator] Plugin eliminado: ${name}`);
    }
  }

  /* ============================
   * Model Management
   * ============================ */
  async setModel(model: THREE.Group): Promise<void> {
    this.removeModel();

    const controls =
      this.plugin<OrbitControlsPlugin>('OrbitControls') ||
      this.plugin<AdvancedOrbitControlsPlugin>('AdvancedOrbitControls');

    const defaultDistance = controls
      ? (controls.maxDistance + controls.minDistance) / 2
      : 5;

    this.camera.position.set(0, 1.6, defaultDistance);
    this.camera.lookAt(model.position);

    this.activeModel = model;
    this.scene.add(model);

    this.dispatchEvent({ type: 'model::loaded', model } as never);
    console.info(`[Orchestrator] Modelo activo: ${model.name || 'sin nombre'}`);
  }

  removeModel(): void {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
      this.dispatchEvent({ type: 'model::removed' } as never);
    }
  }

  /* ============================
   * HDRI Management
   * ============================ */
  async setHDRI(
    entry: ManifestEntry,
    config: Partial<Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>> = {}
  ): Promise<THREE.Texture> {
    try {
      if (this.activeHDRI) {
        if (this.activeHDRI.name === entry.id) {return this.activeHDRI;}
        this.activeHDRI.dispose();
        this.activeHDRI = null;
        this.scene.environment = null;
        this.scene.background = null;
      }

      const texture = await HDRILoader.load(
        entry,
        {
          onLoaded: (tex, loadedEntry) => {
            this.activeHDRI = tex;
            this.scene.environment = tex;
            this.scene.background = tex;
            tex.userData = {
              ...tex.userData,
              manifestId: loadedEntry.id,
              loadedBy: 'Orchestrator',
              loadedAt: new Date().toISOString(),
              config,
            };
            console.info(`[Orchestrator] HDRI activo: ${loadedEntry.id}`);
            this.dispatchEvent({ type: 'hdri::loaded', texture: tex, entry: loadedEntry, config } as never);
          },
          onProgress: (progress) => {
            this.dispatchEvent({ type: 'hdri::progress', progress, entry } as never);
          },
          onError: (error, url) => {
            console.error(`[Orchestrator] Error cargando HDRI ${entry.id}:`, error);
            this.dispatchEvent({ type: 'hdri::error', error, entry } as never);
          },
        },
        {
          exposure: 1.0,
          maxLuminance: 16.0,
          ...config,
        }
      );

      return texture;
    } catch (error) {
      console.error(`[Orchestrator] Error en setHDRI para ${entry.id}:`, error);
      this.dispatchEvent({ type: 'hdri::error', error, entry } as never);
      throw error;
    }
  }

  clearHDRI(): void {
    if (this.activeHDRI) {
      this.scene.environment = null;
      this.scene.background = new THREE.Color(0x000000);
      this.activeHDRI.dispose();
      this.activeHDRI = null;
    }
  }

  /* ============================
   * Cleanup
   * ============================ */
  dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.resizeObserver.disconnect();

    // Dispose plugins (reverse order recommended)
    Array.from(this.plugins.values())
      .reverse()
      .forEach((plugin) => plugin.dispose?.());
    this.plugins.clear();

    this.removeModel();
    this.clearHDRI();

    this.renderer.dispose();
    this.renderer.forceContextLoss?.();

    this.canvas.width = 1;
    this.canvas.height = 1;

    SceneOrchestrator.instance = null;
    console.info('[Orchestrator] Dispose completo');
  }

  /* ============================
   * Getters
   * ============================ */
  getActiveModel(): THREE.Group | null {
    return this.activeModel;
  }

  getActiveHDRI(): THREE.Texture | null {
    return this.activeHDRI;
  }
}