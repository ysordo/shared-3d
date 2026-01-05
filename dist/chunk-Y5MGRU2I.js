import {
  VelocityShader
} from "./chunk-OGRDXHNW.js";

// src/core/plugins/postprocessing/ureal-engine/VelocityPassPlugin.ts
import * as THREE from "three";
import { ShaderMaterial, WebGLRenderTarget, Mesh, PlaneGeometry } from "three";
var VelocityPassPlugin = class {
  renderTarget;
  material;
  sceneQuad;
  previousModelViewMatrix = new THREE.Matrix4();
  previousProjectionMatrix = new THREE.Matrix4();
  constructor(width, height) {
    this.renderTarget = new WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false
    });
    this.material = new ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(VelocityShader.uniforms),
      vertexShader: VelocityShader.vertexShader,
      fragmentShader: VelocityShader.fragmentShader
    });
    const plane = new PlaneGeometry(2, 2);
    this.sceneQuad = new Mesh(plane, this.material);
  }
  render(renderer, scene, camera) {
    this.material.uniforms.previousModelViewMatrix.value = this.previousModelViewMatrix;
    this.material.uniforms.previousProjectionMatrix.value = this.previousProjectionMatrix;
    this.material.uniforms.modelViewMatrix.value = camera.matrixWorldInverse;
    this.material.uniforms.projectionMatrix.value = camera.projectionMatrix;
    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.sceneQuad, camera);
    renderer.setRenderTarget(null);
    this.previousModelViewMatrix.copy(camera.matrixWorldInverse);
    this.previousProjectionMatrix.copy(camera.projectionMatrix);
  }
  getTexture() {
    return this.renderTarget.texture;
  }
  resize(width, height) {
    this.renderTarget.setSize(width, height);
  }
  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
    this.sceneQuad.geometry.dispose();
  }
};

export {
  VelocityPassPlugin
};
