"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/LODSystemPlugin.ts
var LODSystemPlugin = (_class = class {
  __init() {this.name = "LODSystem"}
  
  
  
  __init2() {this.lods = /* @__PURE__ */ new Map()}
  __init3() {this.rafId = null}
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
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
    const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
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
      _optionalChain([level, 'access', _ => _.object, 'access', _2 => _2.parent, 'optionalAccess', _3 => _3.remove, 'call', _4 => _4(level.object)]);
      level.object.traverse((obj) => {
        if (obj instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([obj, 'access', _5 => _5.geometry, 'optionalAccess', _6 => _6.dispose, 'call', _7 => _7()]);
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([obj, 'access', _8 => _8.material, 'optionalAccess', _9 => _9.dispose, 'call', _10 => _10()]);
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
      _optionalChain([lod, 'access', _11 => _11.parent, 'optionalAccess', _12 => _12.remove, 'call', _13 => _13(lod)]);
      lod.traverse((obj) => {
        if (obj instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([obj, 'access', _14 => _14.geometry, 'optionalAccess', _15 => _15.dispose, 'call', _16 => _16()]);
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([obj, 'access', _17 => _17.material, 'optionalAccess', _18 => _18.dispose, 'call', _19 => _19()]);
          }
        }
      });
    });
    this.lods.clear();
  }
}, _class);



exports.LODSystemPlugin = LODSystemPlugin;
