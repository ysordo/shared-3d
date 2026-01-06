"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } var _class;// src/core/plugins/postprocessing/ureal-engine/FrameState.ts
var _three = require('three'); var THREE = _interopRequireWildcard(_three);
var FrameState = (_class = class {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this); }
  __init() {this.frame = 0}
  __init2() {this.jitter = new THREE.Vector2()}
  __init3() {this.resolutionScale = 1}
  __init4() {this.halton = [
    [0.5, 0.333],
    [0.25, 0.667],
    [0.75, 0.111],
    [0.125, 0.444],
    [0.625, 0.777],
    // Agregados para mejor convergencia (Nanite-like smoothness)
    [0.375, 0.222],
    [0.875, 0.555],
    [0.0625, 0.888]
  ]}
  update(camera, width, height) {
    const [x, y] = this.halton[this.frame % this.halton.length];
    this.jitter.set((x - 0.5) * this.resolutionScale, (y - 0.5) * this.resolutionScale);
    camera.setViewOffset(
      width,
      height,
      this.jitter.x,
      this.jitter.y,
      width,
      height
    );
    this.frame = (this.frame + 1) % this.halton.length;
  }
  reset(camera) {
    camera.clearViewOffset();
    this.frame = 0;
  }
}, _class);



exports.FrameState = FrameState;
