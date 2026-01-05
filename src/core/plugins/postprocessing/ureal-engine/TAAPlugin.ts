import { Effect } from 'postprocessing';
import type { THREE } from '../../../../lib';
import type { VelocityPassPlugin } from './VelocityPassPlugin';
import { RenderTarget, Uniform } from 'three';

export class TAAPlugin {
  effect: Effect;
  private previousFrame: RenderTarget;
  private velocityPass: VelocityPassPlugin;
  private blend: number;

  constructor(camera: THREE.PerspectiveCamera, velocityPass: VelocityPassPlugin, renderer: THREE.WebGLRenderer, blend = 0.9) {
    this.velocityPass = velocityPass;
    this.blend = blend;

    // RenderTarget para almacenar el frame anterior
    this.previousFrame = new RenderTarget(renderer.domElement.width, renderer.domElement.height);

    this.effect = new Effect(
      'TAA',
      `
      uniform sampler2D previousFrame;
      uniform sampler2D velocityTexture;
      uniform float blend;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 prev = texture(previousFrame, uv);
        vec2 vel = texture(velocityTexture, uv).rg * 2.0 - 1.0;
        vec4 color = inputColor;

        // Mezcla con frame anterior usando velocity
        vec2 uvPrev = uv - vel; 
        vec4 samplePrev = texture(previousFrame, uvPrev);
        outColor = mix(color, samplePrev, blend);
      }
      `,
      {
        uniforms: new Map<string, Uniform<any>>([
          ['previousFrame', new Uniform(this.previousFrame.texture)],
          ['velocityTexture', new Uniform(this.velocityPass.getTexture())],
          ['blend', new Uniform(this.blend)],
        ]),
      }
    );
  }

  // Llamar después de renderizar para almacenar el frame actual
  update(previousFrameTexture: THREE.Texture) {
    this.previousFrame.texture = previousFrameTexture;
    this.effect.uniforms.get('previousFrame')!.value = previousFrameTexture;
  }

  resize(width: number, height: number) {
    this.previousFrame.setSize(width, height);
  }
}
