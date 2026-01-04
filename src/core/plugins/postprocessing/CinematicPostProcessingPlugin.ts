import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

// Shaders personalizados para look realista
const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 1.0 },
    darkness: { value: 1.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float dist = distance(vUv, vec2(0.5));
      color.rgb *= 1.0 - darkness * smoothstep(0.4, 1.0, dist * offset);
      gl_FragColor = color;
    }
  `,
};

const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
    intensity: { value: 0.08 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;

    float random(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = random(vUv + mod(time, 1000.0));
      color.rgb += (noise - 0.5) * intensity;
      gl_FragColor = color;
    }
  `,
};

import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type CinematicPostProcessingConfig = {
  enabled?: boolean;
  toneMappingExposure?: number;
  vignette?: { darkness?: number; offset?: number };
  filmGrain?: { intensity?: number };
  antiAlias?: boolean;
};

const DEFAULT_CONFIG: Required<CinematicPostProcessingConfig> = {
  enabled: true,
  toneMappingExposure: 1.0,
  vignette: { darkness: 1.2, offset: 1.6 },
  filmGrain: { intensity: 0.05 },
  antiAlias: true,
};

export class CinematicPostProcessingPlugin implements Plugin {
  public readonly name = 'CinematicPostProcessing';
  private composer!: EffectComposer;
  private vignettePass!: ShaderPass;
  private grainPass!: ShaderPass;
  private config: Required<CinematicPostProcessingConfig>;
  private clock = new THREE.Clock();

  constructor(config?: Partial<CinematicPostProcessingConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  install({ scene, camera, renderer }: PluginContext): void {
    // Importante: para realismo, usar tone mapping realista en renderer
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // ¡El más realista!
    renderer.toneMappingExposure = this.config.toneMappingExposure;

    this.composer = new EffectComposer(renderer);
    this.composer.setSize(renderer.domElement.width, renderer.domElement.height);
    this.composer.setPixelRatio(renderer.getPixelRatio());

    // 1. Render básico
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    // 2. Anti-aliasing (SMAA es mejor que FXAA para realismo)
    if (this.config.antiAlias) {
      const smaaPass = new SMAAPass();
      smaaPass.setSize(
        renderer.domElement.width * renderer.getPixelRatio(),
        renderer.domElement.height * renderer.getPixelRatio()
      );
      this.composer.addPass(smaaPass);
    }

    // 3. Vignette (clásico del cine)
    this.vignettePass = new ShaderPass(VignetteShader);
    this.vignettePass.uniforms.offset!.value = this.config.vignette.offset;
    this.vignettePass.uniforms.darkness!.value = this.config.vignette.darkness;
    this.composer.addPass(this.vignettePass);

    // 4. Film Grain (grano sutil, muy realista)
    this.grainPass = new ShaderPass(FilmGrainShader);
    this.grainPass.uniforms.intensity!.value = this.config.filmGrain.intensity;
    this.composer.addPass(this.grainPass);
  }

  postRender(): void {
    if (this.config.enabled) {
      // Actualizar grano animado
      this.grainPass.uniforms!.time!.value = this.clock.getElapsedTime();
      this.composer.render();
    }
  }

  resize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  update(newConfig: Partial<CinematicPostProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.enabled !== undefined) {
      // No hay nada extra, solo se controla en postRender
    }

    if (newConfig.vignette) {
      if (newConfig.vignette.darkness !== undefined) {
        this.vignettePass.uniforms.darkness!.value = newConfig.vignette.darkness;
      }
      if (newConfig.vignette.offset !== undefined) {
        this.vignettePass.uniforms.offset!.value = newConfig.vignette.offset;
      }
    }

    if (newConfig.filmGrain?.intensity !== undefined) {
      this.grainPass.uniforms.intensity!.value = newConfig.filmGrain.intensity;
    }
  }

  dispose(): void {
    this.composer.dispose();
  }
}