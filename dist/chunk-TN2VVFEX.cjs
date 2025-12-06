"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var AdvancedOrbitControlsPlugin = (_class = class {
  __init() {this.name = "AdvancedOrbitControls"}
  
  __init2() {this.config = {
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
    maxPolarAngle: Math.PI
  }}
  constructor(options = {}) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    Object.assign(this.config, options);
  }
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    Object.assign(this.controls, this.config);
    this.controls.update();
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  // ← AÑADIR RETRASO DE 1 FRAME
  safeUpdate(action) {
    if (this.controls) {
      requestAnimationFrame(() => {
        if (this.controls) {
          action();
        }
      });
    }
  }
  setPanEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enablePan = enabled;
    });
  }
  setRotateEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enableRotate = enabled;
    });
  }
  setZoomEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enableZoom = enabled;
    });
  }
  setAllEnabled(enabled) {
    this.safeUpdate(() => {
      this.controls.enablePan = enabled;
      this.controls.enableRotate = enabled;
      this.controls.enableZoom = enabled;
      this.controls.enabled = enabled;
    });
  }
  dispose() {
    _optionalChain([this, 'access', _ => _.controls, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
  }
}, _class);



exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin;
