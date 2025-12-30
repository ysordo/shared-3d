"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/PostProcessingPlugin.ts
var _EffectComposerjs = require('three/examples/jsm/postprocessing/EffectComposer.js');
var _RenderPassjs = require('three/examples/jsm/postprocessing/RenderPass.js');
var _UnrealBloomPassjs = require('three/examples/jsm/postprocessing/UnrealBloomPass.js');
var PostProcessingPlugin = (_class = class {
  __init() {this.name = "PostProcessing"}
  
  
  __init2() {this.enabled = true}
  
  constructor(config) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.config = {
      enabled: true,
      bloom: {
        strength: 1.5,
        radius: 0.4,
        threshold: 0,
        ..._optionalChain([config, 'optionalAccess', _ => _.bloom])
      },
      ...config
    };
  }
  install({ scene, camera, renderer }) {
    this.composer = new (0, _EffectComposerjs.EffectComposer)(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    this.composer.setPixelRatio(renderer.getPixelRatio());
    const renderPass = new (0, _RenderPassjs.RenderPass)(scene, camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new (0, _UnrealBloomPassjs.UnrealBloomPass)(
      new _chunkEA3XQ4KJcjs.THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.config.bloom.strength,
      this.config.bloom.radius,
      this.config.bloom.threshold
    );
    this.composer.addPass(this.bloomPass);
  }
  postRender() {
    if (this.enabled) {
      this.composer.render();
    }
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }
  update(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      bloom: {
        ...this.config.bloom,
        ...newConfig.bloom
      }
    };
    if (newConfig.enabled !== void 0) {
      this.enabled = newConfig.enabled;
    }
    if (newConfig.bloom) {
      if (newConfig.bloom.strength !== void 0) {
        this.bloomPass.strength = newConfig.bloom.strength;
      }
      if (newConfig.bloom.radius !== void 0) {
        this.bloomPass.radius = newConfig.bloom.radius;
      }
      if (newConfig.bloom.threshold !== void 0) {
        this.bloomPass.threshold = newConfig.bloom.threshold;
      }
    }
  }
  dispose() {
    this.composer.dispose();
  }
}, _class);



exports.PostProcessingPlugin = PostProcessingPlugin;
