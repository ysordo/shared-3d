"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/HighResPostProcessingPlugin.ts
var _postprocessing = require('postprocessing'); var POSTPROCESSING = _interopRequireWildcard(_postprocessing);

var DEFAULT_CONFIG = {
  enabled: true,
  toneMappingExposure: 1,
  multisampling: 8,
  aaType: "smaa",
  superSampling: 1
};
var HighResPostProcessingPlugin = (_class = class {
  __init() {this.name = "HighResPostProcessing"}
  
  
  constructor(config) {;_class.prototype.__init.call(this);
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = _chunkEA3XQ4KJcjs.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    renderer.setPixelRatio(window.devicePixelRatio * this.config.superSampling);
    this.composer = new POSTPROCESSING.EffectComposer(renderer, {
      multisampling: this.config.multisampling > 0 ? this.config.multisampling : 0,
      frameBufferType: _chunkEA3XQ4KJcjs.THREE.HalfFloatType
      // Precisión HDR sin banding
    });
    this.composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    if (this.config.aaType !== "none") {
      let aaEffect;
      if (this.config.aaType === "smaa") {
        aaEffect = new (0, _postprocessing.SMAAEffect)();
      } else if (this.config.aaType === "fxaa") {
        aaEffect = new (0, _postprocessing.FXAAEffect)();
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
}, _class);



exports.HighResPostProcessingPlugin = HighResPostProcessingPlugin;
