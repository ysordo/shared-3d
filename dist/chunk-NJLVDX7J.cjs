"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AutoLODSystemPlugin.ts
var _SimplifyModifierjs = require('three/examples/jsm/modifiers/SimplifyModifier.js');
var AutoLODSystemPlugin = (_class = class {
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.config = config;
    this.config.reductionPercentages = this.config.reductionPercentages || [0.5, 0.2];
  }
  __init() {this.name = "AutoLODSystem"}
  __init2() {this.lods = /* @__PURE__ */ new Map()}
  
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
          this.lods.forEach((lod) => _optionalChain([lod, 'access', _ => _.parent, 'optionalAccess', _2 => _2.remove, 'call', _3 => _3(lod)]));
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
          _optionalChain([child, 'access', _4 => _4.geometry, 'optionalAccess', _5 => _5.dispose, 'call', _6 => _6()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _7 => _7.material, 'optionalAccess', _8 => _8.dispose, 'call', _9 => _9()]);
          }
        }
      });
    });
    this.lods.clear();
  }
}, _class);



exports.AutoLODSystemPlugin = AutoLODSystemPlugin;
