import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/AutoLODSystemPlugin.ts
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier.js";
var AutoLODSystemPlugin = class {
  name = "AutoLODSystem";
  camera;
  orchestrator;
  lods = /* @__PURE__ */ new Map();
  originalSetModel;
  config;
  simplifier = new SimplifyModifier();
  constructor(config) {
    this.config = {
      distances: config.distances,
      reductionPercentages: config.reductionPercentages ?? [0.5, 0.2]
    };
  }
  install({ camera, orchestrator }) {
    this.camera = camera;
    this.orchestrator = orchestrator;
    const activeModel = this.orchestrator.activeModel.get;
    if (activeModel) {
      this.applyLODToModel(activeModel);
    }
    this.originalSetModel = this.orchestrator.activeModel.set.bind(this.orchestrator);
    this.orchestrator.activeModel.set = async (...args) => {
      await this.originalSetModel(...args);
      const newModel = this.orchestrator.activeModel.get;
      if (newModel) {
        this.applyLODToModel(newModel);
      }
    };
  }
  preRender() {
    this.lods.forEach((lod) => lod.update(this.camera));
  }
  update(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      reductionPercentages: newConfig.reductionPercentages ?? this.config.reductionPercentages
    };
    this.lods.forEach((lod, originalModel) => {
      this.rebuildSimplifiedLevels(lod, originalModel);
      lod.levels[1].distance = this.config.distances[0];
      lod.levels[2].distance = this.config.distances[1];
      lod.levels[3].distance = this.config.distances[2];
    });
  }
  applyLODToModel(model) {
    if (this.lods.has(model)) {
      const existingLOD = this.lods.get(model);
      this.rebuildSimplifiedLevels(existingLOD, model);
      return;
    }
    const lod = new THREE.LOD();
    const high = model.clone(true);
    high.visible = true;
    lod.addLevel(high, 0);
    const medium = model.clone(true);
    this.simplifyMeshes(medium, this.config.reductionPercentages[0]);
    lod.addLevel(medium, this.config.distances[0]);
    const low = model.clone(true);
    this.simplifyMeshes(low, this.config.reductionPercentages[1]);
    lod.addLevel(low, this.config.distances[1]);
    const empty = new THREE.Object3D();
    empty.visible = false;
    lod.addLevel(empty, this.config.distances[2]);
    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }
    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);
    this.lods.set(model, lod);
  }
  simplifyMeshes(object, percentage) {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const originalGeo = child.geometry;
        const simplifiedGeo = this.simplifier.modify(
          originalGeo.clone(),
          Math.floor(originalGeo.getAttribute("position").count * percentage)
        );
        child.geometry.dispose();
        child.geometry = simplifiedGeo;
      }
    });
  }
  rebuildSimplifiedLevels(lod, originalModel) {
    const medium = lod.levels[1].object;
    if (medium) {
      this.simplifyMeshes(medium, this.config.reductionPercentages[0]);
    }
    const low = lod.levels[2].object;
    if (low) {
      this.simplifyMeshes(low, this.config.reductionPercentages[1]);
    }
  }
  dispose() {
    if (this.originalSetModel && this.orchestrator) {
      this.orchestrator.activeModel.set = this.originalSetModel;
    }
    this.lods.forEach((lod, originalModel) => {
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
  AutoLODSystemPlugin
};
