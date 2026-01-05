import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/HighResPostProcessingPlugin.ts
import * as POSTPROCESSING from "postprocessing";
import { SMAAEffect, FXAAEffect } from "postprocessing";
var DEFAULT_CONFIG = {
  enabled: true,
  toneMappingExposure: 1,
  multisampling: 8,
  aaType: "smaa",
  superSampling: 1
};
var HighResPostProcessingPlugin = class {
  name = "HighResPostProcessing";
  composer;
  config;
  constructor(config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    renderer.setPixelRatio(window.devicePixelRatio * this.config.superSampling);
    this.composer = new POSTPROCESSING.EffectComposer(renderer, {
      multisampling: this.config.multisampling > 0 ? this.config.multisampling : 0,
      frameBufferType: THREE.HalfFloatType
      // Precisión HDR sin banding
    });
    this.composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    if (this.config.aaType !== "none") {
      let aaEffect;
      if (this.config.aaType === "smaa") {
        aaEffect = new SMAAEffect();
      } else if (this.config.aaType === "fxaa") {
        aaEffect = new FXAAEffect();
      }
      if (aaEffect) {
        const aaPass = new POSTPROCESSING.EffectPass(camera, aaEffect);
        this.composer.addPass(aaPass);
      }
    }
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
    if (newConfig.toneMappingExposure !== void 0) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
    if (newConfig.multisampling !== void 0) {
      this.composer.multisampling = newConfig.multisampling;
    }
    if (newConfig.superSampling !== void 0) {
      this.composer.getRenderer().setPixelRatio(window.devicePixelRatio * newConfig.superSampling);
    }
  }
  dispose() {
    this.composer.dispose();
  }
};

export {
  HighResPostProcessingPlugin
};
