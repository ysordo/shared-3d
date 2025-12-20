import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/AnnotationsPlugin.ts
var AnnotationsPlugin = class {
  constructor(data) {
    this.data = data;
  }
  name = "Annotations";
  annotations = /* @__PURE__ */ new Map();
  camera;
  scene;
  _rafId = null;
  _observers = /* @__PURE__ */ new Map();
  install({ camera, scene }) {
    this.camera = camera;
    this.scene = scene;
    this.syncAnnotations();
    this.startLoop();
  }
  addAnnotation(ann) {
    const sprite = this.createLabel(
      ann.content,
      ann.offset ?? new THREE.Vector3(0, 1, 0)
    );
    sprite.position.copy(ann.position);
    sprite.visible = ann.visible ?? true;
    sprite.userData.followTarget = ann.target;
    this.annotations.set(ann.id, sprite);
    this.scene.add(sprite);
  }
  updateAnnotation(ann) {
    const sprite = this.annotations.get(ann.id);
    sprite.visible = ann.visible ?? true;
    sprite.userData.followTarget = ann.target;
  }
  removeAnnotation(id) {
    const sprite = this.annotations.get(id);
    sprite.parent?.remove(sprite);
    const observer = this._observers.get(id);
    observer?.disconnect();
    if (sprite.material instanceof THREE.SpriteMaterial) {
      sprite.material.map?.dispose();
      sprite.material.dispose();
    }
    this.annotations.delete(id);
    this._observers.delete(id);
  }
  startLoop() {
    const loop = () => {
      this.annotations.forEach((sprite) => {
        if (sprite.userData.followTarget) {
          sprite.userData.followTarget.getWorldPosition(sprite.position);
          sprite.position.add(sprite.userData.offset);
        }
        sprite.lookAt(this.camera.position);
      });
      this._rafId = requestAnimationFrame(loop);
    };
    loop();
  }
  syncAnnotations() {
    const nextIds = new Set(this.data.map((a) => a.id));
    this.annotations.forEach((sprite, id) => {
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
  createLabel(content, offset) {
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
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.userData.offset = offset;
    sprite.userData.canvas = canvas;
    sprite.userData.div = div;
    const resize = () => {
      const width = div.offsetWidth;
      const height = div.offsetHeight;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(2, 2);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(div);
    resize();
    return sprite;
  }
  dispose() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.annotations.forEach((_, id) => this.removeAnnotation(id));
    this.annotations.clear();
  }
  update(data) {
    this.data = data;
    this.syncAnnotations();
  }
};

export {
  AnnotationsPlugin
};
