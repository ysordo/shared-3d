import {
  THREE
} from "./chunk-OVHQQSEK.js";

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
  rafId = null;
  orchestrator;
  originalSetModel;
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
        child.geometry = this.simplifyGeometry(child.geometry.clone(), this.config.reductionPercentages[0]);
      }
    });
    lod.addLevel(medium, this.config.distances[0]);
    const low = model.clone();
    low.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry.clone(), this.config.reductionPercentages[1]);
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
    this.orchestrator = orchestrator;
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
    this.originalSetModel = orchestrator.setModel.bind(orchestrator);
    orchestrator.setModel = async (...args) => {
      const model = await this.originalSetModel(...args);
      this.lods.forEach((lod) => lod.parent?.remove(lod));
      this.lods.clear();
      applyLODToModel(model);
      return model;
    };
    const update = () => {
      this.lods.forEach((lod) => lod.update(this.camera));
      this.rafId = requestAnimationFrame(update);
    };
    if (!this.rafId) {
      update();
    }
  }
  dispose() {
    if (this.originalSetModel) {
      this.orchestrator.setModel = this.originalSetModel;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
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
  AutoLODSystemPlugin
};
