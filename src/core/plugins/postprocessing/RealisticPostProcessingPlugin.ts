import * as POSTPROCESSING from 'postprocessing';
import {
  BloomEffect,
  DepthOfFieldEffect,
  VignetteEffect,
  NoiseEffect,
  SMAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
} from 'postprocessing';
import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type RealisticPostProcessingConfig = {
  enabled?: boolean | undefined;
  bloom?: { intensity?: number | undefined; luminanceThreshold?: number | undefined };
  dof?: { focusDistance?: number | undefined; focalLength?: number | undefined; bokehScale?: number | undefined };
  vignette?: { offset?: number | undefined; darkness?: number | undefined };
  noise?: { opacity?: number | undefined };
  toneMappingExposure?: number | undefined;
};

const DEFAULT_CONFIG: Required<RealisticPostProcessingConfig> = {
  enabled: true,
  bloom: { intensity: 0.8, luminanceThreshold: 0.9 },
  dof: { focusDistance: 0, focalLength: 0.05, bokehScale: 2 },
  vignette: { offset: 0.5, darkness: 0.8 },
  noise: { opacity: 0.02 },
  toneMappingExposure: 1.0,
};

export class RealisticPostProcessingPlugin implements Plugin {
  public readonly name = 'RealisticPostProcessing';
  private composer!: POSTPROCESSING.EffectComposer;
  private bloom!: BloomEffect;
  private dof!: DepthOfFieldEffect;
  private vignette!: VignetteEffect;
  private noise!: NoiseEffect;
  private config: Required<RealisticPostProcessingConfig>;

  constructor(config?: Partial<RealisticPostProcessingConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  install({ scene, camera, renderer }: PluginContext): void {
    // Configuración esencial para realismo (como Unreal)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure!;

    this.composer = new POSTPROCESSING.EffectComposer(renderer);

    // RenderPass básico
    this.composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

    // Bloom sutil (resalta emisivos realistas)
    this.bloom = new BloomEffect({
      intensity: this.config.bloom.intensity!,
      luminanceThreshold: this.config.bloom.luminanceThreshold!,
    });
    this.bloom.blendMode.opacity.value = 1.0;

    // Depth of Field (desenfoque de fondo como lente real)
    this.dof = new DepthOfFieldEffect(camera, {
      focusDistance: this.config.dof.focusDistance!,
      focalLength: this.config.dof.focalLength!,
      bokehScale: this.config.dof.bokehScale!,
    });

    // Vignette (oscurece esquinas como lente cinematográfica)
    this.vignette = new VignetteEffect({
      offset: this.config.vignette.offset!,
      darkness: this.config.vignette.darkness!,
    });

    // Noise/Grain sutil (grano de película)
    this.noise = new NoiseEffect({
      premultiply: true,
    });
    this.noise.blendMode.opacity.value = this.config.noise.opacity;

    // Anti-aliasing SMAA (bordes suaves sin jagged)
    const smaa = new SMAAEffect();

    // ToneMapping avanzado (opcional, pero ya está en renderer)
    const toneMapping = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
    });

    // Pase principal con todos los efectos
    const mainPass = new POSTPROCESSING.EffectPass(
      camera,
      this.bloom,
      this.dof,
      this.vignette,
      this.noise,
      smaa,
      toneMapping
    );

    this.composer.addPass(mainPass);
  }

  postRender(): void {
    if (this.config.enabled) {
      this.composer.render();
    }
  }

  resize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  update(newConfig: Partial<RealisticPostProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.bloom) {
      if (newConfig.bloom.intensity !== undefined) {this.bloom.intensity = newConfig.bloom.intensity;}
      if (newConfig.bloom.luminanceThreshold !== undefined) {this.bloom.luminanceMaterial.threshold = newConfig.bloom.luminanceThreshold;}
    }

    if (newConfig.dof) {
      if (newConfig.dof.focusDistance !== undefined) {this.dof.circleOfConfusionMaterial.focusDistance = newConfig.dof.focusDistance;}
      if (newConfig.dof.focalLength !== undefined) {this.dof.circleOfConfusionMaterial.focalLength = newConfig.dof.focalLength;}
      if (newConfig.dof.bokehScale !== undefined) {this.dof.bokehScale = newConfig.dof.bokehScale;}
    }

    if (newConfig.vignette) {
      if (newConfig.vignette.offset !== undefined) {this.vignette.offset = newConfig.vignette.offset;}
      if (newConfig.vignette.darkness !== undefined) {this.vignette.darkness = newConfig.vignette.darkness;}
    }

    if (newConfig.noise?.opacity !== undefined) {
      this.noise.blendMode.opacity.value = newConfig.noise.opacity;
    }

    if (newConfig.toneMappingExposure !== undefined) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }

  dispose(): void {
    this.composer.dispose();
  }
}