import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/BloomPostProcessingPlugin.ts
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
var BloomPostProcessingPlugin = class {
  name = "BloomPostProcessing";
  composer;
  bloomPass;
  enabled = true;
  config;
  constructor(config) {
    this.config = {
      enabled: true,
      bloom: {
        strength: 1.5,
        radius: 0.4,
        threshold: 0,
        ...config?.bloom
      },
      ...config
    };
  }
  install({ scene, camera, renderer }) {
    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    this.composer.setPixelRatio(renderer.getPixelRatio());
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.config.bloom.strength,
      this.config.bloom.radius,
      this.config.bloom.threshold
    );
    this.composer.addPass(this.bloomPass);
  }
  postRender() {
    if (this.enabled) {
      this.composer.render();
    }
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }
  update(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
      bloom: {
        ...this.config.bloom,
        ...newConfig.bloom
      }
    };
    if (newConfig.enabled !== void 0) {
      this.enabled = newConfig.enabled;
    }
    if (newConfig.bloom) {
      if (newConfig.bloom.strength !== void 0) {
        this.bloomPass.strength = newConfig.bloom.strength;
      }
      if (newConfig.bloom.radius !== void 0) {
        this.bloomPass.radius = newConfig.bloom.radius;
      }
      if (newConfig.bloom.threshold !== void 0) {
        this.bloomPass.threshold = newConfig.bloom.threshold;
      }
    }
  }
  dispose() {
    this.composer.dispose();
  }
};

export {
  BloomPostProcessingPlugin
};
