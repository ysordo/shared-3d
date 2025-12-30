import { b as Plugin, C as ConfigToTuple, P as PluginContext } from '../../index-vk5WYF3C.js';
import '../loaders/loaders.d.js';
import 'three';
import '../cache/types.js';

interface PluginConfig {
    distanceThreshold?: number;
    pushBackOffset?: number;
    smooth?: number;
}
/**
 * AdvancedCameraCollisionPlugin
 *
 * Plugin avanzado de prevención de colisiones para la cámara en escenas 3D.
 *
 * Características principales:
 * - Evita que la cámara atraviese el modelo activo mediante raycasting multidireccional.
 * - Comprueba colisión frontal (visión) + 6 direcciones laterales para un "empuje" natural.
 * - Configurable: distancia de detección, offset de retroceso y factor de suavizado (lerp).
 * - Totalmente integrado con el loop centralizado del SceneOrchestrator mediante preRender().
 * - Soporte para actualización en caliente de parámetros sin recrear la instancia.
 * - Limpieza segura de recursos en dispose() (cancelación del frame anterior si existiera).
 *
 * Ideal para experiencias de navegación inmersiva (orbit controls + colisión realista)
 * sin necesidad de física externa.
 *
 * @example
 * new AdvancedCameraCollisionPlugin({
 *   distanceThreshold: 0.8,
 *   pushBackOffset: 0.2,
 *   smooth: 0.15
 * })
 */
declare class AdvancedCameraCollisionPlugin implements Plugin {
    readonly name = "AdvancedCameraCollision";
    distanceThreshold: number;
    pushBackOffset: number;
    smooth: number;
    private camera;
    private orchestrator;
    private readonly dir;
    private readonly raycaster;
    private readonly targetPos;
    private readonly forward;
    private readonly candidate;
    constructor(...[distanceThreshold, pushBackOffset, smooth]: Partial<ConfigToTuple<PluginConfig, ['distanceThreshold', 'pushBackOffset', 'smooth']>>);
    install({ camera, orchestrator }: PluginContext): void;
    preRender(): void;
    private checkAndPush;
    update(config: {
        distanceThreshold?: number;
        pushBackOffset?: number;
        smooth?: number;
    }): void;
    dispose(): void;
}

export { AdvancedCameraCollisionPlugin };
