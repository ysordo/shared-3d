import { Effect } from 'postprocessing';
import { VelocityPassPlugin } from './VelocityPassPlugin.js';
import { WebGLRenderTarget } from 'three';

declare class MotionBlurPlugin {
    effect: Effect;
    private velocityPass;
    private intensity;
    private renderTarget;
    constructor(velocityPass: VelocityPassPlugin, intensity?: number);
    /** Permite actualizar intensidad en tiempo real */
    setIntensity(intensity: number): void;
    /** Debe llamarse antes de renderizar el efecto, con la textura de la escena actual */
    updateSceneTexture(texture: WebGLRenderTarget): void;
    /** Ajusta tamaño del render target */
    resize(width: number, height: number): void;
}

export { MotionBlurPlugin };
