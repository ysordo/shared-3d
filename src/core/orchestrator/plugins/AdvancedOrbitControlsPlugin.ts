import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from '../types';

export class AdvancedOrbitControlsPlugin implements Plugin {
  name = 'AdvancedOrbitControls';
  private controls!: OrbitControls;

  // Configuración inicial
  private config = {
    enableDamping: true,
    dampingFactor: 0.05,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    minDistance: 0.1,
    maxDistance: 1000,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
  };

  constructor(
    private options: Partial<typeof this.config> = {}
  ) {
    Object.assign(this.config, options);
  }

  install({ camera, renderer }: PluginContext): void {
    this.controls = new OrbitControls(camera, renderer.domElement);

    // Aplicar configuración
    Object.assign(this.controls, this.config);

    // Loop de animación
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }

  // === API PÚBLICA ===
  setPanEnabled(enabled: boolean) {
    this.controls.enablePan = enabled;
  }

  setRotateEnabled(enabled: boolean) {
    this.controls.enableRotate = enabled;
  }

  setZoomEnabled(enabled: boolean) {
    this.controls.enableZoom = enabled;
  }

  setAllEnabled(enabled: boolean) {
    this.controls.enablePan = enabled;
    this.controls.enableRotate = enabled;
    this.controls.enableZoom = enabled;
  }

  dispose(): void {
    this.controls?.dispose();
  }
}