"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/ureal-engine/GILitePlugin.ts
var _postprocessing = require('postprocessing');
var _three = require('three');
var GILitePlugin = class {
  
  
  
  constructor(scene, camera, velocityPass, renderer) {
    this.velocityPass = velocityPass;
    this.renderTarget = new (0, _three.WebGLRenderTarget)(renderer.domElement.width, renderer.domElement.height, {
      format: _chunkEA3XQ4KJcjs.THREE.RGBAFormat,
      type: _chunkEA3XQ4KJcjs.THREE.HalfFloatType,
      depthBuffer: true
    });
    this.renderTarget.texture.name = "GILiteScene";
    this.effect = new (0, _postprocessing.Effect)(
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
          ["sceneTexture", new (0, _three.Uniform)(this.renderTarget.texture)],
          ["velocityTexture", new (0, _three.Uniform)(this.velocityPass.getTexture())],
          ["distance", new (0, _three.Uniform)(10)],
          ["thickness", new (0, _three.Uniform)(10)],
          ["denoiseIterations", new (0, _three.Uniform)(4)]
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



exports.GILitePlugin = GILitePlugin;
