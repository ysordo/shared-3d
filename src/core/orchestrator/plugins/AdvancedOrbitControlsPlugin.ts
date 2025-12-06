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
    
    // Aplicar config
    Object.assign(this.controls, this.config);

    // Forzar un update inicial
    this.controls.update();

    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }

  // ← AÑADIR RETRASO DE 1 FRAME
  private safeUpdate(action: () => void) {
    if (this.controls) {
      requestAnimationFrame(() => {
        if (this.controls) {action();}
      });
    }
  }

  setPanEnabled(enabled: boolean) {
    this.safeUpdate(() => {
      this.controls.enablePan = enabled;
    });
  }

  setRotateEnabled(enabled: boolean) {
    this.safeUpdate(() => {
      this.controls.enableRotate = enabled;
    });
  }

  setZoomEnabled(enabled: boolean) {
    this.safeUpdate(() => {
      this.controls.enableZoom = enabled;
    });
  }

  setAllEnabled(enabled: boolean) {
    this.safeUpdate(() => {
      this.controls.enablePan = enabled;
      this.controls.enableRotate = enabled;
      this.controls.enableZoom = enabled;
      this.controls.enabled = enabled;
    });
  }

  dispose(): void {
    this.controls?.dispose();
  }
}