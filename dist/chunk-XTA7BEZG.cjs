"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/HotspotPlugin.ts
var HotspotPlugin = (_class = class {
  constructor(data) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.data = data;
  }
  __init() {this.name = "Hotspot"}
  __init2() {this.hotspots = /* @__PURE__ */ new Map()}
  install({ scene }) {
    this.data.forEach((hotspot) => {
      const geometry = new _chunkEA3XQ4KJcjs.THREE.SphereGeometry(0.3, 16, 16);
      const material = new _chunkEA3XQ4KJcjs.THREE.MeshBasicMaterial({
        color: 65280,
        transparent: true,
        opacity: 0.5
      });
      const mesh = new _chunkEA3XQ4KJcjs.THREE.Mesh(geometry, material);
      mesh.position.copy(hotspot.position);
      if (hotspot.target) {
        mesh.userData.target = hotspot.target;
      }
      mesh.userData.hotspotId = hotspot.id;
      mesh.userData.onClick = hotspot.onClick;
      scene.add(mesh);
      this.hotspots.set(hotspot.id, mesh);
    });
  }
  dispose() {
    this.hotspots.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.remove(mesh);
      }
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => mat.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.hotspots.clear();
  }
}, _class);



exports.HotspotPlugin = HotspotPlugin;
