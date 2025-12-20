import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/HotspotPlugin.ts
var HotspotPlugin = class {
  name = "Hotspot";
  scene;
  camera;
  hotspots = /* @__PURE__ */ new Map();
  data;
  _rafId = null;
  constructor(data) {
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
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 65280,
      transparent: true,
      opacity: 0.5,
      depthTest: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(hotspot.position);
    mesh.userData.hotspotId = hotspot.id;
    mesh.userData.target = hotspot.target;
    mesh.userData.onClick = hotspot.onClick;
    mesh.visible = hotspot.visible ?? true;
    this.scene.add(mesh);
    this.hotspots.set(hotspot.id, mesh);
  }
  updateHotspot(hotspot) {
    const mesh = this.hotspots.get(hotspot.id);
    mesh.visible = hotspot.visible ?? true;
    mesh.userData.onClick = hotspot.onClick;
    mesh.userData.target = hotspot.target;
    if (!hotspot.target) {
      mesh.position.copy(hotspot.position);
    }
  }
  removeHotspot(id) {
    const mesh = this.hotspots.get(id);
    mesh.parent?.remove(mesh);
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
};

export {
  HotspotPlugin
};
