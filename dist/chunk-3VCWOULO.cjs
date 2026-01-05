"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/core/plugins/postprocessing/ureal-engine/TAAPlugin.ts
var _postprocessing = require('postprocessing');
var _three = require('three');
var TAAPlugin = class {
  
  
  
  
  constructor(camera, velocityPass, renderer, blend = 0.9) {
    this.velocityPass = velocityPass;
    this.blend = blend;
    this.previousFrame = new (0, _three.RenderTarget)(renderer.domElement.width, renderer.domElement.height);
    this.effect = new (0, _postprocessing.Effect)(
      "TAA",
      `
      uniform sampler2D previousFrame;
      uniform sampler2D velocityTexture;
      uniform float blend;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 prev = texture(previousFrame, uv);
        vec2 vel = texture(velocityTexture, uv).rg * 2.0 - 1.0;
        vec4 color = inputColor;

        // Mezcla con frame anterior usando velocity
        vec2 uvPrev = uv - vel; 
        vec4 samplePrev = texture(previousFrame, uvPrev);
        outColor = mix(color, samplePrev, blend);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["previousFrame", new (0, _three.Uniform)(this.previousFrame.texture)],
          ["velocityTexture", new (0, _three.Uniform)(this.velocityPass.getTexture())],
          ["blend", new (0, _three.Uniform)(this.blend)]
        ])
      }
    );
  }
  // Llamar después de renderizar para almacenar el frame actual
  update(previousFrameTexture) {
    this.previousFrame.texture = previousFrameTexture;
    this.effect.uniforms.get("previousFrame").value = previousFrameTexture;
  }
  setBlend(blend) {
    this.effect.uniforms.get("blend").value = blend;
  }
  resize(width, height) {
    this.previousFrame.setSize(width, height);
  }
};



exports.TAAPlugin = TAAPlugin;
