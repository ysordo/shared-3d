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
    Object.assign(this.controls, this.config);
    this.controls.update();
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  // ← AÑADIR RETRASO DE 1 FRAME
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
