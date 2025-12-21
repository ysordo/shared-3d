"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AutoLODSystemPlugin.ts
var _SimplifyModifierjs = require('three/examples/jsm/modifiers/SimplifyModifier.js');
var AutoLODSystemPlugin = (_class = class {
  __init() {this.name = "AutoLODSystem"}
  
  
  __init2() {this.lods = /* @__PURE__ */ new Map()}
  
  
  __init3() {this.simplifier = new (0, _SimplifyModifierjs.SimplifyModifier)()}
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.config = {
      distances: config.distances,
      reductionPercentages: _nullishCoalesce(config.reductionPercentages, () => ( [0.5, 0.2]))
    };
  }
  install({ camera, orchestrator }) {
    this.camera = camera;
    this.orchestrator = orchestrator;
    const activeModel = this.orchestrator.getActiveModel();
    if (activeModel) {
      this.applyLODToModel(activeModel);
    }
    this.originalSetModel = this.orchestrator.setModel.bind(this.orchestrator);
    this.orchestrator.setModel = async (...args) => {
      await this.originalSetModel(...args);
      const newModel = this.orchestrator.getActiveModel();
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
      reductionPercentages: _nullishCoalesce(newConfig.reductionPercentages, () => ( this.config.reductionPercentages))
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
    const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
    const high = model.clone(true);
    high.visible = true;
    lod.addLevel(high, 0);
    const medium = model.clone(true);
    this.simplifyMeshes(medium, this.config.reductionPercentages[0]);
    lod.addLevel(medium, this.config.distances[0]);
    const low = model.clone(true);
    this.simplifyMeshes(low, this.config.reductionPercentages[1]);
    lod.addLevel(low, this.config.distances[1]);
    const empty = new _chunkEA3XQ4KJcjs.THREE.Object3D();
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
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && child.geometry) {
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
      this.orchestrator.setModel = this.originalSetModel;
    }
    this.lods.forEach((lod, originalModel) => {
      if (lod.parent) {
        lod.parent.remove(lod);
      }
      lod.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _ => _.geometry, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _4 => _4.material, 'optionalAccess', _5 => _5.dispose, 'call', _6 => _6()]);
          }
        }
      });
    });
    this.lods.clear();
  }
}, _class);



exports.AutoLODSystemPlugin = AutoLODSystemPlugin;
