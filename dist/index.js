import {
  DRACOLoader,
  EXRLoader,
  EffectComposer,
  GLTFLoader,
  OrbitControls,
  RGBELoader,
  RenderPass,
  THREE,
  THREE_VERSION,
  UnrealBloomPass
} from "./chunk-OVHQQSEK.js";

// src/context/SceneContext.tsx
import { createContext, useContext, forwardRef, useEffect } from "react";

// src/core/orchestrator/SceneOrchestrator.ts
import * as THREE2 from "three";

// src/core/cache/ObjectCache.ts
import { get, set, del, keys } from "idb-keyval";
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
    await set(key, entry);
  }
  static async get(id) {
    const key = await this.getKey(id);
    return await get(key) ?? null;
  }
  static async has(id) {
    const key = await this.getKey(id);
    const all = await keys();
    return all.includes(key);
  }
  static async delete(id) {
    const key = await this.getKey(id);
    const entry = await this.get(key);
    if (entry) {
      this.dispose(entry.data);
    }
    await del(key);
  }
  static async clearAll() {
    const allKeys = await keys();
    const ourKeys = allKeys.filter((k) => typeof k === "string" && k.startsWith(CACHE_PREFIX));
    await Promise.all(ourKeys.map((k) => del(k)));
  }
  static dispose(data) {
    if (data instanceof THREE.Object3D) {
      data.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    } else if (data instanceof THREE.Texture) {
      data.dispose();
    }
  }
  static estimateSize(data) {
    if (data instanceof THREE.Object3D) {
      let size = 0;
      data.traverse((child) => {
        if (child.isMesh && child.geometry?.attributes?.position?.array) {
          size += child.geometry.attributes.position.array.byteLength;
        }
      });
      return size;
    }
    if (data instanceof THREE.Texture) {
      const array = data.source?.data || data.image?.data;
      return array?.byteLength || 0;
    }
    return 0;
  }
};

// src/core/loaders/GLTFLoader.ts
var GLTFLoader2 = class {
  static plainLoader = new GLTFLoader();
  static dracoLoaderInstance = new GLTFLoader();
  static dracoDecoder = new DRACOLoader();
  static isDracoInitialized = false;
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
      onLoaded?.(model, entry);
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
            const box = new THREE.Box3().setFromObject(scene);
            scene.position.sub(box.getCenter(new THREE.Vector3()));
            scene.userData = {
              sourceUrl: url,
              manifestHash: hash,
              loadedAt: Date.now(),
              format: draco ? "gltf-draco" : "gltf",
              draco
            };
            await ObjectCache.set(id, scene, hash);
            onLoaded?.(scene, entry);
            resolve(scene);
          } catch (err) {
            onError?.(err, url);
            reject(err);
          }
        },
        (progress) => {
          if (progress.lengthComputable) {
            onProgress?.({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            });
          }
        },
        (error) => {
          console.error(`[GLTFLoader] Error: ${id}`, error);
          onError?.(error, url);
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
          onLoaded: () => onProgress?.(++completed, total),
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
};

// src/core/loaders/WebPHDRLoader.ts
var WebPHDRLoader = class {
  manager;
  type = THREE.FloatType;
  exposure = 1;
  preserveHDR = true;
  constructor(manager) {
    this.manager = manager || new THREE.LoadingManager();
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
    const loader = new THREE.FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.load(
      url,
      (buffer) => {
        try {
          const result = this.parse(buffer);
          const texture = new THREE.DataTexture(
            result.data,
            result.width,
            result.height,
            THREE.RGBAFormat,
            result.type
          );
          texture.colorSpace = THREE.LinearSRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.flipY = true;
          texture.userData = {
            format: "webp-hdr",
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            preserveHDR: this.preserveHDR
          };
          onLoad?.(texture, result);
        } catch (error) {
          onError?.(error);
        }
      },
      onProgress,
      (error) => onError?.(error)
    );
    return new THREE.DataTexture(new Uint8Array(4), 1, 1, THREE.RGBAFormat);
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
    const data = this.type === THREE.FloatType ? new Float32Array(size) : new Uint16Array(size);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;
        const theta = i / height * Math.PI;
        const phi = j / width * Math.PI * 2;
        const sky = new THREE.Color(0.1, 0.3, 0.8).multiplyScalar(Math.cos(theta));
        const sun = new THREE.Color(1, 0.9, 0.7).multiplyScalar(
          Math.exp(-Math.pow(phi - Math.PI, 2) / 0.1) * Math.exp(-Math.pow(theta - Math.PI / 6, 2) / 0.2) * 1e3
        );
        const color = sky.clone().add(sun).multiplyScalar(exposure);
        const maxChannel = Math.max(color.r, color.g, color.b, 1e-4);
        const range = Math.min(255, Math.floor(maxChannel / maxLuminance * 255));
        if (this.type === THREE.FloatType) {
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
};

// src/core/loaders/HDRILoader.ts
var HDRILoader = class {
  static rgbeLoader = new RGBELoader();
  static webpLoader = new WebPHDRLoader();
  /**
   * Carga un HDRI de forma inteligente (con caché + hash)
   */
  static async load(entry, events = {}) {
    const { id, url, hash } = entry;
    const { onProgress, onLoaded, onError } = events;
    const cached = await ObjectCache.get(id);
    if (cached && cached.hash === hash && cached.data instanceof THREE.Texture) {
      console.info(`[HDRILoader] Cache hit: ${id}`);
      const texture = cached.data.clone();
      texture.userData = { ...cached.data.userData, cached: true };
      onLoaded?.(texture, entry);
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
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.LinearSRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
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
            onLoaded?.(texture, entry);
            resolve(texture);
          } catch (err) {
            onError?.(err, url);
            reject(err);
          }
        },
        (progress) => {
          if (progress.lengthComputable) {
            onProgress?.({
              loaded: progress.loaded,
              total: progress.total,
              percent: progress.loaded / progress.total * 100,
              url
            });
          }
        },
        (error) => {
          console.error(`[HDRILoader] Error loading ${id}:`, error);
          onError?.(error, url);
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
            onProgress?.(completed, total);
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
    if (cached?.data instanceof THREE.Texture) {
      cached.data.dispose();
    }
    await ObjectCache.delete(id);
  }
};

// src/core/orchestrator/SceneOrchestrator.ts
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
    this.renderer = new THREE2.WebGLRenderer({
      canvas,
      antialias: config.antialias ?? true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.shadowMap.enabled = config.shadows ?? true;
    this.renderer.toneMapping = config.toneMapping ?? THREE2.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = config.toneMappingExposure ?? 1;
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
      draco: options?.draco,
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

// src/context/SceneContext.tsx
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = forwardRef(
  ({ children, config }, ref) => {
    useEffect(() => {
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
    return /* @__PURE__ */ jsx(SceneContext.Provider, { value: { orchestrator: null }, children });
  }
);
SceneProvider.displayName = "SceneProvider";
var useScene = () => {
  const context = useContext(SceneContext);
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
import { createContext as createContext2, useContext as useContext2, useState } from "react";

// src/core/cache/utils/env.ts
var isDev = () => {
  if (typeof import.meta !== "undefined" && import.meta.env?.MODE === "development") {
    return true;
  }
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    return true;
  }
  return false;
};

// src/core/cache/FileWatcher.ts
var FileWatcher = class _FileWatcher {
  static instance = null;
  watchers = /* @__PURE__ */ new Map();
  manifest = [];
  onChange;
  constructor() {
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
      } catch {
      }
    }
    if (changed.length > 0) {
      this.onChange?.(changed);
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
};

// src/core/cache/CacheValidator.ts
import { keys as keys2 } from "idb-keyval";
var CacheValidator = class _CacheValidator {
  static isFirstLoad = true;
  static async validate(options) {
    const { manifest, onProgress, onComplete, forceUpdate = false } = options;
    onProgress?.(0, "Iniciando validaci\xF3n de cach\xE9...");
    if (isDev() && !forceUpdate) {
      const watcher = FileWatcher.getInstance();
      watcher.watch(manifest, (changedIds) => {
        onProgress?.(100, `Recargando: ${changedIds.join(", ")}`);
        onComplete?.({
          validated: true,
          updated: changedIds,
          removed: [],
          added: [],
          errors: [],
          durationMs: 0
        });
      });
      onProgress?.(100, "Modo desarrollo: observando cambios...");
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    if (!_CacheValidator.isFirstLoad && !forceUpdate) {
      onProgress?.(100, "Cach\xE9 ya validada");
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    onProgress?.(10, "Comparando manifest con cach\xE9 local...");
    const start = performance.now();
    const currentIds = new Set(manifest.map((m) => m.id));
    const cachedKeys = await keys2();
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
    onProgress?.(100, "Validaci\xF3n completa");
    onComplete?.(report);
    return report;
  }
  static reset() {
    _CacheValidator.isFirstLoad = true;
  }
};

// src/context/CacheContext.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CacheContext = createContext2(null);
var CacheProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);
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
  return /* @__PURE__ */ jsx2(CacheContext.Provider, { value: { status, progress, report, validate }, children });
};
var useCache = () => {
  const context = useContext2(CacheContext);
  if (!context) {
    throw new Error("useCache debe usarse dentro de <CacheProvider>");
  }
  return context;
};

// src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = class {
  constructor(distanceThreshold = 0.6, pushBackOffset = 0.1) {
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
  }
  name = "AdvancedCameraCollisionPlugin";
  handle = null;
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
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const ray = new THREE.Raycaster(
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
};

// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
import { OrbitControls as OrbitControls2 } from "three/examples/jsm/controls/OrbitControls.js";
var AdvancedOrbitControlsPlugin = class {
  constructor(options = {}) {
    this.options = options;
    Object.assign(this.config, options);
  }
  name = "AdvancedOrbitControls";
  controls;
  config = {
    enableDamping: true,
    dampingFactor: 0.05,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    minDistance: 0.1,
    maxDistance: 1e3,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI
  };
  install({ camera, renderer }) {
    this.controls = new OrbitControls2(camera, renderer.domElement);
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
    this.controls?.dispose();
  }
};

// src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts
var RaycasterManager = class extends THREE.EventDispatcher {
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  scene;
  camera;
  domElement;
  interactableObjects = [];
  lastHoverObject = null;
  isEnabled = false;
  isDragging = false;
  currentDragObject = null;
  dragStartPosition = new THREE.Vector2();
  lastRaycastTime = 0;
  raycastThrottleMs = 16;
  constructor(domElement) {
    super();
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
    const endPos = new THREE.Vector2(e.clientX, e.clientY);
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
    const current = new THREE.Vector2(e.clientX, e.clientY);
    const delta = current.clone().sub(this.dragStartPosition);
    this.dispatchEvent({
      type: "objectdrag",
      object: this.currentDragObject,
      delta,
      normalizedDelta: new THREE.Vector2(delta.x / this.domElement.clientWidth, delta.y / this.domElement.clientHeight)
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
    const hit = hits?.[0] || null;
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
  onContextMenu = (e) => e.preventDefault();
  onTouchStart = this.onPointerDown;
  onTouchMove = this.onPointerMove;
  onTouchEnd = this.onPointerUp;
};
var AdvancedRaycasterPlugin = class {
  constructor(model, onEvent) {
    this.model = model;
    this.onEvent = onEvent;
    this._manager = new RaycasterManager(document.body);
  }
  name = "AdvancedRaycaster";
  _manager;
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
      this._manager.addEventListener(event, (e) => this.onEvent?.(e));
    });
    this._manager.setEnabled(true);
  }
  dispose() {
    this._manager.setEnabled(false);
  }
  get manager() {
    return this._manager;
  }
};

// src/core/orchestrator/plugins/AnnotationsPlugin.ts
var AnnotationsPlugin = class {
  constructor(data) {
    this.data = data;
  }
  name = "Annotations";
  annotations = /* @__PURE__ */ new Map();
  camera;
  scene;
  install({ camera, scene }) {
    this.camera = camera;
    this.scene = scene;
    this.data.forEach((ann) => {
      const label = this.createLabel(ann.content, ann.offset || new THREE.Vector3(0, 1, 0));
      label.position.copy(ann.position);
      label.userData.annotationId = ann.id;
      label.visible = ann.visible ?? true;
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
          label.position.add(label.userData.offset || new THREE.Vector3(0, 1, 0));
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
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMaterial);
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
      if (sprite instanceof THREE.Sprite) {
        sprite.material.map?.dispose();
        sprite.material.dispose();
      }
    });
    this.annotations.clear();
  }
};

// src/core/orchestrator/plugins/AutoLODSystemPlugin.ts
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier.js";
var AutoLODSystemPlugin = class {
  constructor(config) {
    this.config = config;
    this.config.reductionPercentages = this.config.reductionPercentages || [0.5, 0.2];
  }
  name = "AutoLODSystem";
  lods = /* @__PURE__ */ new Map();
  camera;
  simplifyGeometry(geometry, percentage) {
    const modifier = new SimplifyModifier();
    const count = Math.floor(geometry.attributes.position.count * percentage);
    return modifier.modify(geometry, count);
  }
  createLODLevels(model) {
    const lod = new THREE.LOD();
    const high = model.clone();
    high.visible = true;
    lod.addLevel(high, 0);
    const medium = model.clone();
    medium.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages[0]);
      }
    });
    lod.addLevel(medium, this.config.distances[0]);
    const low = model.clone();
    low.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages[1]);
      }
    });
    lod.addLevel(low, this.config.distances[1]);
    const empty = new THREE.Object3D();
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
          this.lods.forEach((lod) => lod.parent?.remove(lod));
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
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    });
    this.lods.clear();
  }
};

// src/core/orchestrator/plugins/HotspotPlugin.ts
var HotspotPlugin = class {
  constructor(data) {
    this.data = data;
  }
  name = "Hotspot";
  hotspots = /* @__PURE__ */ new Map();
  install({ scene }) {
    this.data.forEach((hotspot) => {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 65280,
        transparent: true,
        opacity: 0.5
      });
      const mesh = new THREE.Mesh(geometry, material);
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
};

// src/core/orchestrator/plugins/LODSystemPlugin.ts
var LODSystemPlugin = class {
  constructor(config) {
    this.config = config;
  }
  name = "LODSystem";
  lodObjects = /* @__PURE__ */ new Map();
  camera;
  install({ camera, orchestrator }) {
    this.camera = camera;
    const processModel = (model) => {
      const lod = new THREE.LOD();
      this.config.forEach((cfg, index) => {
        const clone = cfg.levels[index]?.model.clone() || model.clone();
        clone.visible = false;
        lod.addLevel(clone, cfg.levels[index]?.distance || 0);
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
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    });
    this.lodObjects.clear();
  }
};

// src/core/orchestrator/plugins/MeasurementToolPlugin.ts
var MeasurementToolPlugin = class {
  name = "MeasurementTool";
  points = [];
  line;
  spheres = [];
  onMeasure;
  constructor(onMeasure) {
    this.onMeasure = onMeasure ?? (() => {
    });
  }
  install({ scene, camera, renderer, orchestrator }) {
    const handlePointerDown = (e) => {
      if (e.button !== 0) {
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
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
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05),
        new THREE.MeshBasicMaterial({ color: 65280 })
      );
      sphere.position.copy(point);
      scene.add(sphere);
      this.spheres.push(sphere);
      this.onMeasure?.({ point, points: [...this.points] });
      if (this.points.length === 2) {
        const distance = this.points[0].distanceTo(this.points[1]);
        this.onMeasure?.({ point, distance, points: [...this.points] });
        const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        const material = new THREE.LineBasicMaterial({ color: 65280 });
        this.line = new THREE.Line(geometry, material);
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
      this.line.parent?.remove(this.line);
      this.line.geometry.dispose();
      if (Array.isArray(this.line.material)) {
        this.line.material.forEach((mat) => mat.dispose());
      } else {
        this.line.material.dispose();
      }
      this.line = void 0;
    }
    this.spheres.forEach((s) => {
      s.parent?.remove(s);
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
};

// src/core/orchestrator/plugins/OrbitControlsPlugin.ts
import { OrbitControls as OrbitControls3 } from "three/examples/jsm/controls/OrbitControls.js";
var OrbitControlsPlugin = class {
  name = "OrbitControls";
  controls;
  install({ camera, renderer }) {
    this.controls = new OrbitControls3(camera, renderer.domElement);
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
    this.controls?.dispose();
  }
};

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = class {
  name = "Raycaster";
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  hovered = null;
  onEvent;
  constructor(onEvent) {
    this.onEvent = onEvent ?? (() => {
    });
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
        this.onEvent?.({ type: "click", object: intersect.object, point: intersect.point });
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
        this.onEvent?.({ type: "leave", object: this.hovered });
      }
      this.hovered = hit.object;
      this.onEvent?.({ type: "hover", object: hit.object, point: hit.point });
    } else if (!hit && this.hovered) {
      this.onEvent?.({ type: "leave", object: this.hovered });
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
};

// src/core/orchestrator/plugins/PostProcessingPlugin.ts
import { EffectComposer as EffectComposer2 } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass as RenderPass2 } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass as UnrealBloomPass2 } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
var PostProcessingPlugin = class {
  constructor(options = { strength: 1.5, radius: 0.4, threshold: 0 }) {
    this.options = options;
  }
  name = "PostProcessing";
  composer;
  bloomPass;
  install({ scene, camera, renderer }) {
    this.composer = new EffectComposer2(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    const renderPass = new RenderPass2(scene, camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new UnrealBloomPass2(
      new THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
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
};

// src/hooks/useScene.ts
var useScene2 = () => {
  return useScene();
};

// src/hooks/useModel.ts
import { useEffect as useEffect2, useState as useState2 } from "react";
var useModel = (entry, options = {}) => {
  const { draco = false, autoLoad = true } = options;
  const orchestrator = useScene2();
  const [model, setModel] = useState2(null);
  const [loading, setLoading] = useState2(false);
  const [error, setError] = useState2(null);
  useEffect2(() => {
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
  }, [entry?.id, draco]);
  const load = () => entry && orchestrator.setModel(entry, { draco });
  return { model, loading, error, load };
};

// src/hooks/useActiveModel.ts
var useActiveModel = () => {
  const orchestrator = useScene2();
  return orchestrator.getActiveModel();
};

// src/hooks/useHDRI.ts
import { useEffect as useEffect3, useState as useState3 } from "react";
var useHDRI = (entry) => {
  const orchestrator = useScene2();
  const [hdri, setHDRI] = useState3(null);
  const [loading, setLoading] = useState3(false);
  useEffect3(() => {
    if (!entry) {
      return;
    }
    setLoading(true);
    orchestrator.setHDRI(entry).then((tex) => {
      setHDRI(tex);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [entry?.id]);
  const clear = () => orchestrator.clearHDRI();
  return { hdri, loading, clear };
};

// src/hooks/useRaycaster.ts
import { useEffect as useEffect4 } from "react";
var useRaycaster = (onEvent) => {
  const orchestrator = useScene2();
  useEffect4(() => {
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
import { useEffect as useEffect5 } from "react";
var useAnimation = (clipName, play = true) => {
  const model = useActiveModel();
  useEffect5(() => {
    if (!model || !model.animations) {
      return;
    }
    const clip = model.animations.find((a) => a.name === clipName);
    if (!clip) {
      return;
    }
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    if (play) {
      action.play();
    }
    const clock = new THREE.Clock();
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
import { useEffect as useEffect6 } from "react";
var AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
  const orchestrator = useScene2();
  useEffect6(() => {
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
import { useEffect as useEffect7, useState as useState4, useRef } from "react";
import { Fragment, jsx as jsx3 } from "react/jsx-runtime";
var tempVector1 = new THREE.Vector3();
var tempVector2 = new THREE.Vector3();
var tempVector3 = new THREE.Vector3();
var tempVector2_1 = new THREE.Vector2();
var tempVector2_2 = new THREE.Vector2();
var tempPlane = new THREE.Plane();
var tempQuaternion = new THREE.Quaternion();
var tempRaycaster = new THREE.Raycaster();
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
  const [isEnabled, setIsEnabled] = useState4(defaultEnabled);
  const [isResetting, setIsResetting] = useState4(false);
  const [plugin, setPlugin] = useState4(null);
  const originalStates = useRef(/* @__PURE__ */ new Map());
  useEffect7(() => {
    if (!activeModel || !camera) {
      return;
    }
    const newPlugin = new AdvancedRaycasterPlugin(activeModel, (event) => {
      if (!isEnabled) {
        return;
      }
      let isDragging = false;
      let startPosition = new THREE.Vector2();
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
          onDragStart?.(event.object);
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
              onDrag?.(currentObject, tempVector3.clone());
            }
            startPosition.copy(event.currentPosition);
          }
          break;
        case "objectdragend":
          if (isDragging) {
            onDragEnd?.(event.object);
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
  useEffect7(() => {
    plugin?.manager.setEnabled(isEnabled);
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
  return /* @__PURE__ */ jsx3(Fragment, { children: children({
    isEnabled,
    toggleEnabled,
    setEnabled,
    resetAll,
    isResetting
  }) });
};

// src/react/components/AdvancedOrbitControls.tsx
import { useEffect as useEffect8, useState as useState5 } from "react";
import { Fragment as Fragment2, jsx as jsx4 } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  children,
  defaultEnabled = true,
  ...config
}) => {
  const orchestrator = useScene2();
  const [panEnabled, setPanEnabled] = useState5(defaultEnabled);
  const [rotateEnabled, setRotateEnabled] = useState5(defaultEnabled);
  const [zoomEnabled, setZoomEnabled] = useState5(defaultEnabled);
  const [plugin, setPlugin] = useState5(
    null
  );
  useEffect8(() => {
    const newPlugin = new AdvancedOrbitControlsPlugin(config);
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    newPlugin.setAllEnabled(defaultEnabled);
    return () => {
      newPlugin.dispose();
    };
  }, []);
  useEffect8(() => {
    plugin?.setPanEnabled(panEnabled);
  }, [plugin, panEnabled]);
  useEffect8(() => {
    plugin?.setRotateEnabled(rotateEnabled);
  }, [plugin, rotateEnabled]);
  useEffect8(() => {
    plugin?.setZoomEnabled(zoomEnabled);
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
  return /* @__PURE__ */ jsx4(Fragment2, { children: children(state) });
};

// src/react/components/AdvancedRaycaster.tsx
import { useEffect as useEffect9 } from "react";
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
  useEffect9(() => {
    const plugin = new AdvancedRaycasterPlugin(
      customModel || activeModel || void 0,
      (e) => {
        switch (e.type) {
          case "objectclick":
            onClick?.(e);
            break;
          case "objecthoverin":
            onHoverIn?.(e);
            break;
          case "objecthoverout":
            onHoverOut?.(e);
            break;
          case "objecthovermove":
            onHoverMove?.(e);
            break;
          case "objectdragstart":
            onDragStart?.(e);
            break;
          case "objectdrag":
            onDrag?.(e);
            break;
          case "objectdragend":
            onDragEnd?.(e);
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
import { useEffect as useEffect10 } from "react";
var AmbientLight = ({
  intensity = 0.5,
  color = 16777215
}) => {
  const { scene } = useScene2();
  useEffect10(() => {
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
    return () => {
      scene.remove(light);
      light.dispose();
    };
  }, [intensity, color]);
  return null;
};

// src/react/components/AnimationTimeline.tsx
import { useEffect as useEffect11, useRef as useRef2 } from "react";
var AnimationTimeline = ({
  steps,
  loop = false,
  autoplay = true
}) => {
  const model = useActiveModel();
  const mixerRef = useRef2(null);
  const actionsRef = useRef2(/* @__PURE__ */ new Map());
  const clock = useRef2(new THREE.Clock());
  useEffect11(() => {
    if (!model || !model.animations) {
      return;
    }
    const mixer = new THREE.AnimationMixer(model);
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
import React5, { useEffect as useEffect12 } from "react";
var Annotations = ({ annotations }) => {
  const orchestrator = useScene2();
  useEffect12(() => {
    const data = annotations.map((ann) => {
      const target = typeof ann.target === "string" ? orchestrator.scene.getObjectByName(ann.target) : ann.target;
      const content = typeof ann.content === "string" ? ann.content : React5.isValidElement(ann.content) ? ann.content.props.children : String(ann.content);
      return {
        id: ann.id,
        position: new THREE.Vector3(...ann.position),
        target,
        content,
        offset: ann.offset ? new THREE.Vector3(...ann.offset) : void 0
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
import { useEffect as useEffect13 } from "react";
import { ARButton as ThreeARButton } from "three/examples/jsm/webxr/ARButton.js";
var ARButton = () => {
  const { renderer } = useScene2();
  useEffect13(() => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = ThreeARButton.createButton(renderer);
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
import { useEffect as useEffect14 } from "react";
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = useScene2();
  useEffect14(() => {
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
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var Canvas = forwardRef2(
  ({ config, children, ...canvasProps }, ref) => {
    return /* @__PURE__ */ jsxs(SceneProvider, { ref, config, children: [
      /* @__PURE__ */ jsx5("canvas", { ref, ...canvasProps }),
      children
    ] });
  }
);
Canvas.displayName = "Canvas";

// src/react/components/DirectionalLight.tsx
import { useEffect as useEffect15 } from "react";
var DirectionalLight = ({
  intensity = 1,
  color = 16777215,
  position = [5, 10, 7.5],
  castShadow = true,
  shadowMapSize = 2048
}) => {
  const { scene } = useScene2();
  useEffect15(() => {
    const light = new THREE.DirectionalLight(color, intensity);
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
      const helper = new THREE.DirectionalLightHelper(light, 2);
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
import { useEffect as useEffect16, useRef as useRef3, useState as useState6 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
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
  const animationRef = useRef3(0);
  const [currentDistance, setCurrentDistance] = useState6(0);
  const [initialDistance, setInitialDistance] = useState6(null);
  const getCurrentDistance = () => {
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }
    const modelCenter = new THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };
  useEffect16(() => {
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
    return /* @__PURE__ */ jsx6("div", { className, children: "Calculating initial distance\u2026" });
  }
  const percentage = Math.max(
    0,
    Math.min(100, currentDistance / initialDistance * 100)
  );
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);
  return /* @__PURE__ */ jsx6("div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage,
    initialDistance,
    formattedInitial
  }) });
};

// src/react/components/EnvironmentPreset.tsx
import { useEffect as useEffect17 } from "react";
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
  useEffect17(() => {
    const url = PRESETS[name];
    if (!url) {
      console.warn(`EnvironmentPreset: "${name}" no encontrado`);
      return;
    }
    const loader = new EXRLoader();
    loader.setDataType(THREE.HalfFloatType);
    loader.load(url, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
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
        if (!(orchestrator.scene.background instanceof THREE.Color)) {
          orchestrator.scene.background.dispose();
        }
        orchestrator.scene.background = null;
      }
    };
  }, [name, intensity, blur]);
  return null;
};

// src/react/components/ErrorBoundary3D.tsx
import { Component } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ErrorBoundary3D = class extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error 3D capturado:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || /* @__PURE__ */ jsx7("div", { className: "text-red-500", children: "Error al cargar modelo 3D" });
    }
    return this.props.children;
  }
};

// src/react/components/GroundSurface.tsx
import { useEffect as useEffect18 } from "react";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
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
  useEffect18(() => {
    if (!camera) {
      return;
    }
    const preset = PRESETS2[type];
    const finalColor = custom.color ?? preset.color;
    const finalRoughness = custom.roughness ?? preset.roughness;
    const finalMetalness = custom.metalness ?? preset.metalness;
    const finalOpacity = custom.opacity ?? preset.opacity ?? 1;
    const finalTransparent = custom.transparent ?? preset.transparent ?? false;
    let ground;
    if (preset.reflective && size) {
      const geometry = new THREE.PlaneGeometry(size, size);
      ground = new Reflector(geometry, {
        clipBias: 3e-3,
        textureWidth: resolution,
        textureHeight: resolution,
        color: new THREE.Color(finalColor)
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
      const geometry = size ? new THREE.PlaneGeometry(size, size) : new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshStandardMaterial({
        color: finalColor,
        roughness: finalRoughness,
        metalness: finalMetalness,
        opacity: finalOpacity,
        transparent: finalTransparent,
        side: THREE.DoubleSide
      });
      ground = new THREE.Mesh(geometry, material);
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
import { useEffect as useEffect19 } from "react";
var HDRI = ({ entry }) => {
  const orchestrator = useScene2();
  useEffect19(() => {
    orchestrator.setHDRI(entry);
  }, [entry.id]);
  return null;
};

// src/react/components/Hotspot.tsx
import { useEffect as useEffect20 } from "react";
var Hotspot = ({
  id,
  position,
  target,
  onClick
}) => {
  const orchestrator = useScene2();
  useEffect20(() => {
    const plugin = new HotspotPlugin([
      {
        id,
        position: new THREE.Vector3(...position),
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
import { useEffect as useEffect21 } from "react";
import * as THREE3 from "three";
var Hotspots = ({ hotspots }) => {
  const orchestrator = useScene2();
  useEffect21(() => {
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
import { useEffect as useEffect22, useRef as useRef4 } from "react";
var InstancedModel = ({
  entry,
  instances,
  draco = false,
  castShadow = true,
  receiveShadow = true
}) => {
  const orchestrator = useScene2();
  const scene = orchestrator.scene;
  const groupRef = useRef4(new THREE.Group());
  const instancedMeshes = useRef4(/* @__PURE__ */ new Map());
  useEffect22(() => {
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
            mesh.material?.dispose();
          }
        });
        instancedMeshes.current.clear();
        model.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) {
            return;
          }
          const geometry = child.geometry;
          const material = Array.isArray(child.material) ? child.material[0] : child.material;
          const count = instances.length;
          const instancedMesh = new THREE.InstancedMesh(
            geometry,
            material,
            count
          );
          instancedMesh.castShadow = castShadow;
          instancedMesh.receiveShadow = receiveShadow;
          const dummy = new THREE.Object3D();
          const color = new THREE.Color();
          instances.forEach((instance, i) => {
            dummy.position.copy(instance.position);
            if (instance.rotation instanceof THREE.Euler) {
              dummy.rotation.copy(instance.rotation);
            } else if (instance.rotation instanceof THREE.Quaternion) {
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
              instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            }
          });
          if (material instanceof THREE.Material) {
            instancedMesh.instanceColor = material.vertexColors ? null : new THREE.InstancedBufferAttribute(
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
          mesh.material?.dispose();
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
import { useEffect as useEffect23 } from "react";
var LODSystem = ({
  levels,
  hysteresis = 0.1
}) => {
  const orchestrator = useScene2();
  useEffect23(() => {
    const plugin = new LODSystemPlugin([{ levels, hysteresis }]);
    orchestrator.use(plugin);
    return () => {
      plugin.dispose();
    };
  }, [levels, hysteresis]);
  return null;
};

// src/react/components/MeasurementTool.tsx
import { useEffect as useEffect24 } from "react";
var MeasurementTool = ({
  enabled = true,
  color = "#00ff00",
  onMeasure
}) => {
  const orchestrator = useScene2();
  useEffect24(() => {
    if (!enabled) {
      return;
    }
    const plugin = new MeasurementToolPlugin((event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        onMeasure?.(event.distance, [event.points[0], event.points[1]]);
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
import { useEffect as useEffect25, useState as useState7 } from "react";
var Model = ({
  entry,
  draco = false,
  children
}) => {
  const orchestrator = useScene2();
  const [model, setModel] = useState7(null);
  useEffect25(() => {
    const load = async () => {
      const gltf = await orchestrator.setModel(entry, { draco });
      setModel(gltf);
    };
    load();
  }, [entry.id, draco]);
  if (!model) {
    return null;
  }
  return children?.(model);
};

// src/react/components/ModelPreload.tsx
import { useEffect as useEffect26 } from "react";
var ModelPreload = ({
  entries,
  draco = false
}) => {
  useEffect26(() => {
    entries.forEach((entry) => {
      GLTFLoader2.load(entry, { draco }).catch(() => {
      });
    });
  }, [entries, draco]);
  return null;
};

// src/react/components/OrbitControls.tsx
import { useEffect as useEffect27 } from "react";
var OrbitControls4 = () => {
  const orchestrator = useScene2();
  useEffect27(() => {
    orchestrator.use(new OrbitControlsPlugin());
  }, []);
  return null;
};

// src/react/components/PointLight.tsx
import { useEffect as useEffect28 } from "react";
var PointLight = ({
  intensity = 1,
  color = 16777215,
  position = [0, 5, 0],
  distance = 0,
  decay = 2
}) => {
  const { scene } = useScene2();
  useEffect28(() => {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(...position);
    scene.add(light);
    if (process.env.NODE_ENV === "development") {
      const helper = new THREE.PointLightHelper(light, 0.5);
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
import { useEffect as useEffect29 } from "react";
var PostProcessing = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true
}) => {
  const orchestrator = useScene2();
  useEffect29(() => {
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
import { useEffect as useEffect30 } from "react";
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = useScene2();
  useEffect30(() => {
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
import { useEffect as useEffect31 } from "react";
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
  useEffect31(() => {
    const light = new THREE.SpotLight(
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
      const helper = new THREE.SpotLightHelper(light);
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
import { Suspense as SuspenseReact } from "react";
import { jsx as jsx8, jsxs as jsxs2 } from "react/jsx-runtime";
var Suspense = ({
  children,
  fallback,
  loadingMessage = "Loading 3D model..."
}) => {
  const defaultFallback = /* @__PURE__ */ jsx8("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50", children: /* @__PURE__ */ jsxs2("div", { className: "bg-gray-900/90 border border-gray-700 rounded-xl p-8 shadow-2xl text-center", children: [
    /* @__PURE__ */ jsx8("div", { className: "w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
    /* @__PURE__ */ jsx8("p", { className: "text-xl font-semibold text-white", children: loadingMessage }),
    /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-400 mt-2", children: "This may take a few seconds..." })
  ] }) });
  return /* @__PURE__ */ jsx8(SuspenseReact, { fallback: fallback || defaultFallback, children });
};

// src/react/components/SuspenseModel.tsx
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
var SuspenseModel = ({
  entry,
  draco,
  fallback = /* @__PURE__ */ jsxs3("div", { className: "text-white", children: [
    "Loading model ",
    entry.id,
    "..."
  ] }),
  children
}) => {
  return /* @__PURE__ */ jsx9(Suspense, { fallback, children: /* @__PURE__ */ jsx9(Model, { entry, draco, children: (model) => children?.(model) }) });
};

// src/react/components/TheaterLighting.tsx
import { useEffect as useEffect32 } from "react";
var TheaterLighting = ({
  intensity = 2,
  count = 8
}) => {
  const { scene } = useScene2();
  useEffect32(() => {
    const lights = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const light = new THREE.PointLight(16777215, intensity);
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
import { useEffect as useEffect33 } from "react";
import { VRButton as ThreeVRButton } from "three/examples/jsm/webxr/VRButton.js";
var VRButton = () => {
  const { renderer } = useScene2();
  useEffect33(() => {
    if (!renderer) {
      return;
    }
    renderer.xr.enabled = true;
    const button = ThreeVRButton.createButton(renderer);
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
import { useEffect as useEffect34, useState as useState8 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var AnimationController = ({
  children,
  className
}) => {
  const model = useActiveModel();
  const [clips, setClips] = useState8([]);
  const [mixer, setMixer] = useState8(
    () => new THREE.AnimationMixer(null)
  );
  const [actions, setActions] = useState8(
    /* @__PURE__ */ new Map()
  );
  const [playing, setPlaying] = useState8(/* @__PURE__ */ new Set());
  const [reversed, setReversed] = useState8(/* @__PURE__ */ new Set());
  useEffect34(() => {
    if (!model) {
      setClips([]);
      mixer.stopAllAction();
      return;
    }
    if (model.animations && model.animations.length > 0) {
      setClips(model.animations);
      setMixer(new THREE.AnimationMixer(model));
      mixer.setTime(0);
      const newActions = /* @__PURE__ */ new Map();
      model.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.enabled = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.reset();
        newActions.set(clip.name, action);
      });
      setActions(newActions);
    }
    const clock = new THREE.Clock();
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
  return /* @__PURE__ */ jsx10("div", { className, children: children(animationList) });
};

// src/react/controls/LightingController.tsx
import React11, { useState as useState9 } from "react";
import { jsx as jsx11, jsxs as jsxs4 } from "react/jsx-runtime";
var LightingController = ({
  className
}) => {
  const { scene } = useScene2();
  const [intensity, setIntensity] = useState9(1);
  const updateLights = (value) => {
    setIntensity(value);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.intensity = value * (obj.userData.baseIntensity || 1);
      }
    });
  };
  React11.useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) {
        obj.userData.baseIntensity = obj.intensity;
      }
    });
  }, [scene]);
  return /* @__PURE__ */ jsxs4("div", { className: `bg-black/80 text-white p-4 rounded-lg ${className || ""}`, children: [
    /* @__PURE__ */ jsx11("h3", { className: "text-lg font-bold mb-3", children: "Iluminaci\xF3n Global" }),
    /* @__PURE__ */ jsxs4("label", { className: "block", children: [
      /* @__PURE__ */ jsxs4("span", { className: "text-sm", children: [
        "Intensidad: ",
        intensity.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx11(
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
import { useEffect as useEffect35, useState as useState10 } from "react";

// src/core/utils/QuadWireframe.ts
var createQuadWireframe = (geometry) => {
  const position = geometry.attributes.position;
  const indices = geometry.index?.array;
  const vertices = [];
  const edgeMap = /* @__PURE__ */ new Map();
  const getKey = (a, b) => a < b ? `${a},${b}` : `${b},${a}`;
  if (!indices) {
    return new THREE.EdgesGeometry(geometry, 30);
  }
  if (!position) {
    return new THREE.EdgesGeometry(geometry, 30);
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
    const isQuad = (trianglePairs.get(diagonal.key)?.length || 0) > 1;
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
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  return geo;
};

// src/react/controls/MaterialController.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var MaterialController = ({
  materials,
  transitionDuration = 0,
  children,
  className
}) => {
  const model = useActiveModel();
  const [activeName, setActiveName] = useState10(null);
  const [isTransitioning, setIsTransitioning] = useState10(false);
  useEffect35(() => {
    if (!model) {
      return;
    }
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (!child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
      }
      if (!child.getObjectByName(`${child.name}-wireframe`)) {
        const wireGeo = createQuadWireframe(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0,
          linewidth: 3,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1
        });
        const wireframe = new THREE.LineSegments(wireGeo, lineMat);
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
      if (child instanceof THREE.Mesh) {
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
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 8947848,
          metalness: config.metalness ?? 0,
          roughness: config.roughness ?? 0.9
        });
        if (wireframe) {
          wireframe.visible = false;
        }
        break;
      case "wireframe":
        newMat = new THREE.MeshStandardMaterial({
          color: config.color ?? 8947848,
          metalness: config.metalness ?? 0,
          roughness: config.roughness ?? 0.9,
          transparent: true,
          opacity: 0.95
        });
        if (wireframe) {
          wireframe.visible = true;
          wireframe.material.color.set(
            config.lineColor ?? 0
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
  useEffect35(() => {
    if (items.length > 0 && !activeName) {
      items[0]?.apply?.();
    }
  }, [items]);
  if (!model || items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx12("div", { className, children: children(items) });
};

// src/react/primitives/SceneObject.tsx
import { useEffect as useEffect36 } from "react";
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
  useEffect36(() => {
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
    } else if (parent instanceof THREE.Object3D) {
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
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
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
export {
  ARButton,
  AdvancedCameraCollision,
  AdvancedCameraCollisionPlugin,
  AdvancedDragRaycaster,
  AdvancedOrbitControls,
  AdvancedOrbitControlsPlugin,
  AdvancedRaycaster,
  AdvancedRaycasterPlugin,
  AmbientLight,
  AnimationController,
  AnimationTimeline,
  Annotations,
  AnnotationsPlugin,
  AutoLODSystem,
  AutoLODSystemPlugin,
  CacheProvider,
  CacheValidator,
  Canvas,
  DirectionalLight,
  DistanceDisplay,
  EnvironmentPreset,
  ErrorBoundary3D,
  FileWatcher,
  GLTFLoader2 as GLTFLoader,
  GroundSurface,
  HDRI,
  HDRILoader,
  Hotspot,
  HotspotPlugin,
  Hotspots,
  InstancedModel,
  LODSystem,
  LODSystemPlugin,
  LightingController,
  MaterialController,
  MeasurementTool,
  MeasurementToolPlugin,
  Model,
  ModelPreload,
  ObjectCache,
  OrbitControls4 as OrbitControls,
  OrbitControlsPlugin,
  PointLight,
  PostProcessing,
  PostProcessingPlugin,
  Raycaster,
  RaycasterPlugin,
  SceneObject,
  SceneOrchestrator,
  SceneProvider,
  SpotLight,
  Suspense,
  SuspenseModel,
  THREE,
  THREE_VERSION,
  TheaterLighting,
  DRACOLoader as ThreeDRACOLoader,
  EXRLoader as ThreeEXRLoader,
  EffectComposer as ThreeEffectComposer,
  GLTFLoader as ThreeGLTFLoader,
  OrbitControls as ThreeOrbitControls,
  RGBELoader as ThreeRGBELoader,
  RenderPass as ThreeRenderPass,
  UnrealBloomPass as ThreeUnrealBloomPass,
  VRButton,
  WebPHDRLoader,
  useActiveModel,
  useAnimation,
  useCache2 as useCache,
  useHDRI,
  useModel,
  useRaycaster,
  useScene2 as useScene
};
