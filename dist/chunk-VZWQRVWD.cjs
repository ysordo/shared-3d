"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AutoLODSystemPlugin.ts
var _SimplifyModifierjs = require('three/examples/jsm/modifiers/SimplifyModifier.js');
var AutoLODSystemPlugin = (_class = class {
  __init() {this.name = "AutoLODSystem"}
  __init2() {this.lods = /* @__PURE__ */ new Map()}
  
  __init3() {this.rafId = null}
  
  
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.config = {
      ...config,
      reductionPercentages: _nullishCoalesce(config.reductionPercentages, () => ( [0.5, 0.2]))
    };
  }
  /** Permite actualizar la configuración en caliente */
  update(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      reductionPercentages: _nullishCoalesce(newConfig.reductionPercentages, () => ( this.config.reductionPercentages))
    };
    this.lods.forEach((lod, model) => this.updateLODForModel(model, lod));
  }
  simplifyGeometry(geometry, percentage) {
    const modifier = new (0, _SimplifyModifierjs.SimplifyModifier)();
    const count = Math.floor(geometry.attributes.position.count * percentage);
    return modifier.modify(geometry, count);
  }
  /** Reconstruye los niveles LOD para un modelo existente */
  updateLODForModel(model, lod) {
    lod.levels.forEach((level, idx) => {
      if (level.object instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && idx > 0 && idx < 3) {
        _optionalChain([level, 'access', _ => _.object, 'access', _2 => _2.geometry, 'optionalAccess', _3 => _3.dispose, 'call', _4 => _4()]);
        level.object.geometry = this.simplifyGeometry(
          _nullishCoalesce(_optionalChain([model, 'access', _5 => _5.children, 'access', _6 => _6[idx - 1], 'optionalAccess', _7 => _7.geometry, 'access', _8 => _8.clone, 'call', _9 => _9()]), () => ( level.object.geometry.clone())),
          this.config.reductionPercentages[idx - 1]
        );
      }
    });
  }
  createLODLevels(model) {
    const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
    const high = model.clone();
    high.visible = true;
    lod.addLevel(high, 0);
    const medium = model.clone();
    medium.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry.clone(), this.config.reductionPercentages[0]);
      }
    });
    lod.addLevel(medium, this.config.distances[0]);
    const low = model.clone();
    low.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry.clone(), this.config.reductionPercentages[1]);
      }
    });
    lod.addLevel(low, this.config.distances[1]);
    const empty = new _chunkEA3XQ4KJcjs.THREE.Object3D();
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



exports.AutoLODSystemPlugin = AutoLODSystemPlugin;
