import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = class {
  constructor(distanceThreshold = 0.6, pushBackOffset = 0.1) {
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
  }
  name = "AdvancedCameraCollisionPlugin";
  handle = null;
  install({ camera, orchestrator }) {
    if (!camera) {
      return;
    }
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
        const hitDistance = hits[0].distance;
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
