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
    this.controls.enablePan = this.controls.enablePan;
    this.controls.enableRotate = this.controls.enableRotate;
    this.controls.enableZoom = this.controls.enableZoom;
    this.controls.dampingFactor = this.controls.dampingFactor;
    this.controls.panSpeed = this.controls.panSpeed;
    this.controls.rotateSpeed = this.controls.rotateSpeed;
    this.controls.zoomSpeed = this.controls.zoomSpeed;
    this.controls.minDistance = this.controls.minDistance;
    this.controls.maxDistance = this.controls.maxDistance;
    this.controls.minPolarAngle = this.controls.minPolarAngle;
    this.controls.maxPolarAngle = this.controls.maxPolarAngle;
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
    Object.keys(newOptions).forEach((key) => {
      if (newOptions[key] !== void 0 && this.options[key] !== newOptions[key]) {
        this.options[key] = newOptions[key];
      }
    });
    this.applyOptionsToControls();
  }
  dispose() {
    this.controls.disconnect();
    this.controls.dispose();
  }
}, _class);



exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin;
