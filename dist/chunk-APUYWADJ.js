import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/LODSystemPlugin.ts
var LODSystemPlugin = class {
  name = "LODSystem";
  camera;
  orchestrator;
  config;
  lods = /* @__PURE__ */ new Map();
  originalSetModel;
  constructor(config) {
    this.config = {
      levels: config.levels,
      hysteresis: config.hysteresis ?? 0
    };
  }
  install({ camera, orchestrator }) {
    this.camera = camera;
    this.orchestrator = orchestrator;
    const activeModel = this.orchestrator.activeModel.get;
    if (activeModel) {
      this.applyLOD(activeModel);
    }
    this.originalSetModel = this.orchestrator.activeModel.set.bind(this.orchestrator);
    this.orchestrator.activeModel.set = async (...args) => {
      await this.originalSetModel(...args);
      const newModel = this.orchestrator.activeModel.get;
      if (newModel) {
        this.applyLOD(newModel);
      }
    };
  }
  preRender() {
    this.lods.forEach((lod) => {
      if (this.config.hysteresis > 0) {
        lod.children.forEach((child) => {
          if (child instanceof THREE.LOD) {
            return;
          }
        });
      }
      lod.update(this.camera);
    });
  }
  update(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      levels: newConfig.levels ?? this.config.levels,
      hysteresis: newConfig.hysteresis ?? this.config.hysteresis
    };
    this.lods.forEach((lod, originalModel) => {
      this.rebuildLOD(originalModel, lod);
    });
  }
  applyLOD(model) {
    if (this.lods.has(model)) {
      return;
    }
    const lod = new THREE.LOD();
    this.buildLODLevels(lod);
    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }
    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);
    this.lods.set(model, lod);
  }
  buildLODLevels(lod) {
    this.config.levels.forEach((level) => {
      const clone = level.model.clone(true);
      clone.visible = true;
      lod.addLevel(clone, level.distance);
    });
  }
  rebuildLOD(originalModel, lod) {
    lod.levels.forEach((level) => {
      const obj = level.object;
      obj.parent?.remove(obj);
      obj.traverse((child) => {
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
    lod.levels.length = 0;
    this.buildLODLevels(lod);
  }
  dispose() {
    if (this.originalSetModel && this.orchestrator) {
      this.orchestrator.activeModel.set = this.originalSetModel;
    }
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

export {
  LODSystemPlugin
};
