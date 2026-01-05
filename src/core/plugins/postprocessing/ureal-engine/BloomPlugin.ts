import { BloomEffect } from 'postprocessing';

export class BloomPlugin {
  effect: BloomEffect;

  constructor() {
    this.effect = new BloomEffect({
      intensity: 0.4,
      mipmapBlur: true,
    });
    this.effect.luminanceMaterial.threshold = 1.2;
  }
}
