// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var AdvancedOrbitControlsPlugin = class {
  name = "AdvancedOrbitControls";
  controls;
  config = {
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
    maxPolarAngle: Math.PI
  };
  constructor(options = {}) {
    Object.assign(this.config, options);
  }
  install({ camera, renderer }) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.dampingFactor = this.config.dampingFactor || 0.05;
    this.controls.panSpeed = this.config.panSpeed || 1;
    this.controls.rotateSpeed = this.config.rotateSpeed || 1;
    this.controls.zoomSpeed = this.config.zoomSpeed || 1;
    this.controls.minDistance = this.config.minDistance || 0.1;
    this.controls.maxDistance = this.config.maxDistance || 1e3;
    this.controls.minPolarAngle = this.config.minPolarAngle || 0;
    this.controls.maxPolarAngle = this.config.maxPolarAngle || Math.PI;
    this.controls.enablePan = this.config.enablePan || true;
    this.controls.enableRotate = this.config.enableRotate || true;
    this.controls.enableZoom = this.config.enableZoom || true;
    console.info(`[AdvancedOrbitControlsPlugin] Orbit Controls Plugin install: ${JSON.stringify(this.config, void 0, 2)}`);
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  safeUpdate(action) {
    if (this.controls) {
      requestAnimationFrame(() => {
        if (this.controls) {
          action();
        }
      });
    }
  }
  setPanEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enablePan = enabled;
    });
  }
  setRotateEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enableRotate = enabled;
    });
  }
  setZoomEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enableZoom = enabled;
    });
  }
  setAllEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enablePan = enabled;
      this.controls.enableRotate = enabled;
      this.controls.enableZoom = enabled;
      this.controls.enabled = enabled;
    });
  }
  dispose() {
    this.controls?.dispose();
  }
};

export {
  AdvancedOrbitControlsPlugin
};
