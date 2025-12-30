import type { Plugin, PluginContext } from './types';
import { THREE } from '../../lib';

export type RaycasterEvent =
  | { type: 'click'; object: THREE.Object3D; point: THREE.Vector3 }
  | { type: 'hover'; object: THREE.Object3D; point: THREE.Vector3 }
  | { type: 'leave'; object: THREE.Object3D };

export type RaycasterConfig = {
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
export class RaycasterPlugin implements Plugin {
  public readonly name = 'Raycaster';

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private dom!: HTMLElement;

  private enabled = true;
  private objects: THREE.Object3D[] = [];
  private onEvent: (event: RaycasterEvent) => void = () => {};

  private hovered: THREE.Object3D | null = null;

  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();

  private readonly onPointerMove: (e: PointerEvent) => void;
  private readonly onClick: (e: PointerEvent) => void;

  constructor(config?: RaycasterConfig) {
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onClick = this.handleClick.bind(this);

    if (config) {
      if (config.objects) {this.objects = config.objects;}
      if (config.onEvent) {this.onEvent = config.onEvent;}
      if (config.enabled !== undefined) {this.enabled = config.enabled;}
    }
  }

  install({ scene, camera, renderer }: PluginContext): void {
    this.scene = scene;
    this.camera = camera;
    this.dom = renderer.domElement;

    this.dom.addEventListener('pointermove', this.onPointerMove, { passive: true });
    this.dom.addEventListener('click', this.onClick, { passive: true });
  }

  private handlePointerMove(e: PointerEvent): void {
    if (!this.enabled) {return;}

    this.updatePointer(e);
    this.checkIntersection();
  }

  private handleClick(e: PointerEvent): void {
    if (!this.enabled) {return;}

    this.updatePointer(e);

    const hit = this.getIntersection();
    if (hit) {
      this.onEvent({
        type: 'click',
        object: hit.object,
        point: hit.point,
      });
    }
  }

  private checkIntersection(): void {
    const hit = this.getIntersection();

    if (hit && hit.object !== this.hovered) {
      if (this.hovered) {
        this.onEvent({ type: 'leave', object: this.hovered });
      }

      this.hovered = hit.object;
      this.onEvent({
        type: 'hover',
        object: hit.object,
        point: hit.point,
      });
    } else if (!hit && this.hovered) {
      this.onEvent({ type: 'leave', object: this.hovered });
      this.hovered = null;
    }
  }

  private getIntersection(): { object: THREE.Object3D; point: THREE.Vector3 } | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const targets = this.objects.length > 0 ? this.objects : this.scene.children;
    const intersects = this.raycaster.intersectObjects(targets, true);

    if (intersects.length === 0) {return null;}

    return {
      object: intersects[0]!.object,
      point: intersects[0]!.point,
    };
  }

  private updatePointer(e: PointerEvent): void {
    const rect = this.dom.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  update(config: Partial<RaycasterConfig>): void {
    if (config.objects !== undefined) {
      this.objects = config.objects;
    }
    if (config.onEvent !== undefined) {
      this.onEvent = config.onEvent;
    }
    if (config.enabled !== undefined) {
      this.enabled = config.enabled;

      if (!this.enabled && this.hovered) {
        this.onEvent({ type: 'leave', object: this.hovered });
        this.hovered = null;
      }
    }
  }

  setEnabled(enabled: boolean): void {
    this.update({ enabled });
  }

  dispose(): void {
    this.dom.removeEventListener('pointermove', this.onPointerMove);
    this.dom.removeEventListener('click', this.onClick);

    if (this.hovered) {
      this.onEvent({ type: 'leave', object: this.hovered });
      this.hovered = null;
    }
  }
}