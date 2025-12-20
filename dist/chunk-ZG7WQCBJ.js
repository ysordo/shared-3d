import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = class {
  name = "Raycaster";
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  hovered = null;
  scene;
  camera;
  dom;
  enabled = true;
  objects = [];
  onEvent = () => {
  };
  /* =========================
   *  Constructor
   * ========================= */
  constructor(config) {
    if (config?.objects) {
      this.objects = config.objects;
    }
    if (config?.onEvent) {
      this.onEvent = config.onEvent;
    }
    if (config?.enabled !== void 0) {
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
  onPointerMove = (e) => {
    if (!this.enabled) {
      return;
    }
    this.updatePointer(e);
    this.checkIntersection();
  };
  onClick = (e) => {
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
  };
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
};

export {
  RaycasterPlugin
};
