import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/orchestrator/plugins/PostProcessingPlugin.ts
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
var PostProcessingPlugin = class {
  constructor(options = { strength: 1.5, radius: 0.4, threshold: 0 }) {
    this.options = options;
  }
  name = "PostProcessing";
  composer;
  bloomPass;
  install({ scene, camera, renderer }) {
    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.options.strength,
      this.options.radius,
      this.options.threshold
    );
    this.composer.addPass(this.bloomPass);
    const originalRender = renderer.render.bind(renderer);
    renderer.render = () => {
      this.composer.render();
    };
    const onResize = () => {
      this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
      this.bloomPass.resolution.set(renderer.domElement.width, renderer.domElement.height);
    };
    window.addEventListener("resize", onResize);
    this.dispose = () => {
      window.removeEventListener("resize", onResize);
      renderer.render = originalRender;
      this.composer.dispose();
    };
  }
  setBloom(strength) {
    if (this.bloomPass) {
      this.bloomPass.strength = strength;
    }
  }
  dispose() {
  }
};

export {
  PostProcessingPlugin
};
