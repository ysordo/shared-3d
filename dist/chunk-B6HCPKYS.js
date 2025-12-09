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
    this.controls.enabled = true;
    console.info(`[AdvancedOrbitControlsPlugin] Install plugin ${this.name}:`, this.controls);
    const animate = () => {
      console.info("[AdvancedOrbitControlsPlugin] Update");
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  setPanEnabled(enabled) {
    this.options.enablePan = enabled;
    console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
    if (this.controls) {
      this.controls.enablePan = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enablePan: ${JSON.stringify(this.controls.enablePan)}, controls:`, this.controls);
    }
  }
  setRotateEnabled(enabled) {
    this.options.enableRotate = enabled;
    console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
    if (this.controls) {
      this.controls.enableRotate = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enableRotate: ${JSON.stringify(this.controls.enableRotate)}, controls:`, this.controls);
    }
  }
  setZoomEnabled(enabled) {
    this.options.enableZoom = enabled;
    console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
    if (this.controls) {
      this.controls.enableZoom = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enableZoom: ${JSON.stringify(this.controls.enableZoom)}, controls:`, this.controls);
    }
  }
  dispose() {
    this.controls?.dispose();
  }
};

export {
  AdvancedOrbitControlsPlugin
};
