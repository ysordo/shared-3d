"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkRIJLTLXBcjs = require('./chunk-RIJLTLXB.cjs');


var _chunkFDWWZDFWcjs = require('./chunk-FDWWZDFW.cjs');


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
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
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
    const model = await _chunkRIJLTLXBcjs.GLTFLoader.load(entry, {
      draco: _optionalChain([options, 'optionalAccess', _ => _.draco]),
      onLoaded: (obj) => {
        const t = this.scene.getObjectByName(obj.name);
        if (t) {
          this.scene.remove(t);
        }
        this.activeModel = obj;
        this.dispatchEvent({ type: "activeModelChanged", model: this.activeModel });
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
    const texture = await _chunkFDWWZDFWcjs.HDRILoader.load(entry, {
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
      _optionalChain([plugin, 'access', _2 => _2.dispose, 'optionalCall', _3 => _3()]);
    }
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    _optionalChain([this, 'access', _4 => _4.renderer, 'access', _5 => _5.forceContextLoss, 'optionalCall', _6 => _6()]);
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
