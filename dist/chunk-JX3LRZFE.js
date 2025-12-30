import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/AnnotationsPlugin.ts
var AnnotationsPlugin = class {
  name = "Annotations";
  camera;
  scene;
  annotations = /* @__PURE__ */ new Map();
  observers = /* @__PURE__ */ new Map();
  data = [];
  worldPos = new THREE.Vector3();
  offsetVec = new THREE.Vector3();
  constructor(initialData = []) {
    this.data = initialData;
  }
  install({ camera, scene }) {
    this.camera = camera;
    this.scene = scene;
    this.syncAnnotations();
  }
  preRender() {
    if (this.annotations.size === 0) {
      return;
    }
    const cameraPosition = this.camera.position;
    this.annotations.forEach((sprite) => {
      const target = sprite.userData.followTarget;
      if (target) {
        target.getWorldPosition(this.worldPos);
        const offset = sprite.userData.offset;
        sprite.position.copy(this.worldPos).add(offset);
      }
      sprite.lookAt(cameraPosition);
    });
  }
  update(newData) {
    this.data = newData;
    this.syncAnnotations();
  }
  syncAnnotations() {
    const nextIds = new Set(this.data.map((a) => a.id));
    this.annotations.forEach((_, id) => {
      if (!nextIds.has(id)) {
        this.removeAnnotation(id);
      }
    });
    this.data.forEach((ann) => {
      if (!this.annotations.has(ann.id)) {
        this.addAnnotation(ann);
      } else {
        this.updateAnnotation(ann);
      }
    });
  }
  addAnnotation(ann) {
    const offset = ann.offset ?? new THREE.Vector3(0, 1, 0);
    const sprite = this.createSpriteLabel(ann.id, ann.content, offset);
    sprite.position.copy(ann.position);
    sprite.visible = ann.visible ?? true;
    sprite.userData.followTarget = ann.target;
    this.scene.add(sprite);
    this.annotations.set(ann.id, sprite);
  }
  updateAnnotation(ann) {
    const sprite = this.annotations.get(ann.id);
    sprite.visible = ann.visible ?? true;
    sprite.userData.followTarget = ann.target;
    if (ann.target) {
      ann.target.getWorldPosition(sprite.position);
      const offset = sprite.userData.offset;
      sprite.position.add(offset);
    } else if (ann.position) {
      sprite.position.copy(ann.position);
    }
  }
  removeAnnotation(id) {
    const sprite = this.annotations.get(id);
    if (!sprite) {
      return;
    }
    sprite.parent?.remove(sprite);
    const observer = this.observers.get(id);
    observer?.disconnect();
    this.observers.delete(id);
    if (sprite.material instanceof THREE.SpriteMaterial) {
      sprite.material.map?.dispose();
      sprite.material.dispose();
    }
    this.annotations.delete(id);
  }
  createSpriteLabel(id, content, offset) {
    const div = document.createElement("div");
    div.className = "annotation-label";
    div.style.cssText = `
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      pointer-events: none;
      white-space: nowrap;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255,255,255,0.2);
    `;
    if (typeof content === "string") {
      div.innerHTML = content;
    } else {
      div.appendChild(content);
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    const material = new THREE.SpriteMaterial({
      map: texture,
      depthTest: false,
      transparent: true
    });
    const sprite = new THREE.Sprite(material);
    sprite.userData.offset = offset;
    sprite.userData.canvas = canvas;
    sprite.userData.div = div;
    const resize = () => {
      const width = div.offsetWidth || 1;
      const height = div.offsetHeight || 1;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(div);
    this.observers.set(id, observer);
    resize();
    return sprite;
  }
  dispose() {
    this.annotations.forEach((_, id) => this.removeAnnotation(id));
    this.annotations.clear();
    this.observers.clear();
  }
};

export {
  AnnotationsPlugin
};
