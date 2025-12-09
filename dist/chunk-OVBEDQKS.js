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
    Object.assign(this.controls, {
      enableDamping: true,
      dampingFactor: 0.05,
      panSpeed: 1,
      rotateSpeed: 1,
      zoomSpeed: 1,
      minDistance: 0.1,
      maxDistance: 1e3,
      ...this.options
    });
    console.info(`[AdvancedOrbitControlsPlugin] Install plugin ${this.name}:`, this.controls);
    this.setPanEnabled = (enabled) => {
      this.options.enablePan = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
      if (this.controls) {
        this.controls.enablePan = enabled;
        console.info(`[AdvancedOrbitControlsPlugin] Change state enablePan: ${JSON.stringify(this.controls.enablePan)}, controls:`, this.controls);
      }
    };
    this.setRotateEnabled = (enabled) => {
      this.options.enableRotate = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
      if (this.controls) {
        this.controls.enableRotate = enabled;
        console.info(`[AdvancedOrbitControlsPlugin] Change state enableRotate: ${JSON.stringify(this.controls.enableRotate)}, controls:`, this.controls);
      }
    };
    this.setZoomEnabled = (enabled) => {
      this.options.enableZoom = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
      if (this.controls) {
        this.controls.enableZoom = enabled;
        console.info(`[AdvancedOrbitControlsPlugin] Change state enableZoom: ${JSON.stringify(this.controls.enableZoom)}, controls:`, this.controls);
      }
    };
    this.dispose = () => this.controls.dispose();
    const animation = () => {
      this.controls.update();
      requestAnimationFrame(animation);
    };
    animation();
  }
  setPanEnabled(enabled) {
  }
  setRotateEnabled(enabled) {
  }
  setZoomEnabled(enabled) {
  }
  dispose() {
  }
};

export {
  AdvancedOrbitControlsPlugin
};
