// core/post/GILitePlugin.ts
import { Effect, } from 'postprocessing';
import { THREE } from '../../../../lib';
import type { VelocityPassPlugin } from './VelocityPassPlugin';
import { Uniform, WebGLRenderTarget } from 'three';

export class GILitePlugin {
  effect: Effect;
  private velocityPass: VelocityPassPlugin;
  private renderTarget: WebGLRenderTarget;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, velocityPass: VelocityPassPlugin, renderer: THREE.WebGLRenderer) {
    this.velocityPass = velocityPass;

    // RenderTarget para escena (profundidad + color)
    this.renderTarget = new WebGLRenderTarget(renderer.domElement.width, renderer.domElement.height, {
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: true,
    });
    this.renderTarget.texture.name = 'GILiteScene';

    // Effect que hace screen-space GI
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
        vec2 vel = texture(velocityTexture, uv).rg * 2.0 - 1.0;

        // placeholder simple de SSGI
        vec3 indirect = scene.rgb * 0.3;
        outColor = vec4(scene.rgb + indirect, 1.0);
      }
      `,
      {
        uniforms: new Map<string, Uniform<any>>([
          ['sceneTexture', new Uniform(this.renderTarget.texture)],
          ['velocityTexture', new Uniform(this.velocityPass.getTexture())],
          ['distance', new Uniform(10)],
          ['thickness', new Uniform(10)],
          ['denoiseIterations', new Uniform(4)],
        ]),
      }
    );
  }

  // Llamar antes del post-process: renderizamos la escena a nuestro renderTarget
  renderScene(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
  }

  resize(width: number, height: number) {
    this.renderTarget.setSize(width, height);
  }
}
