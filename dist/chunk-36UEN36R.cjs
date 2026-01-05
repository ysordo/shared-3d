"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunk5SMAAE4Ccjs = require('./chunk-5SMAAE4C.cjs');


var _chunkL5PHFQV3cjs = require('./chunk-L5PHFQV3.cjs');


var _chunk3VCWOULOcjs = require('./chunk-3VCWOULO.cjs');


var _chunk3AELWAFNcjs = require('./chunk-3AELWAFN.cjs');


var _chunkWYU2CPHMcjs = require('./chunk-WYU2CPHM.cjs');


var _chunkNA3ZO4CRcjs = require('./chunk-NA3ZO4CR.cjs');


var _chunk2KEFRGGDcjs = require('./chunk-2KEFRGGD.cjs');


var _chunkABEMXJHJcjs = require('./chunk-ABEMXJHJ.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/UnrealEnginePostProcessingPlugin.ts
var _postprocessing = require('postprocessing'); var POST = _interopRequireWildcard(_postprocessing);
var DEFAULT_UNREAL_ENGINE_PP_CONFIG = {
  bloom: {
    intensity: 0.4,
    // intensidad del bloom
    luminanceThreshold: 1.2
    // umbral de luminancia
  },
  motionBlur: {
    intensity: 0.4
    // intensidad del motion blur
  },
  taa: {
    blend: 0.9
    // blend de TAA
  },
  sharpen: {
    strength: 0.2
    // fuerza del sharpen
  },
  toneMappingExposure: 1.1
  // exposición del tone mapping del renderer
};
var UnrealEnginePostProcessingPlugin = (_class = class {
  __init() {this.name = "UnrealEnginePostProcessing"}
  
  __init2() {this.frameState = new (0, _chunk2KEFRGGDcjs.FrameState)()}
  
  
  
  
  
  
  
  
  
  
  // Render target temporal para Motion Blur
  
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.config = { ...DEFAULT_UNREAL_ENGINE_PP_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;
    renderer.outputColorSpace = _chunkEA3XQ4KJcjs.THREE.SRGBColorSpace;
    renderer.toneMapping = _chunkEA3XQ4KJcjs.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;
    this.composer = new POST.EffectComposer(renderer);
    this.sceneRenderTarget = new _chunkEA3XQ4KJcjs.THREE.WebGLRenderTarget(width, height, {
      format: _chunkEA3XQ4KJcjs.THREE.RGBAFormat,
      type: _chunkEA3XQ4KJcjs.THREE.HalfFloatType
    });
    this.velocity = new (0, _chunk3AELWAFNcjs.VelocityPassPlugin)(width, height);
    this.ao = new (0, _chunkWYU2CPHMcjs.AOPlugin)(scene, camera, { width, height });
    this.gi = new (0, _chunkABEMXJHJcjs.GILitePlugin)(this.velocity, this.sceneRenderTarget);
    this.bloom = new (0, _chunkNA3ZO4CRcjs.BloomPlugin)();
    this.motion = new (0, _chunk5SMAAE4Ccjs.MotionBlurPlugin)(this.velocity);
    this.taa = new (0, _chunk3VCWOULOcjs.TAAPlugin)(camera, this.velocity, renderer);
    this.sharpen = new (0, _chunkL5PHFQV3cjs.SharpenEffect)(0.2);
    this.bloom.effect.intensity = this.config.bloom.intensity;
    this.bloom.effect.luminanceMaterial.threshold = this.config.bloom.luminanceThreshold;
    this.motion.setIntensity(this.config.motionBlur.intensity);
    this.taa.setBlend(this.config.taa.blend);
    const realismPass = new POST.EffectPass(
      camera,
      this.ao.effect,
      this.gi.effect,
      this.bloom.effect
    );
    const finalPass = new POST.EffectPass(
      camera,
      this.taa.effect,
      this.motion.effect,
      this.sharpen
    );
    this.composer.addPass(realismPass);
    this.composer.addPass(finalPass);
  }
  postRender() {
    const renderer = this.composer.getRenderer();
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.frameState.update(this.camera, width, height);
    this.velocity.render(renderer, this.scene, this.camera);
    this.gi.renderScene(renderer, this.scene, this.camera);
    renderer.setRenderTarget(this.sceneRenderTarget);
    renderer.render(this.scene, this.camera);
    this.taa.update(this.sceneRenderTarget.texture);
    renderer.setRenderTarget(null);
    this.motion.updateSceneTexture(this.sceneRenderTarget);
    this.composer.render();
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
    this.sceneRenderTarget.setSize(width, height);
    this.motion.resize(width, height);
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.bloom) {
      if (newConfig.bloom.intensity !== void 0) {
        this.bloom.effect.intensity = newConfig.bloom.intensity;
      }
      if (newConfig.bloom.luminanceThreshold !== void 0) {
        this.bloom.effect.luminanceMaterial.threshold = newConfig.bloom.luminanceThreshold;
      }
    }
    if (_optionalChain([newConfig, 'access', _ => _.motionBlur, 'optionalAccess', _2 => _2.intensity]) !== void 0) {
      this.motion.setIntensity(newConfig.motionBlur.intensity);
    }
    if (_optionalChain([newConfig, 'access', _3 => _3.taa, 'optionalAccess', _4 => _4.blend]) !== void 0) {
      this.taa.setBlend(newConfig.taa.blend);
    }
    if (_optionalChain([newConfig, 'access', _5 => _5.sharpen, 'optionalAccess', _6 => _6.strength]) !== void 0) {
      this.sharpen.uniforms.get("strength").value = newConfig.sharpen.strength;
    }
    if (newConfig.toneMappingExposure !== void 0) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }
  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
    this.sceneRenderTarget.dispose();
  }
}, _class);



exports.UnrealEnginePostProcessingPlugin = UnrealEnginePostProcessingPlugin;
