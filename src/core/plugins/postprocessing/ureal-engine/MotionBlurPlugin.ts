import { Effect } from 'postprocessing';
import type { VelocityPassPlugin } from './VelocityPassPlugin';
import { THREE } from '../../../../lib';
import type { Plugin, PluginContext } from '../../types';

export type MotionBlurPluginConfig = {
  intensity?: number;
  texture?: THREE.Texture | undefined,
}

export const DEFAULT_MOTION_BLUR_CONFIG: Required<MotionBlurPluginConfig> = {
  intensity: 0.4,
  texture: undefined,
};
export class MotionBlurPlugin implements Plugin {
  readonly name = 'MotionBlur';
  effect!: Effect;
  private velocityPass: VelocityPassPlugin;

  private config: Required<MotionBlurPluginConfig>;

  constructor(velocityPass: VelocityPassPlugin, intensity: MotionBlurPluginConfig['intensity']=0.4) {
    this.config = {...DEFAULT_MOTION_BLUR_CONFIG, intensity};
    this.velocityPass = velocityPass;
  }
  install({renderer}: PluginContext): void {
    this.effect = new Effect(
      'MotionBlur',
      `
      uniform sampler2D velocityTexture; 
      uniform float intensity;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec2 velocity = texture(velocityTexture, uv).rg * 2.0 - 1.0;
        vec4 result = inputColor;

        // Multi-sample blur para realism (como Unreal)
        const int samples = 8;
        for (int i = 1; i < samples; ++i) {
          vec2 offset = velocity * (float(i) / float(samples - 1) - 0.5) * intensity;
          result += texture(inputBuffer, uv + offset);
        }
        result /= float(samples);

        outColor = result;
      }
      `,
      {
        uniforms: new Map<string, THREE.Uniform>([
          ['velocityTexture', new THREE.Uniform(this.velocityPass.getTexture())],
          ['intensity', new THREE.Uniform(this.config.intensity)],
        ]),
      }
    );
    this.config.texture = renderer.getRenderTarget()?.texture;
  };

  update?(newConfig: Partial<MotionBlurPluginConfig>): void {
    this.config= {...this.config, ...newConfig};
    if(newConfig.intensity!==undefined){
      this.effect.uniforms.get('intensity')!.value = newConfig.intensity;
    }
  }
}