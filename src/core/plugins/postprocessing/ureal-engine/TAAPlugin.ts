import { Effect } from 'postprocessing';
import { THREE } from '../../../../lib';
import type { VelocityPassPlugin } from './VelocityPassPlugin';
import type { Plugin, PluginContext } from '../../types';

export class TAAPlugin implements Plugin {
  readonly name = 'TAA';
  effect!: Effect;
  private previousFrame!: THREE.WebGLRenderTarget;
  private velocityPass: VelocityPassPlugin;
  private blend: number;

  constructor(velocityPass: VelocityPassPlugin, blend = 0.9) {
    this.velocityPass = velocityPass;
    this.blend = blend;
  }
  install({renderer}: PluginContext): void {
    this.previousFrame = new THREE.WebGLRenderTarget(renderer.domElement.width, renderer.domElement.height, {
      type: THREE.HalfFloatType,
    });

    this.effect = new Effect(
      'TAA',
      `
      uniform sampler2D previousFrame;
      uniform sampler2D velocityTexture;
      uniform float blend;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec2 velocity = texture(velocityTexture, uv).rg * 2.0 - 1.0;
        vec2 uvPrev = uv - velocity;

        // Clamping para evitar ghosting (como Unreal)
        uvPrev = clamp(uvPrev, 0.0, 1.0);
        vec4 samplePrev = texture(previousFrame, uvPrev);

        // History rejection para ultra-realism
        float dist = length(velocity);
        float reject = smoothstep(0.1, 0.5, dist); // Rechaza si alta motion

        outColor = mix(inputColor, samplePrev, blend * (1.0 - reject));
      }
      `,
      {
        uniforms: new Map<string,THREE.Uniform>([
          ['previousFrame', new THREE.Uniform(this.previousFrame.texture)],
          ['velocityTexture', new THREE.Uniform(this.velocityPass.getTexture())],
          ['blend', new THREE.Uniform(this.blend)],
        ]),
      }
    );
  }
  update(previousFrameTexture?: THREE.Texture) {
    if(previousFrameTexture !== undefined){
      this.previousFrame.texture = previousFrameTexture;
      this.effect.uniforms.get('previousFrame')!.value = previousFrameTexture;
    }
  }

  setBlend(blend: number) {
    this.effect.uniforms.get('blend')!.value = blend;
  }

  resize(width: number, height: number) {
    this.previousFrame.setSize(width, height);
  }
}