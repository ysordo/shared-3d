import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/LODSystemPlugin.ts
var LODSystemPlugin = class {
  name = "LODSystem";
  camera;
  orchestrator;
  config;
  lods = /* @__PURE__ */ new Map();
  rafId = null;
  originalSetModel;
  constructor(config) {
    this.config = config;
  }
  /* =========================
   *  Hot update
   * ========================= */
  update(config) {
    this.config = { ...this.config, ...config };
    this.lods.forEach((lod, model) => {
      this.rebuildLOD(model, lod);
    });
  }
  /* =========================
   *  Install
   * ========================= */
  install({ camera, orchestrator }) {
    this.camera = camera;
    this.orchestrator = orchestrator;
    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {
      this.applyLOD(activeModel);
    }
    this.originalSetModel = orchestrator.setModel.bind(orchestrator);
    orchestrator.setModel = async (...args) => {
      await this.originalSetModel(...args);
      const model = orchestrator.getActiveModel();
      if (model) {
        this.applyLOD(model);
      }
    };
    this.startLoop();
  }
  /* =========================
   *  Core logic
   * ========================= */
  applyLOD(model) {
    if (this.lods.has(model)) {
      return;
    }
    const lod = new THREE.LOD();
    this.buildLODLevels(lod, model);
    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }
    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);
    this.lods.set(model, lod);
  }
  buildLODLevels(lod, model) {
    this.config.levels.forEach((level) => {
      const clone = level.model.clone(true);
      clone.visible = true;
      lod.addLevel(clone, level.distance);
    });
  }
  rebuildLOD(model, lod) {
    lod.levels.forEach((level) => {
      level.object.parent?.remove(level.object);
      level.object.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    });
    lod.levels.length = 0;
    this.buildLODLevels(lod, model);
  }
  /* =========================
   *  Loop
   * ========================= */
  startLoop() {
    const loop = () => {
      this.lods.forEach((lod) => lod.update(this.camera));
      this.rafId = requestAnimationFrame(loop);
    };
    loop();
  }
  /* =========================
   *  Dispose
   * ========================= */
  dispose() {
    if (this.originalSetModel) {
      this.orchestrator.setModel = this.originalSetModel;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lods.forEach((lod) => {
      lod.parent?.remove(lod);
      lod.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    });
    this.lods.clear();
  }
};

export {
  LODSystemPlugin
};
