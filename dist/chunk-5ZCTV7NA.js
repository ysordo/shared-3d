// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
import { OrbitControls } from "three/examples/jsm/Addons.js";
var AdvancedOrbitControlsPlugin = class {
  name = "AdvancedOrbitControls";
  controls;
  options;
  constructor(partialOptions = {}) {
    this.options = {
      enablePan: true,
      enableRotate: true,
      enableZoom: true,
      dampingFactor: 0.05,
      panSpeed: 1,
      rotateSpeed: 1,
      zoomSpeed: 1,
      minDistance: 0.1,
      maxDistance: 1e3,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
      ...partialOptions
    };
  }
  install({ camera, renderer }) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.applyOptionsToControls();
    this.controls.enableDamping = true;
  }
  preRender() {
    this.controls.update();
  }
  applyOptionsToControls() {
    this.controls.enablePan = this.options.enablePan;
    this.controls.enableRotate = this.options.enableRotate;
    this.controls.enableZoom = this.options.enableZoom;
    this.controls.dampingFactor = this.options.dampingFactor;
    this.controls.panSpeed = this.options.panSpeed;
    this.controls.rotateSpeed = this.options.rotateSpeed;
    this.controls.zoomSpeed = this.options.zoomSpeed;
    this.controls.minDistance = this.options.minDistance;
    this.controls.maxDistance = this.options.maxDistance;
    this.controls.minPolarAngle = this.options.minPolarAngle;
    this.controls.maxPolarAngle = this.options.maxPolarAngle;
  }
  set enablePan(enabled) {
    this.options.enablePan = enabled;
    this.controls.enablePan = enabled;
  }
  get enablePan() {
    return this.controls.enablePan;
  }
  set enableRotate(enabled) {
    this.options.enableRotate = enabled;
    this.controls.enableRotate = enabled;
  }
  get enableRotate() {
    return this.controls.enableRotate;
  }
  set enableZoom(enabled) {
    this.options.enableZoom = enabled;
    this.controls.enableZoom = enabled;
  }
  get enableZoom() {
    return this.controls.enableZoom;
  }
  set minDistance(distance) {
    this.options.minDistance = distance;
    this.controls.minDistance = distance;
  }
  get minDistance() {
    return this.controls.minDistance;
  }
  set maxDistance(distance) {
    this.options.maxDistance = distance;
    this.controls.maxDistance = distance;
  }
  get maxDistance() {
    return this.controls.maxDistance;
  }
  update(newOptions) {
    Object.keys(newOptions).forEach((key) => {
      if (newOptions[key] !== void 0) {
        this.options[key] = newOptions[key];
      }
    });
    this.applyOptionsToControls();
  }
  dispose() {
    this.controls.disconnect();
    this.controls.dispose();
  }
};

export {
  AdvancedOrbitControlsPlugin
};
