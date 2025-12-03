import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/MeasurementToolPlugin.ts
var MeasurementToolPlugin = class {
  name = "MeasurementTool";
  points = [];
  line;
  spheres = [];
  onMeasure;
  constructor(onMeasure) {
    this.onMeasure = onMeasure ?? (() => {
    });
  }
  install({ scene, camera, renderer, orchestrator }) {
    const handlePointerDown = (e) => {
      if (e.button !== 0) {
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const model = orchestrator.getActiveModel();
      if (!model) {
        return;
      }
      const intersects = raycaster.intersectObject(model, true);
      if (intersects.length === 0) {
        return;
      }
      const point = intersects[0].point.clone();
      this.points.push(point);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05),
        new THREE.MeshBasicMaterial({ color: 65280 })
      );
      sphere.position.copy(point);
      scene.add(sphere);
      this.spheres.push(sphere);
      this.onMeasure?.({ point, points: [...this.points] });
      if (this.points.length === 2) {
        const distance = this.points[0].distanceTo(this.points[1]);
        this.onMeasure?.({ point, distance, points: [...this.points] });
        const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        const material = new THREE.LineBasicMaterial({ color: 65280 });
        this.line = new THREE.Line(geometry, material);
        scene.add(this.line);
        setTimeout(() => this.reset(), 3e3);
      }
    };
    renderer.domElement.addEventListener("pointerdown", handlePointerDown, { capture: true });
    this.dispose = () => {
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      this.reset();
    };
  }
  reset() {
    this.points = [];
    if (this.line) {
      this.line.parent?.remove(this.line);
      this.line.geometry.dispose();
      if (Array.isArray(this.line.material)) {
        this.line.material.forEach((mat) => mat.dispose());
      } else {
        this.line.material.dispose();
      }
      this.line = void 0;
    }
    this.spheres.forEach((s) => {
      s.parent?.remove(s);
      s.geometry.dispose();
      if (Array.isArray(s.material)) {
        s.material.forEach((mat) => mat.dispose());
      } else {
        s.material.dispose();
      }
    });
    this.spheres = [];
  }
  dispose() {
    this.reset();
  }
};

export {
  MeasurementToolPlugin
};
