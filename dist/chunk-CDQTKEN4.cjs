"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
var _Addonsjs = require('three/examples/jsm/Addons.js');
var AdvancedOrbitControlsPlugin = (_class = class {
  __init() {this.name = "AdvancedOrbitControls"}
  
  
  constructor(partialOptions = {}) {;_class.prototype.__init.call(this);
    this.options = {
      enablePan: true,
      enableRotate: true,
      enableZoom: true,
      dampingFactor: 0.05,
      panSpeed: 1,
      rotateSpeed: 1,
      zoomSpeed: 1,
      minDistance: 0.1,
      maxDistance: 1e3,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
      ...partialOptions
    };
  }
  install({ camera, renderer }) {
    this.controls = new (0, _Addonsjs.OrbitControls)(camera, renderer.domElement);
    this.applyOptionsToControls();
    this.controls.enableDamping = true;
  }
  preRender() {
    this.controls.update();
  }
  applyOptionsToControls() {
    const o = this.options;
    this.controls.enablePan = o.enablePan;
    this.controls.enableRotate = o.enableRotate;
    this.controls.enableZoom = o.enableZoom;
    this.controls.dampingFactor = o.dampingFactor;
    this.controls.panSpeed = o.panSpeed;
    this.controls.rotateSpeed = o.rotateSpeed;
    this.controls.zoomSpeed = o.zoomSpeed;
    this.controls.minDistance = o.minDistance;
    this.controls.maxDistance = o.maxDistance;
    this.controls.minPolarAngle = o.minPolarAngle;
    this.controls.maxPolarAngle = o.maxPolarAngle;
  }
  set enablePan(enabled) {
    this.options.enablePan = enabled;
    this.controls.enablePan = enabled;
  }
  get enablePan() {
    return this.controls.enablePan;
  }
  set enableRotate(enabled) {
    this.options.enableRotate = enabled;
    this.controls.enableRotate = enabled;
  }
  get enableRotate() {
    return this.controls.enableRotate;
  }
  set enableZoom(enabled) {
    this.options.enableZoom = enabled;
    this.controls.enableZoom = enabled;
  }
  get enableZoom() {
    return this.controls.enableZoom;
  }
  set minDistance(distance) {
    this.options.minDistance = distance;
    this.controls.minDistance = distance;
  }
  get minDistance() {
    return this.controls.minDistance;
  }
  set maxDistance(distance) {
    this.options.maxDistance = distance;
    this.controls.maxDistance = distance;
  }
  get maxDistance() {
    return this.controls.maxDistance;
  }
  update(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.applyOptionsToControls();
  }
  dispose() {
    this.controls.disconnect();
    this.controls.dispose();
  }
}, _class);



exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin;
