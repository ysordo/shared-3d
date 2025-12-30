import type { HDRILoaderOptions } from '../loaders/loaders';
import { HDRILoader } from '../loaders/HDRILoader';
import type { ManifestEntry } from '../cache/types';
import type { Plugin, PluginContext } from '../plugins/types';
import { THREE } from '../../lib';
import type { AdvancedOrbitControlsPlugin, OrbitControlsPlugin } from '../plugins';

export type SceneConfig = {
  antialias?: boolean;
  shadows?: boolean;
  toneMapping?: THREE.ToneMapping;
  toneMappingExposure?: number;
  background?: THREE.Color | string | THREE.Texture;
  clearColor?: THREE.ColorRepresentation;
};

export class SceneOrchestrator extends THREE.EventDispatcher {
  private static instance: SceneOrchestrator | null = null;

  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  public readonly renderer: THREE.WebGLRenderer;

  private _activeModel: THREE.Group | null = null;
  private _activeHDRI: THREE.Texture | null = null;
  private canvas: HTMLCanvasElement;

  private animationId: number | null = null;
  private plugins: Map<string, Plugin> = new Map();
  private resizeObserver!: ResizeObserver;

  private constructor(canvas: HTMLCanvasElement, config: SceneConfig = {}) {
    super();

    this.canvas = canvas;

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

    this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 1.6, 5);

    this.scene = new THREE.Scene();

    if (config.background instanceof THREE.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new THREE.Color(config.background);
    }

    this.resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = this.canvas;
      const width = clientWidth;
      const height = clientHeight;

      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.plugins.forEach((plugin) => plugin.resize?.(width, height));
    });
    this.resizeObserver.observe(canvas);

    this.startAnimationLoop();
  }

  static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator {
    if (!SceneOrchestrator.instance) {
      if (!canvas) {throw new Error('Canvas is required on first initialization');}
      SceneOrchestrator.instance = new SceneOrchestrator(canvas, config);
    }
    return SceneOrchestrator.instance;
  }

  private startAnimationLoop(): void {
    if (this.animationId !== null) {return;}

    const loop = () => {
      this.animationId = requestAnimationFrame(loop);

      this.plugins.forEach((plugin) => plugin?.preRender?.());

      if (!this.plugins.has('PostProcessing')) {
        this.renderer.render(this.scene, this.camera);
      }
      this.plugins.forEach((plugin) => plugin?.postRender?.());

    };

    loop();
  }

  plugin = {
    use: this.usePlugin.bind(this),
    get: this.getPlugin.bind(this),
    has: this.hasPlugin.bind(this),
    remove: this.removePlugin.bind(this),
  };

  private usePlugin<T extends Plugin>(plugin: T): T {
    if (this.plugins.has(plugin.name)) {
      console.info(`[Orchestrator] Plugin "${plugin.name}" ya instalado. Sobrescribiendo.`);
      this.removePlugin(plugin.name);
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

    return plugin as T;
  }

  private getPlugin<T extends Plugin = Plugin>(name: string): T | undefined {
    return this.plugins.get(name) as T | undefined;
  }

  private hasPlugin(name: string): boolean {
    return this.plugins.has(name);
  }

  private removePlugin(name: string): void {
    const plugin = this.plugins.get(name);
    if (plugin) {
      plugin.dispose?.();
      this.plugins.delete(name);
      console.info(`[Orchestrator] Plugin eliminado: ${name}`);
    }
  }

  activeModel = {
    set: this.setModel.bind(this),
    get: this._activeModel,
    remove: this.removeModel.bind(this),
  };

  private async setModel(model: THREE.Group): Promise<void> {
    this.removeModel();

    const controls =
      this.getPlugin<OrbitControlsPlugin>('OrbitControls') ||
      this.getPlugin<AdvancedOrbitControlsPlugin>('AdvancedOrbitControls');

    const defaultDistance = controls
      ? (controls.maxDistance + controls.minDistance) / 2
      : 5;

    this.camera.position.set(0, 1.6, defaultDistance);
    this.camera.lookAt(model.position);

    this._activeModel = model;
    this.scene.add(model);

    this.dispatchEvent({ type: 'model::loaded', model } as never);
    console.info(`[Orchestrator] Modelo activo: ${model.name || 'sin nombre'}`);
  }

  private removeModel(): void {
    if (this._activeModel) {
      this.scene.remove(this._activeModel);
      this._activeModel = null;
      this.dispatchEvent({ type: 'model::removed', model: null } as never);
    }
  }

  activeHDRI = {
    set: this.setHDRI.bind(this),
    get: this._activeHDRI,
    clear: this.clearHDRI.bind(this),
  };
  private async setHDRI(
    entry: ManifestEntry,
    config: Partial<Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>> = {}
  ): Promise<THREE.Texture> {
    try {
      if (this._activeHDRI) {
        if (this._activeHDRI.name === entry.id) {return this._activeHDRI;}
        this._activeHDRI.dispose();
        this._activeHDRI = null;
        this.scene.environment = null;
        this.scene.background = null;
      }

      const texture = await HDRILoader.load(
        entry,
        {
          onLoaded: (tex, loadedEntry) => {
            this._activeHDRI = tex;
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
          onError: (error) => {
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

  private clearHDRI(): void {
    if (this._activeHDRI) {
      this.scene.environment = null;
      this.scene.background = new THREE.Color(0x000000);
      this._activeHDRI.dispose();
      this._activeHDRI = null;
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
}