import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from '../types';

export class AdvancedOrbitControlsPlugin implements Plugin {
  name = 'AdvancedOrbitControls';
  private controls!: OrbitControls;

  constructor(private options: Partial<{
    enablePan?: boolean | undefined;
    enableRotate?: boolean | undefined;
    enableZoom?: boolean | undefined;
    dampingFactor?: number | undefined;
    panSpeed?: number | undefined;
    rotateSpeed?: number | undefined;
    zoomSpeed?: number | undefined;
    minDistance?: number | undefined;
    maxDistance?: number | undefined;
    minPolarAngle?: number | undefined;
    maxPolarAngle?: number | undefined;
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

  set enablePan(enabled: boolean) {
      this.options.enablePan = enabled;
      this.controls.enablePan = enabled;
    };

    set enableRotate(enabled: boolean) {
      this.options.enableRotate = enabled;
      this.controls.enableRotate = enabled;
    };

    set enableZoom(enabled: boolean) {
      this.options.enableZoom = enabled;
      this.controls.enableZoom = enabled;
    };
    set maxDistance(distance: number) {
      this.options.maxDistance = distance;
      this.controls.maxDistance = distance;
    };
    set minDistance(distance: number) {
      this.options.minDistance = distance;
      this.controls.minDistance = distance;
    };
    get maxDistance(): number { return this.controls.maxDistance; }
    get minDistance(): number { return this.controls.minDistance; }
    get enableRotate(): boolean { return this.controls.enableRotate; }
    get enableZoom(): boolean { return this.controls.enableZoom; }
    get enablePan(): boolean { return this.controls.enablePan; }

    dispose(): void {
      this.controls.disconnect();
      this.controls.dispose();
    }

}