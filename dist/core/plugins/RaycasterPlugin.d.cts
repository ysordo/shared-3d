import { b as Plugin, P as PluginContext } from '../../index-BbV6Hzfa.cjs';
import * as THREE from 'three';
import '../loaders/loaders.d.cjs';
import '../cache/types.cjs';

type RaycasterEvent = {
    type: 'click';
    object: THREE.Object3D;
    point: THREE.Vector3;
} | {
    type: 'hover';
    object: THREE.Object3D;
    point: THREE.Vector3;
} | {
    type: 'leave';
    object: THREE.Object3D;
};
type RaycasterConfig = {
    /** Habilitar/deshabilitar el raycasting */
    enabled?: boolean;
    /** Objetos específicos a intersectar (si no se proporciona, usa scene.children) */
    objects?: THREE.Object3D[];
    /** Callback para eventos de interacción */
    onEvent?: (event: RaycasterEvent) => void;
};
/**
 * RaycasterPlugin
 *
 * Plugin básico de raycasting para detección simple de hover y click sobre objetos 3D.
 *
 * Características principales:
 * - Eventos: hover (enter), hover (move implícito), leave y click con punto de intersección.
 * - Soporte para lista de objetos específica o fallback a toda la escena.
 * - Configuración en caliente (enabled, objects, onEvent) sin recrear listeners.
 * - Integración event-driven (pointermove + click) → sin RAF propio, compatible con loop centralizado.
 * - Limpieza segura de listeners y estado hover en dispose().
 * - Optimizado para bajo overhead: un único raycast por pointermove.
 *
 * Ideal para interacciones básicas (selección, tooltips simples) cuando no se necesita drag
 * ni funcionalidades avanzadas (ver AdvancedRaycasterPlugin para drag, throttling, etc.).
 *
 * @example
 * new RaycasterPlugin({
 *   enabled: true,
 *   onEvent: (event) => {
 *     if (event.type === 'click') console.log('Clicked:', event.object);
 *   }
 * })
 */
declare class RaycasterPlugin implements Plugin {
    readonly name = "Raycaster";
    private scene;
    private camera;
    private dom;
    private enabled;
    private objects;
    private onEvent;
    private hovered;
    private readonly raycaster;
    private readonly pointer;
    private readonly onPointerMove;
    private readonly onClick;
    constructor(config?: RaycasterConfig);
    install({ scene, camera, renderer }: PluginContext): void;
    private handlePointerMove;
    private handleClick;
    private checkIntersection;
    private getIntersection;
    private updatePointer;
    update(config: Partial<RaycasterConfig>): void;
    setEnabled(enabled: boolean): void;
    dispose(): void;
}

export { type RaycasterConfig, type RaycasterEvent, RaycasterPlugin };
