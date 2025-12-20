"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/HotspotPlugin.ts
var HotspotPlugin = (_class = class {
  __init() {this.name = "Hotspot"}
  
  
  __init2() {this.hotspots = /* @__PURE__ */ new Map()}
  
  __init3() {this._rafId = null}
  constructor(data) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.data = data;
  }
  install({ scene, camera }) {
    this.scene = scene;
    this.camera = camera;
    this.syncHotspots();
    this.startLoop();
  }
  /* ============================
   *  Hot update API
   * ============================ */
  update(data) {
    this.data = data;
    this.syncHotspots();
  }
  /* ============================
   *  Sync logic
   * ============================ */
  syncHotspots() {
    const nextIds = new Set(this.data.map((h) => h.id));
    this.hotspots.forEach((_, id) => {
      if (!nextIds.has(id)) {
        this.removeHotspot(id);
      }
    });
    this.data.forEach((hotspot) => {
      if (!this.hotspots.has(hotspot.id)) {
        this.addHotspot(hotspot);
      } else {
        this.updateHotspot(hotspot);
      }
    });
  }
  addHotspot(hotspot) {
    const geometry = new _chunkEA3XQ4KJcjs.THREE.SphereGeometry(0.3, 16, 16);
    const material = new _chunkEA3XQ4KJcjs.THREE.MeshBasicMaterial({
      color: 65280,
      transparent: true,
      opacity: 0.5,
      depthTest: false
    });
    const mesh = new _chunkEA3XQ4KJcjs.THREE.Mesh(geometry, material);
    mesh.position.copy(hotspot.position);
    mesh.userData.hotspotId = hotspot.id;
    mesh.userData.target = hotspot.target;
    mesh.userData.onClick = hotspot.onClick;
    mesh.visible = _nullishCoalesce(hotspot.visible, () => ( true));
    this.scene.add(mesh);
    this.hotspots.set(hotspot.id, mesh);
  }
  updateHotspot(hotspot) {
    const mesh = this.hotspots.get(hotspot.id);
    mesh.visible = _nullishCoalesce(hotspot.visible, () => ( true));
    mesh.userData.onClick = hotspot.onClick;
    mesh.userData.target = hotspot.target;
    if (!hotspot.target) {
      mesh.position.copy(hotspot.position);
    }
  }
  removeHotspot(id) {
    const mesh = this.hotspots.get(id);
    _optionalChain([mesh, 'access', _2 => _2.parent, 'optionalAccess', _3 => _3.remove, 'call', _4 => _4(mesh)]);
    mesh.geometry.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m) => m.dispose());
    } else {
      mesh.material.dispose();
    }
    this.hotspots.delete(id);
  }
  /* ============================
   *  Loop (vida infinita)
   * ============================ */
  startLoop() {
    const loop = () => {
      this.hotspots.forEach((mesh) => {
        const target = mesh.userData.target;
        if (target) {
          target.getWorldPosition(mesh.position);
        }
        if (this.camera) {
          mesh.lookAt(this.camera.position);
        }
      });
      this._rafId = requestAnimationFrame(loop);
    };
    loop();
  }
  dispose() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.hotspots.forEach((_, id) => this.removeHotspot(id));
    this.hotspots.clear();
  }
}, _class);



exports.HotspotPlugin = HotspotPlugin;
