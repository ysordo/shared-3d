import { SSAOEffect, NormalPass } from 'postprocessing';
import type { THREE } from '../../../../lib';

export class AOPlugin {
  effect: SSAOEffect;
  private normalPass: NormalPass;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    // NormalPass para capturar normales de la escena
    this.normalPass = new NormalPass(scene, camera);
    this.normalPass.setSize(renderer.domElement.width, renderer.domElement.height);

    // SSAOEffect moderno
    this.effect = new SSAOEffect(camera, this.normalPass.getDepthTexture(), {
      intensity: 1.3,          // Fuerza del AO
      radius: 5.0,             // Radio de influencia
      luminanceInfluence: 0.5, // Cómo afecta la luz ambiental
      bias: 0.025,             // Evita artefactos
      samples: 16,             // Cantidad de samples
    });
  }

  resize(width: number, height: number) {
    this.normalPass.setSize(width, height);
    this.effect.setSize(width, height);
  }

  // Este método se llama antes del render principal para actualizar el normalPass
  preRender(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    renderer.setRenderTarget(null);
    this.normalPass.render(renderer, null, null);
  }
}
