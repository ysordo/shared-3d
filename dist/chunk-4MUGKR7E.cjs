"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkR5EP6VAUcjs = require('./chunk-R5EP6VAU.cjs');


var _chunkMHW4NKXTcjs = require('./chunk-MHW4NKXT.cjs');


var _chunkY7JTNLGVcjs = require('./chunk-Y7JTNLGV.cjs');


var _chunkDZ2BWJT3cjs = require('./chunk-DZ2BWJT3.cjs');


var _chunk2QX5SQYZcjs = require('./chunk-2QX5SQYZ.cjs');


var _chunkJYRQRKIScjs = require('./chunk-JYRQRKIS.cjs');


var _chunk63NW36UQcjs = require('./chunk-63NW36UQ.cjs');


var _chunkWOOTLQ5Tcjs = require('./chunk-WOOTLQ5T.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/UnrealEnginePostProcessingPlugin.ts
var _postprocessing = require('postprocessing'); var POST = _interopRequireWildcard(_postprocessing);
var DEFAULT_UNREAL_ENGINE_PP_CONFIG = {
  bloom: { intensity: 0.4, luminanceThreshold: 1.2 },
  motionBlur: { intensity: 0.4 },
  taa: { blend: 0.9 },
  sharpen: { strength: 0.2 },
  toneMappingExposure: 1.1,
  lodLevels: 5
  // Niveles de LOD para polígonos "infinitos"
};
var UnrealEnginePostProcessingPlugin = (_class = class {
  __init() {this.name = "UnrealEnginePostProcessing"}
  
  __init2() {this.frameState = new (0, _chunk63NW36UQcjs.FrameState)()}
  
  
  
  
  
  
  
  
  
  
  
  __init3() {this.lodGroup = new _chunkEA3XQ4KJcjs.THREE.Group()}
  // Para Nanite-like LOD management
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.config = { ...DEFAULT_UNREAL_ENGINE_PP_CONFIG, ...config };
  }
  install(context) {
    const { scene, camera, renderer } = context;
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
      type: _chunkEA3XQ4KJcjs.THREE.HalfFloatType,
      samples: 8
      // MSAA para high-res realism
    });
    this.velocity = new (0, _chunkDZ2BWJT3cjs.VelocityPassPlugin)(width, height);
    this.velocity.install(context);
    this.ao = new (0, _chunk2QX5SQYZcjs.AOPlugin)(width, height);
    this.ao.install(context);
    this.gi = new (0, _chunkWOOTLQ5Tcjs.GILitePlugin)(this.velocity, this.sceneRenderTarget);
    this.gi.install(context);
    this.bloom = new (0, _chunkJYRQRKIScjs.BloomPlugin)();
    this.bloom.install(context);
    this.motion = new (0, _chunkR5EP6VAUcjs.MotionBlurPlugin)(this.velocity, this.config.motionBlur.intensity);
    this.motion.install(context);
    this.taa = new (0, _chunkY7JTNLGVcjs.TAAPlugin)(this.velocity);
    this.taa.install(context);
    this.sharpen = new (0, _chunkMHW4NKXTcjs.SharpenEffect)(0.2);
    this.bloom.effect.intensity = this.config.bloom.intensity;
    this.bloom.effect.luminanceMaterial.threshold = this.config.bloom.luminanceThreshold;
    this.taa.setBlend(this.config.taa.blend);
    const renderPass = new POST.RenderPass(scene, camera);
    this.composer.addPass(renderPass);
    const realismPass = new POST.EffectPass(
      camera,
      this.ao.effect,
      this.gi.effect,
      this.bloom.effect
    );
    this.composer.addPass(realismPass);
    const finalPass = new POST.EffectPass(
      camera,
      this.taa.effect,
      this.motion.effect,
      this.sharpen
    );
    this.composer.addPass(finalPass);
    this.setupNaniteLOD(scene);
  }
  setupNaniteLOD(scene) {
    scene.traverse((child) => {
      if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh && child.geometry.attributes.position.count > 1e5) {
        const lod = new _chunkEA3XQ4KJcjs.THREE.LOD();
        for (let i = 0; i < this.config.lodLevels; i++) {
          const decimatedMesh = child.clone();
          decimatedMesh.geometry = this.decimateGeometry(decimatedMesh.geometry, i);
          lod.addLevel(decimatedMesh, i * 50);
        }
        _optionalChain([child, 'access', _ => _.parent, 'optionalAccess', _2 => _2.add, 'call', _3 => _3(lod)]);
        _optionalChain([child, 'access', _4 => _4.parent, 'optionalAccess', _5 => _5.remove, 'call', _6 => _6(child)]);
      }
    });
    scene.add(this.lodGroup);
  }
  decimateGeometry(geometry, level) {
    return geometry;
  }
  postRender() {
    const renderer = this.composer.getRenderer();
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.frameState.update(this.camera, width, height);
    this.velocity.render(renderer, this.scene, this.camera);
    this.taa.update(this.sceneRenderTarget.texture);
    this.motion.update({ texture: this.sceneRenderTarget.texture });
    this.composer.render();
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
    this.sceneRenderTarget.setSize(width, height);
    this.ao.resize(width, height);
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
    if (_optionalChain([newConfig, 'access', _7 => _7.motionBlur, 'optionalAccess', _8 => _8.intensity]) !== void 0) {
      _optionalChain([this, 'access', _9 => _9.motion, 'access', _10 => _10.update, 'optionalCall', _11 => _11({ intensity: newConfig.motionBlur.intensity })]);
    }
    if (_optionalChain([newConfig, 'access', _12 => _12.taa, 'optionalAccess', _13 => _13.blend]) !== void 0) {
      this.taa.setBlend(newConfig.taa.blend);
    }
    if (_optionalChain([newConfig, 'access', _14 => _14.sharpen, 'optionalAccess', _15 => _15.strength]) !== void 0) {
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
