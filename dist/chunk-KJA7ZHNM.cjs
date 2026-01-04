"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/RealismPostProcessingPlugin.ts
var _postprocessing = require('postprocessing'); var POSTPROCESSING = _interopRequireWildcard(_postprocessing);






var _realismeffectsadel = require('realism-effects-adel');
var DEFAULT_CONFIG = {
  enabled: true,
  ssgi: { distance: 10, thickness: 10, denoiseIterations: 2, resolutionScale: 1 },
  hbao: { intensity: 1, bias: 0.5 },
  traa: { blend: 0.8 },
  motionBlur: { intensity: 0.5 },
  toneMappingExposure: 1
};
var RealismPostProcessingPlugin = (_class = class {
  __init() {this.name = "RealismPostProcessing"}
  
  
  
  
  
  
  
  constructor(config) {;_class.prototype.__init.call(this);
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = _chunkEA3XQ4KJcjs.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = _chunkEA3XQ4KJcjs.THREE.PCFSoftShadowMap;
    this.composer = new POSTPROCESSING.EffectComposer(renderer);
    this.velocityPass = new (0, _realismeffectsadel.VelocityDepthNormalPass)(scene, camera);
    this.composer.addPass(this.velocityPass);
    this.ssgiEffect = new (0, _realismeffectsadel.SSGIEffect)(scene, camera, this.velocityPass, this.config.ssgi);
    this.hbaoEffect = new (0, _realismeffectsadel.HBAOEffect)(this.composer, camera, scene);
    this.hbaoEffect.intensity = this.config.hbao.intensity;
    this.hbaoEffect.bias = this.config.hbao.bias;
    this.traaEffect = new (0, _realismeffectsadel.TRAAEffect)(scene, camera, this.velocityPass);
    this.traaEffect.blend = this.config.traa.blend;
    this.motionBlurEffect = new (0, _realismeffectsadel.MotionBlurEffect)(this.velocityPass);
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
      this.ssgiEffect.distance = _nullishCoalesce(newConfig.ssgi.distance, () => ( this.config.ssgi.distance));
      this.ssgiEffect.thickness = _nullishCoalesce(newConfig.ssgi.thickness, () => ( this.config.ssgi.thickness));
      this.ssgiEffect.denoiseIterations = _nullishCoalesce(newConfig.ssgi.denoiseIterations, () => ( this.config.ssgi.denoiseIterations));
      this.ssgiEffect.resolutionScale = _nullishCoalesce(newConfig.ssgi.resolutionScale, () => ( this.config.ssgi.resolutionScale));
    }
    if (newConfig.hbao) {
      this.hbaoEffect.intensity = _nullishCoalesce(newConfig.hbao.intensity, () => ( this.config.hbao.intensity));
      this.hbaoEffect.bias = _nullishCoalesce(newConfig.hbao.bias, () => ( this.config.hbao.bias));
    }
    if (_optionalChain([newConfig, 'access', _ => _.traa, 'optionalAccess', _2 => _2.blend]) !== void 0) {
      this.traaEffect.blend = newConfig.traa.blend;
    }
    if (_optionalChain([newConfig, 'access', _3 => _3.motionBlur, 'optionalAccess', _4 => _4.intensity]) !== void 0) {
      this.motionBlurEffect.intensity = newConfig.motionBlur.intensity;
    }
    if (newConfig.toneMappingExposure !== void 0) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }
  dispose() {
    this.composer.dispose();
  }
}, _class);



exports.RealismPostProcessingPlugin = RealismPostProcessingPlugin;
