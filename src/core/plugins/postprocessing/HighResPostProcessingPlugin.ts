import * as POSTPROCESSING from 'postprocessing';
import { SMAAEffect, FXAAEffect } from 'postprocessing';
import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type HighResPostProcessingConfig = {
  enabled?: boolean;
  toneMappingExposure?: number;
  multisampling?: number; // 0=off, 4-16 (max depende de GPU, 8 recomendado para 4K)
  aaType?: 'smaa' | 'fxaa' | 'none'; // AA post-processing (SMAA mejor para nitidez)
  superSampling?: number; // >1 para más nitidez (ej: 1.5 en 4K), 1=normal
};

const DEFAULT_CONFIG: Required<HighResPostProcessingConfig> = {
  enabled: true,
  toneMappingExposure: 1.0,
  multisampling: 8,
  aaType: 'smaa',
  superSampling: 1,
};

export class HighResPostProcessingPlugin implements Plugin {
  public readonly name = 'HighResPostProcessing';
  private composer!: POSTPROCESSING.EffectComposer;
  private config: Required<HighResPostProcessingConfig>;

  constructor(config?: Partial<HighResPostProcessingConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  install({ scene, camera, renderer }: PluginContext): void {
    // Config para máxima nitidez en high-res
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;

    // Super-sampling para más detalle en 4K/8K (sin blur)
    renderer.setPixelRatio(window.devicePixelRatio * this.config.superSampling);

    // Composer con MSAA (anti-aliasing hardware sin pérdida)
    this.composer = new POSTPROCESSING.EffectComposer(renderer, {
      multisampling: this.config.multisampling > 0 ? this.config.multisampling : 0,
      frameBufferType: THREE.HalfFloatType, // Precisión HDR sin banding
    });

    // Render básico
    this.composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

    // AA post opcional (SMAA preserva nitidez, FXAA más suave)
    if (this.config.aaType !== 'none') {
      let aaEffect;
      if (this.config.aaType === 'smaa') {
        aaEffect = new SMAAEffect();
      } else if (this.config.aaType === 'fxaa') {
        aaEffect = new FXAAEffect();
      }

      if (aaEffect) {
        const aaPass = new POSTPROCESSING.EffectPass(camera, aaEffect);
        this.composer.addPass(aaPass);
      }
    }
  }

  postRender(): void {
    if (this.config.enabled) {
      this.composer.render();
    }
  }

  resize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  update(newConfig: Partial<HighResPostProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.toneMappingExposure !== undefined) {
      this.composer.getRenderer().toneMappingExposure = newConfig.toneMappingExposure;
    }

    if (newConfig.multisampling !== undefined) {
      this.composer.multisampling = newConfig.multisampling;
    }

    if (newConfig.superSampling !== undefined) {
      this.composer.getRenderer().setPixelRatio(window.devicePixelRatio * newConfig.superSampling);
    }

    // aaType no se puede cambiar dinámicamente fácilmente (requiere recrear pases)
  }

  dispose(): void {
    this.composer.dispose();
  }
}