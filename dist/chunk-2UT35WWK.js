import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/MeasurementToolPlugin.ts
var MeasurementToolPlugin = class {
  name = "MeasurementTool";
  camera;
  scene;
  renderer;
  orchestrator;
  enabled = true;
  points = [];
  spheres = [];
  line;
  config;
  pointerHandler;
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  constructor(config) {
    this.config = {
      enabled: true,
      pointRadius: 0.05,
      color: 65280,
      onMeasure: () => {
      },
      ...config
    };
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
    this.reset();
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.enabled !== void 0) {
      this.enabled = newConfig.enabled;
      if (!this.enabled) {
        this.reset();
      }
    }
    if ((newConfig.color !== void 0 || newConfig.pointRadius !== void 0) && this.spheres.length > 0) {
      this.spheres.forEach((sphere) => {
        if (newConfig.color !== void 0) {
          sphere.material.color.setHex(newConfig.color);
        }
        if (newConfig.pointRadius !== void 0) {
          sphere.scale.setScalar(newConfig.pointRadius / this.config.pointRadius);
        }
      });
      if (this.line && newConfig.color !== void 0) {
        this.line.material.color.setHex(newConfig.color);
      }
    }
  }
  install({ scene, camera, renderer, orchestrator }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.orchestrator = orchestrator;
    this.pointerHandler = this.handlePointerDown.bind(this);
    this.renderer.domElement.addEventListener("pointerdown", this.pointerHandler, { capture: true });
  }
  handlePointerDown(e) {
    if (!this.enabled || e.button !== 0) {
      return;
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const model = this.orchestrator.activeModel.get();
    if (!model) {
      return;
    }
    const intersects = this.raycaster.intersectObject(model, true);
    if (intersects.length === 0) {
      return;
    }
    const point = intersects[0].point.clone();
    this.points.push(point);
    this.spawnPoint(point);
    this.config.onMeasure({ point, points: [...this.points] });
    if (this.points.length === 2) {
      this.finishMeasurement();
    }
  }
  spawnPoint(point) {
    const geometry = new THREE.SphereGeometry(this.config.pointRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: this.config.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(point);
    this.scene.add(mesh);
    this.spheres.push(mesh);
  }
  finishMeasurement() {
    const distance = this.points[0].distanceTo(this.points[1]);
    const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    const material = new THREE.LineBasicMaterial({ color: this.config.color });
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
    this.config.onMeasure({
      point: this.points[1],
      distance,
      points: [...this.points]
    });
    setTimeout(() => this.reset(), 3e3);
  }
  reset() {
    this.points = [];
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      this.line.material.dispose();
      this.line = void 0;
    }
    this.spheres.forEach((sphere) => {
      this.scene.remove(sphere);
      sphere.geometry.dispose();
      sphere.material.dispose();
    });
    this.spheres = [];
  }
  dispose() {
    this.renderer.domElement.removeEventListener("pointerdown", this.pointerHandler, { capture: true });
    this.reset();
  }
};

export {
  MeasurementToolPlugin
};
