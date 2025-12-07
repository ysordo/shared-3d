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
    this.updateControlsState();
    const tick = () => {
      this.controls.update();
      requestAnimationFrame(tick);
    };
    tick();
  }
  // MÉTODO PÚBLICO PARA REAPLICAR EL ESTADO
  updateControlsState() {
    if (!this.controls) {
      return;
    }
    this.controls.enablePan = this.options.enablePan ?? true;
    this.controls.enableRotate = this.options.enableRotate ?? true;
    this.controls.enableZoom = this.options.enableZoom ?? true;
    this.controls.enabled = true;
  }
  setPanEnabled(enabled) {
    this.options.enablePan = enabled;
    if (this.controls) {
      this.controls.enablePan = enabled;
    }
    console.info(`[AdvancedOrbitControlsPlugin] Change state enablePan: ${this.controls.enablePan}, controls: ${this.controls}`);
  }
  setRotateEnabled(enabled) {
    this.options.enableRotate = enabled;
    if (this.controls) {
      this.controls.enableRotate = enabled;
    }
    console.info(`[AdvancedOrbitControlsPlugin] Change state enableRotate: ${this.controls.enableRotate}, controls: ${this.controls}`);
  }
  setZoomEnabled(enabled) {
    this.options.enableZoom = enabled;
    if (this.controls) {
      this.controls.enableZoom = enabled;
    }
    console.info(`[AdvancedOrbitControlsPlugin] Change state enableZoom: ${this.controls.enableZoom}, controls: ${this.controls}`);
  }
  setAllEnabled(enabled) {
    this.options.enablePan = enabled;
    this.options.enableRotate = enabled;
    this.options.enableZoom = enabled;
    if (this.controls) {
      this.controls.enablePan = enabled;
      this.controls.enableRotate = enabled;
      this.controls.enableZoom = enabled;
      this.controls.enabled = enabled;
    }
  }
  dispose() {
    this.controls?.dispose();
  }
};

export {
  AdvancedOrbitControlsPlugin
};
