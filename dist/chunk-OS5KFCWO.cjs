"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkISDKKMXIcjs = require('./chunk-ISDKKMXI.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/SceneOrchestrator.ts
var SceneOrchestrator = (_class = class _SceneOrchestrator extends _chunkEA3XQ4KJcjs.THREE.EventDispatcher {
  static __initStatic() {this.instance = null}
  
  
  
  __init() {this._activeModel = null}
  __init2() {this._activeHDRI = null}
  
  __init3() {this.animationId = null}
  __init4() {this.plugins = /* @__PURE__ */ new Map()}
  
  constructor(canvas, config = {}) {
    super();_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);;
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
    this.camera = new _chunkEA3XQ4KJcjs.THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1e3);
    this.camera.position.set(0, 1.6, 5);
    this.scene = new _chunkEA3XQ4KJcjs.THREE.Scene();
    if (config.background instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new _chunkEA3XQ4KJcjs.THREE.Color(config.background);
    }
    this.resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = this.canvas;
      const width = clientWidth;
      const height = clientHeight;
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.plugins.forEach((plugin) => _optionalChain([plugin, 'access', _ => _.resize, 'optionalCall', _2 => _2(width, height)]));
    });
    this.resizeObserver.observe(canvas);
    this.startAnimationLoop();
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
  startAnimationLoop() {
    if (this.animationId !== null) {
      return;
    }
    const loop = () => {
      this.animationId = requestAnimationFrame(loop);
      this.plugins.forEach((plugin) => _optionalChain([plugin, 'optionalAccess', _3 => _3.preRender, 'optionalCall', _4 => _4()]));
      if (!this.plugins.has("PostProcessing")) {
        this.renderer.render(this.scene, this.camera);
      }
      this.plugins.forEach((plugin) => _optionalChain([plugin, 'optionalAccess', _5 => _5.postRender, 'optionalCall', _6 => _6()]));
    };
    loop();
  }
  __init5() {this.plugin = {
    use: this.usePlugin.bind(this),
    get: this.getPlugin.bind(this),
    has: this.hasPlugin.bind(this),
    remove: this.removePlugin.bind(this)
  }}
  usePlugin(plugin) {
    if (this.plugins.has(plugin.name)) {
      console.info(`[Orchestrator] Plugin "${plugin.name}" ya instalado. Sobrescribiendo.`);
      this.removePlugin(plugin.name);
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
  getPlugin(name) {
    return this.plugins.get(name);
  }
  hasPlugin(name) {
    return this.plugins.has(name);
  }
  removePlugin(name) {
    const plugin = this.plugins.get(name);
    if (plugin) {
      _optionalChain([plugin, 'access', _7 => _7.dispose, 'optionalCall', _8 => _8()]);
      this.plugins.delete(name);
      console.info(`[Orchestrator] Plugin eliminado: ${name}`);
    }
  }
  __init6() {this.activeModel = {
    set: this.setModel.bind(this),
    get: () => this._activeModel,
    remove: this.removeModel.bind(this)
  }}
  async setModel(model) {
    this.removeModel();
    const controls = this.getPlugin("OrbitControls") || this.getPlugin("AdvancedOrbitControls");
    const defaultDistance = controls ? (controls.maxDistance + controls.minDistance) / 2 : 5;
    this.camera.position.set(0, 1.6, defaultDistance);
    this.camera.lookAt(model.position);
    this._activeModel = model;
    this.scene.add(model);
    this.dispatchEvent({ type: "model::loaded", model });
    console.info(`[Orchestrator] Modelo activo: ${model.name || "sin nombre"}`);
  }
  removeModel() {
    if (this._activeModel) {
      this.scene.remove(this._activeModel);
      this._activeModel = null;
      this.dispatchEvent({ type: "model::removed", model: null });
    }
  }
  __init7() {this.activeHDRI = {
    set: this.setHDRI.bind(this),
    get: () => this._activeHDRI,
    clear: this.clearHDRI.bind(this)
  }}
  async setHDRI(entry, config = {}) {
    try {
      if (this._activeHDRI) {
        if (this._activeHDRI.name === entry.id) {
          return this._activeHDRI;
        }
        this._activeHDRI.dispose();
        this._activeHDRI = null;
        this.scene.environment = null;
        this.scene.background = null;
      }
      const texture = await _chunkISDKKMXIcjs.HDRILoader.load(
        entry,
        {
          onLoaded: (tex, loadedEntry) => {
            this._activeHDRI = tex;
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
          onError: (error) => {
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
    if (this._activeHDRI) {
      this.scene.environment = null;
      this.scene.background = new _chunkEA3XQ4KJcjs.THREE.Color(0);
      this._activeHDRI.dispose();
      this._activeHDRI = null;
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
    Array.from(this.plugins.values()).reverse().forEach((plugin) => _optionalChain([plugin, 'access', _9 => _9.dispose, 'optionalCall', _10 => _10()]));
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    _optionalChain([this, 'access', _11 => _11.renderer, 'access', _12 => _12.forceContextLoss, 'optionalCall', _13 => _13()]);
    this.canvas.width = 1;
    this.canvas.height = 1;
    _SceneOrchestrator.instance = null;
    console.info("[Orchestrator] Dispose completo");
  }
}, _class.__initStatic(), _class);



exports.SceneOrchestrator = SceneOrchestrator;
