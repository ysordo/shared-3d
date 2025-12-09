"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = (_class = class {
  constructor(distanceThreshold = 0.6, pushBackOffset = 0.1, smooth = 0.1) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
    this.smooth = smooth;
  }
  __init() {this.name = "AdvancedCameraCollision"}
  __init2() {this.handle = null}
  install({ camera, orchestrator }) {
    if (!camera) {
      return;
    }
    const dir = new _chunkEA3XQ4KJcjs.THREE.Vector3();
    const ray = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
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
        new _chunkEA3XQ4KJcjs.THREE.Vector3(this.distanceThreshold, 0, 0),
        new _chunkEA3XQ4KJcjs.THREE.Vector3(-this.distanceThreshold, 0, 0),
        new _chunkEA3XQ4KJcjs.THREE.Vector3(0, this.distanceThreshold, 0),
        new _chunkEA3XQ4KJcjs.THREE.Vector3(0, -this.distanceThreshold, 0),
        new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 0, this.distanceThreshold),
        new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 0, -this.distanceThreshold)
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
  dispose() {
    if (this.handle !== null) {
      cancelAnimationFrame(this.handle);
      this.handle = null;
    }
  }
}, _class);



exports.AdvancedCameraCollisionPlugin = AdvancedCameraCollisionPlugin;
