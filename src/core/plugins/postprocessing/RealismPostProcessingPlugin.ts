import * as POSTPROCESSING from 'postprocessing';
import {
  SSGIEffect,
  TRAAEffect,
  MotionBlurEffect,
  VelocityDepthNormalPass,
  HBAOEffect,
} from 'realism-effects';
import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type RealismPostProcessingConfig = {
  enabled?: boolean;
  // SSGI (Screen Space Global Illumination) - Iluminación indirecta realista
  ssgi?: {
    distance?: number;
    thickness?: number;
    denoiseIterations?: number;
    resolutionScale?: number;
  };
  // HBAO (Horizon-Based Ambient Occlusion) - Occlusion ambiental avanzada
  hbao?: {
    intensity?: number;
    bias?: number;
  };
  // TRAA (Temporal Reprojection Anti-Aliasing) - Anti-aliasing temporal
  traa?: {
    blend?: number;
  };
  // Motion Blur - Blur de movimiento
  motionBlur?: {
    intensity?: number;
  };
  // Tone Mapping - Para HDR realista (ACES Filmic)
  toneMappingExposure?: number;
};

const DEFAULT_CONFIG: Required<RealismPostProcessingConfig> = {
  enabled: true,
  ssgi: { distance: 10, thickness: 10, denoiseIterations: 2, resolutionScale: 1 },
  hbao: { intensity: 1, bias: 0.5 },
  traa: { blend: 0.8 },
  motionBlur: { intensity: 0.5 },
  toneMappingExposure: 1.0,
};

export class RealismPostProcessingPlugin implements Plugin {
  public readonly name = 'RealismPostProcessing';
  private composer!: POSTPROCESSING.EffectComposer;
  private velocityPass!: InstanceType<typeof VelocityDepthNormalPass>;
  private ssgiEffect!: InstanceType<typeof SSGIEffect>;
  private hbaoEffect!: InstanceType<typeof HBAOEffect>;
  private traaEffect!: InstanceType<typeof TRAAEffect>;
  private motionBlurEffect!: InstanceType<typeof MotionBlurEffect>;
  private config: Required<RealismPostProcessingConfig>;

  constructor(config?: Partial<RealismPostProcessingConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  install({ scene, camera, renderer }: PluginContext): void {
    // Configuración clave para realismo (como en Unreal)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.composer = new POSTPROCESSING.EffectComposer(renderer);

    // Velocity pass requerido para TRAA y Motion Blur
    this.velocityPass = new VelocityDepthNormalPass(scene, camera);
    this.composer.addPass(this.velocityPass);

    // SSGI - Iluminación indirecta (bouncy light)
    this.ssgiEffect = new SSGIEffect(scene, camera, this.velocityPass, this.config.ssgi);

    // HBAO - Occlusion ambiental realista
    this.hbaoEffect = new HBAOEffect(this.composer, camera, scene);
    this.hbaoEffect.intensity = this.config.hbao.intensity;
    this.hbaoEffect.bias = this.config.hbao.bias;

    // TRAA - Anti-aliasing temporal (suave como en Unreal)
    this.traaEffect = new TRAAEffect(scene, camera, this.velocityPass);
    this.traaEffect.blend = this.config.traa.blend;

    // Motion Blur - Blur de movimiento sutil
    this.motionBlurEffect = new MotionBlurEffect(this.velocityPass);
    this.motionBlurEffect.intensity = this.config.motionBlur.intensity;

    // Pases principales (orden importante: occlusion primero, luego GI, AA al final)
    const mainPass = new POSTPROCESSING.EffectPass(camera, this.hbaoEffect, this.ssgiEffect);
    const aaPass = new POSTPROCESSING.EffectPass(camera, this.traaEffect, this.motionBlurEffect);

    this.composer.addPass(mainPass);
    this.composer.addPass(aaPass);
  }

  postRender(): void {
    if (this.config.enabled) {
      this.composer.render();
    }
  }

  resize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  update(newConfig: Partial<RealismPostProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.enabled !== undefined) {
      // Controlado en postRender
    }

    if (newConfig.ssgi) {
      this.ssgiEffect.distance = newConfig.ssgi.distance ?? this.config.ssgi.distance;
      this.ssgiEffect.thickness = newConfig.ssgi.thickness ?? this.config.ssgi.thickness;
      this.ssgiEffect.denoiseIterations = newConfig.ssgi.denoiseIterations ?? this.config.ssgi.denoiseIterations;
      this.ssgiEffect.resolutionScale = newConfig.ssgi.resolutionScale ?? this.config.ssgi.resolutionScale;
    }

    if (newConfig.hbao) {
      this.hbaoEffect.intensity = newConfig.hbao.intensity ?? this.config.hbao.intensity;
      this.hbaoEffect.bias = newConfig.hbao.bias ?? this.config.hbao.bias;
    }

    if (newConfig.traa?.blend !== undefined) {
      this.traaEffect.blend = newConfig.traa.blend;
    }

    if (newConfig.motionBlur?.intensity !== undefined) {
      this.motionBlurEffect.intensity = newConfig.motionBlur.intensity;
    }

    if (newConfig.toneMappingExposure !== undefined) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }
  }

  dispose(): void {
    this.composer.dispose();
  }
}