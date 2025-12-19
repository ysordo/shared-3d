"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkDORUFBZFcjs = require('./chunk-DORUFBZF.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/SceneOrchestrator.ts
var SceneOrchestrator = (_class = class _SceneOrchestrator extends _chunkEA3XQ4KJcjs.THREE.EventDispatcher {
  static __initStatic() {this.instance = null}
  
  
  
  __init() {this.activeModel = null}
  __init2() {this.activeHDRI = null}
  
  __init3() {this.animationId = null}
  __init4() {this.plugins = /* @__PURE__ */ new Map()}
  
  
  constructor(canvas, config = {}) {
    super();_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);;
    this.canvas = canvas;
    this.renderer = new _chunkEA3XQ4KJcjs.THREE.WebGLRenderer({
      canvas,
      antialias: _nullishCoalesce(config.antialias, () => ( true)),
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.shadowMap.enabled = _nullishCoalesce(config.shadows, () => ( true));
    this.renderer.toneMapping = _nullishCoalesce(config.toneMapping, () => ( _chunkEA3XQ4KJcjs.THREE.ACESFilmicToneMapping));
    this.renderer.toneMappingExposure = _nullishCoalesce(config.toneMappingExposure, () => ( 1));
    if (config.clearColor) {
      this.renderer.setClearColor(config.clearColor);
    }
    this.camera = new _chunkEA3XQ4KJcjs.THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1e3
    );
    this.camera.position.set(0, 1.6, 5);
    this.scene = new _chunkEA3XQ4KJcjs.THREE.Scene();
    if (config.background instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new _chunkEA3XQ4KJcjs.THREE.Color(config.background);
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
  __init5() {this.plugin = (name) => this.plugins.get(name)}
  has(name) {
    return this.plugins.has(name);
  }
  remove(name) {
    if (this.plugins.delete(name)) {
      console.info(`[Orchestrator] Plugin ${name} is already deleted`);
    } else {
      console.info(`[Orchestrator] Plugin "${name}" is not already installed`);
    }
  }
  /* === MODELS === */
  async setModel(model) {
    this.removeModel();
    const o = this.plugin("OrbitControls") || this.plugin("AdvancedOrbitControls");
    this.camera.position.set(
      0,
      1.6,
      o ? (o.maxDistance - o.minDistance) / 2 : 5
    );
    this.camera.lookAt(model.position);
    this.activeModel = model;
    this.scene.add(model);
    this.dispatchEvent({ type: "model::loaded", model });
    console.info(`[Orchestrator] Active model: ${model.name}`);
  }
  removeModel() {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
      this.dispatchEvent({ type: "model::removed" });
    }
  }
  /* === HDRI === */
  async setHDRI(entry, config = {}) {
    try {
      if (this.activeHDRI) {
        if (_optionalChain([this, 'access', _ => _.activeHDRI, 'optionalAccess', _2 => _2.name]) === entry.id) {
          return this.activeHDRI;
        }
        this.activeHDRI.dispose();
        this.activeHDRI = null;
        this.scene.environment = null;
        this.scene.background = null;
      }
      const texture = await _chunkDORUFBZFcjs.HDRILoader.load(
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
              format: _optionalChain([tex, 'access', _3 => _3.userData, 'optionalAccess', _4 => _4.format]),
              exposure: config.exposure || _chunkDORUFBZFcjs.HDRILoader.getOptions().exposure
            });
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
      this.scene.background = new _chunkEA3XQ4KJcjs.THREE.Color(0);
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
      _optionalChain([plugin, 'access', _5 => _5.dispose, 'optionalCall', _6 => _6()]);
    }
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    _optionalChain([this, 'access', _7 => _7.renderer, 'access', _8 => _8.forceContextLoss, 'optionalCall', _9 => _9()]);
    this.canvas.width = 1;
    this.canvas.height = 1;
    _SceneOrchestrator.instance = null;
    console.info("[Orchestrator] Disposed complete");
  }
  /* === GETTERS === */
  getActiveModel() {
    return this.activeModel;
  }
  getActiveHDRI() {
    return this.activeHDRI;
  }
}, _class.__initStatic(), _class);



exports.SceneOrchestrator = SceneOrchestrator;
