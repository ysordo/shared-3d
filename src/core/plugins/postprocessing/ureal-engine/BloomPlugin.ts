import { BloomEffect } from 'postprocessing';
import type { Plugin, PluginContext } from '../../types';

export class BloomPlugin implements Plugin {
  readonly name = 'Bloom';
  effect!: BloomEffect;

  constructor() {
    
  }
  install(__context: PluginContext): void {
    this.effect = new BloomEffect({
      intensity: 0.4,
      mipmapBlur: true, // Para realism ultra
      luminanceSmoothing: 0.1, // Evita flicker
      resolutionScale: 1.0, // Full res para high-poly
    });
    this.effect.luminanceMaterial.threshold = 1.2;
    this.effect.luminanceMaterial.smoothing = 0.025;
  }
}