import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export class AdvancedCameraCollisionPlugin implements Plugin {
  name = 'AdvancedCameraCollision';
  private handle: number | null = null;

  constructor(
    public distanceThreshold: number = 0.6,
    public pushBackOffset: number = 0.1,
    public smooth: number = 0.1
  ) {}

  install({ camera, orchestrator }: PluginContext): void {
    if (!camera) {return;}

    const dir = new THREE.Vector3();
    const ray = new THREE.Raycaster();
    ray.near = 0;

    const checkCollision = (from: THREE.Vector3, to: THREE.Vector3, model: THREE.Object3D) => {
      dir.subVectors(to, from);
      const distance = dir.length();
      if (distance === 0) {return false;}

      dir.normalize();
      ray.set(from, dir);
      ray.far = distance + this.pushBackOffset;

      const hits = ray.intersectObject(model, true);
      if (hits.length === 0) {return false;}

      const nearestHit: THREE.Intersection = hits.reduce((closest, hit) =>
        hit.distance < closest!.distance ? hit : closest
      , hits[0])!;

      if (nearestHit.distance < distance) {
        const pushBack = distance - nearestHit.distance + this.pushBackOffset;
        const pushVector = dir.clone().multiplyScalar(pushBack);
        to.sub(pushVector);
        return true;
      }

      return false;
    };

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
      const targetPosition = camera.position.clone();
      camera.getWorldDirection(dir);
      const forward = targetPosition.clone().add(dir.clone().multiplyScalar(this.distanceThreshold));
      checkCollision(camera.position.clone(), forward, model);
      const directions = [
        new THREE.Vector3(this.distanceThreshold, 0, 0),
        new THREE.Vector3(-this.distanceThreshold, 0, 0),
        new THREE.Vector3(0, this.distanceThreshold, 0),
        new THREE.Vector3(0, -this.distanceThreshold, 0),
        new THREE.Vector3(0, 0, this.distanceThreshold),
        new THREE.Vector3(0, 0, -this.distanceThreshold),
      ];

      directions.forEach((offset) => {
        const candidate = camera.position.clone().add(offset);
        checkCollision(camera.position.clone(), candidate, model);
      });

      camera.position.lerp(targetPosition, this.smooth);

      this.handle = requestAnimationFrame(check);
    };

    check();
  }

  update(
    distanceThreshold: number = 0.6,
    pushBackOffset: number = 0.1,
    smooth: number = 0.1
  ){
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
    this.smooth = smooth;
  }

  dispose(): void {
    if (this.handle !== null) {
      cancelAnimationFrame(this.handle);
      this.handle = null;
    }
  }
}
