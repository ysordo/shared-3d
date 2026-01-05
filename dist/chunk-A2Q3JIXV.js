// src/core/plugins/postprocessing/ureal-engine/FrameState.ts
import * as THREE from "three";
var FrameState = class {
  frame = 0;
  jitter = new THREE.Vector2();
  resolutionScale = 1;
  halton = [
    [0.5, 0.333],
    [0.25, 0.667],
    [0.75, 0.111],
    [0.125, 0.444]
  ];
  update(camera, width, height) {
    const [x, y] = this.halton[this.frame % this.halton.length];
    this.jitter.set(x - 0.5, y - 0.5);
    camera.setViewOffset(
      width,
      height,
      this.jitter.x,
      this.jitter.y,
      width,
      height
    );
    this.frame++;
  }
  reset(camera) {
    camera.clearViewOffset();
    this.frame = 0;
  }
};

export {
  FrameState
};
