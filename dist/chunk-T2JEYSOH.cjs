"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/LODSystemPlugin.ts
var LODSystemPlugin = (_class = class {
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.config = config;
  }
  __init() {this.name = "LODSystem"}
  __init2() {this.lodObjects = /* @__PURE__ */ new Map()}
  
  install({ camera, orchestrator }) {
    this.camera = camera;
    const processModel = (model) => {
      const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
      this.config.forEach((cfg, index) => {
        const clone = _optionalChain([cfg, 'access', _ => _.levels, 'access', _2 => _2[index], 'optionalAccess', _3 => _3.model, 'access', _4 => _4.clone, 'call', _5 => _5()]) || model.clone();
        clone.visible = false;
        lod.addLevel(clone, _optionalChain([cfg, 'access', _6 => _6.levels, 'access', _7 => _7[index], 'optionalAccess', _8 => _8.distance]) || 0);
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
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _9 => _9.geometry, 'optionalAccess', _10 => _10.dispose, 'call', _11 => _11()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _12 => _12.material, 'optionalAccess', _13 => _13.dispose, 'call', _14 => _14()]);
          }
        }
      });
    });
    this.lodObjects.clear();
  }
}, _class);



exports.LODSystemPlugin = LODSystemPlugin;
