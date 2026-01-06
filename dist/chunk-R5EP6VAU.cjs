"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/ureal-engine/MotionBlurPlugin.ts
var _postprocessing = require('postprocessing');
var DEFAULT_MOTION_BLUR_CONFIG = {
  intensity: 0.4,
  texture: void 0
};
var MotionBlurPlugin = (_class = class {
  __init() {this.name = "MotionBlur"}
  
  
  
  constructor(velocityPass, intensity = 0.4) {;_class.prototype.__init.call(this);
    this.config = { ...DEFAULT_MOTION_BLUR_CONFIG, intensity };
    this.velocityPass = velocityPass;
  }
  install({ renderer }) {
    this.effect = new (0, _postprocessing.Effect)(
      "MotionBlur",
      `
      uniform sampler2D velocityTexture; 
      uniform float intensity;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec2 velocity = texture(velocityTexture, uv).rg * 2.0 - 1.0;
        vec4 result = inputColor;

        // Multi-sample blur para realism (como Unreal)
        const int samples = 8;
        for (int i = 1; i < samples; ++i) {
          vec2 offset = velocity * (float(i) / float(samples - 1) - 0.5) * intensity;
          result += texture(inputBuffer, uv + offset);
        }
        result /= float(samples);

        outColor = result;
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["velocityTexture", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.velocityPass.getTexture())],
          ["intensity", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.config.intensity)]
        ])
      }
    );
    this.config.texture = _optionalChain([renderer, 'access', _ => _.getRenderTarget, 'call', _2 => _2(), 'optionalAccess', _3 => _3.texture]);
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.intensity !== void 0) {
      this.effect.uniforms.get("intensity").value = newConfig.intensity;
    }
  }
}, _class);




exports.DEFAULT_MOTION_BLUR_CONFIG = DEFAULT_MOTION_BLUR_CONFIG; exports.MotionBlurPlugin = MotionBlurPlugin;
