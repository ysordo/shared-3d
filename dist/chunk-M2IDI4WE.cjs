"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AdvancedRaycasterPlugin.ts
var AdvancedRaycasterPlugin = (_class = class {
  __init() {this.name = "AdvancedRaycaster"}
  
  __init2() {this.model = null}
  
  constructor(...[
    initialModel,
    initialOnEvent
  ]) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.model = initialModel;
    this.onEvent = _nullishCoalesce(initialOnEvent, () => ( (() => {
    })));
  }
  install({ scene, camera, renderer }) {
    this._manager = new RaycasterManager(renderer.domElement);
    this._manager.initialize(scene, camera);
    if (this.model) {
      this._manager.setModel(this.model);
    }
    const events = [
      "objectclick",
      "objecthoverin",
      "objecthoverout",
      "objecthovermove",
      "objectdragstart",
      "objectdrag",
      "objectdragend"
    ];
    events.forEach((event) => {
      this._manager.addEventListener(event, (e) => _optionalChain([this, 'access', _ => _.onEvent, 'optionalCall', _2 => _2(e)]));
    });
  }
  setEnabled(enabled) {
    this._manager.setEnabled(enabled);
  }
  update(config) {
    const { model: newModel, onEvent: newOnEvent } = config;
    if (newModel !== void 0 && newModel !== this.model) {
      this.model = newModel;
      if (newModel && this._manager) {
        this._manager.setModel(newModel);
      }
    }
    if (newOnEvent !== void 0) {
      this.onEvent = newOnEvent;
    }
  }
  dispose() {
    if (this._manager) {
      this._manager.setEnabled(false);
    }
  }
  get manager() {
    return this._manager;
  }
}, _class);
var RaycasterManager = (_class2 = class extends _chunkEA3XQ4KJcjs.THREE.EventDispatcher {
  __init3() {this.raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster()}
  __init4() {this.pointer = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  
  
  
  __init5() {this.interactableObjects = []}
  __init6() {this.lastHoverObject = null}
  __init7() {this.isEnabled = false}
  __init8() {this.isDragging = false}
  __init9() {this.currentDragObject = null}
  __init10() {this.dragStartPosition = new _chunkEA3XQ4KJcjs.THREE.Vector2()}
  __init11() {this.lastRaycastTime = 0}
  __init12() {this.raycastThrottleMs = 16}
  // ~60fps máximo para hover
  
  
  
  constructor(domElement) {
    super();_class2.prototype.__init3.call(this);_class2.prototype.__init4.call(this);_class2.prototype.__init5.call(this);_class2.prototype.__init6.call(this);_class2.prototype.__init7.call(this);_class2.prototype.__init8.call(this);_class2.prototype.__init9.call(this);_class2.prototype.__init10.call(this);_class2.prototype.__init11.call(this);_class2.prototype.__init12.call(this);_class2.prototype.__init13.call(this);;
    this.domElement = domElement;
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onTouchStart = this.onPointerDown.bind(this);
    this.onTouchMove = this.onPointerMove.bind(this);
    this.onTouchEnd = this.onPointerUp.bind(this);
  }
  setModel(model) {
    this.interactableObjects = [];
    if (model && typeof model.traverse === "function") {
      model.traverse((obj) => {
        if (this.isInteractable(obj)) {
          this.interactableObjects.push(obj);
        }
      });
    }
  }
  isInteractable(obj) {
    if (!obj.visible) {
      return false;
    }
    if (obj.userData.isNotRaycaster) {
      return false;
    }
    if (!(obj instanceof _chunkEA3XQ4KJcjs.THREE.Mesh)) {
      return false;
    }
    return true;
  }
  initialize(scene, camera) {
    this.scene = scene;
    this.camera = camera;
  }
  setEnabled(enabled) {
    if (this.isEnabled === enabled) {
      return;
    }
    this.isEnabled = enabled;
    enabled ? this.attachEvents() : this.detachEvents();
  }
  attachEvents() {
    const el = this.domElement;
    el.addEventListener("pointermove", this.onPointerMove, { passive: true });
    el.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    el.addEventListener("pointerup", this.onPointerUp, { passive: true });
    el.addEventListener("click", this.onClick, { passive: true });
    el.addEventListener("contextmenu", this.onContextMenu);
    el.style.cursor = "pointer";
  }
  detachEvents() {
    const el = this.domElement;
    el.removeEventListener("pointermove", this.onPointerMove);
    el.removeEventListener("pointerdown", this.onPointerDown);
    el.removeEventListener("pointerup", this.onPointerUp);
    el.removeEventListener("click", this.onClick);
    el.removeEventListener("contextmenu", this.onContextMenu);
    el.style.cursor = "default";
    this.clearHoverState();
  }
  onPointerMove(e) {
    if (!this.isEnabled || !this.scene || !this.camera) {
      return;
    }
    this.updatePointer(e);
    this.isDragging && this.currentDragObject ? this.handleDrag(e) : this.throttledRaycast();
  }
  onPointerDown(e) {
    if (!this.isEnabled || e.button !== 0) {
      return;
    }
    this.updatePointer(e);
    const hit = this.performRaycast()[0];
    if (hit) {
      this.isDragging = true;
      this.currentDragObject = hit.object;
      this.dragStartPosition.set(e.clientX, e.clientY);
      this.dispatchEvent({
        type: "objectdragstart",
        object: hit.object,
        startPosition: this.dragStartPosition.clone()
      });
    }
  }
  onPointerUp(e) {
    if (!this.isEnabled || !this.isDragging) {
      return;
    }
    const endPos = new _chunkEA3XQ4KJcjs.THREE.Vector2(e.clientX, e.clientY);
    this.dispatchEvent({
      type: "objectdragend",
      object: this.currentDragObject,
      startPosition: this.dragStartPosition.clone(),
      endPosition: endPos,
      totalDelta: endPos.clone().sub(this.dragStartPosition)
    });
    this.isDragging = false;
    this.currentDragObject = null;
  }
  onClick(e) {
    if (!this.isEnabled || this.isDragging) {
      return;
    }
    this.updatePointer(e);
    const hit = this.performRaycast()[0];
    if (hit) {
      this.dispatchEvent({
        type: "objectclick",
        object: hit.object,
        point: hit.point,
        distance: hit.distance
      });
    }
  }
  handleDrag(e) {
    const current = new _chunkEA3XQ4KJcjs.THREE.Vector2(e.clientX, e.clientY);
    const delta = current.clone().sub(this.dragStartPosition);
    this.dispatchEvent({
      type: "objectdrag",
      object: this.currentDragObject,
      currentPosition: current,
      startPosition: this.dragStartPosition.clone(),
      delta,
      normalizedDelta: new _chunkEA3XQ4KJcjs.THREE.Vector2(
        delta.x / this.domElement.clientWidth,
        delta.y / this.domElement.clientHeight
      )
    });
    this.dragStartPosition.copy(current);
  }
  throttledRaycast() {
    const now = Date.now();
    if (now - this.lastRaycastTime < this.raycastThrottleMs) {
      return;
    }
    this.lastRaycastTime = now;
    this.raycast();
  }
  raycast() {
    if (!this.scene || !this.camera) {
      return;
    }
    const hits = this.performRaycast();
    const hit = _optionalChain([hits, 'optionalAccess', _3 => _3[0]]) || null;
    if (hit) {
      const current = hit.object;
      if (current !== this.lastHoverObject) {
        if (this.lastHoverObject) {
          this.dispatchEvent({ type: "objecthoverout", object: this.lastHoverObject });
        }
        this.dispatchEvent({
          type: "objecthoverin",
          object: current,
          point: hit.point,
          distance: hit.distance
        });
        this.lastHoverObject = current;
      }
      this.dispatchEvent({
        type: "objecthovermove",
        object: current,
        point: hit.point,
        distance: hit.distance
      });
    } else if (this.lastHoverObject) {
      this.dispatchEvent({ type: "objecthoverout", object: this.lastHoverObject });
      this.lastHoverObject = null;
    }
  }
  performRaycast() {
    if (!this.scene || !this.camera) {
      return [];
    }
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactableObjects, true);
    return intersects.filter((i) => !i.object.name.endsWith("-wireframe")).slice(0, 1).map((i) => ({ object: i.object, point: i.point, distance: i.distance }));
  }
  updatePointer(e) {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  clearHoverState() {
    if (this.lastHoverObject) {
      this.dispatchEvent({ type: "objecthoverout", object: this.lastHoverObject });
      this.lastHoverObject = null;
    }
  }
  __init13() {this.onContextMenu = (e) => e.preventDefault()}
}, _class2);



exports.AdvancedRaycasterPlugin = AdvancedRaycasterPlugin;
