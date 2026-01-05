// src/core/plugins/postprocessing/ureal-engine/AOPlugin.ts
import { SSAOEffect, NormalPass } from "postprocessing";
var AOPlugin = class {
  effect;
  normalPass;
  constructor(scene, camera, renderer) {
    this.normalPass = new NormalPass(scene, camera);
    this.normalPass.setSize(renderer.domElement.width, renderer.domElement.height);
    this.effect = new SSAOEffect(camera, this.normalPass.getDepthTexture(), {
      intensity: 1.3,
      // Fuerza del AO
      radius: 5,
      // Radio de influencia
      luminanceInfluence: 0.5,
      // Cómo afecta la luz ambiental
      bias: 0.025,
      // Evita artefactos
      samples: 16
      // Cantidad de samples
    });
  }
  resize(width, height) {
    this.normalPass.setSize(width, height);
    this.effect.setSize(width, height);
  }
  // Este método se llama antes del render principal para actualizar el normalPass
  preRender(renderer, scene, camera) {
    renderer.setRenderTarget(null);
    this.normalPass.render(renderer, null, null);
  }
};

export {
  AOPlugin
};
