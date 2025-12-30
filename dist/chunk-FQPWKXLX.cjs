"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/AdvancedCameraCollisionPlugin.ts
var AdvancedCameraCollisionPlugin = (_class = class {
  __init() {this.name = "AdvancedCameraCollision"}
  
  
  
  
  
  __init2() {this.dir = new _chunkEA3XQ4KJcjs.THREE.Vector3()}
  __init3() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init4() {this.targetPos = new _chunkEA3XQ4KJcjs.THREE.Vector3()}
  __init5() {this.forward = new _chunkEA3XQ4KJcjs.THREE.Vector3()}
  __init6() {this.candidate = new _chunkEA3XQ4KJcjs.THREE.Vector3()}
  constructor(...[
    distanceThreshold = 0.6,
    pushBackOffset = 0.1,
    smooth = 0.1
  ]) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);
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
    const model = this.orchestrator.activeModel.get;
    if (!model) {
      return;
    }
    this.targetPos.copy(this.camera.position);
    this.camera.getWorldDirection(this.dir);
    this.forward.copy(this.targetPos).add(this.dir.clone().multiplyScalar(-this.distanceThreshold));
    this.checkAndPush(this.targetPos, this.forward, model);
    const offsets = [
      new _chunkEA3XQ4KJcjs.THREE.Vector3(this.distanceThreshold, 0, 0),
      new _chunkEA3XQ4KJcjs.THREE.Vector3(-this.distanceThreshold, 0, 0),
      new _chunkEA3XQ4KJcjs.THREE.Vector3(0, this.distanceThreshold, 0),
      new _chunkEA3XQ4KJcjs.THREE.Vector3(0, -this.distanceThreshold, 0),
      new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 0, this.distanceThreshold),
      new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 0, -this.distanceThreshold)
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
}, _class);



exports.AdvancedCameraCollisionPlugin = AdvancedCameraCollisionPlugin;
