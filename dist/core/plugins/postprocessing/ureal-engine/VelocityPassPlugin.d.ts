import * as THREE from 'three';
import { WebGLRenderTarget, ShaderMaterial, Mesh, Scene, Camera } from 'three';
import { b as Plugin, P as PluginContext } from '../../../../index-vk5WYF3C.js';
import '../../../loaders/loaders.d.js';
import '../../../cache/types.js';

declare class VelocityPassPlugin implements Plugin {
    private width;
    private height;
    readonly name = "VelocityPass";
    renderTarget: WebGLRenderTarget;
    material: ShaderMaterial;
    sceneQuad: Mesh;
    previousModelViewMatrix: THREE.Matrix4;
    previousProjectionMatrix: THREE.Matrix4;
    constructor(width: number, height: number);
    render(renderer: THREE.WebGLRenderer, scene: Scene, camera: Camera): void;
    install(__context: PluginContext): void;
    getTexture(): THREE.Texture;
    resize(width: number, height: number): void;
    dispose(): void;
}

export { VelocityPassPlugin };
