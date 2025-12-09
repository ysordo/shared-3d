import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export class AdvancedCameraCollisionPlugin implements Plugin {
  name = 'AdvancedCameraCollision';
  private handle: number | null = null;

  constructor(
    public readonly distanceThreshold: number = 0.6,
    public readonly pushBackOffset: number = 0.1
  ) {}

  install({ camera, orchestrator }: PluginContext): void {
    const dir = new THREE.Vector3();
    const ray = new THREE.Raycaster();
    ray.near = 0;
    ray.far = this.distanceThreshold + this.pushBackOffset;
    
    const check = () => {
      if (!camera) {
        this.handle = requestAnimationFrame(check);
        return;
      }
      const model = orchestrator.getActiveModel();
      if (!model) {
        this.handle = requestAnimationFrame(check);
        return;
      }

      camera.getWorldDirection(dir);

      ray.set(camera.position,dir);

      const hits = ray.intersectObject(model, true);

      if (hits.length > 0) {
        const hitDistance = (hits[0] as THREE.Intersection).distance;
        const desiredDistance = this.distanceThreshold;

        if (hitDistance < desiredDistance) {
          const pushBack = desiredDistance - hitDistance + this.pushBackOffset;
          const pushVector = dir.clone().multiplyScalar(pushBack);
          camera.position.lerp(camera.position.clone().sub(pushVector), 0.1);
        }
      }

      this.handle = requestAnimationFrame(check);
    };

    check();
  }

  dispose(): void {
    if (this.handle !== null) {
      cancelAnimationFrame(this.handle);
      this.handle = null;
    }
  }
}