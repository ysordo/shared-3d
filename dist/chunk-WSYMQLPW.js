import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/PostProcessingPlugin.ts
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
var PostProcessingPlugin = class {
  name = "PostProcessing";
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
  /* =========================
   *  Install
   * ========================= */
  install({ scene, camera, renderer }) {
    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
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
  /* =========================
   *  Render hook
   * ========================= */
  render() {
    if (!this.enabled) {
      return;
    }
    this.composer.render();
  }
  /* =========================
   *  Resize hook
   * ========================= */
  resize(width, height) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }
  /* =========================
   *  Updates
   * ========================= */
  update(config) {
    this.config = {
      ...this.config,
      ...config,
      bloom: {
        ...this.config.bloom,
        ...config.bloom
      }
    };
    if (config.enabled !== void 0) {
      this.enabled = config.enabled;
    }
    if (config.bloom) {
      if (config.bloom.strength !== void 0) {
        this.bloomPass.strength = config.bloom.strength;
      }
      if (config.bloom.radius !== void 0) {
        this.bloomPass.radius = config.bloom.radius;
      }
      if (config.bloom.threshold !== void 0) {
        this.bloomPass.threshold = config.bloom.threshold;
      }
    }
  }
  /* =========================
   *  Dispose
   * ========================= */
  dispose() {
    this.composer.dispose();
  }
};

export {
  PostProcessingPlugin
};
