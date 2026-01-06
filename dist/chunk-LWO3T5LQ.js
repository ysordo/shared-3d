import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/ureal-engine/TAAPlugin.ts
import { Effect } from "postprocessing";
var TAAPlugin = class {
  name = "TAA";
  effect;
  previousFrame;
  velocityPass;
  blend;
  constructor(velocityPass, blend = 0.9) {
    this.velocityPass = velocityPass;
    this.blend = blend;
  }
  install({ renderer }) {
    this.previousFrame = new THREE.WebGLRenderTarget(renderer.domElement.width, renderer.domElement.height, {
      type: THREE.HalfFloatType
    });
    this.effect = new Effect(
      "TAA",
      `
      uniform sampler2D previousFrame;
      uniform sampler2D velocityTexture;
      uniform float blend;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec2 velocity = texture(velocityTexture, uv).rg * 2.0 - 1.0;
        vec2 uvPrev = uv - velocity;

        // Clamping para evitar ghosting (como Unreal)
        uvPrev = clamp(uvPrev, 0.0, 1.0);
        vec4 samplePrev = texture(previousFrame, uvPrev);

        // History rejection para ultra-realism
        float dist = length(velocity);
        float reject = smoothstep(0.1, 0.5, dist); // Rechaza si alta motion

        outColor = mix(inputColor, samplePrev, blend * (1.0 - reject));
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["previousFrame", new THREE.Uniform(this.previousFrame.texture)],
          ["velocityTexture", new THREE.Uniform(this.velocityPass.getTexture())],
          ["blend", new THREE.Uniform(this.blend)]
        ])
      }
    );
  }
  update(previousFrameTexture) {
    if (previousFrameTexture !== void 0) {
      this.previousFrame.texture = previousFrameTexture;
      this.effect.uniforms.get("previousFrame").value = previousFrameTexture;
    }
  }
  setBlend(blend) {
    this.effect.uniforms.get("blend").value = blend;
  }
  resize(width, height) {
    this.previousFrame.setSize(width, height);
  }
};

export {
  TAAPlugin
};
