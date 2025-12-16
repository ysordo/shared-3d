import {
  GLTFLoader
} from "./chunk-W33WFURU.js";
import {
  HDRILoader
} from "./chunk-VSTC7ZYY.js";
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
  resizeHandler;
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
    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1e3
    );
    this.camera.position.set(0, 1.6, 5);
    this.scene = new THREE.Scene();
    if (config.background instanceof THREE.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new THREE.Color(config.background);
    }
    this.resizeHandler = () => {
      const { clientWidth, clientHeight } = this.canvas;
      const pixelRatio = window.devicePixelRatio;
      this.renderer.setSize(clientWidth * pixelRatio, clientHeight * pixelRatio, false);
      this.camera.aspect = clientWidth / clientHeight;
      if (this.activeModel) {
        this.camera.lookAt(this.activeModel.position);
      }
      this.camera.updateProjectionMatrix();
    };
    this.resizeObserver = new ResizeObserver(this.resizeHandler);
    this.resizeObserver.observe(canvas);
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
  static getInstance(canvas, config) {
    if (!_SceneOrchestrator.instance) {
      if (!canvas) {
        throw new Error("Canvas is required on first initialization");
      }
      _SceneOrchestrator.instance = new _SceneOrchestrator(canvas, config);
    }
    return _SceneOrchestrator.instance;
  }
  /* === PLUGIN SYSTEM === */
  use(plugin) {
    if (this.plugins.has(plugin.name)) {
      console.info(`[Orchestrator] Plugin "${plugin.name}" is already installed`);
      return this;
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
      console.info(`[Orchestrator] Install plugin: ${plugin.name}`);
    } catch (err) {
      console.error(`[Orchestrator] Error installed plugin ${plugin.name}:`, err);
    }
    return this;
  }
  plugin(name) {
    if (!this.plugins.has(name)) {
      throw console.error(`[Orchestrator] Plugin "${name}" is not already installed`);
    }
    try {
      const t = this.plugins.get(name);
      return t;
    } catch (err) {
      throw console.error(`[Orchestrator] Error get plugin ${name}:`, err);
    }
  }
  has(name) {
    return this.plugins.has(name);
  }
  remove(name) {
    if (!this.plugins.has(name)) {
      throw console.error(`[Orchestrator] Plugin "${name}" is not already installed`);
    }
    try {
      this.plugins.delete(name);
      console.info(`[Orchestrator] Plugin ${name} is already deleted`);
    } catch (err) {
      throw console.error(`[Orchestrator] Error get plugin ${name}:`, err);
    }
  }
  /* === MODELS === */
  async setModel(entry, options) {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
    if ("obj" in entry && entry.obj instanceof THREE.Group) {
      console.info(`[Orchestrator] Change model \u2192 ${entry.manifest.id}`);
      this.activeModel = entry.obj;
      this.dispatchEvent({ type: "model::loaded", model: this.activeModel });
      if (this.scene.getObjectByName && !this.scene.getObjectByName(entry.obj.name)) {
        this.scene.add(entry.obj);
      }
      const o = this.plugins.get("OrbitControls") || this.plugins.get("AdvancedOrbitControls");
      this.camera.position.set(
        0,
        1.6,
        o ? (o.maxDistance - o.minDistance) / 2 : 5
      );
      this.camera.lookAt(entry.obj.position);
      options?.onLoaded?.(entry.obj, entry.manifest);
      return entry.obj;
    } else {
      console.info(`[Orchestrator] Change model \u2192 ${entry.id}`);
      const model = await GLTFLoader.load(entry, {
        draco: options?.draco,
        onLoaded: (obj) => {
          this.activeModel = obj;
          this.dispatchEvent({ type: "model::loaded", model: this.activeModel });
          if (this.scene.getObjectByName && !this.scene.getObjectByName(obj.name)) {
            this.scene.add(obj);
          }
          const o = this.plugins.get("OrbitControls") || this.plugins.get("AdvancedOrbitControls");
          this.camera.position.set(
            0,
            1.6,
            o ? (o.maxDistance - o.minDistance) / 2 : 5
          );
          this.camera.lookAt(obj.position);
          options?.onLoaded?.(obj, entry);
          console.info(`[Orchestrator] Active model: ${entry.id}`);
        },
        onProgress: (...prev) => options?.onProgress?.(...prev),
        onError: (err) => {
          options?.onError?.(err, entry.url);
          console.error(`[Orchestrator] Error model loaded ${entry.id}`, err);
        }
      });
      return model;
    }
  }
  removeModel() {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
  }
  /* === HDRI === */
  async setHDRI(entry, config = {}) {
    try {
      if (this.activeHDRI?.name === entry.id) {
        return this.activeHDRI;
      }
      if (this.activeHDRI) {
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
            console.info(`[Orchestrator] HDRI activo: ${loadedEntry.id}`, {
              size: `${tex.image.width}x${tex.image.height}`,
              format: tex.userData?.format,
              exposure: config.exposure || HDRILoader.getOptions().exposure
            });
            this.dispatchEvent({ type: "hdri::loaded", texture: tex, entry: loadedEntry, config });
          },
          onProgress: (progress) => {
            console.info(`[Orchestrator] HDRI loading: ${Math.round(progress.percent)}%`);
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
  /* === CLEANING === */
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.canvas.removeEventListener("resize", this.resizeHandler);
    for (const plugin of this.plugins.values()) {
      plugin.dispose?.();
    }
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    this.canvas.width = 1;
    this.canvas.height = 1;
    _SceneOrchestrator.instance = null;
    console.info("[Orchestrator] Disposed completamente");
  }
  /* === GETTERS === */
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
