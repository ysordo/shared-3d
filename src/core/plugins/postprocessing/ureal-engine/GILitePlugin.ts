import { Effect } from 'postprocessing';
import { THREE } from '../../../../lib';
import type { VelocityPassPlugin } from './VelocityPassPlugin';
import type { Plugin, PluginContext } from '../../types';

export class GILitePlugin implements Plugin {
  readonly name = 'GILite';
  effect!: Effect;
  private velocityPass: VelocityPassPlugin;
  private renderTarget: THREE.WebGLRenderTarget;

  constructor(velocityPass: VelocityPassPlugin, renderTarget: THREE.WebGLRenderTarget) {
    this.velocityPass = velocityPass;
    this.renderTarget = renderTarget;
  }

  install(__context: PluginContext): void {
    this.effect = new Effect(
      'GILite',
      `
      uniform sampler2D sceneTexture;
      uniform sampler2D velocityTexture;
      uniform float distance;
      uniform float thickness;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor) {
        vec4 scene = texture(sceneTexture, uv);

        // SSGI simple con ray marching (simula bounces como Unreal)
        vec3 indirect = vec3(0.0);
        for (int i = 0; i < 8; i++) {
          vec2 offset = vec2(float(i) / 8.0 - 0.5) * distance;
          
          // ← Cambiado 'sample' por 'sampledColor'
          vec4 sampledColor = texture(sceneTexture, uv + offset);
          
          indirect += sampledColor.rgb * (1.0 - length(offset) / thickness);
        }
        indirect /= 8.0;
        indirect = clamp(indirect, 0.0, 1.0) * 0.3;

        outColor = vec4(scene.rgb + indirect, scene.a);
      }
      `,
      {
        uniforms: new Map<string, THREE.Uniform>([
          ['sceneTexture', new THREE.Uniform(this.renderTarget.texture)],
          ['velocityTexture', new THREE.Uniform(this.velocityPass.getTexture())],
          ['distance', new THREE.Uniform(10.0)],
          ['thickness', new THREE.Uniform(10.0)],
        ])
      }
    );
  }

  renderScene(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
  }

  resize(width: number, height: number) {
    this.renderTarget.setSize(width, height);
  }
}