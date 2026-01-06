import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/ureal-engine/AOPlugin.ts
import { N8AOPostPass } from "n8ao";
var DEFAULT_AO_CONFIG = {
  width: 512,
  height: 512
};
var AOPlugin = class {
  name = "AO";
  effect;
  config;
  constructor(config) {
    this.config = { ...DEFAULT_AO_CONFIG, ...config };
  }
  install({ camera, scene }) {
    this.effect = new N8AOPostPass(scene, camera, this.config.width, this.config.height);
    this.effect.configuration.intensity = 4;
    this.effect.configuration.aoRadius = 5;
    this.effect.configuration.distanceFalloff = 1;
    this.effect.configuration.aoSamples = 32;
    this.effect.configuration.denoiseSamples = 8;
    this.effect.configuration.denoiseRadius = 12;
    this.effect.configuration.denoiseIterations = 2;
    this.effect.configuration.halfRes = false;
    this.effect.configuration.screenSpaceRadius = false;
    this.effect.configuration.color = new THREE.Color(0, 0, 0);
    this.effect.configuration.renderMode = 0;
    this.effect.configuration.colorMultiply = true;
    this.effect.configuration.depthAwareUpsampling = true;
  }
  // Resize: n8ao tiene método setSize nativo
  resize(width, height) {
    this.effect.setSize(width, height);
  }
  // Opcional: modo debug para ver solo AO o split view
  setRenderMode(mode) {
    this.effect.configuration.renderMode = mode;
  }
  // Opcional: presets de calidad (como Unreal)
  setQualityPreset(preset) {
    switch (preset) {
      case "low":
        this.effect.configuration.aoSamples = 8;
        this.effect.configuration.denoiseSamples = 4;
        this.effect.configuration.denoiseRadius = 12;
        this.effect.configuration.halfRes = true;
        break;
      case "medium":
        this.effect.configuration.aoSamples = 16;
        this.effect.configuration.denoiseSamples = 8;
        this.effect.configuration.denoiseRadius = 12;
        this.effect.configuration.halfRes = false;
        break;
      case "high":
        this.effect.configuration.aoSamples = 32;
        this.effect.configuration.denoiseSamples = 12;
        this.effect.configuration.denoiseRadius = 8;
        this.effect.configuration.halfRes = false;
        break;
      case "ultra":
        this.effect.configuration.aoSamples = 64;
        this.effect.configuration.denoiseSamples = 16;
        this.effect.configuration.denoiseRadius = 6;
        this.effect.configuration.halfRes = false;
        break;
    }
  }
  dispose() {
    this.effect.dispose();
  }
};

export {
  AOPlugin
};
