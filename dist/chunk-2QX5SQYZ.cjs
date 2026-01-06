"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/plugins/postprocessing/ureal-engine/AOPlugin.ts
var _postprocessing = require('postprocessing');
var DEFAULT_AO_CONFIG = {
  intensity: 1.3,
  aoRadius: 5,
  bias: 0.025,
  samples: 16
};
var AOPlugin = (_class = class {
  constructor(width, height, config) {;_class.prototype.__init.call(this);
    this.width = width;
    this.height = height;
    this.config = { ...DEFAULT_AO_CONFIG, ...config };
  }
  __init() {this.name = "HBAO"}
  
  
  install({ camera }) {
    this.effect = new (0, _postprocessing.Effect)(
      "HBAO",
      `
      uniform sampler2D sceneDepth;
      uniform sampler2D sceneNormal;
      uniform float intensity;
      uniform float aoRadius;
      uniform float bias;
      uniform float samples;
      uniform vec2 resolution;
      uniform mat4 projectionMatrixInv;
      uniform mat4 viewMatrixInv;
      uniform vec3 cameraPos;
      uniform float near;
      uniform float far;

      highp float linearizeDepth(highp float d) {
        return near * far / (far - d * (far - near));
      }

      vec3 getWorldPos(vec2 uv, float depth) {
        vec4 clipSpace = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
        vec4 viewSpace = projectionMatrixInv * clipSpace;
        viewSpace /= viewSpace.w;
        return (viewMatrixInv * viewSpace).xyz;
      }

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor) {
        float depth = texture(sceneDepth, uv).r;
        if (depth >= 1.0) {
          outColor = inputColor;
          return;
        }

        vec3 normal = texture(sceneNormal, uv).rgb * 2.0 - 1.0;
        vec3 worldPos = getWorldPos(uv, depth);
        float linDepth = linearizeDepth(depth);

        float ao = 0.0;
        for (float i = 0.0; i < samples; i++) {
          float angle = i * (2.0 * 3.1415926535 / samples);
          vec2 dir = vec2(cos(angle), sin(angle)) * (i / samples);

          vec2 sampleUv = uv + dir * (aoRadius / resolution);
          float sampleDepth = texture(sceneDepth, sampleUv).r;
          vec3 samplePos = getWorldPos(sampleUv, sampleDepth);

          vec3 horizonVector = normalize(samplePos - worldPos);
          float falloff = max(0.0, 1.0 - length(samplePos - worldPos) / aoRadius);
          ao += falloff * max(0.0, dot(normal, horizonVector) - bias);
        }

        ao = clamp(1.0 - (ao / samples) * intensity, 0.0, 1.0);
        outColor = vec4(inputColor.rgb * ao, inputColor.a);
      }
      `,
      {
        uniforms: /* @__PURE__ */ new Map([
          ["intensity", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.config.intensity)],
          // Fuerza AO
          ["aoRadius", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.config.aoRadius)],
          // Radio
          ["bias", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.config.bias)],
          // Bias para evitar artefactos
          ["samples", new _chunkEA3XQ4KJcjs.THREE.Uniform(this.config.samples)],
          // Muestras (16=bueno, 32=ultra)
          ["resolution", new _chunkEA3XQ4KJcjs.THREE.Uniform(new _chunkEA3XQ4KJcjs.THREE.Vector2(this.width, this.height))],
          ["projectionMatrixInv", new _chunkEA3XQ4KJcjs.THREE.Uniform(camera.projectionMatrixInverse)],
          ["viewMatrixInv", new _chunkEA3XQ4KJcjs.THREE.Uniform(camera.matrixWorld)],
          ["cameraPos", new _chunkEA3XQ4KJcjs.THREE.Uniform(camera.position)],
          ["near", new _chunkEA3XQ4KJcjs.THREE.Uniform(camera.near)],
          ["far", new _chunkEA3XQ4KJcjs.THREE.Uniform(camera.far)]
        ])
      }
    );
  }
  resize(width, height) {
    this.effect.uniforms.get("resolution").value.set(width, height);
  }
  // Método para actualizar configs dinámicamente (para update())
  update(config) {
    if (config.intensity !== void 0) {
      this.effect.uniforms.get("intensity").value = config.intensity;
    }
    if (config.aoRadius !== void 0) {
      this.effect.uniforms.get("aoRadius").value = config.aoRadius;
    }
    if (config.bias !== void 0) {
      this.effect.uniforms.get("bias").value = config.bias;
    }
    if (config.samples !== void 0) {
      this.effect.uniforms.get("samples").value = config.samples;
    }
  }
  dispose() {
    this.effect.dispose();
  }
}, _class);




exports.DEFAULT_AO_CONFIG = DEFAULT_AO_CONFIG; exports.AOPlugin = AOPlugin;
