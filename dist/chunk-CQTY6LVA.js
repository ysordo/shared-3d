import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/AdvancedRaycasterPlugin.ts
var AdvancedRaycasterPlugin = class {
  name = "AdvancedRaycaster";
  _manager;
  model = null;
  onEvent;
  constructor(...[
    initialModel,
    initialOnEvent
  ]) {
    this.model = initialModel;
    this.onEvent = initialOnEvent ?? (() => {
    });
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
      this._manager.addEventListener(event, (e) => this.onEvent?.(e));
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
};
var RaycasterManager = class extends THREE.EventDispatcher {
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  scene;
  camera;
  domElement;
  interactableObjects = [];
  lastHoverObject = null;
  isEnabled = false;
  isDragging = false;
  currentDragObject = null;
  dragStartPosition = new THREE.Vector2();
  lastRaycastTime = 0;
  raycastThrottleMs = 16;
  // ~60fps máximo para hover
  onTouchStart;
  onTouchMove;
  onTouchEnd;
  constructor(domElement) {
    super();
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
    if (!(obj instanceof THREE.Mesh)) {
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
    const endPos = new THREE.Vector2(e.clientX, e.clientY);
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
    const current = new THREE.Vector2(e.clientX, e.clientY);
    const delta = current.clone().sub(this.dragStartPosition);
    this.dispatchEvent({
      type: "objectdrag",
      object: this.currentDragObject,
      currentPosition: current,
      startPosition: this.dragStartPosition.clone(),
      delta,
      normalizedDelta: new THREE.Vector2(
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
    const hit = hits?.[0] || null;
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
  onContextMenu = (e) => e.preventDefault();
};

export {
  AdvancedRaycasterPlugin
};
