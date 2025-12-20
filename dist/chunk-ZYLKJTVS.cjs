"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = (_class = class {
  __init() {this.name = "Raycaster"}
  __init2() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init3() {this.pointer = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  __init4() {this.hovered = null}
  
  
  
  __init5() {this.enabled = true}
  __init6() {this.objects = []}
  __init7() {this.onEvent = () => {
  }}
  /* =========================
   *  Constructor
   * ========================= */
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);
    if (_optionalChain([config, 'optionalAccess', _ => _.objects])) {
      this.objects = config.objects;
    }
    if (_optionalChain([config, 'optionalAccess', _2 => _2.onEvent])) {
      this.onEvent = config.onEvent;
    }
    if (_optionalChain([config, 'optionalAccess', _3 => _3.enabled]) !== void 0) {
      this.enabled = config.enabled;
    }
  }
  /* =========================
   *  Install
   * ========================= */
  install({ scene, camera, renderer }) {
    this.scene = scene;
    this.camera = camera;
    this.dom = renderer.domElement;
    this.dom.addEventListener("pointermove", this.onPointerMove);
    this.dom.addEventListener("click", this.onClick);
  }
  /* =========================
   *  Events
   * ========================= */
  __init8() {this.onPointerMove = (e) => {
    if (!this.enabled) {
      return;
    }
    this.updatePointer(e);
    this.checkIntersection();
  }}
  __init9() {this.onClick = (e) => {
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
  }}
  /* =========================
   *  Raycast logic
   * ========================= */
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
    }
    if (!hit && this.hovered) {
      this.onEvent({ type: "leave", object: this.hovered });
      this.hovered = null;
    }
  }
  getIntersection() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const targets = this.objects.length ? this.objects : this.scene.children;
    const hits = this.raycaster.intersectObjects(targets, true);
    return hits[0] || null;
  }
  updatePointer(e) {
    const rect = this.dom.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  /* =========================
   *  Updates
   * ========================= */
  update(config) {
    if (config.objects) {
      this.objects = config.objects;
    }
    if (config.onEvent) {
      this.onEvent = config.onEvent;
    }
    if (config.enabled !== void 0) {
      this.enabled = config.enabled;
    }
    if (!this.enabled && this.hovered) {
      this.onEvent({ type: "leave", object: this.hovered });
      this.hovered = null;
    }
  }
  setEnabled(enabled) {
    this.update({ enabled });
  }
  /* =========================
   *  Dispose
   * ========================= */
  dispose() {
    this.dom.removeEventListener("pointermove", this.onPointerMove);
    this.dom.removeEventListener("click", this.onClick);
    this.hovered = null;
  }
}, _class);



exports.RaycasterPlugin = RaycasterPlugin;
