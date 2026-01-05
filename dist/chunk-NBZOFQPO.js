import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/RealisticPostProcessingPlugin.ts
import * as POSTPROCESSING from "postprocessing";
import {
  BloomEffect,
  DepthOfFieldEffect,
  VignetteEffect,
  NoiseEffect,
  SMAAEffect,
  ToneMappingEffect,
  ToneMappingMode
} from "postprocessing";
var DEFAULT_CONFIG = {
  enabled: true,
  bloom: { intensity: 0.8, luminanceThreshold: 0.9 },
  dof: { focusDistance: 0, focalLength: 0.05, bokehScale: 2 },
  vignette: { offset: 0.5, darkness: 0.8 },
  noise: { opacity: 0.02 },
  toneMappingExposure: 1
};
var RealisticPostProcessingPlugin = class {
  name = "RealisticPostProcessing";
  composer;
  bloom;
  dof;
  vignette;
  noise;
  config;
  constructor(config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    this.composer = new POSTPROCESSING.EffectComposer(renderer);
    this.composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    this.bloom = new BloomEffect({
      intensity: this.config.bloom.intensity,
      luminanceThreshold: this.config.bloom.luminanceThreshold
    });
    this.bloom.blendMode.opacity.value = 1;
    this.dof = new DepthOfFieldEffect(camera, {
      focusDistance: this.config.dof.focusDistance,
      focalLength: this.config.dof.focalLength,
      bokehScale: this.config.dof.bokehScale
    });
    this.vignette = new VignetteEffect({
      offset: this.config.vignette.offset,
      darkness: this.config.vignette.darkness
    });
    this.noise = new NoiseEffect({
      premultiply: true
    });
    this.noise.blendMode.opacity.value = this.config.noise.opacity;
    const smaa = new SMAAEffect();
    const toneMapping = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC
    });
    const mainPass = new POSTPROCESSING.EffectPass(
      camera,
      this.bloom,
      this.dof,
      this.vignette,
      this.noise,
      smaa,
      toneMapping
    );
    this.composer.addPass(mainPass);
  }
  postRender() {
    if (this.config.enabled) {
      this.composer.render();
    }
  }
  resize(width, height) {
    this.composer.setSize(width, height);
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.bloom) {
      if (newConfig.bloom.intensity !== void 0) {
        this.bloom.intensity = newConfig.bloom.intensity;
      }
      if (newConfig.bloom.luminanceThreshold !== void 0) {
        this.bloom.luminanceMaterial.threshold = newConfig.bloom.luminanceThreshold;
      }
    }
    if (newConfig.dof) {
      if (newConfig.dof.focusDistance !== void 0) {
        this.dof.circleOfConfusionMaterial.focusDistance = newConfig.dof.focusDistance;
      }
      if (newConfig.dof.focalLength !== void 0) {
        this.dof.circleOfConfusionMaterial.focalLength = newConfig.dof.focalLength;
      }
      if (newConfig.dof.bokehScale !== void 0) {
        this.dof.bokehScale = newConfig.dof.bokehScale;
      }
    }
    if (newConfig.vignette) {
      if (newConfig.vignette.offset !== void 0) {
        this.vignette.offset = newConfig.vignette.offset;
      }
      if (newConfig.vignette.darkness !== void 0) {
        this.vignette.darkness = newConfig.vignette.darkness;
      }
    }
    if (newConfig.noise?.opacity !== void 0) {
      this.noise.blendMode.opacity.value = newConfig.noise.opacity;
    }
    if (newConfig.toneMappingExposure !== void 0) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }
  dispose() {
    this.composer.dispose();
  }
};

export {
  RealisticPostProcessingPlugin
};
