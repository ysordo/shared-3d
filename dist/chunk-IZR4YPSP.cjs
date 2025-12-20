"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/MeasurementToolPlugin.ts
var MeasurementToolPlugin = (_class = class {
  __init() {this.name = "MeasurementTool"}
  
  
  
  
  __init2() {this.enabled = true}
  __init3() {this.points = []}
  __init4() {this.spheres = []}
  
  
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);
    this.config = {
      enabled: true,
      pointRadius: 0.05,
      color: 65280,
      onMeasure: () => {
      },
      ...config
    };
  }
  /* =========================
   *  Public API
   * ========================= */
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
    this.reset();
  }
  update(config) {
    this.config = { ...this.config, ...config };
    if (config.enabled !== void 0) {
      this.enabled = config.enabled;
      if (!this.enabled) {
        this.reset();
      }
    }
  }
  /* =========================
   *  Install
   * ========================= */
  install(ctx) {
    this.scene = ctx.scene;
    this.camera = ctx.camera;
    this.renderer = ctx.renderer;
    this.orchestrator = ctx.orchestrator;
    this.pointerHandler = this.handlePointerDown.bind(this);
    this.renderer.domElement.addEventListener("pointerdown", this.pointerHandler, { capture: true });
  }
  /* =========================
   *  Pointer logic
   * ========================= */
  handlePointerDown(e) {
    if (!this.enabled || e.button !== 0) {
      return;
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
    raycaster.setFromCamera(new _chunkEA3XQ4KJcjs.THREE.Vector2(x, y), this.camera);
    const model = this.orchestrator.getActiveModel();
    if (!model) {
      return;
    }
    const intersects = raycaster.intersectObject(model, true);
    if (!intersects.length) {
      return;
    }
    const point = intersects[0].point.clone();
    this.points.push(point);
    this.spawnPoint(point);
    this.config.onMeasure({ point, points: [...this.points] });
    if (this.points.length === 2) {
      this.finishMeasurement();
    }
  }
  /* =========================
   *  Drawing
   * ========================= */
  spawnPoint(point) {
    const mesh = new _chunkEA3XQ4KJcjs.THREE.Mesh(
      new _chunkEA3XQ4KJcjs.THREE.SphereGeometry(this.config.pointRadius),
      new _chunkEA3XQ4KJcjs.THREE.MeshBasicMaterial({ color: this.config.color })
    );
    mesh.position.copy(point);
    this.scene.add(mesh);
    this.spheres.push(mesh);
  }
  finishMeasurement() {
    const distance = this.points[0].distanceTo(this.points[1]);
    const geometry = new _chunkEA3XQ4KJcjs.THREE.BufferGeometry().setFromPoints(this.points);
    const material = new _chunkEA3XQ4KJcjs.THREE.LineBasicMaterial({ color: this.config.color });
    this.line = new _chunkEA3XQ4KJcjs.THREE.Line(geometry, material);
    this.scene.add(this.line);
    this.config.onMeasure({
      point: this.points[1],
      distance,
      points: [...this.points]
    });
    setTimeout(() => this.reset(), 3e3);
  }
  /* =========================
   *  Cleanup
   * ========================= */
  reset() {
    this.points = [];
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      this.line.material.dispose();
      this.line = void 0;
    }
    this.spheres.forEach((s) => {
      this.scene.remove(s);
      s.geometry.dispose();
      s.material.dispose();
    });
    this.spheres = [];
  }
  /* =========================
   *  Dispose
   * ========================= */
  dispose() {
    this.renderer.domElement.removeEventListener("pointerdown", this.pointerHandler, { capture: true });
    this.reset();
  }
}, _class);



exports.MeasurementToolPlugin = MeasurementToolPlugin;
