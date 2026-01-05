"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/core/plugins/postprocessing/ureal-engine/SharpenPlugin.ts
var _postprocessing = require('postprocessing');
var _three = require('three');
var SharpenEffect = class extends _postprocessing.Effect {
  constructor(strength = 0.2) {
    super(
      "Sharpen",
      `
      uniform float strength;
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 blurred = inputColor; // placeholder, se puede reemplazar con convolution real
        outColor = inputColor + (inputColor - blurred) * strength;
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([["strength", new (0, _three.Uniform)(strength)]])
      }
    );
  }
};



exports.SharpenEffect = SharpenEffect;
