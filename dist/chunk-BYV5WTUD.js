import {
  HDRILoader
} from "./chunk-QHQFF7D7.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/SceneOrchestrator.ts
var SceneOrchestrator = class _SceneOrchestrator extends THREE.EventDispatcher {
  static instance = null;
  scene;
  camera;
  renderer;
  activeModel = null;
  activeHDRI = null;
  canvas;
  animationId = null;
  plugins = /* @__PURE__ */ new Map();
  resizeObserver;
  constructor(canvas, config = {}) {
    super();
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: config.antialias ?? true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.shadowMap.enabled = config.shadows ?? true;
    this.renderer.toneMapping = config.toneMapping ?? THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = config.toneMappingExposure ?? 1;
    if (config.clearColor) {
      this.renderer.setClearColor(config.clearColor);
    }
    this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1e3);
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
  /** Singleton access */
  static getInstance(canvas, config) {
    if (!_SceneOrchestrator.instance) {
      if (!canvas) {
        throw new Error("Canvas is required on first initialization");
      }
      _SceneOrchestrator.instance = new _SceneOrchestrator(canvas, config);
    }
    return _SceneOrchestrator.instance;
  }
  /* ============================
   * Centralized Animation Loop
   * ============================ */
  startAnimationLoop() {
    if (this.animationId !== null) {
      return;
    }
    const loop = () => {
      this.animationId = requestAnimationFrame(loop);
      this.plugins.forEach((plugin) => plugin?.preRender?.());
      if (!this.plugins.has("PostProcessing")) {
        this.renderer.render(this.scene, this.camera);
      }
      this.plugins.forEach((plugin) => plugin?.postRender?.());
    };
    loop();
  }
  /* ============================
   * Plugin System
   * ============================ */
  use(plugin) {
    if (this.plugins.has(plugin.name)) {
      console.info(`[Orchestrator] Plugin "${plugin.name}" ya instalado. Sobrescribiendo.`);
      this.remove(plugin.name);
    }
    const context = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      orchestrator: this
    };
    try {
      plugin.install(context);
      this.plugins.set(plugin.name, plugin);
      console.info(`[Orchestrator] Plugin instalado: ${plugin.name}`);
    } catch (err) {
      console.error(`[Orchestrator] Error instalando plugin ${plugin.name}:`, err);
    }
    return plugin;
  }
  plugin(name) {
    return this.plugins.get(name);
  }
  has(name) {
    return this.plugins.has(name);
  }
  remove(name) {
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
  async setModel(model) {
    this.removeModel();
    const controls = this.plugin("OrbitControls") || this.plugin("AdvancedOrbitControls");
    const defaultDistance = controls ? (controls.maxDistance + controls.minDistance) / 2 : 5;
    this.camera.position.set(0, 1.6, defaultDistance);
    this.camera.lookAt(model.position);
    this.activeModel = model;
    this.scene.add(model);
    this.dispatchEvent({ type: "model::loaded", model });
    console.info(`[Orchestrator] Modelo activo: ${model.name || "sin nombre"}`);
  }
  removeModel() {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
      this.dispatchEvent({ type: "model::removed" });
    }
  }
  /* ============================
   * HDRI Management
   * ============================ */
  async setHDRI(entry, config = {}) {
    try {
      if (this.activeHDRI) {
        if (this.activeHDRI.name === entry.id) {
          return this.activeHDRI;
        }
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
              loadedBy: "Orchestrator",
              loadedAt: (/* @__PURE__ */ new Date()).toISOString(),
              config
            };
            console.info(`[Orchestrator] HDRI activo: ${loadedEntry.id}`);
            this.dispatchEvent({ type: "hdri::loaded", texture: tex, entry: loadedEntry, config });
          },
          onProgress: (progress) => {
            this.dispatchEvent({ type: "hdri::progress", progress, entry });
          },
          onError: (error, url) => {
            console.error(`[Orchestrator] Error cargando HDRI ${entry.id}:`, error);
            this.dispatchEvent({ type: "hdri::error", error, entry });
          }
        },
        {
          exposure: 1,
          maxLuminance: 16,
          ...config
        }
      );
      return texture;
    } catch (error) {
      console.error(`[Orchestrator] Error en setHDRI para ${entry.id}:`, error);
      this.dispatchEvent({ type: "hdri::error", error, entry });
      throw error;
    }
  }
  clearHDRI() {
    if (this.activeHDRI) {
      this.scene.environment = null;
      this.scene.background = new THREE.Color(0);
      this.activeHDRI.dispose();
      this.activeHDRI = null;
    }
  }
  /* ============================
   * Cleanup
   * ============================ */
  dispose() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.resizeObserver.disconnect();
    Array.from(this.plugins.values()).reverse().forEach((plugin) => plugin.dispose?.());
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    this.canvas.width = 1;
    this.canvas.height = 1;
    _SceneOrchestrator.instance = null;
    console.info("[Orchestrator] Dispose completo");
  }
  /* ============================
   * Getters
   * ============================ */
  getActiveModel() {
    return this.activeModel;
  }
  getActiveHDRI() {
    return this.activeHDRI;
  }
};

export {
  SceneOrchestrator
};
