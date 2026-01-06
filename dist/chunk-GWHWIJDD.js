import {
  MotionBlurPlugin
} from "./chunk-VLJOONUS.js";
import {
  SharpenEffect
} from "./chunk-ZGPF35LB.js";
import {
  TAAPlugin
} from "./chunk-LWO3T5LQ.js";
import {
  VelocityPassPlugin
} from "./chunk-5RDSJRJ6.js";
import {
  AOPlugin
} from "./chunk-PYW7RNLM.js";
import {
  BloomPlugin
} from "./chunk-7YDGNTWC.js";
import {
  FrameState
} from "./chunk-4PPTXN5L.js";
import {
  GILitePlugin
} from "./chunk-GXHJHS62.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/UnrealEnginePostProcessingPlugin.ts
import * as POST from "postprocessing";
var DEFAULT_UNREAL_ENGINE_PP_CONFIG = {
  bloom: { intensity: 0.4, luminanceThreshold: 1.2 },
  motionBlur: { intensity: 0.4 },
  taa: { blend: 0.9 },
  sharpen: { strength: 0.2 },
  toneMappingExposure: 1.1,
  lodLevels: 5
  // Niveles de LOD para polígonos "infinitos"
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
  sceneRenderTarget;
  lodGroup = new THREE.Group();
  // Para Nanite-like LOD management
  config;
  constructor(config) {
    this.config = { ...DEFAULT_UNREAL_ENGINE_PP_CONFIG, ...config };
  }
  install(context) {
    const { scene, camera, renderer } = context;
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
      type: THREE.HalfFloatType,
      samples: 8
      // MSAA para high-res realism
    });
    this.velocity = new VelocityPassPlugin(width, height);
    this.velocity.install(context);
    this.ao = new AOPlugin(width, height);
    this.ao.install(context);
    this.gi = new GILitePlugin(this.velocity, this.sceneRenderTarget);
    this.gi.install(context);
    this.bloom = new BloomPlugin();
    this.bloom.install(context);
    this.motion = new MotionBlurPlugin(this.velocity, this.config.motionBlur.intensity);
    this.motion.install(context);
    this.taa = new TAAPlugin(this.velocity);
    this.taa.install(context);
    this.sharpen = new SharpenEffect(0.2);
    this.bloom.effect.intensity = this.config.bloom.intensity;
    this.bloom.effect.luminanceMaterial.threshold = this.config.bloom.luminanceThreshold;
    this.taa.setBlend(this.config.taa.blend);
    const renderPass = new POST.RenderPass(scene, camera);
    this.composer.addPass(renderPass);
    const realismPass = new POST.EffectPass(
      camera,
      this.ao.effect,
      this.gi.effect,
      this.bloom.effect
    );
    this.composer.addPass(realismPass);
    const finalPass = new POST.EffectPass(
      camera,
      this.taa.effect,
      this.motion.effect,
      this.sharpen
    );
    this.composer.addPass(finalPass);
    this.setupNaniteLOD(scene);
  }
  setupNaniteLOD(scene) {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry.attributes.position.count > 1e5) {
        const lod = new THREE.LOD();
        for (let i = 0; i < this.config.lodLevels; i++) {
          const decimatedMesh = child.clone();
          decimatedMesh.geometry = this.decimateGeometry(decimatedMesh.geometry, i);
          lod.addLevel(decimatedMesh, i * 50);
        }
        child.parent?.add(lod);
        child.parent?.remove(child);
      }
    });
    scene.add(this.lodGroup);
  }
  decimateGeometry(geometry, level) {
    return geometry;
  }
  postRender() {
    const renderer = this.composer.getRenderer();
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.frameState.update(this.camera, width, height);
    this.velocity.render(renderer, this.scene, this.camera);
    this.taa.update(this.sceneRenderTarget.texture);
    this.motion.update({ texture: this.sceneRenderTarget.texture });
    this.composer.render();
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
    this.sceneRenderTarget.setSize(width, height);
    this.ao.resize(width, height);
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
      this.motion.update?.({ intensity: newConfig.motionBlur.intensity });
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
