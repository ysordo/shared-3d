import * as POST from 'postprocessing';
import { FrameState } from './ureal-engine/FrameState';
import { VelocityPassPlugin } from './ureal-engine/VelocityPassPlugin';
import { AOPlugin } from './ureal-engine/AOPlugin';
import { GILitePlugin } from './ureal-engine/GILitePlugin';
import { BloomPlugin } from './ureal-engine/BloomPlugin';
import { MotionBlurPlugin } from './ureal-engine/MotionBlurPlugin';
import { TAAPlugin } from './ureal-engine/TAAPlugin';
import { SharpenEffect } from './ureal-engine/SharpenPlugin';
import type { PluginContext, Plugin } from '../types';
import { THREE } from '../../../lib';

export type UnrealEnginePostProcessingConfig = {
  bloom?: { intensity?: number; luminanceThreshold?: number };
  motionBlur?: { intensity?: number };
  taa?: { blend?: number };
  sharpen?: { strength?: number };
  toneMappingExposure?: number;
};

const DEFAULT_UNREAL_ENGINE_PP_CONFIG: Required<UnrealEnginePostProcessingConfig> = {
  bloom: {
    intensity: 0.4,           // intensidad del bloom
    luminanceThreshold: 1.2,  // umbral de luminancia
  },
  motionBlur: {
    intensity: 0.4,           // intensidad del motion blur
  },
  taa: {
    blend: 0.9,               // blend de TAA
  },
  sharpen: {
    strength: 0.2,            // fuerza del sharpen
  },
  toneMappingExposure: 1.1,   // exposición del tone mapping del renderer
};

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

  // Render target temporal para Motion Blur
  private sceneRenderTarget!: THREE.WebGLRenderTarget;
  private config: Required<UnrealEnginePostProcessingConfig>;

  constructor(config?: Partial<UnrealEnginePostProcessingConfig>){
    this.config ={...DEFAULT_UNREAL_ENGINE_PP_CONFIG, ...config};
  }


  install({ scene, camera, renderer }: PluginContext) {
    this.camera = camera;
    this.domElement = renderer.domElement;
    this.scene = scene;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure!;

    const width = renderer.domElement.width;
    const height = renderer.domElement.height;

    this.composer = new POST.EffectComposer(renderer);

    // Render target temporal para Motion Blur
    this.sceneRenderTarget = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    });

    // Plugins internos
    this.velocity = new VelocityPassPlugin(width, height);

    this.ao = new AOPlugin(scene, camera, {width, height});
    this.gi = new GILitePlugin(this.velocity, this.sceneRenderTarget);
    this.bloom = new BloomPlugin();
    this.motion = new MotionBlurPlugin(this.velocity);
    this.taa = new TAAPlugin(camera, this.velocity, renderer);
    this.sharpen = new SharpenEffect(0.2);

    this.bloom.effect.intensity = this.config.bloom!.intensity!;
    this.bloom.effect.luminanceMaterial.threshold = this.config.bloom!.luminanceThreshold!;
    this.motion.setIntensity(this.config.motionBlur!.intensity!);
    this.taa.setBlend(this.config.taa!.blend!);


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

    // Actualizar jitter frame
    this.frameState.update(this.camera, width, height);
    
    // Render Velocity Pass
    this.velocity.render(renderer, this.scene, this.camera);

    this.gi.renderScene(renderer, this.scene, this.camera);
    
    // Render escena a textura temporal para Motion Blur
    renderer.setRenderTarget(this.sceneRenderTarget);
    renderer.render(this.scene, this.camera);
    this.taa.update(this.sceneRenderTarget.texture);
    renderer.setRenderTarget(null);

    // Actualizar textura de Motion Blur
    this.motion.updateSceneTexture(this.sceneRenderTarget);

    // Render final
    this.composer.render();
  }

  resize(width: number, height: number) {
    this.composer.setSize(width, height);
    this.velocity.resize(width, height);
    this.sceneRenderTarget.setSize(width, height);
    this.motion.resize(width, height);
  }

  update(newConfig: Partial<UnrealEnginePostProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Bloom
    if (newConfig.bloom) {
      if (newConfig.bloom.intensity !== undefined) {
        this.bloom.effect.intensity = newConfig.bloom.intensity;
      }
      if (newConfig.bloom.luminanceThreshold !== undefined) {
        this.bloom.effect.luminanceMaterial.threshold = newConfig.bloom.luminanceThreshold;
      }
    }

    // Motion Blur
    if (newConfig.motionBlur?.intensity !== undefined) {
      this.motion.setIntensity(newConfig.motionBlur.intensity);
    }

    // TAA
    if (newConfig.taa?.blend !== undefined) {
      this.taa.setBlend(newConfig.taa.blend);
    }

    // Sharpen
    if (newConfig.sharpen?.strength !== undefined) {
      this.sharpen.uniforms.get('strength')!.value = newConfig.sharpen.strength;
    }

    // Tone Mapping Exposure
    if (newConfig.toneMappingExposure !== undefined) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }

  dispose() {
    this.composer.dispose();
    this.velocity.dispose();
    this.sceneRenderTarget.dispose();
  }
}
