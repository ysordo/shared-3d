import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from '../types';

export class AdvancedOrbitControlsPlugin implements Plugin {
  name = 'AdvancedOrbitControls';
  private controls!: OrbitControls;

  constructor(private options: Partial<{
    enablePan?: boolean;
    enableRotate?: boolean;
    enableZoom?: boolean;
    dampingFactor?: number;
    panSpeed?: number;
    rotateSpeed?: number;
    zoomSpeed?: number;
    minDistance?: number;
    maxDistance?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
  }> = {}) {}

  install({ camera, renderer }: PluginContext): void {
    this.controls = new OrbitControls(camera, renderer.domElement);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = this.options.dampingFactor ?? 0.05;
    this.controls.panSpeed = this.options.panSpeed ?? 1;
    this.controls.rotateSpeed = this.options.rotateSpeed ?? 1;
    this.controls.zoomSpeed = this.options.zoomSpeed ?? 1;
    this.controls.minDistance = this.options.minDistance ?? 0.1;
    this.controls.maxDistance = this.options.maxDistance ?? 1000;
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

  setPanEnabled(enabled: boolean): void {
    if (this.controls) {
        this.options.enablePan = enabled;
        this.controls.enablePan = enabled;
      }
    };

    setRotateEnabled(enabled: boolean): void {
      if (this.controls) {
        this.options.enableRotate = enabled;
        this.controls.enableRotate = enabled;
      }
    };

    setZoomEnabled(enabled: boolean): void {
      if (this.controls) {
        this.options.enableZoom = enabled;
        this.controls.enableZoom = enabled;
      }
    };

    dispose(): void {
      this.controls.disconnect();
      this.controls.dispose();
    }

}