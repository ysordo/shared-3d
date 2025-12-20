import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/AutoLODSystemPlugin.ts
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier.js";
var AutoLODSystemPlugin = class {
  name = "AutoLODSystem";
  lods = /* @__PURE__ */ new Map();
  camera;
  rafId = null;
  orchestrator;
  originalSetModel;
  config;
  constructor(config) {
    this.config = {
      ...config,
      reductionPercentages: config.reductionPercentages ?? [0.5, 0.2]
    };
  }
  /** Permite actualizar la configuración en caliente */
  update(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      reductionPercentages: newConfig.reductionPercentages ?? this.config.reductionPercentages
    };
    this.lods.forEach((lod, model) => this.updateLODForModel(model, lod));
  }
  simplifyGeometry(geometry, percentage) {
    const modifier = new SimplifyModifier();
    const count = Math.floor(geometry.attributes.position.count * percentage);
    return modifier.modify(geometry, count);
  }
  /** Reconstruye los niveles LOD para un modelo existente */
  updateLODForModel(model, lod) {
    lod.levels.forEach((level, idx) => {
      if (level.object instanceof THREE.Mesh && idx > 0 && idx < 3) {
        level.object.geometry?.dispose();
        level.object.geometry = this.simplifyGeometry(
          model.children[idx - 1]?.geometry.clone() ?? level.object.geometry.clone(),
          this.config.reductionPercentages[idx - 1]
        );
      }
    });
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
  /** Aplica LOD a un modelo específico, reutilizando si ya existe */
  applyLODToModel(model) {
    if (this.lods.has(model)) {
      this.updateLODForModel(model, this.lods.get(model));
      return;
    }
    const lod = this.createLODLevels(model);
    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }
    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);
    this.lods.set(model, lod);
  }
  install({ camera, orchestrator }) {
    this.camera = camera;
    this.orchestrator = orchestrator;
    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {
      this.applyLODToModel(activeModel);
    }
    this.originalSetModel = orchestrator.setModel.bind(orchestrator);
    orchestrator.setModel = async (...args) => {
      await this.originalSetModel(...args);
      const model = orchestrator.getActiveModel();
      this.applyLODToModel(model);
    };
    const updateLoop = () => {
      this.lods.forEach((lod) => lod.update(this.camera));
      this.rafId = requestAnimationFrame(updateLoop);
    };
    if (!this.rafId) {
      updateLoop();
    }
  }
  dispose() {
    if (this.originalSetModel) {
      this.orchestrator.setModel = this.originalSetModel;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
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
