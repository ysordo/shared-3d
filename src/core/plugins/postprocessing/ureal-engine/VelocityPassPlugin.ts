import * as THREE from 'three';
import type { Scene, Camera } from 'three';
import { ShaderMaterial, WebGLRenderTarget, Mesh, PlaneGeometry } from 'three';
import { VelocityShader } from './VelocityShader';

export class VelocityPassPlugin {
  renderTarget: WebGLRenderTarget;
  material: ShaderMaterial;
  sceneQuad: Mesh;

  previousModelViewMatrix = new THREE.Matrix4();
  previousProjectionMatrix = new THREE.Matrix4();

  constructor(width: number, height: number) {
    this.renderTarget = new WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
    });

    this.material = new ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(VelocityShader.uniforms),
      vertexShader: VelocityShader.vertexShader,
      fragmentShader: VelocityShader.fragmentShader,
    });

    const plane = new PlaneGeometry(2, 2);
    this.sceneQuad = new Mesh(plane, this.material);
  }

  render(renderer: THREE.WebGLRenderer, scene: Scene, camera: Camera) {
    this.material.uniforms.previousModelViewMatrix!.value = this.previousModelViewMatrix;
    this.material.uniforms.previousProjectionMatrix!.value = this.previousProjectionMatrix;
    this.material.uniforms.modelViewMatrix!.value = camera.matrixWorldInverse;
    this.material.uniforms.projectionMatrix!.value = camera.projectionMatrix;

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.sceneQuad, camera);
    renderer.setRenderTarget(null);

    this.previousModelViewMatrix.copy(camera.matrixWorldInverse);
    this.previousProjectionMatrix.copy(camera.projectionMatrix);
  }

  getTexture() {
    return this.renderTarget.texture;
  }

  resize(width: number, height: number) {
    this.renderTarget.setSize(width, height);
  }

  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
    this.sceneQuad.geometry.dispose();
  }
}
