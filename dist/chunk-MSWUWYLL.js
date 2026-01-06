// src/core/plugins/postprocessing/ureal-engine/BloomPlugin.ts
import { BloomEffect } from "postprocessing";
var BloomPlugin = class {
  name = "Bloom";
  effect;
  constructor() {
    this.effect = new BloomEffect({
      intensity: 0.4,
      mipmapBlur: true,
      // Para realism ultra
      luminanceSmoothing: 0.1,
      // Evita flicker
      resolutionScale: 1
      // Full res para high-poly
    });
    this.effect.luminanceMaterial.threshold = 1.2;
    this.effect.luminanceMaterial.smoothing = 0.025;
  }
  install() {
  }
};

export {
  BloomPlugin
};
