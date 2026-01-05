// src/core/plugins/postprocessing/ureal-engine/BloomPlugin.ts
import { BloomEffect } from "postprocessing";
var BloomPlugin = class {
  effect;
  constructor() {
    this.effect = new BloomEffect({
      intensity: 0.4,
      mipmapBlur: true
    });
    this.effect.luminanceMaterial.threshold = 1.2;
  }
};

export {
  BloomPlugin
};
