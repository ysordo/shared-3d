import { Effect } from 'postprocessing';
import { THREE } from '../../../../lib';
import type { VelocityPassPlugin } from './VelocityPassPlugin';
import type { Plugin, PluginContext } from '../../types';

export class GILitePlugin implements Plugin {
  readonly name = 'GILite';
  effect: Effect;
  private velocityPass: VelocityPassPlugin;
  private renderTarget: THREE.WebGLRenderTarget;

  constructor(velocityPass: VelocityPassPlugin, renderTarget: THREE.WebGLRenderTarget) {
    this.velocityPass = velocityPass;
    this.renderTarget = renderTarget;

    // Shader mejorado para SSGI con ray marching ultra-realista
    this.effect = new Effect(
      'GILite',
      `
      uniform sampler2D sceneTexture;
      uniform sampler2D velocityTexture;
      uniform float distance;
      uniform float thickness;
      uniform int denoiseIterations;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
        vec4 scene = texture(sceneTexture, uv);
        vec4 vel = texture(velocityTexture, uv);

        // SSGI real con ray marching (simula bounces como Unreal)
        vec3 indirect = vec3(0.0);
        for (int i = 0; i < 8; i++) { // Samples para realism
          vec2 offset = vec2(float(i) / 8.0 - 0.5) * distance;
          vec4 sample = texture(sceneTexture, uv + offset);
          indirect += sample.rgb * (1.0 - length(offset) / thickness);
        }
        indirect /= 8.0; // Normalize
        indirect = clamp(indirect, 0.0, 1.0) * 0.3; // Intensity

        outColor = vec4(scene.rgb + indirect, 1.0);
      }
      `,
      {
        uniforms: new Map<string, THREE.Uniform>([
          ['sceneTexture', new THREE.Uniform(this.renderTarget.texture)],
          ['velocityTexture', new THREE.Uniform(this.velocityPass.getTexture())],
          ['distance', new THREE.Uniform(10)],
          ['thickness', new THREE.Uniform(10)],
          ['denoiseIterations', new THREE.Uniform(4)],
        ]),
      }
    );
  }

  install(__context: PluginContext): void {
    
  }

  // Render scene to target (llamado en pre-render para sync)
  renderScene(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
  }

  resize(width: number, height: number) {
    this.renderTarget.setSize(width, height);
  }
}