"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2; var _class3; var _class4; var _class5; var _class6; var _class7; var _class8; var _class9; var _class10; var _class11; var _class12; var _class13; var _class14; var _class15; var _class16; var _class17; var _class18; var _class19;










var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/context/SceneContext.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);

// src/core/orchestrator/SceneOrchestrator.ts
var _three = require('three'); var THREE2 = _interopRequireWildcard(_three); var THREE3 = _interopRequireWildcard(_three);

// src/core/cache/ObjectCache.ts
var _idbkeyval = require('idb-keyval');
var CACHE_PREFIX = "shared-3d:asset:";
var ObjectCache = class {
  static async getKey(id) {
    return `${CACHE_PREFIX}${id}`;
  }
  static async set(id, data, hash, updatedAt = Date.now()) {
    const key = await this.getKey(id);
    const entry = {
      data,
      hash,
      timestamp: Date.now(),
      size: this.estimateSize(data),
      updatedAt
    };
    await _idbkeyval.set.call(void 0, key, entry);
  }
  static async get(id) {
    const key = await this.getKey(id);
    return await _asyncNullishCoalesce(await _idbkeyval.get.call(void 0, key), async () => ( null));
  }
  static async has(id) {
    const key = await this.getKey(id);
    const all = await _idbkeyval.keys.call(void 0, );
    return all.includes(key);
  }
  static async delete(id) {
    const key = await this.getKey(id);
    const entry = await this.get(key);
    if (entry) {
      this.dispose(entry.data);
    }
    await _idbkeyval.del.call(void 0, key);
  }
  static async clearAll() {
    const allKeys = await _idbkeyval.keys.call(void 0, );
    const ourKeys = allKeys.filter((k) => typeof k === "string" && k.startsWith(CACHE_PREFIX));
    await Promise.all(ourKeys.map((k) => _idbkeyval.del.call(void 0, k)));
  }
  static dispose(data) {
    if (data instanceof _chunkEA3XQ4KJcjs.THREE.Object3D) {
      data.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _2 => _2.geometry, 'optionalAccess', _3 => _3.dispose, 'call', _4 => _4()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _5 => _5.material, 'optionalAccess', _6 => _6.dispose, 'call', _7 => _7()]);
          }
        }
      });
    } else if (data instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      data.dispose();
    }
  }
  static estimateSize(data) {
    if (data instanceof _chunkEA3XQ4KJcjs.THREE.Object3D) {
      let size = 0;
      data.traverse((child) => {
        if (child.isMesh && _optionalChain([child, 'access', _8 => _8.geometry, 'optionalAccess', _9 => _9.attributes, 'optionalAccess', _10 => _10.position, 'optionalAccess', _11 => _11.array])) {
          size += child.geometry.attributes.position.array.byteLength;
        }
      });
      return size;
    }
    if (data instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      const array = _optionalChain([data, 'access', _12 => _12.source, 'optionalAccess', _13 => _13.data]) || _optionalChain([data, 'access', _14 => _14.image, 'optionalAccess', _15 => _15.data]);
      return _optionalChain([array, 'optionalAccess', _16 => _16.byteLength]) || 0;
    }
    return 0;
  }
};

// src/core/loaders/GLTFLoader.ts
var GLTFLoader2 = (_class = class {
  static __initStatic() {this.plainLoader = new (0, _chunkEA3XQ4KJcjs.GLTFLoader)()}
  static __initStatic2() {this.dracoLoaderInstance = new (0, _chunkEA3XQ4KJcjs.GLTFLoader)()}
  static __initStatic3() {this.dracoDecoder = new (0, _chunkEA3XQ4KJcjs.DRACOLoader)()}
  static __initStatic4() {this.isDracoInitialized = false}
  static getLoader(options = {}) {
    const useDraco = options.draco === true;
    if (useDraco) {
      if (!this.isDracoInitialized) {
        const path = options.decoderPath || "/draco/";
        this.dracoDecoder.setDecoderPath(path);
        this.dracoDecoder.setDecoderConfig({ type: "js" });
        this.dracoDecoder.preload();
        this.dracoLoaderInstance.setDRACOLoader(this.dracoDecoder);
        this.isDracoInitialized = true;
        console.info(`[GLTFLoader] Draco decoder initialized: ${path}`);
      }
      return this.dracoLoaderInstance;
    }
    return this.plainLoader;
  }
  static async load(entry, options = {}) {
    const { id, url, hash } = entry;
    const {
      draco = false,
      decoderPath,
      onProgress,
      onLoaded,
      onError
    } = options;
    const loader = this.getLoader({ draco, decoderPath });
    const cached = await ObjectCache.get(id);
    if (cached && cached.hash === hash) {
      console.info(`[GLTFLoader] Cache hit: ${id} (${draco ? "draco" : "standard"})`);
      const model = cached.data.clone(true);
      model.userData = { ...cached.data.userData, cached: true };
      _optionalChain([onLoaded, 'optionalCall', _17 => _17(model, entry)]);
      return model;
    }
    console.info(`[GLTFLoader] Loading: ${id} (${draco ? "Draco" : "Standard"})`);
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        async (gltf) => {
          try {
            const scene = gltf.scene;
            scene.name = id;
            scene.animations = gltf.animations || [];
            const box = new _chunkEA3XQ4KJcjs.THREE.Box3().setFromObject(scene);
            scene.position.sub(box.getCenter(new _chunkEA3XQ4KJcjs.THREE.Vector3()));
            scene.userData = {
              sourceUrl: url,
              manifestHash: hash,
              loadedAt: Date.now(),
              format: draco ? "gltf-draco" : "gltf",
              draco
            };
            await ObjectCache.set(id, scene, hash);
            _optionalChain([onLoaded, 'optionalCall', _18 => _18(scene, entry)]);
            resolve(scene);
          } catch (err) {
            _optionalChain([onError, 'optionalCall', _19 => _19(err, url)]);
            reject(err);
          }
        },
        (progress) => {
          if (progress.lengthComputable) {
            _optionalChain([onProgress, 'optionalCall', _20 => _20({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            })]);
          }
        },
        (error) => {
          console.error(`[GLTFLoader] Error: ${id}`, error);
          _optionalChain([onError, 'optionalCall', _21 => _21(error, url)]);
          reject(error);
        }
      );
    });
  }
  static async preload(entries, options = {}, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          ...options,
          onLoaded: () => _optionalChain([onProgress, 'optionalCall', _22 => _22(++completed, total)]),
          onError: (err, url) => console.error(`Preload failed: ${url}`, err)
        })
      )
    );
  }
  static async invalidate(id) {
    await ObjectCache.delete(id);
  }
  static async clearCache() {
    await ObjectCache.clearAll();
  }
}, _class.__initStatic(), _class.__initStatic2(), _class.__initStatic3(), _class.__initStatic4(), _class);

// src/core/loaders/WebPHDRLoader.ts
var WebPHDRLoader = (_class2 = class {
  
  __init() {this.type = _chunkEA3XQ4KJcjs.THREE.FloatType}
  __init2() {this.exposure = 1}
  __init3() {this.preserveHDR = true}
  constructor(manager) {;_class2.prototype.__init.call(this);_class2.prototype.__init2.call(this);_class2.prototype.__init3.call(this);
    this.manager = manager || new _chunkEA3XQ4KJcjs.THREE.LoadingManager();
  }
  setDataType(type) {
    this.type = type;
    return this;
  }
  setExposure(exposure) {
    this.exposure = exposure;
    return this;
  }
  setPreserveHDR(preserve) {
    this.preserveHDR = preserve;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const loader = new _chunkEA3XQ4KJcjs.THREE.FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.load(
      url,
      (buffer) => {
        try {
          const result = this.parse(buffer);
          const texture = new _chunkEA3XQ4KJcjs.THREE.DataTexture(
            result.data,
            result.width,
            result.height,
            _chunkEA3XQ4KJcjs.THREE.RGBAFormat,
            result.type
          );
          texture.colorSpace = _chunkEA3XQ4KJcjs.THREE.LinearSRGBColorSpace;
          texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          texture.magFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.flipY = true;
          texture.userData = {
            format: "webp-hdr",
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            preserveHDR: this.preserveHDR
          };
          _optionalChain([onLoad, 'optionalCall', _23 => _23(texture, result)]);
        } catch (error) {
          _optionalChain([onError, 'optionalCall', _24 => _24(error)]);
        }
      },
      onProgress,
      (error) => _optionalChain([onError, 'optionalCall', _25 => _25(error)])
    );
    return new _chunkEA3XQ4KJcjs.THREE.DataTexture(new Uint8Array(4), 1, 1, _chunkEA3XQ4KJcjs.THREE.RGBAFormat);
  }
  parse(buffer) {
    const view = new DataView(buffer);
    if (view.getUint32(0, true) !== 1179210327) {
      throw new Error("Not a valid WebP file");
    }
    if (view.getUint32(8, true) !== 1346520407) {
      throw new Error("Not a valid WebP file");
    }
    let offset = 12;
    let exposure = this.exposure;
    let maxLuminance = 16;
    while (offset < buffer.byteLength) {
      const chunkType = String.fromCharCode(
        view.getUint8(offset),
        view.getUint8(offset + 1),
        view.getUint8(offset + 2),
        view.getUint8(offset + 3)
      );
      const chunkSize = view.getUint32(offset + 4, true) + 8;
      if (chunkType === "VP8X" || chunkType === "VP8L" || chunkType === "VP8 ") {
        break;
      }
      if (chunkType === "EXIF" || chunkType === "XMP ") {
        const chunkData = new Uint8Array(buffer, offset + 8, chunkSize - 8);
        const text = new TextDecoder().decode(chunkData);
        const exposureMatch = text.match(/Exposure[- ]?Value:\s*([0-9.-]+)/i);
        const luminanceMatch = text.match(/MaxLuminance:\s*([0-9.-]+)/i);
        if (exposureMatch) {
          exposure = parseFloat(exposureMatch[1]);
        }
        if (luminanceMatch) {
          maxLuminance = parseFloat(luminanceMatch[1]);
        }
      }
      offset += chunkSize + chunkSize % 2;
    }
    const width = 1024;
    const height = 512;
    const size = width * height * 4;
    const data = this.type === _chunkEA3XQ4KJcjs.THREE.FloatType ? new Float32Array(size) : new Uint16Array(size);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;
        const theta = i / height * Math.PI;
        const phi = j / width * Math.PI * 2;
        const sky = new _chunkEA3XQ4KJcjs.THREE.Color(0.1, 0.3, 0.8).multiplyScalar(Math.cos(theta));
        const sun = new _chunkEA3XQ4KJcjs.THREE.Color(1, 0.9, 0.7).multiplyScalar(
          Math.exp(-Math.pow(phi - Math.PI, 2) / 0.1) * Math.exp(-Math.pow(theta - Math.PI / 6, 2) / 0.2) * 1e3
        );
        const color = sky.clone().add(sun).multiplyScalar(exposure);
        const maxChannel = Math.max(color.r, color.g, color.b, 1e-4);
        const range = Math.min(255, Math.floor(maxChannel / maxLuminance * 255));
        if (this.type === _chunkEA3XQ4KJcjs.THREE.FloatType) {
          data[idx] = color.r / (range + 1);
          data[idx + 1] = color.g / (range + 1);
          data[idx + 2] = color.b / (range + 1);
          data[idx + 3] = range / 255;
        } else {
          const floatData = new Float32Array(4);
          floatData[0] = color.r / (range + 1);
          floatData[1] = color.g / (range + 1);
          floatData[2] = color.b / (range + 1);
          floatData[3] = range / 255;
          const half = new Uint16Array(floatData.buffer);
          data[idx] = half[0];
          data[idx + 1] = half[1];
          data[idx + 2] = half[2];
          data[idx + 3] = half[3];
        }
      }
    }
    return {
      width,
      height,
      data,
      type: this.type,
      exposure,
      maxLuminance
    };
  }
}, _class2);

// src/core/loaders/HDRILoader.ts
var HDRILoader = (_class3 = class {
  static __initStatic5() {this.rgbeLoader = new (0, _chunkEA3XQ4KJcjs.RGBELoader)()}
  static __initStatic6() {this.webpLoader = new WebPHDRLoader()}
  /**
   * Carga un HDRI de forma inteligente (con caché + hash)
   */
  static async load(entry, events = {}) {
    const { id, url, hash } = entry;
    const { onProgress, onLoaded, onError } = events;
    const cached = await ObjectCache.get(id);
    if (cached && cached.hash === hash && cached.data instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      console.info(`[HDRILoader] Cache hit: ${id}`);
      const texture = cached.data.clone();
      texture.userData = { ...cached.data.userData, cached: true };
      _optionalChain([onLoaded, 'optionalCall', _26 => _26(texture, entry)]);
      return texture;
    }
    const isWebP = url.toLowerCase().endsWith(".webp");
    const loader = isWebP ? this.webpLoader : this.rgbeLoader;
    console.info(`[HDRILoader] Loading: ${id} (${isWebP ? "WebP-HDR" : "RGBE"})`);
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        async (texture) => {
          try {
            texture.mapping = _chunkEA3XQ4KJcjs.THREE.EquirectangularReflectionMapping;
            texture.colorSpace = _chunkEA3XQ4KJcjs.THREE.LinearSRGBColorSpace;
            texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
            texture.magFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            texture.name = id;
            texture.userData = {
              sourceUrl: url,
              manifestHash: hash,
              format: isWebP ? "webp-hdr" : "rgbe",
              loadedAt: Date.now()
            };
            await ObjectCache.set(id, texture, hash);
            _optionalChain([onLoaded, 'optionalCall', _27 => _27(texture, entry)]);
            resolve(texture);
          } catch (err) {
            _optionalChain([onError, 'optionalCall', _28 => _28(err, url)]);
            reject(err);
          }
        },
        (progress) => {
          if (progress.lengthComputable) {
            _optionalChain([onProgress, 'optionalCall', _29 => _29({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            })]);
          }
        },
        (error) => {
          console.error(`[HDRILoader] Error loading ${id}:`, error);
          _optionalChain([onError, 'optionalCall', _30 => _30(error, url)]);
          reject(error);
        }
      );
    });
  }
  /**
   * Precarga múltiples HDRIs
   */
  static async preload(entries, onProgress) {
    let completed = 0;
    const total = entries.length;
    await Promise.all(
      entries.map(
        (entry) => this.load(entry, {
          onLoaded: () => {
            completed++;
            _optionalChain([onProgress, 'optionalCall', _31 => _31(completed, total)]);
          },
          onError: (err, url) => console.error(`HDRI preload failed: ${url}`, err)
        })
      )
    );
  }
  /**
   * Invalida caché de un HDRI específico
   */
  static async invalidate(id) {
    const cached = await ObjectCache.get(id);
    if (_optionalChain([cached, 'optionalAccess', _32 => _32.data]) instanceof _chunkEA3XQ4KJcjs.THREE.Texture) {
      cached.data.dispose();
    }
    await ObjectCache.delete(id);
  }
}, _class3.__initStatic5(), _class3.__initStatic6(), _class3);

// src/core/orchestrator/SceneOrchestrator.ts
var SceneOrchestrator = (_class4 = class _SceneOrchestrator {
  static __initStatic7() {this.instance = null}
  
  
  
  __init4() {this.activeModel = null}
  __init5() {this.activeHDRI = null}
  
  __init6() {this.animationId = null}
  __init7() {this.plugins = /* @__PURE__ */ new Map()}
  
  constructor(canvas, config = {}) {;_class4.prototype.__init4.call(this);_class4.prototype.__init5.call(this);_class4.prototype.__init6.call(this);_class4.prototype.__init7.call(this);
    this.canvas = canvas;
    this.renderer = new THREE2.WebGLRenderer({
      canvas,
      antialias: _nullishCoalesce(config.antialias, () => ( true)),
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.shadowMap.enabled = _nullishCoalesce(config.shadows, () => ( true));
    this.renderer.toneMapping = _nullishCoalesce(config.toneMapping, () => ( THREE2.ACESFilmicToneMapping));
    this.renderer.toneMappingExposure = _nullishCoalesce(config.toneMappingExposure, () => ( 1));
    if (config.clearColor) {
      this.renderer.setClearColor(config.clearColor);
    }
    this.camera = new THREE2.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1e3
    );
    this.camera.position.set(0, 1.6, 5);
    this.scene = new THREE2.Scene();
    if (config.background instanceof THREE2.Texture) {
      this.scene.background = config.background;
      this.scene.environment = config.background;
    } else if (config.background) {
      this.scene.background = new THREE2.Color(config.background);
    }
    this.resizeHandler = () => {
      const { clientWidth, clientHeight } = this.canvas;
      this.renderer.setSize(clientWidth, clientHeight);
      this.camera.aspect = clientWidth / clientHeight;
      this.camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", this.resizeHandler);
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
      console.warn(`[Orchestrator] Plugin "${plugin.name}" ya est\xE1 instalado`);
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
      console.info(`[Orchestrator] Plugin instalado: ${plugin.name}`);
    } catch (err) {
      console.error(`[Orchestrator] Error instalando plugin ${plugin.name}:`, err);
    }
    return this;
  }
  /* === MODELS === */
  async setModel(entry, options) {
    console.info(`[Orchestrator] Cambiando modelo \u2192 ${entry.id}`);
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel = null;
    }
    const model = await GLTFLoader2.load(entry, {
      draco: _optionalChain([options, 'optionalAccess', _33 => _33.draco]),
      onLoaded: (obj) => {
        this.activeModel = obj;
        this.scene.add(obj);
        console.info(`[Orchestrator] Modelo activo: ${entry.id}`);
      },
      onError: (err) => {
        console.error(`[Orchestrator] Error cargando modelo ${entry.id}`, err);
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
      this.scene.background = new THREE2.Color(0);
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
    window.removeEventListener("resize", this.resizeHandler);
    for (const plugin of this.plugins.values()) {
      _optionalChain([plugin, 'access', _34 => _34.dispose, 'optionalCall', _35 => _35()]);
    }
    this.plugins.clear();
    this.removeModel();
    this.clearHDRI();
    this.renderer.dispose();
    _optionalChain([this, 'access', _36 => _36.renderer, 'access', _37 => _37.forceContextLoss, 'optionalCall', _38 => _38()]);
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
}, _class4.__initStatic7(), _class4);

// src/context/SceneContext.tsx
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, null);
var SceneProvider = _react.forwardRef.call(void 0, 
  ({ children, config }, ref) => {
    _react.useEffect.call(void 0, () => {
      if (!ref) {
        return;
      }
      if (typeof ref === "function") {
        throw new Error(
          "SceneProvider no soporta ref como funci\xF3n. Usa useRef()"
        );
      }
      if (!ref.current) {
        console.warn("SceneProvider: canvas ref no est\xE1 asignado a\xFAn");
        return;
      }
      const orchestrator = SceneOrchestrator.getInstance(ref.current, config);
      if (process.env.NODE_ENV === "development") {
        window.__ORCHESTRATOR__ = orchestrator;
      }
    }, [ref, config]);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SceneContext.Provider, { value: { orchestrator: null }, children });
  }
);
SceneProvider.displayName = "SceneProvider";
var useScene = () => {
  const context = _react.useContext.call(void 0, SceneContext);
  if (!context) {
    throw new Error("useScene debe usarse dentro de <SceneProvider>");
  }
  if (!context.orchestrator) {
    throw new Error(
      "SceneOrchestrator a\xFAn no est\xE1 inicializado. Aseg\xFArate de que el canvas est\xE9 montado"
    );
  }
  return context.orchestrator;
};

// src/context/CacheContext.tsx


// src/core/cache/utils/env.ts
var isDev = () => {
  if (typeof import.meta !== "undefined" && _optionalChain([import.meta, 'access', _39 => _39.env, 'optionalAccess', _40 => _40.MODE]) === "development") {
    return true;
  }
  if (typeof process !== "undefined" && _optionalChain([process, 'access', _41 => _41.env, 'optionalAccess', _42 => _42.NODE_ENV]) === "development") {
    return true;
  }
  return false;
};

// src/core/cache/FileWatcher.ts
var FileWatcher = (_class5 = class _FileWatcher {
  static __initStatic8() {this.instance = null}
  __init8() {this.watchers = /* @__PURE__ */ new Map()}
  __init9() {this.manifest = []}
  
  constructor() {;_class5.prototype.__init8.call(this);_class5.prototype.__init9.call(this);
    if (!isDev()) {
      return;
    }
    this.startPolling();
  }
  static getInstance() {
    if (!_FileWatcher.instance) {
      _FileWatcher.instance = new _FileWatcher();
    }
    return _FileWatcher.instance;
  }
  watch(manifest, onChange) {
    if (!isDev()) {
      return;
    }
    this.manifest = manifest;
    this.onChange = onChange;
    this.checkForChanges();
  }
  async checkForChanges() {
    if (!this.manifest.length || !isDev()) {
      return;
    }
    const changed = [];
    for (const entry of this.manifest) {
      try {
        const response = await fetch(entry.url, {
          method: "HEAD",
          cache: "no-store"
        });
        const lastModified = response.headers.get("Last-Modified");
        const etag = response.headers.get("ETag");
        let currentStamp;
        if (lastModified) {
          const parsed = Date.parse(lastModified);
          currentStamp = isNaN(parsed) ? Date.now() : parsed;
        } else if (etag) {
          const clean = etag.replace(/^W\//, "").replace(/"/g, "");
          let hash = 0;
          for (let i = 0; i < clean.length; i++) {
            hash = (hash << 5) - hash + clean.charCodeAt(i);
            hash = hash & hash;
          }
          currentStamp = hash;
        } else {
          currentStamp = Date.now();
        }
        const previousStamp = this.watchers.get(entry.url);
        if (previousStamp !== void 0 && previousStamp !== currentStamp) {
          changed.push(entry.id);
        }
        this.watchers.set(entry.url, currentStamp);
      } catch (e2) {
      }
    }
    if (changed.length > 0) {
      _optionalChain([this, 'access', _43 => _43.onChange, 'optionalCall', _44 => _44(changed)]);
    }
  }
  startPolling() {
    setInterval(() => this.checkForChanges(), 2e3);
  }
  dispose() {
    this.watchers.clear();
    this.onChange = (() => {
    });
  }
}, _class5.__initStatic8(), _class5);

// src/core/cache/CacheValidator.ts

var CacheValidator = (_class6 = class _CacheValidator {
  static __initStatic9() {this.isFirstLoad = true}
  static async validate(options) {
    const { manifest, onProgress, onComplete, forceUpdate = false } = options;
    _optionalChain([onProgress, 'optionalCall', _45 => _45(0, "Iniciando validaci\xF3n de cach\xE9...")]);
    if (isDev() && !forceUpdate) {
      const watcher = FileWatcher.getInstance();
      watcher.watch(manifest, (changedIds) => {
        _optionalChain([onProgress, 'optionalCall', _46 => _46(100, `Recargando: ${changedIds.join(", ")}`)]);
        _optionalChain([onComplete, 'optionalCall', _47 => _47({
          validated: true,
          updated: changedIds,
          removed: [],
          added: [],
          errors: [],
          durationMs: 0
        })]);
      });
      _optionalChain([onProgress, 'optionalCall', _48 => _48(100, "Modo desarrollo: observando cambios...")]);
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    if (!_CacheValidator.isFirstLoad && !forceUpdate) {
      _optionalChain([onProgress, 'optionalCall', _49 => _49(100, "Cach\xE9 ya validada")]);
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    _optionalChain([onProgress, 'optionalCall', _50 => _50(10, "Comparando manifest con cach\xE9 local...")]);
    const start = performance.now();
    const currentIds = new Set(manifest.map((m) => m.id));
    const cachedKeys = await _idbkeyval.keys.call(void 0, );
    const cachedIds = new Set(
      cachedKeys.filter((k) => typeof k === "string" && k.startsWith("shared-3d:asset:")).map((k) => k.replace("shared-3d:asset:", ""))
    );
    const removed = [];
    for (const id of cachedIds) {
      if (!currentIds.has(id)) {
        await ObjectCache.delete(id);
        removed.push(id);
      }
    }
    const toUpdate = [];
    for (const entry of manifest) {
      const cached = await ObjectCache.get(entry.id);
      if (!cached || cached.hash !== entry.hash || cached.updatedAt < entry.updatedAt) {
        toUpdate.push(entry);
      }
    }
    const report = {
      validated: true,
      updated: toUpdate.map((e) => e.id),
      removed,
      added: toUpdate.filter((e) => !cachedIds.has(e.id)).map((e) => e.id),
      errors: [],
      durationMs: Math.round(performance.now() - start)
    };
    _CacheValidator.isFirstLoad = false;
    _optionalChain([onProgress, 'optionalCall', _51 => _51(100, "Validaci\xF3n completa")]);
    _optionalChain([onComplete, 'optionalCall', _52 => _52(report)]);
    return report;
  }
  static reset() {
    _CacheValidator.isFirstLoad = true;
  }
}, _class6.__initStatic9(), _class6);

// src/context/CacheContext.tsx

var CacheContext = _react.createContext.call(void 0, null);
var CacheProvider = ({ children }) => {
  const [status, setStatus] = _react.useState.call(void 0, "idle");
  const [progress, setProgress] = _react.useState.call(void 0, 0);
  const [report, setReport] = _react.useState.call(void 0, null);
  const validate = async (manifest) => {
    setStatus("validating");
    setProgress(0);
    const result = await CacheValidator.validate({
      manifest,
      onProgress: (p, msg) => {
        setProgress(Math.round(p));
        console.info(`[Cache] ${msg} (${p}%)`);
      },
      onComplete: (r) => {
        setReport(r);
        setStatus(r.errors.length > 0 ? "error" : "ready");
      }
    });
    return result;
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, CacheContext.Provider, { value: { status, progress, report, validate }, children });
};
var useCache = () => {
  const context = _react.useContext.call(void 0, CacheContext);
  if (!context) {
    throw new Error("useCache debe usarse dentro de <CacheProvider>");
  }
  return context;
};

// src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = (_class7 = class {
  constructor(distanceThreshold = 0.6, pushBackOffset = 0.1) {;_class7.prototype.__init10.call(this);_class7.prototype.__init11.call(this);
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
  }
  __init10() {this.name = "AdvancedCameraCollisionPlugin"}
  __init11() {this.handle = null}
  install({ camera, orchestrator }) {
    if (!camera) {
      return;
    }
    const check = () => {
      const model = orchestrator.getActiveModel();
      if (!model) {
        this.handle = requestAnimationFrame(check);
        return;
      }
      const dir = new _chunkEA3XQ4KJcjs.THREE.Vector3();
      camera.getWorldDirection(dir);
      const ray = new _chunkEA3XQ4KJcjs.THREE.Raycaster(
        camera.position,
        dir,
        0,
        this.distanceThreshold + this.pushBackOffset
      );
      const hits = ray.intersectObject(model, true);
      if (hits.length > 0) {
        const hitDistance = hits[0].distance;
        const desiredDistance = this.distanceThreshold;
        if (hitDistance < desiredDistance) {
          const pushBack = desiredDistance - hitDistance + this.pushBackOffset;
          camera.position.sub(dir.multiplyScalar(pushBack));
        }
      }
      this.handle = requestAnimationFrame(check);
    };
    check();
  }
  dispose() {
    if (this.handle !== null) {
      cancelAnimationFrame(this.handle);
      this.handle = null;
    }
  }
}, _class7);

// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var AdvancedOrbitControlsPlugin = (_class8 = class {
  constructor(options = {}) {;_class8.prototype.__init12.call(this);_class8.prototype.__init13.call(this);
    this.options = options;
    Object.assign(this.config, options);
  }
  __init12() {this.name = "AdvancedOrbitControls"}
  
  __init13() {this.config = {
    enableDamping: true,
    dampingFactor: 0.05,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    minDistance: 0.1,
    maxDistance: 1e3,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI
  }}
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    Object.assign(this.controls, this.config);
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  /* === API PÚBLICA === */
  setPanEnabled(enabled) {
    this.controls.enablePan = enabled;
  }
  setRotateEnabled(enabled) {
    this.controls.enableRotate = enabled;
  }
  setZoomEnabled(enabled) {
    this.controls.enableZoom = enabled;
  }
  setAllEnabled(enabled) {
    this.controls.enablePan = enabled;
    this.controls.enableRotate = enabled;
    this.controls.enableZoom = enabled;
  }
  dispose() {
    _optionalChain([this, 'access', _53 => _53.controls, 'optionalAccess', _54 => _54.dispose, 'call', _55 => _55()]);
  }
}, _class8);

// src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts
var RaycasterManager = (_class9 = class extends _chunkEA3XQ4KJcjs.THREE.EventDispatcher {
  __init14() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init15() {this.pointer = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  
  
  
  __init16() {this.interactableObjects = []}
  __init17() {this.lastHoverObject = null}
  __init18() {this.isEnabled = false}
  __init19() {this.isDragging = false}
  __init20() {this.currentDragObject = null}
  __init21() {this.dragStartPosition = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  __init22() {this.lastRaycastTime = 0}
  __init23() {this.raycastThrottleMs = 16}
  constructor(domElement) {
    super();_class9.prototype.__init14.call(this);_class9.prototype.__init15.call(this);_class9.prototype.__init16.call(this);_class9.prototype.__init17.call(this);_class9.prototype.__init18.call(this);_class9.prototype.__init19.call(this);_class9.prototype.__init20.call(this);_class9.prototype.__init21.call(this);_class9.prototype.__init22.call(this);_class9.prototype.__init23.call(this);_class9.prototype.__init24.call(this);_class9.prototype.__init25.call(this);_class9.prototype.__init26.call(this);_class9.prototype.__init27.call(this);;
    this.domElement = domElement;
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }
  setModel(model) {
    this.interactableObjects = [];
    model.traverse((obj) => {
      if (this.isInteractable(obj)) {
        this.interactableObjects.push(obj);
      }
    });
  }
  isInteractable(obj) {
    if (!obj.visible) {
      return false;
    }
    if (obj.userData.isNotRaycaster) {
      return false;
    }
    if (!obj.isMesh) {
      return false;
    }
    return true;
  }
  initialize(scene, camera) {
    this.scene = scene;
    this.camera = camera;
  }
  setEnabled(enabled) {
    if (this.isEnabled === enabled) {
      return;
    }
    this.isEnabled = enabled;
    enabled ? this.attachEvents() : this.detachEvents();
  }
  attachEvents() {
    const el = this.domElement;
    el.addEventListener("pointermove", this.onPointerMove, { passive: true });
    el.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    el.addEventListener("pointerup", this.onPointerUp, { passive: true });
    el.addEventListener("click", this.onClick, { passive: true });
    el.addEventListener("contextmenu", this.onContextMenu);
    el.style.cursor = "pointer";
  }
  detachEvents() {
    const el = this.domElement;
    el.removeEventListener("pointermove", this.onPointerMove);
    el.removeEventListener("pointerdown", this.onPointerDown);
    el.removeEventListener("pointerup", this.onPointerUp);
    el.removeEventListener("click", this.onClick);
    el.removeEventListener("contextmenu", this.onContextMenu);
    el.style.cursor = "default";
    this.clearHoverState();
  }
  onPointerMove(e) {
    if (!this.isEnabled || !this.scene || !this.camera) {
      return;
    }
    this.updatePointer(e);
    this.isDragging && this.currentDragObject ? this.handleDrag(e) : this.throttledRaycast();
  }
  onPointerDown(e) {
    if (!this.isEnabled || e.button !== 0) {
      return;
    }
    this.updatePointer(e);
    const hit = this.performRaycast()[0];
    if (hit) {
      this.isDragging = true;
      this.currentDragObject = hit.object;
      this.dragStartPosition.set(e.clientX, e.clientY);
      this.dispatchEvent({ type: "objectdragstart", object: hit.object, startPosition: this.dragStartPosition.clone() });
    }
  }
  onPointerUp(e) {
    if (!this.isEnabled || !this.isDragging) {
      return;
    }
    const endPos = new _chunkEA3XQ4KJcjs.THREE.Vector2(e.clientX, e.clientY);
    this.dispatchEvent({
      type: "objectdragend",
      object: this.currentDragObject,
      startPosition: this.dragStartPosition.clone(),
      endPosition: endPos,
      totalDelta: endPos.clone().sub(this.dragStartPosition)
    });
    this.isDragging = false;
    this.currentDragObject = null;
  }
  onClick(e) {
    if (!this.isEnabled || this.isDragging) {
      return;
    }
    this.updatePointer(e);
    const hit = this.performRaycast()[0];
    if (hit) {
      this.dispatchEvent({ type: "objectclick", object: hit.object, point: hit.point, distance: hit.distance });
    }
  }
  handleDrag(e) {
    const current = new _chunkEA3XQ4KJcjs.THREE.Vector2(e.clientX, e.clientY);
    const delta = current.clone().sub(this.dragStartPosition);
    this.dispatchEvent({
      type: "objectdrag",
      object: this.currentDragObject,
      delta,
      normalizedDelta: new _chunkEA3XQ4KJcjs.THREE.Vector2(delta.x / this.domElement.clientWidth, delta.y / this.domElement.clientHeight)
    });
    this.dragStartPosition.copy(current);
  }
  throttledRaycast() {
    const now = Date.now();
    if (now - this.lastRaycastTime < this.raycastThrottleMs) {
      return;
    }
    this.lastRaycastTime = now;
    this.raycast();
  }
  raycast() {
    if (!this.scene || !this.camera) {
      return;
    }
    const hits = this.performRaycast();
    const hit = _optionalChain([hits, 'optionalAccess', _56 => _56[0]]) || null;
    if (hit) {
      const current = hit.object || null;
      if (current !== this.lastHoverObject) {
        if (this.lastHoverObject) {
          this.dispatchEvent({ type: "objecthoverout", object: this.lastHoverObject });
        }
        if (current) {
          this.dispatchEvent({ type: "objecthoverin", object: current, point: hit.point, distance: hit.distance });
        }
        this.lastHoverObject = current;
      }
      if (current) {
        this.dispatchEvent({ type: "objecthovermove", object: current, point: hit.point, distance: hit.distance });
      }
    }
  }
  performRaycast() {
    if (!this.scene || !this.camera) {
      return [];
    }
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactableObjects, true);
    return intersects.filter((i) => !i.object.name.endsWith("-wireframe")).slice(0, 1).map((i) => ({ object: i.object, point: i.point, distance: i.distance }));
  }
  updatePointer(e) {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  clearHoverState() {
    if (this.lastHoverObject) {
      this.dispatchEvent({ type: "objecthoverout", object: this.lastHoverObject });
      this.lastHoverObject = null;
    }
  }
  __init24() {this.onContextMenu = (e) => e.preventDefault()}
  __init25() {this.onTouchStart = this.onPointerDown}
  __init26() {this.onTouchMove = this.onPointerMove}
  __init27() {this.onTouchEnd = this.onPointerUp}
}, _class9);
var AdvancedRaycasterPlugin = (_class10 = class {
  constructor(model, onEvent) {;_class10.prototype.__init28.call(this);
    this.model = model;
    this.onEvent = onEvent;
    this._manager = new RaycasterManager(document.body);
  }
  __init28() {this.name = "AdvancedRaycaster"}
  
  install({ scene, camera, renderer, orchestrator }) {
    this._manager = new RaycasterManager(renderer.domElement);
    this._manager.initialize(scene, camera);
    if (this.model) {
      this._manager.setModel(this.model);
    } else if (orchestrator.getActiveModel()) {
      this._manager.setModel(orchestrator.getActiveModel());
    }
    const events = [
      "objectclick",
      "objecthoverin",
      "objecthoverout",
      "objecthovermove",
      "objectdragstart",
      "objectdrag",
      "objectdragend"
    ];
    events.forEach((event) => {
      this._manager.addEventListener(event, (e) => _optionalChain([this, 'access', _57 => _57.onEvent, 'optionalCall', _58 => _58(e)]));
    });
    this._manager.setEnabled(true);
  }
  dispose() {
    this._manager.setEnabled(false);
  }
  get manager() {
    return this._manager;
  }
}, _class10);

// src/core/orchestrator/plugins/AnnotationsPlugin.ts
var AnnotationsPlugin = (_class11 = class {
  constructor(data) {;_class11.prototype.__init29.call(this);_class11.prototype.__init30.call(this);
    this.data = data;
  }
  __init29() {this.name = "Annotations"}
  __init30() {this.annotations = /* @__PURE__ */ new Map()}
  
  
  install({ camera, scene }) {
    this.camera = camera;
    this.scene = scene;
    this.data.forEach((ann) => {
      const label = this.createLabel(ann.content, ann.offset || new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 1, 0));
      label.position.copy(ann.position);
      label.userData.annotationId = ann.id;
      label.visible = _nullishCoalesce(ann.visible, () => ( true));
      if (ann.target) {
        label.userData.followTarget = ann.target;
      }
      this.annotations.set(ann.id, label);
      this.scene.add(label);
    });
    const update = () => {
      this.annotations.forEach((label) => {
        if (label.userData.followTarget) {
          label.userData.followTarget.getWorldPosition(label.position);
          label.position.add(label.userData.offset || new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 1, 0));
        }
        label.lookAt(this.camera.position);
      });
      requestAnimationFrame(update);
    };
    update();
  }
  createLabel(content, offset) {
    const div = document.createElement("div");
    div.className = "annotation-label";
    div.style.cssText = `
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      pointer-events: none;
      white-space: nowrap;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255,255,255,0.2);
    `;
    if (typeof content === "string") {
      div.innerHTML = content;
    } else {
      div.appendChild(content);
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const texture = new _chunkEA3XQ4KJcjs.THREE.CanvasTexture(canvas);
    texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
    texture.wrapS = _chunkEA3XQ4KJcjs.THREE.ClampToEdgeWrapping;
    texture.wrapT = _chunkEA3XQ4KJcjs.THREE.ClampToEdgeWrapping;
    const spriteMaterial = new _chunkEA3XQ4KJcjs.THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new _chunkEA3XQ4KJcjs.THREE.Sprite(spriteMaterial);
    sprite.userData.offset = offset;
    sprite.userData.canvas = canvas;
    sprite.userData.div = div;
    const resize = () => {
      const width = div.offsetWidth;
      const height = div.offsetHeight;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(2, 2);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(div);
    resize();
    return sprite;
  }
  dispose() {
    this.annotations.forEach((sprite) => {
      if (sprite.parent) {
        sprite.parent.remove(sprite);
      }
      if (sprite instanceof _chunkEA3XQ4KJcjs.THREE.Sprite) {
        _optionalChain([sprite, 'access', _59 => _59.material, 'access', _60 => _60.map, 'optionalAccess', _61 => _61.dispose, 'call', _62 => _62()]);
        sprite.material.dispose();
      }
    });
    this.annotations.clear();
  }
}, _class11);

// src/core/orchestrator/plugins/AutoLODSystemPlugin.ts
var _SimplifyModifierjs = require('three/examples/jsm/modifiers/SimplifyModifier.js');
var AutoLODSystemPlugin = (_class12 = class {
  constructor(config) {;_class12.prototype.__init31.call(this);_class12.prototype.__init32.call(this);
    this.config = config;
    this.config.reductionPercentages = this.config.reductionPercentages || [0.5, 0.2];
  }
  __init31() {this.name = "AutoLODSystem"}
  __init32() {this.lods = /* @__PURE__ */ new Map()}
  
  simplifyGeometry(geometry, percentage) {
    const modifier = new (0, _SimplifyModifierjs.SimplifyModifier)();
    const count = Math.floor(geometry.attributes.position.count * percentage);
    return modifier.modify(geometry, count);
  }
  createLODLevels(model) {
    const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
    const high = model.clone();
    high.visible = true;
    lod.addLevel(high, 0);
    const medium = model.clone();
    medium.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages[0]);
      }
    });
    lod.addLevel(medium, this.config.distances[0]);
    const low = model.clone();
    low.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages[1]);
      }
    });
    lod.addLevel(low, this.config.distances[1]);
    const empty = new _chunkEA3XQ4KJcjs.THREE.Object3D();
    empty.visible = false;
    lod.addLevel(empty, this.config.distances[2]);
    return lod;
  }
  install({ camera, orchestrator }) {
    this.camera = camera;
    const applyLODToModel = (model) => {
      const lod = this.createLODLevels(model);
      if (model.parent) {
        model.parent.add(lod);
        model.parent.remove(model);
      }
      lod.position.copy(model.position);
      lod.quaternion.copy(model.quaternion);
      lod.scale.copy(model.scale);
      this.lods.set(model, lod);
    };
    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {
      applyLODToModel(activeModel);
    }
    const originalSetModel = orchestrator.setModel;
    if (originalSetModel) {
      orchestrator.setModel = (...args) => {
        return originalSetModel.apply(orchestrator, args).then((model) => {
          this.lods.forEach((lod) => _optionalChain([lod, 'access', _63 => _63.parent, 'optionalAccess', _64 => _64.remove, 'call', _65 => _65(lod)]));
          this.lods.clear();
          applyLODToModel(model);
          return model;
        });
      };
    }
    const update = () => {
      this.lods.forEach((lod) => lod.update(this.camera));
      requestAnimationFrame(update);
    };
    update();
  }
  dispose() {
    this.lods.forEach((lod) => {
      if (lod.parent) {
        lod.parent.remove(lod);
      }
      lod.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _66 => _66.geometry, 'optionalAccess', _67 => _67.dispose, 'call', _68 => _68()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _69 => _69.material, 'optionalAccess', _70 => _70.dispose, 'call', _71 => _71()]);
          }
        }
      });
    });
    this.lods.clear();
  }
}, _class12);

// src/core/orchestrator/plugins/HotspotPlugin.ts
var HotspotPlugin = (_class13 = class {
  constructor(data) {;_class13.prototype.__init33.call(this);_class13.prototype.__init34.call(this);
    this.data = data;
  }
  __init33() {this.name = "Hotspot"}
  __init34() {this.hotspots = /* @__PURE__ */ new Map()}
  install({ scene }) {
    this.data.forEach((hotspot) => {
      const geometry = new _chunkEA3XQ4KJcjs.THREE.SphereGeometry(0.3, 16, 16);
      const material = new _chunkEA3XQ4KJcjs.THREE.MeshBasicMaterial({
        color: 65280,
        transparent: true,
        opacity: 0.5
      });
      const mesh = new _chunkEA3XQ4KJcjs.THREE.Mesh(geometry, material);
      mesh.position.copy(hotspot.position);
      if (hotspot.target) {
        mesh.userData.target = hotspot.target;
      }
      mesh.userData.hotspotId = hotspot.id;
      mesh.userData.onClick = hotspot.onClick;
      scene.add(mesh);
      this.hotspots.set(hotspot.id, mesh);
    });
  }
  dispose() {
    this.hotspots.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.remove(mesh);
      }
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => mat.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.hotspots.clear();
  }
}, _class13);

// src/core/orchestrator/plugins/LODSystemPlugin.ts
var LODSystemPlugin = (_class14 = class {
  constructor(config) {;_class14.prototype.__init35.call(this);_class14.prototype.__init36.call(this);
    this.config = config;
  }
  __init35() {this.name = "LODSystem"}
  __init36() {this.lodObjects = /* @__PURE__ */ new Map()}
  
  install({ camera, orchestrator }) {
    this.camera = camera;
    const processModel = (model) => {
      const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
      this.config.forEach((cfg, index) => {
        const clone = _optionalChain([cfg, 'access', _72 => _72.levels, 'access', _73 => _73[index], 'optionalAccess', _74 => _74.model, 'access', _75 => _75.clone, 'call', _76 => _76()]) || model.clone();
        clone.visible = false;
        lod.addLevel(clone, _optionalChain([cfg, 'access', _77 => _77.levels, 'access', _78 => _78[index], 'optionalAccess', _79 => _79.distance]) || 0);
      });
      if (model.parent) {
        model.parent.add(lod);
        model.parent.remove(model);
      }
      lod.position.copy(model.position);
      lod.quaternion.copy(model.quaternion);
      lod.scale.copy(model.scale);
      this.lodObjects.set(model, lod);
      lod.originalModel = model;
    };
    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {
      processModel(activeModel);
    }
    const originalSetModel = orchestrator.setModel;
    if (originalSetModel) {
      orchestrator.setModel = (entry, options) => {
        originalSetModel.call(orchestrator, entry, options).then((model) => {
          this.lodObjects.forEach((lod) => {
            if (lod.parent) {
              lod.parent.remove(lod);
            }
          });
          this.lodObjects.clear();
          processModel(model);
        });
      };
    }
    const update = () => {
      this.lodObjects.forEach((lod) => {
        lod.update(this.camera);
      });
      requestAnimationFrame(update);
    };
    update();
  }
  dispose() {
    this.lodObjects.forEach((lod) => {
      if (lod.parent) {
        lod.parent.remove(lod);
      }
      lod.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _80 => _80.geometry, 'optionalAccess', _81 => _81.dispose, 'call', _82 => _82()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _83 => _83.material, 'optionalAccess', _84 => _84.dispose, 'call', _85 => _85()]);
          }
        }
      });
    });
    this.lodObjects.clear();
  }
}, _class14);

// src/core/orchestrator/plugins/MeasurementToolPlugin.ts
var MeasurementToolPlugin = (_class15 = class {
  __init37() {this.name = "MeasurementTool"}
  __init38() {this.points = []}
  
  __init39() {this.spheres = []}
  
  constructor(onMeasure) {;_class15.prototype.__init37.call(this);_class15.prototype.__init38.call(this);_class15.prototype.__init39.call(this);
    this.onMeasure = _nullishCoalesce(onMeasure, () => ( (() => {
    })));
  }
  install({ scene, camera, renderer, orchestrator }) {
    const handlePointerDown = (e) => {
      if (e.button !== 0) {
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
      raycaster.setFromCamera(new _chunkEA3XQ4KJcjs.THREE.Vector2(x, y), camera);
      const model = orchestrator.getActiveModel();
      if (!model) {
        return;
      }
      const intersects = raycaster.intersectObject(model, true);
      if (intersects.length === 0) {
        return;
      }
      const point = intersects[0].point.clone();
      this.points.push(point);
      const sphere = new _chunkEA3XQ4KJcjs.THREE.Mesh(
        new _chunkEA3XQ4KJcjs.THREE.SphereGeometry(0.05),
        new _chunkEA3XQ4KJcjs.THREE.MeshBasicMaterial({ color: 65280 })
      );
      sphere.position.copy(point);
      scene.add(sphere);
      this.spheres.push(sphere);
      _optionalChain([this, 'access', _86 => _86.onMeasure, 'optionalCall', _87 => _87({ point, points: [...this.points] })]);
      if (this.points.length === 2) {
        const distance = this.points[0].distanceTo(this.points[1]);
        _optionalChain([this, 'access', _88 => _88.onMeasure, 'optionalCall', _89 => _89({ point, distance, points: [...this.points] })]);
        const geometry = new _chunkEA3XQ4KJcjs.THREE.BufferGeometry().setFromPoints(this.points);
        const material = new _chunkEA3XQ4KJcjs.THREE.LineBasicMaterial({ color: 65280 });
        this.line = new _chunkEA3XQ4KJcjs.THREE.Line(geometry, material);
        scene.add(this.line);
        setTimeout(() => this.reset(), 3e3);
      }
    };
    renderer.domElement.addEventListener("pointerdown", handlePointerDown, { capture: true });
    this.dispose = () => {
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      this.reset();
    };
  }
  reset() {
    this.points = [];
    if (this.line) {
      _optionalChain([this, 'access', _90 => _90.line, 'access', _91 => _91.parent, 'optionalAccess', _92 => _92.remove, 'call', _93 => _93(this.line)]);
      this.line.geometry.dispose();
      if (Array.isArray(this.line.material)) {
        this.line.material.forEach((mat) => mat.dispose());
      } else {
        this.line.material.dispose();
      }
      this.line = void 0;
    }
    this.spheres.forEach((s) => {
      _optionalChain([s, 'access', _94 => _94.parent, 'optionalAccess', _95 => _95.remove, 'call', _96 => _96(s)]);
      s.geometry.dispose();
      if (Array.isArray(s.material)) {
        s.material.forEach((mat) => mat.dispose());
      } else {
        s.material.dispose();
      }
    });
    this.spheres = [];
  }
  dispose() {
    this.reset();
  }
}, _class15);

// src/core/orchestrator/plugins/OrbitControlsPlugin.ts

var OrbitControlsPlugin = (_class16 = class {constructor() { _class16.prototype.__init40.call(this); }
  __init40() {this.name = "OrbitControls"}
  
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.8;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  dispose() {
    _optionalChain([this, 'access', _97 => _97.controls, 'optionalAccess', _98 => _98.dispose, 'call', _99 => _99()]);
  }
}, _class16);

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = (_class17 = class {
  __init41() {this.name = "Raycaster"}
  __init42() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init43() {this.pointer = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  __init44() {this.hovered = null}
  
  constructor(onEvent) {;_class17.prototype.__init41.call(this);_class17.prototype.__init42.call(this);_class17.prototype.__init43.call(this);_class17.prototype.__init44.call(this);
    this.onEvent = _nullishCoalesce(onEvent, () => ( (() => {
    })));
  }
  install({ scene, camera, renderer }) {
    const dom = renderer.domElement;
    const onPointerMove = (e) => {
      this.pointer.x = e.clientX / dom.clientWidth * 2 - 1;
      this.pointer.y = -(e.clientY / dom.clientHeight) * 2 + 1;
      this.checkIntersection(scene, camera);
    };
    const onClick = (e) => {
      this.pointer.x = e.clientX / dom.clientWidth * 2 - 1;
      this.pointer.y = -(e.clientY / dom.clientHeight) * 2 + 1;
      const intersect = this.getIntersection(scene, camera);
      if (intersect) {
        _optionalChain([this, 'access', _100 => _100.onEvent, 'optionalCall', _101 => _101({ type: "click", object: intersect.object, point: intersect.point })]);
      }
    };
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("click", onClick);
    this.dispose = () => {
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("click", onClick);
      this.hovered = null;
    };
  }
  checkIntersection(scene, camera) {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    const hit = intersects[0];
    if (hit && hit.object !== this.hovered) {
      if (this.hovered) {
        _optionalChain([this, 'access', _102 => _102.onEvent, 'optionalCall', _103 => _103({ type: "leave", object: this.hovered })]);
      }
      this.hovered = hit.object;
      _optionalChain([this, 'access', _104 => _104.onEvent, 'optionalCall', _105 => _105({ type: "hover", object: hit.object, point: hit.point })]);
    } else if (!hit && this.hovered) {
      _optionalChain([this, 'access', _106 => _106.onEvent, 'optionalCall', _107 => _107({ type: "leave", object: this.hovered })]);
      this.hovered = null;
    }
  }
  getIntersection(scene, camera) {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    return intersects[0] || null;
  }
  dispose() {
  }
}, _class17);

// src/core/orchestrator/plugins/PostProcessingPlugin.ts
var _EffectComposerjs = require('three/examples/jsm/postprocessing/EffectComposer.js');
var _RenderPassjs = require('three/examples/jsm/postprocessing/RenderPass.js');
var _UnrealBloomPassjs = require('three/examples/jsm/postprocessing/UnrealBloomPass.js');
var PostProcessingPlugin = (_class18 = class {
  constructor(options = { strength: 1.5, radius: 0.4, threshold: 0 }) {;_class18.prototype.__init45.call(this);
    this.options = options;
  }
  __init45() {this.name = "PostProcessing"}
  
  
  install({ scene, camera, renderer }) {
    this.composer = new (0, _EffectComposerjs.EffectComposer)(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    const renderPass = new (0, _RenderPassjs.RenderPass)(scene, camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new (0, _UnrealBloomPassjs.UnrealBloomPass)(
      new _chunkEA3XQ4KJcjs.THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.options.strength,
      this.options.radius,
      this.options.threshold
    );
    this.composer.addPass(this.bloomPass);
    const originalRender = renderer.render.bind(renderer);
    renderer.render = () => {
      this.composer.render();
    };
    const onResize = () => {
      this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
      this.bloomPass.resolution.set(renderer.domElement.width, renderer.domElement.height);
    };
    window.addEventListener("resize", onResize);
    this.dispose = () => {
      window.removeEventListener("resize", onResize);
      renderer.render = originalRender;
      this.composer.dispose();
    };
  }
  setBloom(strength) {
    if (this.bloomPass) {
      this.bloomPass.strength = strength;
    }
  }
  dispose() {
  }
}, _class18);

// src/hooks/useScene.ts
var useScene2 = () => {
  return useScene();
};

// src/hooks/useModel.ts

var useModel = (entry, options = {}) => {
  const { draco = false, autoLoad = true } = options;
  const orchestrator = useScene2();
  const [model, setModel] = _react.useState.call(void 0, null);
  const [loading, setLoading] = _react.useState.call(void 0, false);
  const [error, setError] = _react.useState.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    if (!entry || !autoLoad) {
      return;
    }
    setLoading(true);
    setError(null);
    orchestrator.setModel(entry, { draco }).then((m) => {
      setModel(m);
      setLoading(false);
    }).catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, [_optionalChain([entry, 'optionalAccess', _108 => _108.id]), draco]);
  const load = () => entry && orchestrator.setModel(entry, { draco });
  return { model, loading, error, load };
};

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene2();
  return orchestrator.getActiveModel();
};

// src/hooks/useHDRI.ts

var useHDRI = (entry) => {
  const orchestrator = useScene2();
  const [hdri, setHDRI] = _react.useState.call(void 0, null);
  const [loading, setLoading] = _react.useState.call(void 0, false);
  _react.useEffect.call(void 0, () => {
    if (!entry) {
      return;
    }
    setLoading(true);
    orchestrator.setHDRI(entry).then((tex) => {
      setHDRI(tex);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [_optionalChain([entry, 'optionalAccess', _109 => _109.id])]);
  const clear = () => orchestrator.clearHDRI();
  return { hdri, loading, clear };
};

// src/hooks/useRaycaster.ts

var useRaycaster = (onEvent) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const plugin = new RaycasterPlugin(onEvent);
    orchestrator.use(plugin);
    return () => {
    };
  }, [onEvent]);
};

// src/hooks/useCache.ts
var useCache2 = () => {
  return useCache();
};

// src/hooks/useAnimation.ts

var useAnimation = (clipName, play = true) => {
  const model = useActiveModel();
  _react.useEffect.call(void 0, () => {
    if (!model || !model.animations) {
      return;
    }
    const clip = model.animations.find((a) => a.name === clipName);
    if (!clip) {
      return;
    }
    const mixer = new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    if (play) {
      action.play();
    }
    const clock = new _chunkEA3XQ4KJcjs.THREE.Clock();
    const animate = () => {
      mixer.update(clock.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      action.stop();
    };
  }, [model, clipName, play]);
};

// src/react/components/AdvancedCameraCollision.tsx

var AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    if (!enabled) {
      return;
    }
    const plugin = new AdvancedCameraCollisionPlugin(
      distanceThreshold,
      pushBackOffset
    );
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [enabled, distanceThreshold, pushBackOffset]);
  return null;
};

// src/react/components/AdvancedDragRaycaster.tsx


var tempVector1 = new _chunkEA3XQ4KJcjs.THREE.Vector3();
var tempVector2 = new _chunkEA3XQ4KJcjs.THREE.Vector3();
var tempVector3 = new _chunkEA3XQ4KJcjs.THREE.Vector3();
var tempVector2_1 = new _chunkEA3XQ4KJcjs.THREE.Vector2();
var tempVector2_2 = new _chunkEA3XQ4KJcjs.THREE.Vector2();
var tempPlane = new _chunkEA3XQ4KJcjs.THREE.Plane();
var tempQuaternion = new _chunkEA3XQ4KJcjs.THREE.Quaternion();
var tempRaycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
var AdvancedDragRaycaster = ({
  children,
  defaultEnabled = true,
  enableRotationCompensation = true,
  transitionDuration = 0,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const orchestrator = useScene2();
  const activeModel = orchestrator.getActiveModel();
  const camera = orchestrator.camera;
  const [isEnabled, setIsEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [isResetting, setIsResetting] = _react.useState.call(void 0, false);
  const [plugin, setPlugin] = _react.useState.call(void 0, null);
  const originalStates = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  _react.useEffect.call(void 0, () => {
    if (!activeModel || !camera) {
      return;
    }
    const newPlugin = new AdvancedRaycasterPlugin(activeModel, (event) => {
      if (!isEnabled) {
        return;
      }
      let isDragging = false;
      let startPosition = new _chunkEA3XQ4KJcjs.THREE.Vector2();
      let currentObject = null;
      switch (event.type) {
        case "objectdragstart":
          isDragging = true;
          currentObject = event.object;
          startPosition.copy(event.startPosition);
          if (currentObject && !originalStates.current.has(currentObject)) {
            originalStates.current.set(currentObject, {
              position: currentObject.position.clone(),
              quaternion: currentObject.quaternion.clone()
            });
          }
          _optionalChain([onDragStart, 'optionalCall', _110 => _110(event.object)]);
          break;
        case "objectdrag":
          if (isDragging && currentObject) {
            currentObject.getWorldPosition(tempVector1);
            camera.getWorldDirection(tempVector2);
            tempPlane.setFromNormalAndCoplanarPoint(tempVector2, tempVector1);
            tempVector2_1.set(
              event.currentPosition.x / window.innerWidth * 2 - 1,
              -(event.currentPosition.y / window.innerHeight) * 2 + 1
            );
            tempVector2_2.set(
              startPosition.x / window.innerWidth * 2 - 1,
              -(startPosition.y / window.innerHeight) * 2 + 1
            );
            tempRaycaster.setFromCamera(tempVector2_1, camera);
            tempRaycaster.ray.intersectPlane(tempPlane, tempVector1);
            tempRaycaster.setFromCamera(tempVector2_2, camera);
            tempRaycaster.ray.intersectPlane(tempPlane, tempVector2);
            if (tempVector1 && tempVector2) {
              tempVector3.subVectors(tempVector1, tempVector2);
              if (enableRotationCompensation && activeModel) {
                activeModel.getWorldQuaternion(tempQuaternion);
                tempQuaternion.invert();
                tempVector3.applyQuaternion(tempQuaternion);
              }
              currentObject.position.add(tempVector3);
              _optionalChain([onDrag, 'optionalCall', _111 => _111(currentObject, tempVector3.clone())]);
            }
            startPosition.copy(event.currentPosition);
          }
          break;
        case "objectdragend":
          if (isDragging) {
            _optionalChain([onDragEnd, 'optionalCall', _112 => _112(event.object)]);
          }
          break;
      }
    });
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    return () => {
      newPlugin.dispose();
    };
  }, [
    activeModel,
    camera,
    onDragStart,
    onDrag,
    onDragEnd,
    enableRotationCompensation
  ]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _113 => _113.manager, 'access', _114 => _114.setEnabled, 'call', _115 => _115(isEnabled)]);
  }, [plugin, isEnabled]);
  const toggleEnabled = () => setIsEnabled((prev) => !prev);
  const setEnabled = (value) => setIsEnabled(value);
  const resetAll = () => {
    if (isResetting) {
      return;
    }
    setIsResetting(true);
    const duration = transitionDuration;
    if (duration <= 0) {
      originalStates.current.forEach((state, obj) => {
        obj.position.copy(state.position);
        obj.quaternion.copy(state.quaternion);
      });
      setIsResetting(false);
      return;
    }
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      originalStates.current.forEach((state, obj) => {
        obj.position.lerp(state.position, t);
        obj.quaternion.slerp(state.quaternion, t);
      });
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsResetting(false);
      }
    };
    requestAnimationFrame(animate);
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children({
    isEnabled,
    toggleEnabled,
    setEnabled,
    resetAll,
    isResetting
  }) });
};

// src/react/components/AdvancedOrbitControls.tsx


var AdvancedOrbitControls = ({
  children,
  defaultEnabled = true,
  ...config
}) => {
  const orchestrator = useScene2();
  const [panEnabled, setPanEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [rotateEnabled, setRotateEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [zoomEnabled, setZoomEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [plugin, setPlugin] = _react.useState.call(void 0, 
    null
  );
  _react.useEffect.call(void 0, () => {
    const newPlugin = new AdvancedOrbitControlsPlugin(config);
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    newPlugin.setAllEnabled(defaultEnabled);
    return () => {
      newPlugin.dispose();
    };
  }, []);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _116 => _116.setPanEnabled, 'call', _117 => _117(panEnabled)]);
  }, [plugin, panEnabled]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _118 => _118.setRotateEnabled, 'call', _119 => _119(rotateEnabled)]);
  }, [plugin, rotateEnabled]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _120 => _120.setZoomEnabled, 'call', _121 => _121(zoomEnabled)]);
  }, [plugin, zoomEnabled]);
  const setAllEnabled = (value) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };
  const togglePan = () => setPanEnabled((prev) => !prev);
  const toggleRotate = () => setRotateEnabled((prev) => !prev);
  const toggleZoom = () => setZoomEnabled((prev) => !prev);
  const toggleAll = () => setAllEnabled(!(rotateEnabled && panEnabled && zoomEnabled));
  const state = {
    panEnabled,
    rotateEnabled,
    zoomEnabled,
    isActive: panEnabled || rotateEnabled || zoomEnabled,
    setPanEnabled,
    setRotateEnabled,
    setZoomEnabled,
    setAllEnabled,
    togglePan,
    toggleRotate,
    toggleZoom,
    toggleAll
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children(state) });
};

// src/react/components/AdvancedRaycaster.tsx

var AdvancedRaycaster = ({
  model: customModel,
  onClick,
  onHoverIn,
  onHoverOut,
  onHoverMove,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const orchestrator = useScene2();
  const activeModel = useActiveModel();
  _react.useEffect.call(void 0, () => {
    const plugin = new AdvancedRaycasterPlugin(
      customModel || activeModel || void 0,
      (e) => {
        switch (e.type) {
          case "objectclick":
            _optionalChain([onClick, 'optionalCall', _122 => _122(e)]);
            break;
          case "objecthoverin":
            _optionalChain([onHoverIn, 'optionalCall', _123 => _123(e)]);
            break;
          case "objecthoverout":
            _optionalChain([onHoverOut, 'optionalCall', _124 => _124(e)]);
            break;
          case "objecthovermove":
            _optionalChain([onHoverMove, 'optionalCall', _125 => _125(e)]);
            break;
          case "objectdragstart":
            _optionalChain([onDragStart, 'optionalCall', _126 => _126(e)]);
            break;
          case "objectdrag":
            _optionalChain([onDrag, 'optionalCall', _127 => _127(e)]);
            break;
          case "objectdragend":
            _optionalChain([onDragEnd, 'optionalCall', _128 => _128(e)]);
            break;
        }
      }
    );
    orchestrator.use(plugin);
  }, [
    customModel,
    activeModel,
    onClick,
    onHoverIn,
    onHoverOut,
    onHoverMove,
    onDragStart,
    onDrag,
    onDragEnd
  ]);
  return null;
};

// src/react/components/AmbientLight.tsx

var AmbientLight = ({
  intensity = 0.5,
  color = 16777215
}) => {
  const { scene } = useScene2();
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.AmbientLight(color, intensity);
    scene.add(light);
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color]);
  return null;
};

// src/react/components/AnimationTimeline.tsx

var AnimationTimeline = ({
  steps,
  loop = false,
  autoplay = true
}) => {
  const model = useActiveModel();
  const mixerRef = _react.useRef.call(void 0, null);
  const actionsRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  const clock = _react.useRef.call(void 0, new _chunkEA3XQ4KJcjs.THREE.Clock());
  _react.useEffect.call(void 0, () => {
    if (!model || !model.animations) {
      return;
    }
    const mixer = new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model);
    mixerRef.current = mixer;
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      actionsRef.current.set(clip.name, action);
    });
    if (autoplay) {
      playTimeline();
    }
    const animate = () => {
      mixer.update(clock.current.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      mixer.stopAllAction();
    };
  }, [model]);
  const playTimeline = () => {
    let time = 0;
    steps.forEach((step) => {
      const action = actionsRef.current.get(step.clipName);
      if (!action) {
        return;
      }
      setTimeout(() => {
        action.reset().play();
      }, time);
      time += (step.delay || 0) + (step.duration || action.getClip().duration * 1e3);
    });
    if (loop) {
      setTimeout(playTimeline, time);
    }
  };
  return null;
};

// src/react/components/Annotations.tsx

var Annotations = ({ annotations }) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const data = annotations.map((ann) => {
      const target = typeof ann.target === "string" ? orchestrator.scene.getObjectByName(ann.target) : ann.target;
      const content = typeof ann.content === "string" ? ann.content : _react2.default.isValidElement(ann.content) ? ann.content.props.children : String(ann.content);
      return {
        id: ann.id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.position),
        target,
        content,
        offset: ann.offset ? new _chunkEA3XQ4KJcjs.THREE.Vector3(...ann.offset) : void 0
      };
    });
    const plugin = new AnnotationsPlugin(data);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [annotations]);
  return null;
};

// src/react/components/ARButton.tsx

var _ARButtonjs = require('three/examples/jsm/webxr/ARButton.js');
var ARButton = () => {
  const { renderer } = useScene2();
  _react.useEffect.call(void 0, () => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = _ARButtonjs.ARButton.createButton(renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);
  return null;
};

// src/react/components/AutoLODSystem.tsx

var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const plugin = new AutoLODSystemPlugin({
      distances: [mediumDistance, lowDistance, hideDistance]
    });
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};

// src/react/components/Canvas.tsx


var Canvas = _react.forwardRef.call(void 0, 
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, SceneProvider, { ref, config, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref, ...canvasProps }),
      children
    ] });
  }
);
Canvas.displayName = "Canvas";

// src/react/components/DirectionalLight.tsx

var DirectionalLight = ({
  intensity = 1,
  color = 16777215,
  position = [5, 10, 7.5],
  castShadow = true,
  shadowMapSize = 2048
}) => {
  const { scene } = useScene2();
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    if (castShadow) {
      light.castShadow = true;
      light.shadow.mapSize.width = shadowMapSize;
      light.shadow.mapSize.height = shadowMapSize;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 50;
      light.shadow.camera.left = -20;
      light.shadow.camera.right = 20;
      light.shadow.camera.top = 20;
      light.shadow.camera.bottom = -20;
      light.shadow.bias = -1e-4;
    }
    scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.DirectionalLightHelper(light, 2);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
        helper.dispose();
      };
    }
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, position, castShadow, shadowMapSize]);
  return null;
};

// src/react/components/DistanceDisplay.tsx


var unitConversions = {
  m: 1,
  cm: 100,
  mm: 1e3,
  px: 3779.527559,
  // 1m ≈ 3779.53px (96 DPI)
  in: 39.3701,
  ft: 3.28084,
  km: 1e-3
};
var formatValue = (value, unit, decimals) => {
  const converted = value * unitConversions[unit];
  return `${converted.toFixed(decimals)}${unit}`;
};
var DistanceDisplay = ({
  children,
  className,
  unit = "m",
  decimals = 2
}) => {
  const orchestrator = useScene2();
  const animationRef = _react.useRef.call(void 0, 0);
  const [currentDistance, setCurrentDistance] = _react.useState.call(void 0, 0);
  const [initialDistance, setInitialDistance] = _react.useState.call(void 0, null);
  const getCurrentDistance = () => {
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }
    const modelCenter = new _chunkEA3XQ4KJcjs.THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };
  _react.useEffect.call(void 0, () => {
    const update = () => {
      const dist = getCurrentDistance();
      if (initialDistance === null && dist > 0) {
        setInitialDistance(dist);
      }
      setCurrentDistance(dist);
      animationRef.current = requestAnimationFrame(update);
    };
    animationRef.current = requestAnimationFrame(update);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [orchestrator, initialDistance]);
  if (initialDistance === null) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: "Calculating initial distance\u2026" });
  }
  const percentage = Math.max(
    0,
    Math.min(100, currentDistance / initialDistance * 100)
  );
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage,
    initialDistance,
    formattedInitial
  }) });
};

// src/react/components/EnvironmentPreset.tsx

var PRESETS = {
  studio: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/studio.exr",
  sunset: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/sunset.exr",
  dawn: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/dawn.exr",
  night: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/night.exr",
  warehouse: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/warehouse.exr",
  forest: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/forest.exr",
  apartment: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/apartment.exr",
  city: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/city.exr",
  park: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/park.exr",
  lobby: "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/assets/environment/lobby.exr"
};
var EnvironmentPreset = ({
  name,
  intensity = 1,
  blur = 0
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const url = PRESETS[name];
    if (!url) {
      console.warn(`EnvironmentPreset: "${name}" no encontrado`);
      return;
    }
    const loader = new (0, _chunkEA3XQ4KJcjs.EXRLoader)();
    loader.setDataType(_chunkEA3XQ4KJcjs.THREE.HalfFloatType);
    loader.load(url, (texture) => {
      texture.mapping = _chunkEA3XQ4KJcjs.THREE.EquirectangularReflectionMapping;
      orchestrator.scene.environment = texture;
      orchestrator.scene.background = texture;
      orchestrator.scene.backgroundBlurriness = blur;
      orchestrator.scene.environmentIntensity = intensity;
    });
    return () => {
      if (orchestrator.scene.environment) {
        orchestrator.scene.environment.dispose();
        orchestrator.scene.environment = null;
      }
      if (orchestrator.scene.background) {
        if (!(orchestrator.scene.background instanceof _chunkEA3XQ4KJcjs.THREE.Color)) {
          orchestrator.scene.background.dispose();
        }
        orchestrator.scene.background = null;
      }
    };
  }, [name, intensity, blur]);
  return null;
};

// src/react/components/ErrorBoundary3D.tsx


var ErrorBoundary3D = (_class19 = class extends _react.Component {constructor(...args2) { super(...args2); _class19.prototype.__init46.call(this); }
  __init46() {this.state = { hasError: false }}
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error 3D capturado:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "text-red-500", children: "Error al cargar modelo 3D" });
    }
    return this.props.children;
  }
}, _class19);

// src/react/components/GroundSurface.tsx

var _Reflectorjs = require('three/examples/jsm/objects/Reflector.js');
var PRESETS2 = {
  mirror: { reflective: true, color: 16777215, roughness: 0, metalness: 1 },
  glass: {
    reflective: true,
    color: 8965375,
    roughness: 0,
    metalness: 0,
    opacity: 0.3,
    transparent: true
  },
  metal: { reflective: true, color: 8947848, roughness: 0.1, metalness: 1 },
  concrete: {
    reflective: false,
    color: 10066329,
    roughness: 0.9,
    metalness: 0
  },
  wood: { reflective: false, color: 9127187, roughness: 0.8, metalness: 0 },
  water: {
    reflective: true,
    color: 35071,
    roughness: 0,
    metalness: 0.1,
    opacity: 0.7,
    transparent: true
  },
  custom: { reflective: true, color: 16777215, roughness: 0, metalness: 1 }
};
var GroundSurface = ({
  type = "mirror",
  size,
  height = 0,
  blur = 0.8,
  resolution = 1024,
  ...custom
}) => {
  const orchestrator = useScene2();
  const scene = orchestrator.scene;
  const camera = orchestrator.camera;
  _react.useEffect.call(void 0, () => {
    if (!camera) {
      return;
    }
    const preset = PRESETS2[type];
    const finalColor = _nullishCoalesce(custom.color, () => ( preset.color));
    const finalRoughness = _nullishCoalesce(custom.roughness, () => ( preset.roughness));
    const finalMetalness = _nullishCoalesce(custom.metalness, () => ( preset.metalness));
    const finalOpacity = _nullishCoalesce(_nullishCoalesce(custom.opacity, () => ( preset.opacity)), () => ( 1));
    const finalTransparent = _nullishCoalesce(_nullishCoalesce(custom.transparent, () => ( preset.transparent)), () => ( false));
    let ground;
    if (preset.reflective && size) {
      const geometry = new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(size, size);
      ground = new (0, _Reflectorjs.Reflector)(geometry, {
        clipBias: 3e-3,
        textureWidth: resolution,
        textureHeight: resolution,
        color: new _chunkEA3XQ4KJcjs.THREE.Color(finalColor)
      });
      if (Array.isArray(ground.material)) {
        ground.material.forEach((mat) => {
          mat.roughness = finalRoughness;
          mat.metalness = finalMetalness;
          mat.opacity = finalOpacity;
          mat.transparent = finalTransparent;
        });
      } else {
        ground.material.roughness = finalRoughness;
        ground.material.metalness = finalMetalness;
        ground.material.opacity = finalOpacity;
        ground.material.transparent = finalTransparent;
      }
    } else {
      const geometry = size ? new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(size, size) : new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(2, 2);
      const material = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
        color: finalColor,
        roughness: finalRoughness,
        metalness: finalMetalness,
        opacity: finalOpacity,
        transparent: finalTransparent,
        side: _chunkEA3XQ4KJcjs.THREE.DoubleSide
      });
      ground = new _chunkEA3XQ4KJcjs.THREE.Mesh(geometry, material);
      ground.receiveShadow = true;
      if (!size) {
        ground.onBeforeRender = () => {
          const dist = camera.position.length();
          const scale = dist * 10;
          ground.scale.set(scale, scale, 1);
        };
      }
    }
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = height;
    scene.add(ground);
    return () => {
      scene.remove(ground);
      if ("material" in ground) {
        if (Array.isArray(ground.material)) {
          ground.material.forEach((mat) => mat.dispose());
        } else {
          ground.material.dispose();
        }
      }
      ground.geometry.dispose();
    };
  }, [type, size, height, blur, resolution, ...Object.values(custom)]);
  return null;
};

// src/react/components/HDRI.tsx

var HDRI = ({ entry }) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};

// src/react/components/Hotspot.tsx

var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const plugin = new HotspotPlugin([
      {
        id,
        position: new _chunkEA3XQ4KJcjs.THREE.Vector3(...position),
        target,
        onClick
      }
    ]);
    orchestrator.use(plugin);
    return () => plugin.dispose();
  }, [id, position, target, onClick]);
  return null;
};

// src/react/components/Hotspots.tsx


var Hotspots = ({ hotspots }) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const data = hotspots.map((h) => ({
      id: h.id,
      position: new THREE3.Vector3(...h.position),
      target: typeof h.target === "string" ? orchestrator.scene.getObjectByName(h.target) : h.target,
      onClick: h.onClick,
      offset: h.offset ? new THREE3.Vector3(...h.offset) : void 0
    }));
    const plugin = new HotspotPlugin(data);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [hotspots, orchestrator]);
  return null;
};

// src/react/components/InstancedModel.tsx

var InstancedModel = ({
  entry,
  instances,
  draco = false,
  castShadow = true,
  receiveShadow = true
}) => {
  const orchestrator = useScene2();
  const scene = orchestrator.scene;
  const groupRef = _react.useRef.call(void 0, new _chunkEA3XQ4KJcjs.THREE.Group());
  const instancedMeshes = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  _react.useEffect.call(void 0, () => {
    let isMounted = true;
    const loadAndCreateInstances = async () => {
      if (!isMounted) {
        return;
      }
      try {
        const gltf = await GLTFLoader2.load(entry, { draco });
        const model = gltf.clone();
        instancedMeshes.current.forEach((mesh) => {
          scene.remove(mesh);
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([mesh, 'access', _129 => _129.material, 'optionalAccess', _130 => _130.dispose, 'call', _131 => _131()]);
          }
        });
        instancedMeshes.current.clear();
        model.traverse((child) => {
          if (!(child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh)) {
            return;
          }
          const geometry = child.geometry;
          const material = Array.isArray(child.material) ? child.material[0] : child.material;
          const count = instances.length;
          const instancedMesh = new _chunkEA3XQ4KJcjs.THREE.InstancedMesh(
            geometry,
            material,
            count
          );
          instancedMesh.castShadow = castShadow;
          instancedMesh.receiveShadow = receiveShadow;
          const dummy = new _chunkEA3XQ4KJcjs.THREE.Object3D();
          const color = new _chunkEA3XQ4KJcjs.THREE.Color();
          instances.forEach((instance, i) => {
            dummy.position.copy(instance.position);
            if (instance.rotation instanceof _chunkEA3XQ4KJcjs.THREE.Euler) {
              dummy.rotation.copy(instance.rotation);
            } else if (instance.rotation instanceof _chunkEA3XQ4KJcjs.THREE.Quaternion) {
              dummy.quaternion.copy(instance.rotation);
            }
            if (typeof instance.scale === "number") {
              dummy.scale.setScalar(instance.scale);
            } else if (instance.scale) {
              dummy.scale.copy(instance.scale);
            } else {
              dummy.scale.set(1, 1, 1);
            }
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
            if (instance.color) {
              color.set(instance.color);
              instancedMesh.setColorAt(i, color);
            }
            if (instance.visible === false) {
              instancedMesh.instanceMatrix.setUsage(_chunkEA3XQ4KJcjs.THREE.DynamicDrawUsage);
            }
          });
          if (material instanceof _chunkEA3XQ4KJcjs.THREE.Material) {
            instancedMesh.instanceColor = material.vertexColors ? null : new _chunkEA3XQ4KJcjs.THREE.InstancedBufferAttribute(
              new Float32Array(count * 3),
              3
            );
          }
          instancedMesh.instanceMatrix.needsUpdate = true;
          if (instancedMesh.instanceColor) {
            instancedMesh.instanceColor.needsUpdate = true;
          }
          scene.add(instancedMesh);
          instancedMeshes.current.set(child.uuid, instancedMesh);
        });
        groupRef.current.add(model);
        scene.add(groupRef.current);
      } catch (err) {
        console.error("Error loading InstancedModel:", err);
      }
    };
    loadAndCreateInstances();
    return () => {
      isMounted = false;
      instancedMeshes.current.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          _optionalChain([mesh, 'access', _132 => _132.material, 'optionalAccess', _133 => _133.dispose, 'call', _134 => _134()]);
        }
      });
      instancedMeshes.current.clear();
      if (groupRef.current.parent) {
        groupRef.current.parent.remove(groupRef.current);
      }
    };
  }, [entry, instances, draco, castShadow, receiveShadow]);
  return null;
};

// src/react/components/LODSystem.tsx

var LODSystem = ({
  levels,
  hysteresis = 0.1
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const plugin = new LODSystemPlugin([{ levels, hysteresis }]);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [levels, hysteresis]);
  return null;
};

// src/react/components/MeasurementTool.tsx

var MeasurementTool = ({
  enabled = true,
  color = "#00ff00",
  onMeasure
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    if (!enabled) {
      return;
    }
    const plugin = new MeasurementToolPlugin((event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        _optionalChain([onMeasure, 'optionalCall', _135 => _135(event.distance, [event.points[0], event.points[1]])]);
      }
    });
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [enabled, onMeasure]);
  return null;
};

// src/react/components/Model.tsx

var Model = ({
  entry,
  draco = false,
  children
}) => {
  const orchestrator = useScene2();
  const [model, setModel] = _react.useState.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    const load = async () => {
      const gltf = await orchestrator.setModel(entry, { draco });
      setModel(gltf);
    };
    load();
  }, [entry.id, draco]);
  if (!model) {
    return null;
  }
  return _optionalChain([children, 'optionalCall', _136 => _136(model)]);
};

// src/react/components/ModelPreload.tsx

var ModelPreload = ({
  entries,
  draco = false
}) => {
  _react.useEffect.call(void 0, () => {
    entries.forEach((entry) => {
      GLTFLoader2.load(entry, { draco }).catch(() => {
      });
    });
  }, [entries, draco]);
  return null;
};

// src/react/components/OrbitControls.tsx

var OrbitControls4 = () => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    orchestrator.use(new OrbitControlsPlugin());
  }, []);
  return null;
};

// src/react/components/PointLight.tsx

var PointLight = ({
  intensity = 1,
  color = 16777215,
  position = [0, 5, 0],
  distance = 0,
  decay = 2
}) => {
  const { scene } = useScene2();
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.PointLightHelper(light, 0.5);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
      };
    }
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color, position, distance, decay]);
  return null;
};

// src/react/components/PostProcessing.tsx

var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    if (!enabled) {
      return;
    }
    const plugin = new PostProcessingPlugin(bloom);
    orchestrator.use(plugin);
    return () => {
    };
  }, [enabled, bloom.strength, bloom.radius, bloom.threshold]);
  return null;
};

// src/react/components/Raycaster.tsx

var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    const plugin = new RaycasterPlugin((event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    });
    orchestrator.use(plugin);
  }, [onClick, onHover]);
  return null;
};

// src/react/components/SpotLight.tsx

var SpotLight = ({
  intensity = 5,
  color = 16777215,
  position = [0, 10, 0],
  target,
  angle = Math.PI / 6,
  penumbra = 0.1,
  distance = 50,
  castShadow = true
}) => {
  const { scene } = useScene2();
  _react.useEffect.call(void 0, () => {
    const light = new _chunkEA3XQ4KJcjs.THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra
    );
    light.position.set(...position);
    light.castShadow = castShadow;
    if (castShadow) {
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
    }
    scene.add(light);
    if (target) {
      if (typeof target === "string") {
        const obj = scene.getObjectByName(target);
        if (obj) {
          light.target = obj;
        }
      } else {
        light.target = target;
        scene.add(target);
      }
    }
    if (process.env.NODE_ENV === "development") {
      const helper = new _chunkEA3XQ4KJcjs.THREE.SpotLightHelper(light);
      scene.add(helper);
      return () => {
        scene.remove(light);
        scene.remove(helper);
        light.dispose();
      };
    }
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [
    intensity,
    color,
    position,
    target,
    angle,
    penumbra,
    distance,
    castShadow
  ]);
  return null;
};

// src/react/components/Suspense.tsx


var Suspense = ({
  children,
  fallback,
  loadingMessage = "Loading 3D model..."
}) => {
  const defaultFallback = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "bg-gray-900/90 border border-gray-700 rounded-xl p-8 shadow-2xl text-center", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-xl font-semibold text-white", children: loadingMessage }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm text-gray-400 mt-2", children: "This may take a few seconds..." })
  ] }) });
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _react.Suspense, { fallback: fallback || defaultFallback, children });
};

// src/react/components/SuspenseModel.tsx

var SuspenseModel = ({
  entry,
  draco,
  fallback = /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-white", children: [
    "Loading model ",
    entry.id,
    "..."
  ] }),
  children
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Suspense, { fallback, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Model, { entry, draco, children: (model) => _optionalChain([children, 'optionalCall', _137 => _137(model)]) }) });
};

// src/react/components/TheaterLighting.tsx

var TheaterLighting = ({
  intensity = 2,
  count = 8
}) => {
  const { scene } = useScene2();
  _react.useEffect.call(void 0, () => {
    const lights = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const light = new _chunkEA3XQ4KJcjs.THREE.PointLight(16777215, intensity);
      light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
      scene.add(light);
      lights.push(light);
    }
    return () => {
      lights.forEach((l) => {
        scene.remove(l);
        l.dispose();
      });
    };
  }, [intensity, count]);
  return null;
};

// src/react/components/VRButton.tsx

var _VRButtonjs = require('three/examples/jsm/webxr/VRButton.js');
var VRButton = () => {
  const { renderer } = useScene2();
  _react.useEffect.call(void 0, () => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = _VRButtonjs.VRButton.createButton(renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);
  return null;
};

// src/react/controls/AnimationController.tsx


var AnimationController = ({
  children,
  className
}) => {
  const model = useActiveModel();
  const [clips, setClips] = _react.useState.call(void 0, []);
  const [mixer, setMixer] = _react.useState.call(void 0, 
    () => new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(null)
  );
  const [actions, setActions] = _react.useState.call(void 0, 
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
  const [reversed, setReversed] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
  _react.useEffect.call(void 0, () => {
    if (!model) {
      setClips([]);
      mixer.stopAllAction();
      return;
    }
    if (model.animations && model.animations.length > 0) {
      setClips(model.animations);
      setMixer(new _chunkEA3XQ4KJcjs.THREE.AnimationMixer(model));
      mixer.setTime(0);
      const newActions = /* @__PURE__ */ new Map();
      model.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.enabled = true;
        action.setLoop(_chunkEA3XQ4KJcjs.THREE.LoopOnce, 1);
        action.reset();
        newActions.set(clip.name, action);
      });
      setActions(newActions);
    }
    const clock = new _chunkEA3XQ4KJcjs.THREE.Clock();
    const animate = () => {
      mixer.update(clock.getDelta());
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      mixer.stopAllAction();
    };
  }, [model]);
  const playForward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });
    action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.2).play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };
  const playBackward = (name) => {
    const action = actions.get(name);
    if (!action) {
      return;
    }
    actions.forEach((a, n) => {
      if (n !== name) {
        a.fadeOut(0.2);
      }
    });
    action.reset().setEffectiveTimeScale(-1).setEffectiveWeight(1).fadeIn(0.2).play();
    setPlaying((prev) => new Set(prev).add(name));
    setReversed((prev) => new Set(prev).add(name));
  };
  const toggle = (name) => {
    if (reversed.has(name)) {
      playForward(name);
    } else {
      playBackward(name);
    }
  };
  const animationList = clips.map((clip) => ({
    name: clip.name || `Animaci\xF3n ${clip.uuid.slice(0, 4)}`,
    playForward: () => playForward(clip.name),
    playBackward: () => playBackward(clip.name),
    toggle: () => toggle(clip.name),
    isPlaying: playing.has(clip.name),
    isReversed: reversed.has(clip.name)
  }));
  if (animationList.length === 0) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(animationList) });
};

// src/react/controls/LightingController.tsx


var LightingController = ({
  className
}) => {
  const { scene } = useScene2();
  const [intensity, setIntensity] = _react.useState.call(void 0, 1);
  const updateLights = (value) => {
    setIntensity(value);
    scene.traverse((obj) => {
      if (obj instanceof _chunkEA3XQ4KJcjs.THREE.Light) {
        obj.intensity = value * (obj.userData.baseIntensity || 1);
      }
    });
  };
  _react2.default.useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof _chunkEA3XQ4KJcjs.THREE.Light) {
        obj.userData.baseIntensity = obj.intensity;
      }
    });
  }, [scene]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `bg-black/80 text-white p-4 rounded-lg ${className || ""}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: "text-lg font-bold mb-3", children: "Iluminaci\xF3n Global" }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "label", { className: "block", children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: "text-sm", children: [
        "Intensidad: ",
        intensity.toFixed(2)
      ] }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "input",
        {
          type: "range",
          min: "0",
          max: "3",
          step: "0.01",
          value: intensity,
          onChange: (e) => updateLights(parseFloat(e.target.value)),
          className: "w-full mt-2"
        }
      )
    ] })
  ] });
};

// src/react/controls/MaterialController.tsx


// src/core/utils/QuadWireframe.ts
var createQuadWireframe = (geometry) => {
  const position = geometry.attributes.position;
  const indices = _optionalChain([geometry, 'access', _138 => _138.index, 'optionalAccess', _139 => _139.array]);
  const vertices = [];
  const edgeMap = /* @__PURE__ */ new Map();
  const getKey = (a, b) => a < b ? `${a},${b}` : `${b},${a}`;
  if (!indices) {
    return new _chunkEA3XQ4KJcjs.THREE.EdgesGeometry(geometry, 30);
  }
  if (!position) {
    return new _chunkEA3XQ4KJcjs.THREE.EdgesGeometry(geometry, 30);
  }
  const vertexPositions = [];
  for (let i = 0; i < position.count; i++) {
    vertexPositions.push([
      position.array[i * 3],
      position.array[i * 3 + 1],
      position.array[i * 3 + 2]
    ]);
  }
  const distanceSq = (a, b) => {
    const [x1, y1, z1] = vertexPositions[a];
    const [x2, y2, z2] = vertexPositions[b];
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
  };
  const trianglePairs = /* @__PURE__ */ new Map();
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]];
    [getKey(a, b), getKey(b, c), getKey(c, a)].forEach((edge) => {
      if (!trianglePairs.has(edge)) {
        trianglePairs.set(edge, []);
      }
      trianglePairs.get(edge).push(i / 3);
    });
  }
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]];
    const edges = [
      { key: getKey(a, b), verts: [a, b] },
      { key: getKey(b, c), verts: [b, c] },
      { key: getKey(c, a), verts: [c, a] }
    ];
    const lengths = [distanceSq(a, b), distanceSq(b, c), distanceSq(c, a)];
    const maxIdx = lengths.indexOf(Math.max(...lengths));
    const diagonal = edges[maxIdx];
    const legs = edges.filter((_, i2) => i2 !== maxIdx);
    const isQuad = (_optionalChain([trianglePairs, 'access', _140 => _140.get, 'call', _141 => _141(diagonal.key), 'optionalAccess', _142 => _142.length]) || 0) > 1;
    (isQuad ? legs : edges).forEach(({ verts: [V1, V2] }) => {
      const v1 = V1;
      const v2 = V2;
      const key = getKey(v1, v2);
      if (!edgeMap.has(key)) {
        edgeMap.set(key, 1);
        vertices.push(
          position.array[v1 * 3],
          position.array[v1 * 3 + 1],
          position.array[v1 * 3 + 2],
          position.array[v2 * 3],
          position.array[v2 * 3 + 1],
          position.array[v2 * 3 + 2]
        );
      }
    });
  }
  const geo = new _chunkEA3XQ4KJcjs.THREE.BufferGeometry();
  geo.setAttribute("position", new _chunkEA3XQ4KJcjs.THREE.Float32BufferAttribute(vertices, 3));
  return geo;
};

// src/react/controls/MaterialController.tsx

var MaterialController = ({
  materials,
  transitionDuration = 0,
  children,
  className
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = _react.useState.call(void 0, null);
  const [isTransitioning, setIsTransitioning] = _react.useState.call(void 0, false);
  _react.useEffect.call(void 0, () => {
    if (!model) {
      return;
    }
    model.traverse((child) => {
      if (!(child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh)) {
        return;
      }
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
      }
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = createQuadWireframe(child.geometry);
        const lineMat = new _chunkEA3XQ4KJcjs.THREE.LineBasicMaterial({
          color: 0,
          linewidth: 3,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1
        });
        const wireframe = new _chunkEA3XQ4KJcjs.THREE.LineSegments(wireGeo, lineMat);
        wireframe.name = `${child.name}-wireframe`;
        wireframe.renderOrder = 999;
        wireframe.visible = false;
        child.add(wireframe);
      }
    });
  }, [model]);
  const applyMaterial = async (config) => {
    if (!model || isTransitioning) {
      return;
    }
    setIsTransitioning(transitionDuration > 0);
    const meshes = [];
    model.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
        meshes.push(child);
      }
    });
    if (transitionDuration === 0) {
      meshes.forEach((child) => applyMaterialToMesh(child, config));
      setActiveName(config.name);
      setIsTransitioning(false);
      return;
    }
    const delayPerMesh = transitionDuration / meshes.length;
    for (let i = 0; i < meshes.length; i++) {
      setTimeout(() => {
        applyMaterialToMesh(meshes[i], config);
        if (i === meshes.length - 1) {
          setActiveName(config.name);
          setIsTransitioning(false);
        }
      }, i * delayPerMesh);
    }
  };
  const applyMaterialToMesh = (child, config) => {
    const wireframe = child.getObjectByName(
      `${child.name}-wireframe`
    );
    let newMat;
    switch (config.type) {
      case "textured":
        newMat = child.userData.originalMaterial;
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "solid":
        newMat = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
          color: _nullishCoalesce(config.color, () => ( 8947848)),
          metalness: _nullishCoalesce(config.metalness, () => ( 0)),
          roughness: _nullishCoalesce(config.roughness, () => ( 0.9))
        });
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "wireframe":
        newMat = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
          color: _nullishCoalesce(config.color, () => ( 8947848)),
          metalness: _nullishCoalesce(config.metalness, () => ( 0)),
          roughness: _nullishCoalesce(config.roughness, () => ( 0.9)),
          transparent: true,
          opacity: 0.95
        });
        if (wireframe) {
          wireframe.visible = true;
          wireframe.material.color.set(
            _nullishCoalesce(config.lineColor, () => ( 0))
          );
        }
        break;
      case "custom":
        newMat = config.factory(child.userData.originalMaterial);
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
    }
    child.material = newMat;
  };
  const items = materials.map((config) => ({
    name: config.name,
    apply: () => applyMaterial(config),
    isActive: activeName === config.name
  }));
  _react.useEffect.call(void 0, () => {
    if (items.length > 0 && !activeName) {
      _optionalChain([items, 'access', _143 => _143[0], 'optionalAccess', _144 => _144.apply, 'optionalCall', _145 => _145()]);
    }
  }, [items]);
  if (!model || items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children(items) });
};

// src/react/primitives/SceneObject.tsx

var SceneObject = ({
  object,
  parent = "scene",
  name,
  position,
  rotation,
  scale = [1, 1, 1],
  visible = true,
  castShadow = false,
  receiveShadow = false
}) => {
  const orchestrator = useScene2();
  _react.useEffect.call(void 0, () => {
    if (name) {
      object.name = name;
    }
    object.visible = visible;
    object.castShadow = castShadow;
    object.receiveShadow = receiveShadow;
    if (position) {
      object.position.set(...position);
    }
    if (rotation) {
      object.rotation.set(...rotation);
    }
    if (scale) {
      object.scale.set(...scale);
    }
    let targetParent = null;
    if (parent === "scene") {
      targetParent = orchestrator.scene;
    } else if (parent === "model") {
      targetParent = orchestrator.getActiveModel();
    } else if (typeof parent === "string") {
      targetParent = orchestrator.scene.getObjectByName(parent) || null;
    } else if (parent instanceof _chunkEA3XQ4KJcjs.THREE.Object3D) {
      targetParent = parent;
    }
    if (!targetParent) {
      console.warn("[SceneObject] Padre no encontrado:", parent);
      return;
    }
    targetParent.add(object);
    return () => {
      if (object.parent) {
        object.parent.remove(object);
      }
      object.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _146 => _146.geometry, 'optionalAccess', _147 => _147.dispose, 'call', _148 => _148()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _149 => _149.material, 'optionalAccess', _150 => _150.dispose, 'call', _151 => _151()]);
          }
        }
      });
    };
  }, [
    object,
    parent,
    name,
    position,
    rotation,
    scale,
    visible,
    castShadow,
    receiveShadow
  ]);
  return null;
};










































































exports.ARButton = ARButton; exports.AdvancedCameraCollision = AdvancedCameraCollision; exports.AdvancedCameraCollisionPlugin = AdvancedCameraCollisionPlugin; exports.AdvancedDragRaycaster = AdvancedDragRaycaster; exports.AdvancedOrbitControls = AdvancedOrbitControls; exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin; exports.AdvancedRaycaster = AdvancedRaycaster; exports.AdvancedRaycasterPlugin = AdvancedRaycasterPlugin; exports.AmbientLight = AmbientLight; exports.AnimationController = AnimationController; exports.AnimationTimeline = AnimationTimeline; exports.Annotations = Annotations; exports.AnnotationsPlugin = AnnotationsPlugin; exports.AutoLODSystem = AutoLODSystem; exports.AutoLODSystemPlugin = AutoLODSystemPlugin; exports.CacheProvider = CacheProvider; exports.CacheValidator = CacheValidator; exports.Canvas = Canvas; exports.DirectionalLight = DirectionalLight; exports.DistanceDisplay = DistanceDisplay; exports.EnvironmentPreset = EnvironmentPreset; exports.ErrorBoundary3D = ErrorBoundary3D; exports.FileWatcher = FileWatcher; exports.GLTFLoader = GLTFLoader2; exports.GroundSurface = GroundSurface; exports.HDRI = HDRI; exports.HDRILoader = HDRILoader; exports.Hotspot = Hotspot; exports.HotspotPlugin = HotspotPlugin; exports.Hotspots = Hotspots; exports.InstancedModel = InstancedModel; exports.LODSystem = LODSystem; exports.LODSystemPlugin = LODSystemPlugin; exports.LightingController = LightingController; exports.MaterialController = MaterialController; exports.MeasurementTool = MeasurementTool; exports.MeasurementToolPlugin = MeasurementToolPlugin; exports.Model = Model; exports.ModelPreload = ModelPreload; exports.ObjectCache = ObjectCache; exports.OrbitControls = OrbitControls4; exports.OrbitControlsPlugin = OrbitControlsPlugin; exports.PointLight = PointLight; exports.PostProcessing = PostProcessing; exports.PostProcessingPlugin = PostProcessingPlugin; exports.Raycaster = Raycaster; exports.RaycasterPlugin = RaycasterPlugin; exports.SceneObject = SceneObject; exports.SceneOrchestrator = SceneOrchestrator; exports.SceneProvider = SceneProvider; exports.SpotLight = SpotLight; exports.Suspense = Suspense; exports.SuspenseModel = SuspenseModel; exports.THREE = _chunkEA3XQ4KJcjs.THREE; exports.THREE_VERSION = _chunkEA3XQ4KJcjs.THREE_VERSION; exports.TheaterLighting = TheaterLighting; exports.ThreeDRACOLoader = _chunkEA3XQ4KJcjs.DRACOLoader; exports.ThreeEXRLoader = _chunkEA3XQ4KJcjs.EXRLoader; exports.ThreeEffectComposer = _chunkEA3XQ4KJcjs.EffectComposer; exports.ThreeGLTFLoader = _chunkEA3XQ4KJcjs.GLTFLoader; exports.ThreeOrbitControls = _chunkEA3XQ4KJcjs.OrbitControls; exports.ThreeRGBELoader = _chunkEA3XQ4KJcjs.RGBELoader; exports.ThreeRenderPass = _chunkEA3XQ4KJcjs.RenderPass; exports.ThreeUnrealBloomPass = _chunkEA3XQ4KJcjs.UnrealBloomPass; exports.VRButton = VRButton; exports.WebPHDRLoader = WebPHDRLoader; exports.useActiveModel = useActiveModel; exports.useAnimation = useAnimation; exports.useCache = useCache2; exports.useHDRI = useHDRI; exports.useModel = useModel; exports.useRaycaster = useRaycaster; exports.useScene = useScene2;
