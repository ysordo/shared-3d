"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/ureal-engine/SharpenEffect.ts
var _postprocessing = require('postprocessing');
var SharpenEffect = class extends _postprocessing.Effect {
  constructor(strength = 0.2) {
    super(
      "Sharpen",
      `
      uniform float strength;
      uniform sampler2D tDiffuse; // Input texture

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 center = texture(tDiffuse, uv);
        vec4 sum = vec4(0.0);

        // 3x3 unsharp mask kernel para realism (como Unreal)
        sum += texture(tDiffuse, uv + vec2(-1.0, -1.0) / resolution) * -0.05;
        sum += texture(tDiffuse, uv + vec2(0.0, -1.0) / resolution) * -0.1;
        sum += texture(tDiffuse, uv + vec2(1.0, -1.0) / resolution) * -0.05;
        sum += texture(tDiffuse, uv + vec2(-1.0, 0.0) / resolution) * -0.1;
        sum += center * 1.8; // Centro fuerte
        sum += texture(tDiffuse, uv + vec2(1.0, 0.0) / resolution) * -0.1;
        sum += texture(tDiffuse, uv + vec2(-1.0, 1.0) / resolution) * -0.05;
        sum += texture(tDiffuse, uv + vec2(0.0, 1.0) / resolution) * -0.1;
        sum += texture(tDiffuse, uv + vec2(1.0, 1.0) / resolution) * -0.05;

        outColor = inputColor + sum * strength;
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([["strength", new _chunkEA3XQ4KJcjs.THREE.Uniform(strength)]])
      }
    );
  }
};



exports.SharpenEffect = SharpenEffect;
