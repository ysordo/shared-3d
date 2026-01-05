"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/RealisticPostProcessingPlugin.ts
var _postprocessing = require('postprocessing'); var POSTPROCESSING = _interopRequireWildcard(_postprocessing);









var DEFAULT_CONFIG = {
  enabled: true,
  bloom: { intensity: 0.8, luminanceThreshold: 0.9 },
  dof: { focusDistance: 0, focalLength: 0.05, bokehScale: 2 },
  vignette: { offset: 0.5, darkness: 0.8 },
  noise: { opacity: 0.02 },
  toneMappingExposure: 1
};
var RealisticPostProcessingPlugin = (_class = class {
  __init() {this.name = "RealisticPostProcessing"}
  
  
  
  
  
  
  constructor(config) {;_class.prototype.__init.call(this);
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = _chunkEA3XQ4KJcjs.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    this.composer = new POSTPROCESSING.EffectComposer(renderer);
    this.composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    this.bloom = new (0, _postprocessing.BloomEffect)({
      intensity: this.config.bloom.intensity,
      luminanceThreshold: this.config.bloom.luminanceThreshold
    });
    this.bloom.blendMode.opacity.value = 1;
    this.dof = new (0, _postprocessing.DepthOfFieldEffect)(camera, {
      focusDistance: this.config.dof.focusDistance,
      focalLength: this.config.dof.focalLength,
      bokehScale: this.config.dof.bokehScale
    });
    this.vignette = new (0, _postprocessing.VignetteEffect)({
      offset: this.config.vignette.offset,
      darkness: this.config.vignette.darkness
    });
    this.noise = new (0, _postprocessing.NoiseEffect)({
      premultiply: true
    });
    this.noise.blendMode.opacity.value = this.config.noise.opacity;
    const smaa = new (0, _postprocessing.SMAAEffect)();
    const toneMapping = new (0, _postprocessing.ToneMappingEffect)({
      mode: _postprocessing.ToneMappingMode.ACES_FILMIC
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
    if (_optionalChain([newConfig, 'access', _ => _.noise, 'optionalAccess', _2 => _2.opacity]) !== void 0) {
      this.noise.blendMode.opacity.value = newConfig.noise.opacity;
    }
    if (newConfig.toneMappingExposure !== void 0) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }
  dispose() {
    this.composer.dispose();
  }
}, _class);



exports.RealisticPostProcessingPlugin = RealisticPostProcessingPlugin;
