// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var AdvancedOrbitControlsPlugin = class {
  constructor(options = {}) {
    this.options = options;
    Object.assign(this.config, options);
  }
  name = "AdvancedOrbitControls";
  controls;
  config = {
    enableDamping: true,
    dampingFactor: 0.05,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    minDistance: 0.1,
    maxDistance: 1e3,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI
  };
  install({ camera, renderer }) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    Object.assign(this.controls, this.config);
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  /* === API PÚBLICA === */
  setPanEnabled(enabled) {
    this.controls.enablePan = enabled;
  }
  setRotateEnabled(enabled) {
    this.controls.enableRotate = enabled;
  }
  setZoomEnabled(enabled) {
    this.controls.enableZoom = enabled;
  }
  setAllEnabled(enabled) {
    this.controls.enablePan = enabled;
    this.controls.enableRotate = enabled;
    this.controls.enableZoom = enabled;
  }
  dispose() {
    this.controls?.dispose();
  }
};

export {
  AdvancedOrbitControlsPlugin
};
