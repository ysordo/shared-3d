import { N8AOPostPass } from 'n8ao';
import { THREE } from '../../../../lib';
import type { Plugin, PluginContext } from '../../types';

export type AOPluginConfig = {
  width: number;
  height: number
}

const DEFAULT_AO_CONFIG: Required<AOPluginConfig> = {
  width: 512,
  height: 512,
};
export class AOPlugin implements Plugin {
  readonly name = 'AO';
  public effect!: N8AOPostPass;
  private config: Required<AOPluginConfig>;

  constructor(
    config: Partial<AOPluginConfig>
  ) {
    this.config = {...DEFAULT_AO_CONFIG, ...config};
  }

  install({camera, scene}: PluginContext): void {
    // N8AO ultra-realista (HBAO-like, temporalmente estable)
    this.effect = new N8AOPostPass(scene, camera, this.config.width, this.config.height);

    // Configuración optimizada para look Unreal Engine (ajusta según tu escena)
    this.effect.configuration.intensity = 4.0;          // Fuerza del AO (2=suave, 5-10=fuerte y dramático)
    this.effect.configuration.aoRadius = 5.0;           // Radio en unidades del mundo (ajusta a escala de escena)
    this.effect.configuration.distanceFalloff = 1.0;   // Fade con distancia (~1/5 del radius)
    this.effect.configuration.aoSamples = 32;          // Calidad AO (16=bueno, 64=ultra)
    this.effect.configuration.denoiseSamples = 8;       // Muestras denoise
    this.effect.configuration.denoiseRadius = 12;       // Radio denoise
    this.effect.configuration.denoiseIterations = 2;    // Iteraciones denoise
    this.effect.configuration.halfRes = false;          // false=full res (máxima calidad), true=mejor FPS
    this.effect.configuration.screenSpaceRadius = false; // false=world units, true=pixels (para escenas grandes)
    this.effect.configuration.color = new THREE.Color(0, 0, 0); // Negro puro (cámbialo para tinte azulado si quieres)
    this.effect.configuration.renderMode = 0;           // 0=AO aplicado al color (normal)
    this.effect.configuration.colorMultiply = true;     // Multiplica color de escena (realista)
    this.effect.configuration.depthAwareUpsampling = true; // Mejora upscaling si halfRes=true
  }

  // Resize: n8ao tiene método setSize nativo
  resize(width: number, height: number): void {
    this.effect.setSize(width, height);
  }

  // Opcional: modo debug para ver solo AO o split view
  setRenderMode(mode: 0 | 1 | 2 | 3 | 4): void {
    this.effect.configuration.renderMode = mode;
  }

  // Opcional: presets de calidad (como Unreal)
  setQualityPreset(preset: 'low' | 'medium' | 'high' | 'ultra'): void {
    switch (preset) {
      case 'low':
        this.effect.configuration.aoSamples = 8;
        this.effect.configuration.denoiseSamples = 4;
        this.effect.configuration.denoiseRadius = 12;
        this.effect.configuration.halfRes = true;
        break;
      case 'medium':
        this.effect.configuration.aoSamples = 16;
        this.effect.configuration.denoiseSamples = 8;
        this.effect.configuration.denoiseRadius = 12;
        this.effect.configuration.halfRes = false;
        break;
      case 'high':
        this.effect.configuration.aoSamples = 32;
        this.effect.configuration.denoiseSamples = 12;
        this.effect.configuration.denoiseRadius = 8;
        this.effect.configuration.halfRes = false;
        break;
      case 'ultra':
        this.effect.configuration.aoSamples = 64;
        this.effect.configuration.denoiseSamples = 16;
        this.effect.configuration.denoiseRadius = 6;
        this.effect.configuration.halfRes = false;
        break;
    }
  }

  dispose(): void {
    this.effect.dispose();
  }
}