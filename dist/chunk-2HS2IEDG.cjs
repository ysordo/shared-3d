"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var AdvancedOrbitControlsPlugin = (_class = class {
  constructor(options = {}) {;_class.prototype.__init.call(this);
    this.options = options;
  }
  __init() {this.name = "AdvancedOrbitControls"}
  
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = _nullishCoalesce(this.options.dampingFactor, () => ( 0.05));
    this.controls.panSpeed = _nullishCoalesce(this.options.panSpeed, () => ( 1));
    this.controls.rotateSpeed = _nullishCoalesce(this.options.rotateSpeed, () => ( 1));
    this.controls.zoomSpeed = _nullishCoalesce(this.options.zoomSpeed, () => ( 1));
    this.controls.minDistance = _nullishCoalesce(this.options.minDistance, () => ( 0.1));
    this.controls.maxDistance = _nullishCoalesce(this.options.maxDistance, () => ( 1e3));
    this.controls.minPolarAngle = _nullishCoalesce(this.options.minPolarAngle, () => ( 0));
    this.controls.maxPolarAngle = _nullishCoalesce(this.options.maxPolarAngle, () => ( Math.PI));
    this.controls.enablePan = _nullishCoalesce(this.options.enablePan, () => ( true));
    this.controls.enableRotate = _nullishCoalesce(this.options.enableRotate, () => ( true));
    this.controls.enableZoom = _nullishCoalesce(this.options.enableZoom, () => ( true));
    this.controls.enabled = true;
    console.info(`[AdvancedOrbitControlsPlugin] Install plugin ${this.name}:`, this.controls);
    const animate = () => {
      console.info("[AdvancedOrbitControlsPlugin] Update");
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  setPanEnabled(enabled) {
    this.options.enablePan = enabled;
    console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
    if (this.controls) {
      this.controls.enablePan = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enablePan: ${JSON.stringify(this.controls.enablePan)}, controls:`, this.controls);
    }
  }
  setRotateEnabled(enabled) {
    this.options.enableRotate = enabled;
    console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
    if (this.controls) {
      this.controls.enableRotate = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enableRotate: ${JSON.stringify(this.controls.enableRotate)}, controls:`, this.controls);
    }
  }
  setZoomEnabled(enabled) {
    this.options.enableZoom = enabled;
    console.info(`[AdvancedOrbitControlsPlugin] Change state options: ${this.options}, controls:`, this.controls);
    if (this.controls) {
      this.controls.enableZoom = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enableZoom: ${JSON.stringify(this.controls.enableZoom)}, controls:`, this.controls);
    }
  }
  dispose() {
    _optionalChain([this, 'access', _ => _.controls, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
  }
}, _class);



exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin;
