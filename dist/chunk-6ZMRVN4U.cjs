"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = (_class = class {
  constructor(distanceThreshold = 0.6, pushBackOffset = 0.1) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
  }
  __init() {this.name = "AdvancedCameraCollisionPlugin"}
  __init2() {this.handle = null}
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
      const dir = new _chunkEA3XQ4KJcjs.THREE.Vector3();
      camera.getWorldDirection(dir);
      const ray = new _chunkEA3XQ4KJcjs.THREE.Raycaster(
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
}, _class);



exports.AdvancedCameraCollisionPlugin = AdvancedCameraCollisionPlugin;
