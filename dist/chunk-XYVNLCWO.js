import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/HotspotPlugin.ts
var HotspotPlugin = class _HotspotPlugin {
  name = "Hotspot";
  scene;
  camera;
  // Ahora obligatorio (siempre disponible tras install)
  hotspots = /* @__PURE__ */ new Map();
  data = [];
  static geometry = new THREE.SphereGeometry(0.3, 16, 16);
  static material = new THREE.MeshBasicMaterial({
    color: 65280,
    transparent: true,
    opacity: 0.5,
    depthTest: false
  });
  constructor(initialData = []) {
    this.data = initialData;
  }
  install({ scene, camera }) {
    this.scene = scene;
    this.camera = camera;
    this.syncHotspots();
  }
  preRender() {
    if (this.hotspots.size === 0) {
      return;
    }
    const cameraPosition = this.camera.position;
    this.hotspots.forEach((mesh) => {
      const target = mesh.userData.target;
      if (target) {
        target.getWorldPosition(mesh.position);
      }
      mesh.lookAt(cameraPosition);
    });
  }
  update(newData) {
    this.data = newData;
    this.syncHotspots();
  }
  syncHotspots() {
    const nextIds = new Set(this.data.map((h) => h.id));
    this.hotspots.forEach((_, id) => {
      if (!nextIds.has(id)) {
        this.removeHotspot(id);
      }
    });
    this.data.forEach((hotspot) => {
      const existing = this.hotspots.get(hotspot.id);
      if (!existing) {
        this.addHotspot(hotspot);
      } else {
        this.updateHotspot(existing, hotspot);
      }
    });
  }
  addHotspot(hotspot) {
    const mesh = new THREE.Mesh(_HotspotPlugin.geometry, _HotspotPlugin.material);
    mesh.position.copy(hotspot.position);
    mesh.userData.hotspotId = hotspot.id;
    mesh.userData.target = hotspot.target;
    mesh.userData.onClick = hotspot.onClick;
    mesh.visible = hotspot.visible ?? true;
    this.scene.add(mesh);
    this.hotspots.set(hotspot.id, mesh);
  }
  updateHotspot(mesh, hotspot) {
    mesh.visible = hotspot.visible ?? true;
    mesh.userData.onClick = hotspot.onClick;
    mesh.userData.target = hotspot.target;
    if (!hotspot.target) {
      mesh.position.copy(hotspot.position);
    }
  }
  removeHotspot(id) {
    const mesh = this.hotspots.get(id);
    if (!mesh) {
      return;
    }
    mesh.parent?.remove(mesh);
    this.hotspots.delete(id);
  }
  dispose() {
    this.hotspots.forEach((_, id) => this.removeHotspot(id));
    this.hotspots.clear();
  }
};

export {
  HotspotPlugin
};
