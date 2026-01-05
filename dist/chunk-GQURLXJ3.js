// src/core/plugins/postprocessing/ureal-engine/GILitePlugin.ts
import { Effect } from "postprocessing";
import { Uniform } from "three";
var GILitePlugin = class {
  effect;
  velocityPass;
  renderTarget;
  constructor(velocityPass, renderer) {
    this.velocityPass = velocityPass;
    this.renderTarget = renderer;
    this.renderTarget.depthBuffer = true;
    this.renderTarget.texture.name = "GILiteScene";
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
        vec2 vel = texture(velocityTexture, uv).rg * 2.0 - 1.0;

        // placeholder simple de SSGI
        vec3 indirect = scene.rgb * 0.3;
        outColor = vec4(scene.rgb + indirect, 1.0);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["sceneTexture", new Uniform(this.renderTarget.texture)],
          ["velocityTexture", new Uniform(this.velocityPass.getTexture())],
          ["distance", new Uniform(10)],
          ["thickness", new Uniform(10)],
          ["denoiseIterations", new Uniform(4)]
        ])
      }
    );
  }
  // Llamar antes del post-process: renderizamos la escena a nuestro renderTarget
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
