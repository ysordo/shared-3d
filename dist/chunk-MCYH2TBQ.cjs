"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/orchestrator/plugins/PostProcessingPlugin.ts
var _EffectComposerjs = require('three/examples/jsm/postprocessing/EffectComposer.js');
var _RenderPassjs = require('three/examples/jsm/postprocessing/RenderPass.js');
var _UnrealBloomPassjs = require('three/examples/jsm/postprocessing/UnrealBloomPass.js');
var PostProcessingPlugin = (_class = class {
  constructor(options = { strength: 1.5, radius: 0.4, threshold: 0 }) {;_class.prototype.__init.call(this);
    this.options = options;
  }
  __init() {this.name = "PostProcessing"}
  
  
  install({ scene, camera, renderer }) {
    this.composer = new (0, _EffectComposerjs.EffectComposer)(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    const renderPass = new (0, _RenderPassjs.RenderPass)(scene, camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new (0, _UnrealBloomPassjs.UnrealBloomPass)(
      new _chunkEA3XQ4KJcjs.THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.options.strength,
      this.options.radius,
      this.options.threshold
    );
    this.composer.addPass(this.bloomPass);
    const originalRender = renderer.render.bind(renderer);
    renderer.render = () => {
      this.composer.render();
    };
    const onResize = () => {
      this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
      this.bloomPass.resolution.set(renderer.domElement.width, renderer.domElement.height);
    };
    window.addEventListener("resize", onResize);
    this.dispose = () => {
      window.removeEventListener("resize", onResize);
      renderer.render = originalRender;
      this.composer.dispose();
    };
  }
  setBloom(strength) {
    if (this.bloomPass) {
      this.bloomPass.strength = strength;
    }
  }
  dispose() {
  }
}, _class);



exports.PostProcessingPlugin = PostProcessingPlugin;
