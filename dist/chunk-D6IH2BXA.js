import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/RaycasterPlugin.ts
var RaycasterPlugin = class {
  name = "Raycaster";
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  hovered = null;
  onEvent;
  constructor(onEvent) {
    this.onEvent = onEvent ?? (() => {
    });
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
        this.onEvent?.({ type: "click", object: intersect.object, point: intersect.point });
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
        this.onEvent?.({ type: "leave", object: this.hovered });
      }
      this.hovered = hit.object;
      this.onEvent?.({ type: "hover", object: hit.object, point: hit.point });
    } else if (!hit && this.hovered) {
      this.onEvent?.({ type: "leave", object: this.hovered });
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
};

export {
  RaycasterPlugin
};
