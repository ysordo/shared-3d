"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/ureal-engine/TAAPlugin.ts
var _postprocessing = require('postprocessing');
var TAAPlugin = (_class = class {
  __init() {this.name = "TAA"}
  
  
  
  
  constructor(velocityPass, blend = 0.9) {;_class.prototype.__init.call(this);
    this.velocityPass = velocityPass;
    this.blend = blend;
  }
  install({ renderer }) {
    this.previousFrame = new _chunkEA3XQ4KJcjs.THREE.WebGLRenderTarget(renderer.domElement.width, renderer.domElement.height, {
      type: _chunkEA3XQ4KJcjs.THREE.HalfFloatType
    });
    this.effect = new (0, _postprocessing.Effect)(
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
          ["previousFrame", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.previousFrame.texture)],
          ["velocityTexture", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.velocityPass.getTexture())],
          ["blend", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.blend)]
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
}, _class);



exports.TAAPlugin = TAAPlugin;
