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
  }
  install(__context) {
    this.effect = new Effect(
      "GILite",
      `
      uniform sampler2D sceneTexture;
      uniform sampler2D velocityTexture;
      uniform float distance;
      uniform float thickness;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor) {
        vec4 scene = texture(sceneTexture, uv);

        // SSGI simple con ray marching (simula bounces como Unreal)
        vec3 indirect = vec3(0.0);
        for (int i = 0; i < 8; i++) {
          vec2 offset = vec2(float(i) / 8.0 - 0.5) * distance;
          
          // \u2190 Cambiado 'sample' por 'sampledColor'
          vec4 sampledColor = texture(sceneTexture, uv + offset);
          
          indirect += sampledColor.rgb * (1.0 - length(offset) / thickness);
        }
        indirect /= 8.0;
        indirect = clamp(indirect, 0.0, 1.0) * 0.3;

        outColor = vec4(scene.rgb + indirect, scene.a);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["sceneTexture", new THREE.Uniform(this.renderTarget.texture)],
          ["velocityTexture", new THREE.Uniform(this.velocityPass.getTexture())],
          ["distance", new THREE.Uniform(10)],
          ["thickness", new THREE.Uniform(10)]
        ])
      }
    );
  }
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
