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
  install({ camera, scene }) {
    this.camera = camera;
    this.scene = scene;
    this.data.forEach((ann) => {
      const label = this.createLabel(ann.content, ann.offset || new THREE.Vector3(0, 1, 0));
      label.position.copy(ann.position);
      label.userData.annotationId = ann.id;
      label.visible = ann.visible ?? true;
      if (ann.target) {
        label.userData.followTarget = ann.target;
      }
      this.annotations.set(ann.id, label);
      this.scene.add(label);
    });
    const update = () => {
      this.annotations.forEach((label) => {
        if (label.userData.followTarget) {
          label.userData.followTarget.getWorldPosition(label.position);
          label.position.add(label.userData.offset || new THREE.Vector3(0, 1, 0));
        }
        label.lookAt(this.camera.position);
      });
      requestAnimationFrame(update);
    };
    update();
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
    this.annotations.forEach((sprite) => {
      if (sprite.parent) {
        sprite.parent.remove(sprite);
      }
      if (sprite instanceof THREE.Sprite) {
        sprite.material.map?.dispose();
        sprite.material.dispose();
      }
    });
    this.annotations.clear();
  }
};

export {
  AnnotationsPlugin
};
