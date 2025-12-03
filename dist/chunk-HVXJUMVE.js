import {
  THREE
} from "./chunk-OVHQQSEK.js";

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

export {
  LODSystemPlugin
};
