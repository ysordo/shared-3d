"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/MeasurementToolPlugin.ts
var MeasurementToolPlugin = (_class = class {
  __init() {this.name = "MeasurementTool"}
  __init2() {this.points = []}
  
  __init3() {this.spheres = []}
  
  constructor(onMeasure) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.onMeasure = _nullishCoalesce(onMeasure, () => ( (() => {
    })));
  }
  install({ scene, camera, renderer, orchestrator }) {
    const handlePointerDown = (e) => {
      if (e.button !== 0) {
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
      raycaster.setFromCamera(new _chunkEA3XQ4KJcjs.THREE.Vector2(x, y), camera);
      const model = orchestrator.getActiveModel();
      if (!model) {
        return;
      }
      const intersects = raycaster.intersectObject(model, true);
      if (intersects.length === 0) {
        return;
      }
      const point = intersects[0].point.clone();
      this.points.push(point);
      const sphere = new _chunkEA3XQ4KJcjs.THREE.Mesh(
        new _chunkEA3XQ4KJcjs.THREE.SphereGeometry(0.05),
        new _chunkEA3XQ4KJcjs.THREE.MeshBasicMaterial({ color: 65280 })
      );
      sphere.position.copy(point);
      scene.add(sphere);
      this.spheres.push(sphere);
      _optionalChain([this, 'access', _ => _.onMeasure, 'optionalCall', _2 => _2({ point, points: [...this.points] })]);
      if (this.points.length === 2) {
        const distance = this.points[0].distanceTo(this.points[1]);
        _optionalChain([this, 'access', _3 => _3.onMeasure, 'optionalCall', _4 => _4({ point, distance, points: [...this.points] })]);
        const geometry = new _chunkEA3XQ4KJcjs.THREE.BufferGeometry().setFromPoints(this.points);
        const material = new _chunkEA3XQ4KJcjs.THREE.LineBasicMaterial({ color: 65280 });
        this.line = new _chunkEA3XQ4KJcjs.THREE.Line(geometry, material);
        scene.add(this.line);
        setTimeout(() => this.reset(), 3e3);
      }
    };
    renderer.domElement.addEventListener("pointerdown", handlePointerDown, { capture: true });
    this.dispose = () => {
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      this.reset();
    };
  }
  reset() {
    this.points = [];
    if (this.line) {
      _optionalChain([this, 'access', _5 => _5.line, 'access', _6 => _6.parent, 'optionalAccess', _7 => _7.remove, 'call', _8 => _8(this.line)]);
      this.line.geometry.dispose();
      if (Array.isArray(this.line.material)) {
        this.line.material.forEach((mat) => mat.dispose());
      } else {
        this.line.material.dispose();
      }
      this.line = void 0;
    }
    this.spheres.forEach((s) => {
      _optionalChain([s, 'access', _9 => _9.parent, 'optionalAccess', _10 => _10.remove, 'call', _11 => _11(s)]);
      s.geometry.dispose();
      if (Array.isArray(s.material)) {
        s.material.forEach((mat) => mat.dispose());
      } else {
        s.material.dispose();
      }
    });
    this.spheres = [];
  }
  dispose() {
    this.reset();
  }
}, _class);



exports.MeasurementToolPlugin = MeasurementToolPlugin;
