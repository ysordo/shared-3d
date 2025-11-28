import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Plugin, PluginContext } from '../types';

export class OrbitControlsPlugin implements Plugin {
  name = 'OrbitControls';
  private controls!: OrbitControls;

  install({ camera, renderer }: PluginContext): void {
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

  dispose(): void {
    this.controls?.dispose();
  }
}