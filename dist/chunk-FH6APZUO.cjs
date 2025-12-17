"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = (_class = class {
  __init() {this.name = "Raycaster"}
  __init2() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init3() {this.pointer = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  __init4() {this.hovered = null}
  
  constructor(onEvent) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);
    this.onEvent = _nullishCoalesce(onEvent, () => ( (() => {
    })));
  }
  install({ scene, camera, renderer }) {
    const dom = renderer.domElement;
    const onPointerMove = (e) => {
      this.pointer.x = e.clientX / dom.clientWidth * 2 - 1;
      this.pointer.y = -(e.clientY / dom.clientHeight) * 2 + 1;
      this.checkIntersection(scene, camera);
    };
    const onClick = (e) => {
      this.pointer.x = e.clientX / dom.clientWidth * 2 - 1;
      this.pointer.y = -(e.clientY / dom.clientHeight) * 2 + 1;
      const intersect = this.getIntersection(scene, camera);
      if (intersect) {
        _optionalChain([this, 'access', _ => _.onEvent, 'optionalCall', _2 => _2({ type: "click", object: intersect.object, point: intersect.point })]);
      }
    };
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("click", onClick);
    this.dispose = () => {
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("click", onClick);
      this.hovered = null;
    };
  }
  checkIntersection(scene, camera) {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    const hit = intersects[0];
    if (hit && hit.object !== this.hovered) {
      if (this.hovered) {
        _optionalChain([this, 'access', _3 => _3.onEvent, 'optionalCall', _4 => _4({ type: "leave", object: this.hovered })]);
      }
      this.hovered = hit.object;
      _optionalChain([this, 'access', _5 => _5.onEvent, 'optionalCall', _6 => _6({ type: "hover", object: hit.object, point: hit.point })]);
    } else if (!hit && this.hovered) {
      _optionalChain([this, 'access', _7 => _7.onEvent, 'optionalCall', _8 => _8({ type: "leave", object: this.hovered })]);
      this.hovered = null;
    }
  }
  updateCallback(onEvent) {
    this.onEvent = onEvent;
  }
  getIntersection(scene, camera) {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    return intersects[0] || null;
  }
  dispose() {
  }
}, _class);



exports.RaycasterPlugin = RaycasterPlugin;
