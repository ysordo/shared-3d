import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/RealismPostProcessingPlugin.ts
import * as POSTPROCESSING from "postprocessing";
import {
  SSGIEffect,
  TRAAEffect,
  MotionBlurEffect,
  VelocityDepthNormalPass,
  HBAOEffect
} from "realism-effects";
var DEFAULT_CONFIG = {
  enabled: true,
  ssgi: { distance: 10, thickness: 10, denoiseIterations: 2, resolutionScale: 1 },
  hbao: { intensity: 1, bias: 0.5 },
  traa: { blend: 0.8 },
  motionBlur: { intensity: 0.5 },
  toneMappingExposure: 1
};
var RealismPostProcessingPlugin = class {
  name = "RealismPostProcessing";
  composer;
  velocityPass;
  ssgiEffect;
  hbaoEffect;
  traaEffect;
  motionBlurEffect;
  config;
  constructor(config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.composer = new POSTPROCESSING.EffectComposer(renderer);
    this.velocityPass = new VelocityDepthNormalPass(scene, camera);
    this.composer.addPass(this.velocityPass);
    this.ssgiEffect = new SSGIEffect(scene, camera, this.velocityPass, this.config.ssgi);
    this.hbaoEffect = new HBAOEffect(this.composer, camera, scene);
    this.hbaoEffect.intensity = this.config.hbao.intensity;
    this.hbaoEffect.bias = this.config.hbao.bias;
    this.traaEffect = new TRAAEffect(scene, camera, this.velocityPass);
    this.traaEffect.blend = this.config.traa.blend;
    this.motionBlurEffect = new MotionBlurEffect(this.velocityPass);
    this.motionBlurEffect.intensity = this.config.motionBlur.intensity;
    const mainPass = new POSTPROCESSING.EffectPass(camera, this.hbaoEffect, this.ssgiEffect);
    const aaPass = new POSTPROCESSING.EffectPass(camera, this.traaEffect, this.motionBlurEffect);
    this.composer.addPass(mainPass);
    this.composer.addPass(aaPass);
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
    if (newConfig.enabled !== void 0) {
    }
    if (newConfig.ssgi) {
      this.ssgiEffect.distance = newConfig.ssgi.distance ?? this.config.ssgi.distance;
      this.ssgiEffect.thickness = newConfig.ssgi.thickness ?? this.config.ssgi.thickness;
      this.ssgiEffect.denoiseIterations = newConfig.ssgi.denoiseIterations ?? this.config.ssgi.denoiseIterations;
      this.ssgiEffect.resolutionScale = newConfig.ssgi.resolutionScale ?? this.config.ssgi.resolutionScale;
    }
    if (newConfig.hbao) {
      this.hbaoEffect.intensity = newConfig.hbao.intensity ?? this.config.hbao.intensity;
      this.hbaoEffect.bias = newConfig.hbao.bias ?? this.config.hbao.bias;
    }
    if (newConfig.traa?.blend !== void 0) {
      this.traaEffect.blend = newConfig.traa.blend;
    }
    if (newConfig.motionBlur?.intensity !== void 0) {
      this.motionBlurEffect.intensity = newConfig.motionBlur.intensity;
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
  RealismPostProcessingPlugin
};
