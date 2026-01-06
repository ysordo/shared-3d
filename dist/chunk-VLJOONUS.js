import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/ureal-engine/MotionBlurPlugin.ts
import { Effect } from "postprocessing";
var DEFAULT_MOTION_BLUR_CONFIG = {
  intensity: 0.4,
  texture: void 0
};
var MotionBlurPlugin = class {
  name = "MotionBlur";
  effect;
  velocityPass;
  config;
  constructor(velocityPass, intensity = 0.4) {
    this.config = { ...DEFAULT_MOTION_BLUR_CONFIG, intensity };
    this.velocityPass = velocityPass;
  }
  install({ renderer }) {
    this.effect = new Effect(
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
          ["velocityTexture", new THREE.Uniform(this.velocityPass.getTexture())],
          ["intensity", new THREE.Uniform(this.config.intensity)]
        ])
      }
    );
    this.config.texture = renderer.getRenderTarget()?.texture;
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.intensity !== void 0) {
      this.effect.uniforms.get("intensity").value = newConfig.intensity;
    }
  }
};

export {
  DEFAULT_MOTION_BLUR_CONFIG,
  MotionBlurPlugin
};
