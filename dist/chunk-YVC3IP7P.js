import {
  GLTFLoader
} from "./chunk-R4AEK7RE.js";
import {
  HDRILoader
} from "./chunk-7TRUDKXW.js";

// src/core/orchestrator/SceneOrchestrator.ts
import * as THREE from "three";
var SceneOrchestrator = class _SceneOrchestrator {
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
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: config.antialias ?? true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
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
      this.renderer.setSize(clientWidth, clientHeight);
      this.camera.aspect = clientWidth / clientHeight;
      this.camera.updateProjectionMatrix();
    };
    canvas.addEventListener("resize", this.resizeHandler);
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
    console.info(`[Orchestrator] Change model \u2192 ${entry.id}`);
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
    const model = await GLTFLoader.load(entry, {
      draco: options?.draco,
      onLoaded: (obj) => {
        this.activeModel = obj;
        this.scene.add(obj);
        console.info(`[Orchestrator] Active model: ${entry.id}`);
      },
      onError: (err) => {
        console.error(`[Orchestrator] Error model loaded ${entry.id}`, err);
      }
    });
    return model;
  }
  removeModel() {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
  }
  /* === HDRI === */
  async setHDRI(entry) {
    if (this.activeHDRI) {
      this.activeHDRI.dispose();
    }
    const texture = await HDRILoader.load(entry, {
      onLoaded: (tex) => {
        this.activeHDRI = tex;
        this.scene.environment = tex;
        this.scene.background = tex;
        console.info(`[Orchestrator] HDRI activo: ${entry.id}`);
      }
    });
    return texture;
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
