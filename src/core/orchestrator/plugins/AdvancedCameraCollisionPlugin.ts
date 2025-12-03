import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export class AdvancedCameraCollisionPlugin implements Plugin {
  name = 'AdvancedCameraCollisionPlugin';
  private handle: number | null = null;

  constructor(
    public readonly distanceThreshold: number = 0.6,
    public readonly pushBackOffset: number = 0.1
  ) {}

  install({ camera, orchestrator }: PluginContext): void {
    if (!camera) {return;}

    const check = () => {
      const model = orchestrator.getActiveModel();
      if (!model) {
        this.handle = requestAnimationFrame(check);
        return;
      }

      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);

      const ray = new THREE.Raycaster(
        camera.position,
        dir,
        0,
        this.distanceThreshold + this.pushBackOffset
      );

      const hits = ray.intersectObject(model, true);

      if (hits.length > 0) {
        const hitDistance = (hits[0] as any).distance;
        const desiredDistance = this.distanceThreshold;

        if (hitDistance < desiredDistance) {
          const pushBack = desiredDistance - hitDistance + this.pushBackOffset;
          camera.position.sub(dir.multiplyScalar(pushBack));
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