"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;// src/core/orchestrator/plugins/OrbitControlsPlugin.ts
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var OrbitControlsPlugin = (_class = class {constructor() { _class.prototype.__init.call(this); }
  __init() {this.name = "OrbitControls"}
  
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.8;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;
    this.controls.maxPolarAngle = Math.PI / 2.1;
  }
  preRender() {
    this.controls.update();
  }
  get maxDistance() {
    return this.controls.maxDistance;
  }
  get minDistance() {
    return this.controls.minDistance;
  }
  get enableRotate() {
    return this.controls.enableRotate;
  }
  get enableZoom() {
    return this.controls.enableZoom;
  }
  get enablePan() {
    return this.controls.enablePan;
  }
  dispose() {
    this.controls.dispose();
  }
}, _class);



exports.OrbitControlsPlugin = OrbitControlsPlugin;
