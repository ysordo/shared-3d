import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Plugin, PluginContext } from './types';
import { THREE } from '../../lib';

export type BloomPostProcessingConfig = {
  /** Habilitar/deshabilitar todo el post-processing */
  enabled?: boolean;
  /** Configuración específica del efecto UnrealBloom */
  bloom?: {
    strength?: number;
    radius?: number;
    threshold?: number;
  };
};

/**
 * BloomPostProcessingPlugin
 * 
 * Plugin de post-procesado centrado en efecto Bloom (UnrealBloomPass) para resaltar emisivos.
 * 
 * Características principales:
 * - EffectComposer + RenderPass + UnrealBloomPass configurables en caliente.
 * - Renderizado delegado a postRender() → integración perfecta con loop centralizado (reemplaza renderer.render).
 * - Actualización reactiva de parámetros bloom y enabled sin recrear pases.
 * - Gestión automática de resize mediante hook resize() llamado globalmente por SceneOrchestrator.
 * - Limpieza completa de recursos en dispose() (composer.dispose libera pases internos).
 * - Configuración por defecto optimizada para HDR/emisivos realistas.
 * 
 * Ideal para escenas con materiales emisivos, iluminación dramática o estilo "glow" moderno.
 * 
 * @example
 * new BloomPostProcessingPlugin({
 *   enabled: true,
 *   bloom: { strength: 1.8, radius: 0.6, threshold: 0.1 }
 * })
 */
export class BloomPostProcessingPlugin implements Plugin {
  public readonly name = 'BloomPostProcessing';

  private composer!: EffectComposer;
  private bloomPass!: UnrealBloomPass;

  private enabled = true;

  private config: Required<BloomPostProcessingConfig>;

  constructor(config?: BloomPostProcessingConfig) {
    this.config = {
      enabled: true,
      bloom: {
        strength: 1.5,
        radius: 0.4,
        threshold: 0,
        ...config?.bloom,
      },
      ...config,
    };
  }

  install({ scene, camera, renderer }: PluginContext): void {
    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    this.composer.setPixelRatio(renderer.getPixelRatio());

    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.config.bloom.strength!,
      this.config.bloom.radius!,
      this.config.bloom.threshold!
    );
    this.composer.addPass(this.bloomPass);
  }

  postRender(): void {
    if (this.enabled) {
      this.composer.render();
    }
  }

  resize(width: number, height: number): void {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }

  update(newConfig: Partial<BloomPostProcessingConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
      bloom: {
        ...this.config.bloom,
        ...newConfig.bloom,
      },
    };

    if (newConfig.enabled !== undefined) {
      this.enabled = newConfig.enabled;
    }

    if (newConfig.bloom) {
      if (newConfig.bloom.strength !== undefined) {
        this.bloomPass.strength = newConfig.bloom.strength;
      }
      if (newConfig.bloom.radius !== undefined) {
        this.bloomPass.radius = newConfig.bloom.radius;
      }
      if (newConfig.bloom.threshold !== undefined) {
        this.bloomPass.threshold = newConfig.bloom.threshold;
      }
    }
  }

  dispose(): void {
    this.composer.dispose();
  }
}