"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;// src/core/plugins/postprocessing/ureal-engine/BloomPlugin.ts
var _postprocessing = require('postprocessing');
var BloomPlugin = (_class = class {
  __init() {this.name = "Bloom"}
  
  constructor() {;_class.prototype.__init.call(this);
  }
  install(__context) {
    this.effect = new (0, _postprocessing.BloomEffect)({
      intensity: 0.4,
      mipmapBlur: true,
      // Para realism ultra
      luminanceSmoothing: 0.1,
      // Evita flicker
      resolutionScale: 1
      // Full res para high-poly
    });
    this.effect.luminanceMaterial.threshold = 1.2;
    this.effect.luminanceMaterial.smoothing = 0.025;
  }
}, _class);



exports.BloomPlugin = BloomPlugin;
