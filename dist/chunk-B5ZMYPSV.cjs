"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;// src/core/orchestrator/plugins/AdvancedOrbitControlsPlugin.ts
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var AdvancedOrbitControlsPlugin = (_class = class {
  constructor(options = {}) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.options = options;
    Object.assign(this.config, options);
  }
  __init() {this.name = "AdvancedOrbitControls"}
  
  __init2() {this.config = {
    enableDamping: true,
    dampingFactor: 0.05,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    minDistance: 0.1,
    maxDistance: 1e3,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI
  }}
  install({ camera, renderer }) {
    this.controls = new (0, _OrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    Object.assign(this.controls, this.config);
    const animate = () => {
      this.controls.update();
      requestAnimationFrame(animate);
    };
    animate();
  }
  /* === API PÚBLICA === */
  setPanEnabled(enabled) {
    this.controls.enablePan = enabled;
  }
  setRotateEnabled(enabled) {
    this.controls.enableRotate = enabled;
  }
  setZoomEnabled(enabled) {
    this.controls.enableZoom = enabled;
  }
  setAllEnabled(enabled) {
    this.controls.enablePan = enabled;
    this.controls.enableRotate = enabled;
    this.controls.enableZoom = enabled;
  }
  dispose() {
    _optionalChain([this, 'access', _ => _.controls, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
  }
}, _class);



exports.AdvancedOrbitControlsPlugin = AdvancedOrbitControlsPlugin;
