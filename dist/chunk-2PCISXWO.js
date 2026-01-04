import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/CinematicPostProcessingPlugin.ts
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
var VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 1 },
    darkness: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float dist = distance(vUv, vec2(0.5));
      color.rgb *= 1.0 - darkness * smoothstep(0.4, 1.0, dist * offset);
      gl_FragColor = color;
    }
  `
  )
};
var FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0.08 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;

    float random(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = random(vUv + mod(time, 1000.0));
      color.rgb += (noise - 0.5) * intensity;
      gl_FragColor = color;
    }
  `
  )
};
var DEFAULT_CONFIG = {
  enabled: true,
  toneMappingExposure: 1,
  vignette: { darkness: 1.2, offset: 1.6 },
  filmGrain: { intensity: 0.05 },
  antiAlias: true
};
var CinematicPostProcessingPlugin = class {
  name = "CinematicPostProcessing";
  composer;
  vignettePass;
  grainPass;
  config;
  clock = new THREE.Clock();
  constructor(config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    this.composer.setPixelRatio(renderer.getPixelRatio());
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);
    if (this.config.antiAlias) {
      const smaaPass = new SMAAPass();
      smaaPass.setSize(
        renderer.domElement.width * renderer.getPixelRatio(),
        renderer.domElement.height * renderer.getPixelRatio()
      );
      this.composer.addPass(smaaPass);
    }
    this.vignettePass = new ShaderPass(VignetteShader);
    this.vignettePass.uniforms.offset.value = this.config.vignette.offset;
    this.vignettePass.uniforms.darkness.value = this.config.vignette.darkness;
    this.composer.addPass(this.vignettePass);
    this.grainPass = new ShaderPass(FilmGrainShader);
    this.grainPass.uniforms.intensity.value = this.config.filmGrain.intensity;
    this.composer.addPass(this.grainPass);
  }
  postRender() {
    if (this.config.enabled) {
      this.grainPass.uniforms.time.value = this.clock.getElapsedTime();
      this.composer.render();
    }
  }
  resize(width, height) {
    this.composer.setSize(width, height);
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.enabled !== void 0) {
    }
    if (newConfig.vignette) {
      if (newConfig.vignette.darkness !== void 0) {
        this.vignettePass.uniforms.darkness.value = newConfig.vignette.darkness;
      }
      if (newConfig.vignette.offset !== void 0) {
        this.vignettePass.uniforms.offset.value = newConfig.vignette.offset;
      }
    }
    if (newConfig.filmGrain?.intensity !== void 0) {
      this.grainPass.uniforms.intensity.value = newConfig.filmGrain.intensity;
    }
  }
  dispose() {
    this.composer.dispose();
  }
};

export {
  CinematicPostProcessingPlugin
};
