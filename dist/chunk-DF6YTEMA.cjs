"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AnnotationsPlugin.ts
var AnnotationsPlugin = (_class = class {
  constructor(data) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.data = data;
  }
  __init() {this.name = "Annotations"}
  __init2() {this.annotations = /* @__PURE__ */ new Map()}
  
  
  install({ camera, scene }) {
    this.camera = camera;
    this.scene = scene;
    this.data.forEach((ann) => {
      const label = this.createLabel(ann.content, ann.offset || new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 1, 0));
      label.position.copy(ann.position);
      label.userData.annotationId = ann.id;
      label.visible = _nullishCoalesce(ann.visible, () => ( true));
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
          label.position.add(label.userData.offset || new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 1, 0));
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
    const texture = new _chunkEA3XQ4KJcjs.THREE.CanvasTexture(canvas);
    texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
    texture.wrapS = _chunkEA3XQ4KJcjs.THREE.ClampToEdgeWrapping;
    texture.wrapT = _chunkEA3XQ4KJcjs.THREE.ClampToEdgeWrapping;
    const spriteMaterial = new _chunkEA3XQ4KJcjs.THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new _chunkEA3XQ4KJcjs.THREE.Sprite(spriteMaterial);
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
      if (sprite instanceof _chunkEA3XQ4KJcjs.THREE.Sprite) {
        _optionalChain([sprite, 'access', _ => _.material, 'access', _2 => _2.map, 'optionalAccess', _3 => _3.dispose, 'call', _4 => _4()]);
        sprite.material.dispose();
      }
    });
    this.annotations.clear();
  }
}, _class);



exports.AnnotationsPlugin = AnnotationsPlugin;
