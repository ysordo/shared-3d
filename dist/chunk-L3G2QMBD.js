import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/HotspotPlugin.ts
var HotspotPlugin = class {
  constructor(data) {
    this.data = data;
  }
  name = "Hotspot";
  hotspots = /* @__PURE__ */ new Map();
  install({ scene }) {
    this.data.forEach((hotspot) => {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 65280,
        transparent: true,
        opacity: 0.5
      });
      const mesh = new THREE.Mesh(geometry, material);
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
};

export {
  HotspotPlugin
};
