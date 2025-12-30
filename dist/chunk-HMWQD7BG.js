import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = class {
  name = "AdvancedCameraCollision";
  distanceThreshold;
  pushBackOffset;
  smooth;
  camera;
  orchestrator;
  dir = new THREE.Vector3();
  raycaster = new THREE.Raycaster();
  targetPos = new THREE.Vector3();
  forward = new THREE.Vector3();
  candidate = new THREE.Vector3();
  constructor(...[
    distanceThreshold = 0.6,
    pushBackOffset = 0.1,
    smooth = 0.1
  ]) {
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
    this.smooth = smooth;
    this.raycaster.near = 0;
  }
  install({ camera, orchestrator }) {
    this.camera = camera;
    this.orchestrator = orchestrator;
  }
  preRender() {
    const model = this.orchestrator.activeModel.get();
    if (!model) {
      return;
    }
    this.targetPos.copy(this.camera.position);
    this.camera.getWorldDirection(this.dir);
    this.forward.copy(this.targetPos).add(this.dir.clone().multiplyScalar(-this.distanceThreshold));
    this.checkAndPush(this.targetPos, this.forward, model);
    const offsets = [
      new THREE.Vector3(this.distanceThreshold, 0, 0),
      new THREE.Vector3(-this.distanceThreshold, 0, 0),
      new THREE.Vector3(0, this.distanceThreshold, 0),
      new THREE.Vector3(0, -this.distanceThreshold, 0),
      new THREE.Vector3(0, 0, this.distanceThreshold),
      new THREE.Vector3(0, 0, -this.distanceThreshold)
    ];
    offsets.forEach((offset) => {
      this.candidate.copy(this.targetPos).add(offset);
      this.checkAndPush(this.targetPos, this.candidate, model);
    });
    this.camera.position.lerp(this.targetPos, this.smooth);
  }
  checkAndPush(from, to, model) {
    this.dir.subVectors(to, from);
    const distance = this.dir.length();
    if (distance === 0) {
      return;
    }
    this.dir.normalize();
    this.raycaster.set(from, this.dir);
    this.raycaster.far = distance + this.pushBackOffset;
    const hits = this.raycaster.intersectObject(model, true);
    if (hits.length === 0) {
      return;
    }
    const nearest = hits.reduce((a, b) => a.distance < b.distance ? a : b);
    if (nearest.distance < distance) {
      const pushBack = distance - nearest.distance + this.pushBackOffset;
      const pushVector = this.dir.multiplyScalar(pushBack);
      to.sub(pushVector);
    }
  }
  update(config) {
    if (config.distanceThreshold !== void 0) {
      this.distanceThreshold = config.distanceThreshold;
    }
    if (config.pushBackOffset !== void 0) {
      this.pushBackOffset = config.pushBackOffset;
    }
    if (config.smooth !== void 0) {
      this.smooth = config.smooth;
    }
  }
  dispose() {
  }
};

export {
  AdvancedCameraCollisionPlugin
};
