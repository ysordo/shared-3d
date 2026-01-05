import * as POST from 'postprocessing';
import { FrameState } from './ureal-engine/FrameState';
import { VelocityPassPlugin } from './ureal-engine/VelocityPassPlugin';
import { AOPlugin } from './ureal-engine/AOPlugin';
import { GILitePlugin } from './ureal-engine/GILitePlugin';
import { BloomPlugin } from './ureal-engine/BloomPlugin';
import { MotionBlurPlugin } from './ureal-engine/MotionBlurPlugin';
import { TAAPlugin } from './ureal-engine/TAAPlugin';
import { SharpenEffect } from './ureal-engine/SharpenPlugin';
import type { PluginContext, Plugin} from '../types';
import { THREE } from '../../../lib';

export class UnrealEnginePostProcessingPlugin implements Plugin {
  name = 'UnrealEnginePostProcessing';
  
  composer!: POST.EffectComposer;
  frameState = new FrameState();
  velocity!: VelocityPassPlugin;
  ao!: AOPlugin;
  gi!: GILitePlugin;
  bloom!: BloomPlugin;
  motion!: MotionBlurPlugin;
  taa!: TAAPlugin;
  sharpen!: SharpenEffect;
  camera!: THREE.PerspectiveCamera;
  domElement!: HTMLElement;
  scene!: THREE.Scene;

  install({ scene, camera, renderer }: PluginContext) {
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.composer = new POST.EffectComposer(renderer);

    // Plugins internos
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

  resize(width: number, height: number) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
  }

  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
  }
}
