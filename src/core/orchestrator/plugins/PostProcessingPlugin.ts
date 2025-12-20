import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type PostProcessingConfig = {
  enabled?: boolean;
  bloom?: {
    strength?: number;
    radius?: number;
    threshold?: number;
  };
};

export class PostProcessingPlugin implements Plugin {
  name = 'PostProcessing';

  private composer!: EffectComposer;
  private bloomPass!: UnrealBloomPass;

  private enabled = true;

  private config: Required<PostProcessingConfig>;

  constructor(config?: PostProcessingConfig) {
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

  /* =========================
   *  Install
   * ========================= */
  install({ scene, camera, renderer }: PluginContext): void {

    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);

    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(renderer.domElement.width, renderer.domElement.height),
      this.config.bloom!.strength!,
      this.config.bloom!.radius!,
      this.config.bloom!.threshold!
    );
    this.composer.addPass(this.bloomPass);
  }

  /* =========================
   *  Render hook
   * ========================= */
  render() {
    if (!this.enabled) {return;}
    this.composer.render();
  }

  /* =========================
   *  Resize hook
   * ========================= */
  resize(width: number, height: number) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }

  /* =========================
   *  Updates
   * ========================= */
  update(config: Partial<PostProcessingConfig>) {
    this.config = {
      ...this.config,
      ...config,
      bloom: {
        ...this.config.bloom,
        ...config.bloom,
      },
    };

    if (config.enabled !== undefined) {
      this.enabled = config.enabled;
    }

    if (config.bloom) {
      if (config.bloom.strength !== undefined) {
        this.bloomPass.strength = config.bloom.strength;
      }
      if (config.bloom.radius !== undefined) {
        this.bloomPass.radius = config.bloom.radius;
      }
      if (config.bloom.threshold !== undefined) {
        this.bloomPass.threshold = config.bloom.threshold;
      }
    }
  }

  /* =========================
   *  Dispose
   * ========================= */
  dispose(): void {
    this.composer.dispose();
  }
}
