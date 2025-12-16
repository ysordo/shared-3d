"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkYAKUY6M3cjs = require('./chunk-YAKUY6M3.cjs');


var _chunkNY5P5I4Scjs = require('./chunk-NY5P5I4S.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/SceneOrchestrator.ts
var SceneOrchestrator = (_class = class _SceneOrchestrator extends _chunkEA3XQ4KJcjs.THREE.EventDispatcher {
  static __initStatic() {this.instance = null}
  
  
  
  __init() {this.activeModel = null}
  __init2() {this.activeHDRI = null}
  
  __init3() {this.animationId = null}
  __init4() {this.plugins = /* @__PURE__ */ new Map()}
  
  
  constructor(canvas, config = {}) {
    super();_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);;
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
      if (_optionalChain([this, 'access', _ => _.activeModel, 'optionalAccess', _2 => _2.name]) === entry.id) {
        this.scene.remove(this.activeModel);
        this.scene.add(this.activeModel);
        _optionalChain([options, 'optionalAccess', _3 => _3.onLoaded, 'optionalCall', _4 => _4(this.activeModel, entry)]);
        return this.activeModel;
      }
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
    console.info(`[Orchestrator] Change model \u2192 ${entry.id}`);
    const model = await _chunkNY5P5I4Scjs.GLTFLoader.load(entry, {
      draco: _optionalChain([options, 'optionalAccess', _5 => _5.draco]),
      onLoaded: (obj) => {
        this.activeModel = obj;
        const o = this.plugins.get("OrbitControls") || this.plugins.get("AdvancedOrbitControls");
        this.camera.position.set(
          0,
          1.6,
          o ? (o.maxDistance - o.minDistance) / 2 : 5
        );
        this.scene.children.forEach((obj2) => {
          if (obj2 instanceof _chunkEA3XQ4KJcjs.THREE.Group) {
            this.scene.remove(obj2);
          }
        });
        this.camera.lookAt(obj.position);
        this.scene.add(obj);
        this.dispatchEvent({ type: "model::loaded", model: this.activeModel });
        _optionalChain([options, 'optionalAccess', _6 => _6.onLoaded, 'optionalCall', _7 => _7(obj, entry)]);
        console.info(`[Orchestrator] Active model: ${entry.id}`);
      },
      onProgress: (...prev) => _optionalChain([options, 'optionalAccess', _8 => _8.onProgress, 'optionalCall', _9 => _9(...prev)]),
      onError: (err) => {
        _optionalChain([options, 'optionalAccess', _10 => _10.onError, 'optionalCall', _11 => _11(err, entry.url)]);
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
  async setHDRI(entry, config = {}) {
    try {
      if (this.activeHDRI) {
        if (_optionalChain([this, 'access', _12 => _12.activeHDRI, 'optionalAccess', _13 => _13.name]) === entry.id) {
          return this.activeHDRI;
        }
        this.activeHDRI.dispose();
        this.activeHDRI = null;
        this.scene.environment = null;
        this.scene.background = null;
      }
      const texture = await _chunkYAKUY6M3cjs.HDRILoader.load(
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
              format: _optionalChain([tex, 'access', _14 => _14.userData, 'optionalAccess', _15 => _15.format]),
              exposure: config.exposure || _chunkYAKUY6M3cjs.HDRILoader.getOptions().exposure
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
      _optionalChain([plugin, 'access', _16 => _16.dispose, 'optionalCall', _17 => _17()]);
    }
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    _optionalChain([this, 'access', _18 => _18.renderer, 'access', _19 => _19.forceContextLoss, 'optionalCall', _20 => _20()]);
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
}, _class.__initStatic(), _class);



exports.SceneOrchestrator = SceneOrchestrator;
