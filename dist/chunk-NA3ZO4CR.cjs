"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/core/plugins/postprocessing/ureal-engine/BloomPlugin.ts
var _postprocessing = require('postprocessing');
var BloomPlugin = class {
  
  constructor() {
    this.effect = new (0, _postprocessing.BloomEffect)({
      intensity: 0.4,
      mipmapBlur: true
    });
    this.effect.luminanceMaterial.threshold = 1.2;
  }
};



exports.BloomPlugin = BloomPlugin;
