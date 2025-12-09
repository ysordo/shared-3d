import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from '../types';

export class AdvancedOrbitControlsPlugin implements Plugin {
  name = 'AdvancedOrbitControls';
  private controls!: OrbitControls;

  constructor(private options: Partial<{
    enablePan?: boolean;
    enableRotate?: boolean;
    enableZoom?: boolean;
    [key: string]: any;
  }> = {}) {}

  install({ camera, renderer }: PluginContext): void {
    this.controls = new OrbitControls(camera, renderer.domElement);

    Object.assign(this.controls, {
      enableDamping: true,
      dampingFactor: 0.05,
      panSpeed: 1,
      rotateSpeed: 1,
      zoomSpeed: 1,
      minDistance: 0.1,
      maxDistance: 1000,
      ...this.options,
    });
    console.info(`[AdvancedOrbitControlsPlugin] Install plugin ${this.name}:`, this.controls);
    
    const animate = () => {
      console.info('[AdvancedOrbitControlsPlugin] Update');

      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }

  setPanEnabled(enabled: boolean): void {
      this.options.enablePan = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);

      if (this.controls) {
        this.controls.enablePan = enabled;
        console.info(`[AdvancedOrbitControlsPlugin] Change state enablePan: ${JSON.stringify(this.controls.enablePan)}, controls:`, this.controls);
      }
    };

     setRotateEnabled(enabled: boolean): void {
      this.options.enableRotate = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);

      if (this.controls) {
        this.controls.enableRotate = enabled;
        console.info(`[AdvancedOrbitControlsPlugin] Change state enableRotate: ${JSON.stringify(this.controls.enableRotate)}, controls:`, this.controls);
      }
    };

    setZoomEnabled(enabled: boolean): void {
      this.options.enableZoom = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
      
      if (this.controls) {
        this.controls.enableZoom = enabled;
        console.info(`[AdvancedOrbitControlsPlugin] Change state enableZoom: ${JSON.stringify(this.controls.enableZoom)}, controls:`, this.controls);
      }
    };

    dispose(): void {this.controls?.dispose();}

}