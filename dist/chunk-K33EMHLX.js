import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = class {
  constructor(distanceThreshold = 0.6, pushBackOffset = 0.1, smooth = 0.1) {
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
    this.smooth = smooth;
  }
  name = "AdvancedCameraCollision";
  handle = null;
  install({ camera, orchestrator }) {
    if (!camera) {
      return;
    }
    const dir = new THREE.Vector3();
    const ray = new THREE.Raycaster();
    ray.near = 0;
    const checkCollision = (from, to, model) => {
      dir.subVectors(to, from);
      const distance = dir.length();
      if (distance === 0) {
        return false;
      }
      dir.normalize();
      ray.set(from, dir);
      ray.far = distance + this.pushBackOffset;
      const hits = ray.intersectObject(model, true);
      if (hits.length === 0) {
        return false;
      }
      const nearestHit = hits.reduce(
        (closest, hit) => hit.distance < closest.distance ? hit : closest,
        hits[0]
      );
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
        new THREE.Vector3(0, 0, -this.distanceThreshold)
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
  update(distanceThreshold = 0.6, pushBackOffset = 0.1, smooth = 0.1) {
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
    this.smooth = smooth;
  }
  dispose() {
    if (this.handle !== null) {
      cancelAnimationFrame(this.handle);
      this.handle = null;
    }
  }
};

export {
  AdvancedCameraCollisionPlugin
};
