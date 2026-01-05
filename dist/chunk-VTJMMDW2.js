import {
  MotionBlurPlugin
} from "./chunk-LWHBDMNG.js";
import {
  SharpenEffect
} from "./chunk-SI7IKFAQ.js";
import {
  TAAPlugin
} from "./chunk-LXMJYYDD.js";
import {
  VelocityPassPlugin
} from "./chunk-Y5MGRU2I.js";
import {
  AOPlugin
} from "./chunk-MVCNM3TY.js";
import {
  BloomPlugin
} from "./chunk-PEYXKPWT.js";
import {
  FrameState
} from "./chunk-A2Q3JIXV.js";
import {
  GILitePlugin
} from "./chunk-GRDJGWH4.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/plugins/postprocessing/UnrealEnginePostProcessingPlugin.ts
import * as POST from "postprocessing";
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
  install({ scene, camera, renderer }) {
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.composer = new POST.EffectComposer(renderer);
    this.velocity = new VelocityPassPlugin(width, height);
    this.ao = new AOPlugin(scene, camera, renderer);
    this.gi = new GILitePlugin(scene, camera, this.velocity, renderer);
    this.bloom = new BloomPlugin();
    this.motion = new MotionBlurPlugin(this.velocity);
    this.taa = new TAAPlugin(camera, this.velocity, renderer);
    this.sharpen = new SharpenEffect(0.2);
    const realismPass = new POST.EffectPass(camera, this.ao.effect, this.gi.effect, this.bloom.effect);
    const finalPass = new POST.EffectPass(camera, this.taa.effect, this.motion.effect, this.sharpen);
    this.composer.addPass(realismPass);
    this.composer.addPass(finalPass);
  }
  postRender() {
    this.frameState.update(this.camera, this.domElement.clientWidth, this.domElement.clientHeight);
    this.velocity.render(this.composer.getRenderer(), this.scene, this.camera);
    this.composer.render();
  }
  resize(width, height) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
  }
  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
  }
};

export {
  UnrealEnginePostProcessingPlugin
};
