import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from '../types';

export class AdvancedOrbitControlsPlugin implements Plugin {
  name = 'AdvancedOrbitControls';
  private controls!: OrbitControls;
  private config = {
    enablePan: true,
    enableRotate: true,
    enableZoom: true,
    dampingFactor: 0.05,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    minDistance: 0.1,
    maxDistance: 1000,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
  };

  constructor(options: Partial<typeof this.config> = {}) {
    Object.assign(this.config, options);
  }

  install({ camera, renderer }: PluginContext): void {
    this.controls = new OrbitControls(camera, renderer.domElement);
    
    this.controls.dampingFactor = this.config.dampingFactor ||  0.05;
    this.controls.panSpeed = this.config.panSpeed ||  1;
    this.controls.rotateSpeed = this.config.rotateSpeed ||  1;
    this.controls.zoomSpeed = this.config.zoomSpeed ||  1;
    this.controls.minDistance = this.config.minDistance ||  0.1;
    this.controls.maxDistance = this.config.maxDistance ||  1000;
    this.controls.minPolarAngle = this.config.minPolarAngle ||  0;
    this.controls.maxPolarAngle = this.config.maxPolarAngle ||  Math.PI;
    this.controls.enablePan = this.config.enablePan || true;
    this.controls.enableRotate = this.config.enableRotate || true;
    this.controls.enableZoom = this.config.enableZoom || true;

    console.info(`[AdvancedOrbitControlsPlugin] Orbit Controls Plugin install: ${JSON.stringify(this.config, undefined, 2)}`);

    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }

  setPanEnabled(enabled: boolean) {
    if (this.controls) {
      this.controls.enablePan = enabled;
    }
  }

  setRotateEnabled(enabled: boolean) {
    if (this.controls) {
      this.controls.enableRotate = enabled;
    }
  }

  setZoomEnabled(enabled: boolean) {
    if (this.controls) {
      this.controls.enableZoom = enabled;
    }
  }

  setAllEnabled(enabled: boolean) {
    if (this.controls) {
      this.controls.enablePan = enabled;
      this.controls.enableRotate = enabled;
      this.controls.enableZoom = enabled;
    }
  }

  dispose(): void {
    this.controls?.dispose();
  }
}