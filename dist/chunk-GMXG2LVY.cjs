"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/LODSystemPlugin.ts
var LODSystemPlugin = (_class = class {
  __init() {this.name = "LODSystem"}
  
  
  
  __init2() {this.lods = /* @__PURE__ */ new Map()}
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.config = {
      levels: config.levels,
      hysteresis: _nullishCoalesce(config.hysteresis, () => ( 0))
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
          if (child instanceof _chunkEA3XQ4KJcjs.THREE.LOD) {
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
      levels: _nullishCoalesce(newConfig.levels, () => ( this.config.levels)),
      hysteresis: _nullishCoalesce(newConfig.hysteresis, () => ( this.config.hysteresis))
    };
    this.lods.forEach((lod, originalModel) => {
      this.rebuildLOD(originalModel, lod);
    });
  }
  applyLOD(model) {
    if (this.lods.has(model)) {
      return;
    }
    const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
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
      _optionalChain([obj, 'access', _ => _.parent, 'optionalAccess', _2 => _2.remove, 'call', _3 => _3(obj)]);
      obj.traverse((child) => {
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
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _10 => _10.geometry, 'optionalAccess', _11 => _11.dispose, 'call', _12 => _12()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _13 => _13.material, 'optionalAccess', _14 => _14.dispose, 'call', _15 => _15()]);
          }
        }
      });
    });
    this.lods.clear();
  }
}, _class);



exports.LODSystemPlugin = LODSystemPlugin;
