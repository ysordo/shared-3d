// src/core/orchestrator/plugins/OrbitControlsPlugin.ts
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var OrbitControlsPlugin = class {
  name = "OrbitControls";
  controls;
  install({ camera, renderer }) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.8;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
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
    this.controls?.dispose();
  }
};

export {
  OrbitControlsPlugin
};
