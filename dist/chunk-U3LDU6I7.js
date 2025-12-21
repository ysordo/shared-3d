import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = class {
  name = "Raycaster";
  scene;
  camera;
  dom;
  enabled = true;
  objects = [];
  onEvent = () => {
  };
  hovered = null;
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  onPointerMove;
  onClick;
  constructor(config) {
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
};

export {
  RaycasterPlugin
};
