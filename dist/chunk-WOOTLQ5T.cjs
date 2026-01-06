"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/ureal-engine/GILitePlugin.ts
var _postprocessing = require('postprocessing');
var GILitePlugin = (_class = class {
  __init() {this.name = "GILite"}
  
  
  
  constructor(velocityPass, renderTarget) {;_class.prototype.__init.call(this);
    this.velocityPass = velocityPass;
    this.renderTarget = renderTarget;
  }
  install(__context) {
    this.effect = new (0, _postprocessing.Effect)(
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
          ["sceneTexture", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.renderTarget.texture)],
          ["velocityTexture", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.velocityPass.getTexture())],
          ["distance", new _chunkEA3XQ4KJcjs.THREE.Uniform(10)],
          ["thickness", new _chunkEA3XQ4KJcjs.THREE.Uniform(10)]
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
}, _class);



exports.GILitePlugin = GILitePlugin;
