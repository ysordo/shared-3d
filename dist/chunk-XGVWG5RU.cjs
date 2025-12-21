"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/AnnotationsPlugin.ts
var AnnotationsPlugin = (_class = class {
  __init() {this.name = "Annotations"}
  
  
  __init2() {this.annotations = /* @__PURE__ */ new Map()}
  __init3() {this.observers = /* @__PURE__ */ new Map()}
  __init4() {this.data = []}
  __init5() {this.worldPos = new _chunkEA3XQ4KJcjs.THREE.Vector3()}
  __init6() {this.offsetVec = new _chunkEA3XQ4KJcjs.THREE.Vector3()}
  constructor(initialData = []) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);
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
    const offset = _nullishCoalesce(ann.offset, () => ( new _chunkEA3XQ4KJcjs.THREE.Vector3(0, 1, 0)));
    const sprite = this.createSpriteLabel(ann.id, ann.content, offset);
    sprite.position.copy(ann.position);
    sprite.visible = _nullishCoalesce(ann.visible, () => ( true));
    sprite.userData.followTarget = ann.target;
    this.scene.add(sprite);
    this.annotations.set(ann.id, sprite);
  }
  updateAnnotation(ann) {
    const sprite = this.annotations.get(ann.id);
    sprite.visible = _nullishCoalesce(ann.visible, () => ( true));
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
    _optionalChain([sprite, 'access', _2 => _2.parent, 'optionalAccess', _3 => _3.remove, 'call', _4 => _4(sprite)]);
    const observer = this.observers.get(id);
    _optionalChain([observer, 'optionalAccess', _5 => _5.disconnect, 'call', _6 => _6()]);
    this.observers.delete(id);
    if (sprite.material instanceof _chunkEA3XQ4KJcjs.THREE.SpriteMaterial) {
      _optionalChain([sprite, 'access', _7 => _7.material, 'access', _8 => _8.map, 'optionalAccess', _9 => _9.dispose, 'call', _10 => _10()]);
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
    const texture = new _chunkEA3XQ4KJcjs.THREE.CanvasTexture(canvas);
    texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
    texture.wrapS = _chunkEA3XQ4KJcjs.THREE.ClampToEdgeWrapping;
    texture.wrapT = _chunkEA3XQ4KJcjs.THREE.ClampToEdgeWrapping;
    const material = new _chunkEA3XQ4KJcjs.THREE.SpriteMaterial({
      map: texture,
      depthTest: false,
      transparent: true
    });
    const sprite = new _chunkEA3XQ4KJcjs.THREE.Sprite(material);
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
}, _class);



exports.AnnotationsPlugin = AnnotationsPlugin;
