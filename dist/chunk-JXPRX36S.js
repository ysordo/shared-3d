// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var AdvancedOrbitControlsPlugin = class {
  constructor(options = {}) {
    this.options = options;
  }
  name = "AdvancedOrbitControls";
  controls;
  install({ camera, renderer }) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = this.options.dampingFactor ?? 0.05;
    this.controls.panSpeed = this.options.panSpeed ?? 1;
    this.controls.rotateSpeed = this.options.rotateSpeed ?? 1;
    this.controls.zoomSpeed = this.options.zoomSpeed ?? 1;
    this.controls.minDistance = this.options.minDistance ?? 0.1;
    this.controls.maxDistance = this.options.maxDistance ?? 1e3;
    this.controls.minPolarAngle = this.options.minPolarAngle ?? 0;
    this.controls.maxPolarAngle = this.options.maxPolarAngle ?? Math.PI;
    this.controls.enablePan = this.options.enablePan ?? true;
    this.controls.enableRotate = this.options.enableRotate ?? true;
    this.controls.enableZoom = this.options.enableZoom ?? true;
    this.controls.connect?.(renderer.domElement);
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  set enablePan(enabled) {
    this.options.enablePan = enabled;
    this.controls.enablePan = enabled;
  }
  set enableRotate(enabled) {
    this.options.enableRotate = enabled;
    this.controls.enableRotate = enabled;
  }
  set enableZoom(enabled) {
    this.options.enableZoom = enabled;
    this.controls.enableZoom = enabled;
  }
  set maxDistance(distance) {
    this.options.maxDistance = distance;
    this.controls.maxDistance = distance;
  }
  set minDistance(distance) {
    this.options.minDistance = distance;
    this.controls.minDistance = distance;
  }
  get maxDistance() {
    return this.controls.maxDistance;
  }
  get minDistance() {
    return this.controls.minDistance;
  }
  get enableRotate() {
    return this.controls.enableRotate;
  }
  get enableZoom() {
    return this.controls.enableZoom;
  }
  get enablePan() {
    return this.controls.enablePan;
  }
  dispose() {
    this.controls.disconnect();
    this.controls.dispose();
  }
  update(options) {
    this.controls.dampingFactor = options.dampingFactor ?? 0.05;
    this.controls.panSpeed = options.panSpeed ?? 1;
    this.controls.rotateSpeed = options.rotateSpeed ?? 1;
    this.controls.zoomSpeed = options.zoomSpeed ?? 1;
    this.controls.minDistance = options.minDistance ?? 0.1;
    this.controls.maxDistance = options.maxDistance ?? 1e3;
    this.controls.minPolarAngle = options.minPolarAngle ?? 0;
    this.controls.maxPolarAngle = options.maxPolarAngle ?? Math.PI;
    this.controls.enablePan = options.enablePan ?? true;
    this.controls.enableRotate = options.enableRotate ?? true;
    this.controls.enableZoom = options.enableZoom ?? true;
  }
};

export {
  AdvancedOrbitControlsPlugin
};
