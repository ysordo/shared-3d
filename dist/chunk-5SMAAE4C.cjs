"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/core/plugins/postprocessing/ureal-engine/MotionBlurPlugin.ts
var _postprocessing = require('postprocessing');
var _three = require('three');
var MotionBlurPlugin = class {
  
  
  
  
  constructor(velocityPass, intensity = 0.4) {
    this.velocityPass = velocityPass;
    this.intensity = intensity;
    this.renderTarget = new (0, _three.WebGLRenderTarget)(1, 1, {
      minFilter: _three.LinearFilter,
      magFilter: _three.LinearFilter,
      format: _three.RGBAFormat
    });
    this.effect = new (0, _postprocessing.Effect)(
      "MotionBlur",
      `
      uniform sampler2D tColor;          // textura de la escena actual
      uniform sampler2D velocityTexture; // velocity map
      uniform float intensity;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
          vec2 velocity = texture(velocityTexture, uv).rg * 2.0 - 1.0;
          vec2 offset = velocity * intensity * 0.02;

          // Muestrea la escena desplazada por la velocity
          vec3 blurred = texture(tColor, uv + offset).rgb;

          // Mezcla con el color original
          outColor = vec4(mix(inputColor.rgb, blurred, intensity), 1.0);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["tColor", new (0, _three.Uniform)(this.renderTarget.texture)],
          ["velocityTexture", new (0, _three.Uniform)(this.velocityPass.getTexture())],
          ["intensity", new (0, _three.Uniform)(this.intensity)]
        ])
      }
    );
  }
  /** Permite actualizar intensidad en tiempo real */
  setIntensity(intensity) {
    this.intensity = intensity;
    this.effect.uniforms.get("intensity").value = intensity;
  }
  /** Debe llamarse antes de renderizar el efecto, con la textura de la escena actual */
  updateSceneTexture(texture) {
    this.effect.uniforms.get("tColor").value = texture.texture;
  }
  /** Ajusta tamaño del render target */
  resize(width, height) {
    this.renderTarget.setSize(width, height);
  }
};



exports.MotionBlurPlugin = MotionBlurPlugin;
