import * as THREE from 'three';
import { WebGLRenderTarget, ShaderMaterial, Mesh, Scene, Camera } from 'three';

declare class VelocityPassPlugin {
    renderTarget: WebGLRenderTarget;
    material: ShaderMaterial;
    sceneQuad: Mesh;
    previousModelViewMatrix: THREE.Matrix4;
    previousProjectionMatrix: THREE.Matrix4;
    constructor(width: number, height: number);
    render(renderer: THREE.WebGLRenderer, scene: Scene, camera: Camera): void;
    getTexture(): THREE.Texture;
    resize(width: number, height: number): void;
    dispose(): void;
}

export { VelocityPassPlugin };
