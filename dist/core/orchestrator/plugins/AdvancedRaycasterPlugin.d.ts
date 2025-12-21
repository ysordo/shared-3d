import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BwV_edbe.js';
import * as THREE from 'three';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';

/**
 * AdvancedRaycasterPlugin
 *
 * Plugin avanzado de raycasting interactivo para detección precisa de eventos en objetos 3D.
 *
 * Características principales:
 * - Soporte completo para click, hover (in/out/move) y drag (start/drag/end) sobre meshes interactivos.
 * - Filtrado inteligente: ignora objetos no visibles, con userData.isNotRaycaster o no meshes.
 * - Throttling configurable en hover para optimizar rendimiento en escenas densas.
 * - Detección de drag con delta normalizado y posiciones absolutas.
 * - Integración total con eventos nativos del DOM (no requiere loop centralizado).
 * - API reactiva: actualización en caliente de modelo y callback de eventos sin recrear la instancia.
 * - Gestión automática de listeners (attach/detach) según estado enabled.
 * - Limpieza segura en dispose() y prevención de context menu en drag.
 *
 * Ideal para selección de partes, UI 3D interactiva, arrastrar objetos o feedback visual avanzado.
 *
 * @example
 * new AdvancedRaycasterPlugin(model, (event) => {
 *   if (event.type === 'objectclick') console.log('Clicked:', event.object);
 * })
 */
declare class AdvancedRaycasterPlugin implements Plugin {
    readonly name = "AdvancedRaycaster";
    private _manager;
    private model;
    private onEvent?;
    constructor(initialModel?: THREE.Object3D | null, initialOnEvent?: (event: unknown) => void);
    install({ scene, camera, renderer }: PluginContext): void;
    setEnabled(enabled: boolean): void;
    update(newModel: THREE.Object3D | null, newOnEvent?: (event: unknown) => void): void;
    dispose(): void;
    get manager(): RaycasterManager;
}
declare class RaycasterManager extends THREE.EventDispatcher {
    private raycaster;
    private pointer;
    private scene?;
    private camera?;
    private domElement;
    private interactableObjects;
    private lastHoverObject;
    private isEnabled;
    private isDragging;
    private currentDragObject;
    private dragStartPosition;
    private lastRaycastTime;
    private raycastThrottleMs;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
    constructor(domElement: HTMLElement);
    setModel(model: THREE.Object3D): void;
    private isInteractable;
    initialize(scene: THREE.Scene, camera: THREE.Camera): void;
    setEnabled(enabled: boolean): void;
    private attachEvents;
    private detachEvents;
    private onPointerMove;
    private onPointerDown;
    private onPointerUp;
    private onClick;
    private handleDrag;
    private throttledRaycast;
    private raycast;
    private performRaycast;
    private updatePointer;
    private clearHoverState;
    private onContextMenu;
}

export { AdvancedRaycasterPlugin };
