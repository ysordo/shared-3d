/* eslint-disable no-console */
// src/core/orchestrator/SceneOrchestrator.ts
import * as THREE from 'three';
import { GLTFLoader } from '../loaders/GLTFLoader';
import { HDRILoader } from '../loaders/HDRILoader';
import type { ModelManifestEntry } from '../cache/types';
import type { Plugin, PluginContext } from './types';

export type SceneConfig = {
  antialias?: boolean;
  shadows?: boolean;
  toneMapping?: THREE.ToneMapping;
  toneMappingExposure?: number;
  background?: THREE.Color | string | THREE.Texture;
  clearColor?: THREE.ColorRepresentation;
};

export class SceneOrchestrator {
  private static instance: SceneOrchestrator | null = null;

  // Público: acceso directo
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  public readonly renderer: THREE.WebGLRenderer;

  // Estado interno
  private activeModel: THREE.Group | null = null;
  private activeHDRI: THREE.Texture | null = null;
  private canvas: HTMLCanvasElement;
  private animationId: number | null = null;
  private plugins: Map<string, Plugin> = new Map();
  private resizeHandler: () => void;

  private constructor(canvas: HTMLCanvasElement, config: SceneConfig = {}) {
    this.canvas = canvas;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: config.antialias ?? true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.shadowMap.enabled = config.shadows ?? true;
    this.renderer.toneMapping = config.toneMapping ?? THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = config.toneMappingExposure ?? 1.0;
    if (config.clearColor) {
      this.renderer.setClearColor(config.clearColor);
    }

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.6, 5);

    // Scene
    this.scene = new THREE.Scene();
    if (config.background instanceof THREE.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new THREE.Color(config.background);
    }

    // Resize handler
    this.resizeHandler = () => {
      const { clientWidth, clientHeight } = this.canvas;
      this.renderer.setSize(clientWidth, clientHeight);
      this.camera.aspect = clientWidth / clientHeight;
      this.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', this.resizeHandler);

    // Animation loop
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  // Singleton
  static getInstance(canvas?: HTMLCanvasElement, config?: SceneConfig): SceneOrchestrator {
    if (!SceneOrchestrator.instance) {
      if (!canvas) {throw new Error('Canvas is required on first initialization');}
      SceneOrchestrator.instance = new SceneOrchestrator(canvas, config);
    }
    return SceneOrchestrator.instance;
  }

  // === PLUGIN SYSTEM ===
  use(plugin: Plugin): this {
    if (this.plugins.has(plugin.name)) {
      console.warn(`[Orchestrator] Plugin "${plugin.name}" ya está instalado`);
      return this;
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

  // === MODELOS ===
  async setModel(entry: ModelManifestEntry, options?: { draco?: boolean }): Promise<THREE.Group> {
    console.info(`[Orchestrator] Cambiando modelo → ${entry.id}`);

    // Eliminar modelo anterior
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }

    const model = await GLTFLoader.load(entry, {
      draco: options?.draco,
      onLoaded: (obj) => {
        this.activeModel = obj;
        this.scene.add(obj);
        console.info(`[Orchestrator] Modelo activo: ${entry.id}`);
      },
      onError: (err) => {
        console.error(`[Orchestrator] Error cargando modelo ${entry.id}`, err);
      },
    });

    return model;
  }

  removeModel(): void {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
  }

  // === HDRI ===
  async setHDRI(entry: ModelManifestEntry): Promise<THREE.Texture> {
    if (this.activeHDRI) {
      this.activeHDRI.dispose();
    }

    const texture = await HDRILoader.load(entry, {
      onLoaded: (tex) => {
        this.activeHDRI = tex;
        this.scene.environment = tex;
        this.scene.background = tex;
        console.info(`[Orchestrator] HDRI activo: ${entry.id}`);
      },
    });

    return texture;
  }

  clearHDRI(): void {
    if (this.activeHDRI) {
      this.scene.environment = null;
      this.scene.background = new THREE.Color(0x000000);
      this.activeHDRI.dispose();
      this.activeHDRI = null;
    }
  }

  // === LIMPIEZA ===
  dispose(): void {
    // Cancelar animation loop
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Resize
    window.removeEventListener('resize', this.resizeHandler);

    // Plugins
    for (const plugin of this.plugins.values()) {
      plugin.dispose?.();
    }
    this.plugins.clear();

    // Modelos y HDRI
    this.removeModel();
    this.clearHDRI();

    // Renderer
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    this.canvas.width = 1;
    this.canvas.height = 1;

    // Reset singleton
    SceneOrchestrator.instance = null;
    console.info('[Orchestrator] Disposed completamente');
  }

  // === GETTERS ===
  getActiveModel(): THREE.Group | null {
    return this.activeModel;
  }

  getActiveHDRI(): THREE.Texture | null {
    return this.activeHDRI;
  }
}