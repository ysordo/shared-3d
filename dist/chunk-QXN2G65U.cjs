"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var AdvancedOrbitControlsPlugin = (_class = class {
  constructor(options = {}) {;_class.prototype.__init.call(this);
    this.options = options;
  }
  __init() {this.name = "AdvancedOrbitControls"}
  
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    Object.assign(this.controls, {
      enableDamping: true,
      dampingFactor: 0.05,
      panSpeed: 1,
      rotateSpeed: 1,
      zoomSpeed: 1,
      minDistance: 0.1,
      maxDistance: 1e3,
      ...this.options
    });
    console.info(`[AdvancedOrbitControlsPlugin] Install plugin ${this.name}:`, this.controls);
    this.updateControlsState();
    const tick = () => {
      this.controls.update();
      requestAnimationFrame(tick);
    };
    tick();
  }
  // MÉTODO PÚBLICO PARA REAPLICAR EL ESTADO
  updateControlsState() {
    if (!this.controls) {
      return;
    }
    this.controls.enablePan = _nullishCoalesce(this.options.enablePan, () => ( true));
    this.controls.enableRotate = _nullishCoalesce(this.options.enableRotate, () => ( true));
    this.controls.enableZoom = _nullishCoalesce(this.options.enableZoom, () => ( true));
    this.controls.enabled = true;
  }
  setPanEnabled(enabled) {
    this.options.enablePan = enabled;
    if (this.controls) {
      this.controls.enablePan = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enablePan: ${JSON.stringify(this.controls.enablePan)}, controls:`, this.controls);
    }
  }
  setRotateEnabled(enabled) {
    this.options.enableRotate = enabled;
    if (this.controls) {
      this.controls.enableRotate = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enableRotate: ${JSON.stringify(this.controls.enableRotate)}, controls:`, this.controls);
    }
  }
  setZoomEnabled(enabled) {
    this.options.enableZoom = enabled;
    if (this.controls) {
      this.controls.enableZoom = enabled;
      console.info(`[AdvancedOrbitControlsPlugin] Change state enableZoom: ${JSON.stringify(this.controls.enableZoom)}, controls:`, this.controls);
    }
  }
  setAllEnabled(enabled) {
    this.options.enablePan = enabled;
    this.options.enableRotate = enabled;
    this.options.enableZoom = enabled;
    if (this.controls) {
      this.controls.enablePan = enabled;
      this.controls.enableRotate = enabled;
      this.controls.enableZoom = enabled;
      this.controls.enabled = enabled;
    }
  }
  dispose() {
    _optionalChain([this, 'access', _ => _.controls, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
  }
}, _class);



exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin;
