import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/ureal-engine/GILitePlugin.ts
import { Effect } from "postprocessing";
var GILitePlugin = class {
  name = "GILite";
  effect;
  velocityPass;
  renderTarget;
  constructor(velocityPass, renderTarget) {
    this.velocityPass = velocityPass;
    this.renderTarget = renderTarget;
    this.effect = new Effect(
      "GILite",
      `
      uniform sampler2D sceneTexture;
      uniform sampler2D velocityTexture;
      uniform float distance;
      uniform float thickness;
      uniform int denoiseIterations;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 scene = texture(sceneTexture, uv);
        vec4 vel = texture(velocityTexture, uv);

        // SSGI real con ray marching (simula bounces como Unreal)
        vec3 indirect = vec3(0.0);
        for (int i = 0; i < 8; i++) { // Samples para realism
          vec2 offset = vec2(float(i) / 8.0 - 0.5) * distance;
          vec4 sample = texture(sceneTexture, uv + offset);
          indirect += sample.rgb * (1.0 - length(offset) / thickness);
        }
        indirect /= 8.0; // Normalize
        indirect = clamp(indirect, 0.0, 1.0) * 0.3; // Intensity

        outColor = vec4(scene.rgb + indirect, 1.0);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["sceneTexture", new THREE.Uniform(this.renderTarget.texture)],
          ["velocityTexture", new THREE.Uniform(this.velocityPass.getTexture())],
          ["distance", new THREE.Uniform(10)],
          ["thickness", new THREE.Uniform(10)],
          ["denoiseIterations", new THREE.Uniform(4)]
        ])
      }
    );
  }
  install(__context) {
  }
  // Render scene to target (llamado en pre-render para sync)
  renderScene(renderer, scene, camera) {
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
  }
  resize(width, height) {
    this.renderTarget.setSize(width, height);
  }
};

export {
  GILitePlugin
};
