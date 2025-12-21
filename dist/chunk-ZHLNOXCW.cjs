"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = (_class = class {
  __init() {this.name = "Raycaster"}
  
  
  
  __init2() {this.enabled = true}
  __init3() {this.objects = []}
  __init4() {this.onEvent = () => {
  }}
  __init5() {this.hovered = null}
  __init6() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init7() {this.pointer = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onClick = this.handleClick.bind(this);
    if (config) {
      if (config.objects) {
        this.objects = config.objects;
      }
      if (config.onEvent) {
        this.onEvent = config.onEvent;
      }
      if (config.enabled !== void 0) {
        this.enabled = config.enabled;
      }
    }
  }
  install({ scene, camera, renderer }) {
    this.scene = scene;
    this.camera = camera;
    this.dom = renderer.domElement;
    this.dom.addEventListener("pointermove", this.onPointerMove, { passive: true });
    this.dom.addEventListener("click", this.onClick, { passive: true });
  }
  handlePointerMove(e) {
    if (!this.enabled) {
      return;
    }
    this.updatePointer(e);
    this.checkIntersection();
  }
  handleClick(e) {
    if (!this.enabled) {
      return;
    }
    this.updatePointer(e);
    const hit = this.getIntersection();
    if (hit) {
      this.onEvent({
        type: "click",
        object: hit.object,
        point: hit.point
      });
    }
  }
  checkIntersection() {
    const hit = this.getIntersection();
    if (hit && hit.object !== this.hovered) {
      if (this.hovered) {
        this.onEvent({ type: "leave", object: this.hovered });
      }
      this.hovered = hit.object;
      this.onEvent({
        type: "hover",
        object: hit.object,
        point: hit.point
      });
    } else if (!hit && this.hovered) {
      this.onEvent({ type: "leave", object: this.hovered });
      this.hovered = null;
    }
  }
  getIntersection() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const targets = this.objects.length > 0 ? this.objects : this.scene.children;
    const intersects = this.raycaster.intersectObjects(targets, true);
    if (intersects.length === 0) {
      return null;
    }
    return {
      object: intersects[0].object,
      point: intersects[0].point
    };
  }
  updatePointer(e) {
    const rect = this.dom.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  update(config) {
    if (config.objects !== void 0) {
      this.objects = config.objects;
    }
    if (config.onEvent !== void 0) {
      this.onEvent = config.onEvent;
    }
    if (config.enabled !== void 0) {
      this.enabled = config.enabled;
      if (!this.enabled && this.hovered) {
        this.onEvent({ type: "leave", object: this.hovered });
        this.hovered = null;
      }
    }
  }
  setEnabled(enabled) {
    this.update({ enabled });
  }
  dispose() {
    this.dom.removeEventListener("pointermove", this.onPointerMove);
    this.dom.removeEventListener("click", this.onClick);
    if (this.hovered) {
      this.onEvent({ type: "leave", object: this.hovered });
      this.hovered = null;
    }
  }
}, _class);



exports.RaycasterPlugin = RaycasterPlugin;
