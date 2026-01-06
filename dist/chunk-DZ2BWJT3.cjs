"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } var _class;

var _chunkDXOJA6J4cjs = require('./chunk-DXOJA6J4.cjs');

// src/core/plugins/postprocessing/ureal-engine/VelocityPassPlugin.ts
var _three = require('three'); var THREE = _interopRequireWildcard(_three);

var VelocityPassPlugin = (_class = class {
  constructor(width, height) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.width = width;
    this.height = height;
  }
  __init() {this.name = "VelocityPass"}
  
  
  
  __init2() {this.previousModelViewMatrix = new THREE.Matrix4()}
  __init3() {this.previousProjectionMatrix = new THREE.Matrix4()}
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
  install(__context) {
    this.renderTarget = new (0, _three.WebGLRenderTarget)(this.width, this.height, {
      type: THREE.HalfFloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false
    });
    this.material = new (0, _three.ShaderMaterial)({
      uniforms: THREE.UniformsUtils.clone(_chunkDXOJA6J4cjs.VelocityShader.uniforms),
      vertexShader: _chunkDXOJA6J4cjs.VelocityShader.vertexShader,
      fragmentShader: _chunkDXOJA6J4cjs.VelocityShader.fragmentShader,
      transparent: true
      // Para skeletal support
    });
    const plane = new (0, _three.PlaneGeometry)(2, 2);
    this.sceneQuad = new (0, _three.Mesh)(plane, this.material);
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
}, _class);



exports.VelocityPassPlugin = VelocityPassPlugin;
