import {
  MotionBlurPlugin
} from "./chunk-LMJYYPGW.js";
import {
  SharpenEffect
} from "./chunk-SI7IKFAQ.js";
import {
  TAAPlugin
} from "./chunk-BLHZPW6Q.js";
import {
  VelocityPassPlugin
} from "./chunk-Y5MGRU2I.js";
import {
  AOPlugin
} from "./chunk-T632CY6J.js";
import {
  BloomPlugin
} from "./chunk-PEYXKPWT.js";
import {
  FrameState
} from "./chunk-A2Q3JIXV.js";
import {
  GILitePlugin
} from "./chunk-GQURLXJ3.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/UnrealEnginePostProcessingPlugin.ts
import * as POST from "postprocessing";
var DEFAULT_UNREAL_ENGINE_PP_CONFIG = {
  bloom: {
    intensity: 0.4,
    // intensidad del bloom
    luminanceThreshold: 1.2
    // umbral de luminancia
  },
  motionBlur: {
    intensity: 0.4
    // intensidad del motion blur
  },
  taa: {
    blend: 0.9
    // blend de TAA
  },
  sharpen: {
    strength: 0.2
    // fuerza del sharpen
  },
  toneMappingExposure: 1.1
  // exposición del tone mapping del renderer
};
var UnrealEnginePostProcessingPlugin = class {
  name = "UnrealEnginePostProcessing";
  composer;
  frameState = new FrameState();
  velocity;
  ao;
  gi;
  bloom;
  motion;
  taa;
  sharpen;
  camera;
  domElement;
  scene;
  // Render target temporal para Motion Blur
  sceneRenderTarget;
  config;
  constructor(config) {
    this.config = { ...DEFAULT_UNREAL_ENGINE_PP_CONFIG, ...config };
  }
  install({ scene, camera, renderer }) {
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;
    this.composer = new POST.EffectComposer(renderer);
    this.sceneRenderTarget = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType
    });
    this.velocity = new VelocityPassPlugin(width, height);
    this.ao = new AOPlugin(scene, camera, { width, height });
    this.gi = new GILitePlugin(this.velocity, this.sceneRenderTarget);
    this.bloom = new BloomPlugin();
    this.motion = new MotionBlurPlugin(this.velocity);
    this.taa = new TAAPlugin(camera, this.velocity, renderer);
    this.sharpen = new SharpenEffect(0.2);
    this.bloom.effect.intensity = this.config.bloom.intensity;
    this.bloom.effect.luminanceMaterial.threshold = this.config.bloom.luminanceThreshold;
    this.motion.setIntensity(this.config.motionBlur.intensity);
    this.taa.setBlend(this.config.taa.blend);
    const realismPass = new POST.EffectPass(
      camera,
      this.ao.effect,
      this.gi.effect,
      this.bloom.effect
    );
    const finalPass = new POST.EffectPass(
      camera,
      this.taa.effect,
      this.motion.effect,
      this.sharpen
    );
    this.composer.addPass(realismPass);
    this.composer.addPass(finalPass);
  }
  postRender() {
    const renderer = this.composer.getRenderer();
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.frameState.update(this.camera, width, height);
    this.velocity.render(renderer, this.scene, this.camera);
    this.gi.renderScene(renderer, this.scene, this.camera);
    renderer.setRenderTarget(this.sceneRenderTarget);
    renderer.render(this.scene, this.camera);
    this.taa.update(this.sceneRenderTarget.texture);
    renderer.setRenderTarget(null);
    this.motion.updateSceneTexture(this.sceneRenderTarget);
    this.composer.render();
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
    this.sceneRenderTarget.setSize(width, height);
    this.motion.resize(width, height);
  }
  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.bloom) {
      if (newConfig.bloom.intensity !== void 0) {
        this.bloom.effect.intensity = newConfig.bloom.intensity;
      }
      if (newConfig.bloom.luminanceThreshold !== void 0) {
        this.bloom.effect.luminanceMaterial.threshold = newConfig.bloom.luminanceThreshold;
      }
    }
    if (newConfig.motionBlur?.intensity !== void 0) {
      this.motion.setIntensity(newConfig.motionBlur.intensity);
    }
    if (newConfig.taa?.blend !== void 0) {
      this.taa.setBlend(newConfig.taa.blend);
    }
    if (newConfig.sharpen?.strength !== void 0) {
      this.sharpen.uniforms.get("strength").value = newConfig.sharpen.strength;
    }
    if (newConfig.toneMappingExposure !== void 0) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }
  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
    this.sceneRenderTarget.dispose();
  }
};

export {
  UnrealEnginePostProcessingPlugin
};
