import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type RaycasterEvent =
  | { type: 'click'; object: THREE.Object3D; point: THREE.Vector3 }
  | { type: 'hover'; object: THREE.Object3D; point: THREE.Vector3 }
  | { type: 'leave'; object: THREE.Object3D };

  type RaycasterConfig = {
  enabled?: boolean | undefined;
  objects?: THREE.Object3D[] | undefined;
  onEvent?: (event: RaycasterEvent) => void | undefined;
};

export class RaycasterPlugin implements Plugin {
  name = 'Raycaster';

  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private hovered: THREE.Object3D | null = null;

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private dom!: HTMLElement;

  private enabled = true;
  private objects: THREE.Object3D[] = [];
  private onEvent: (event: RaycasterEvent) => void = () => {};

  /* =========================
   *  Constructor
   * ========================= */
  constructor(config?: RaycasterConfig) {
    if (config?.objects) {this.objects = config.objects;}
    if (config?.onEvent) {this.onEvent = config.onEvent;}
    if (config?.enabled !== undefined) {this.enabled = config.enabled;}
  }

  /* =========================
   *  Install
   * ========================= */
  install({ scene, camera, renderer }: PluginContext): void {
    this.scene = scene;
    this.camera = camera;
    this.dom = renderer.domElement;

    this.dom.addEventListener('pointermove', this.onPointerMove);
    this.dom.addEventListener('click', this.onClick);
  }

  /* =========================
   *  Events
   * ========================= */
  private onPointerMove = (e: PointerEvent) => {
    if (!this.enabled) {return;}
    this.updatePointer(e);
    this.checkIntersection();
  };

  private onClick = (e: PointerEvent) => {
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
  };

  /* =========================
   *  Raycast logic
   * ========================= */
  private checkIntersection() {
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
    }

    if (!hit && this.hovered) {
      this.onEvent({ type: 'leave', object: this.hovered });
      this.hovered = null;
    }
  }

  private getIntersection() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const targets = this.objects.length ? this.objects : this.scene.children;
    const hits = this.raycaster.intersectObjects(targets, true);
    return hits[0] || null;
  }

  private updatePointer(e: PointerEvent) {
    const rect = this.dom.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  /* =========================
   *  Updates
   * ========================= */
  update(config: {
    objects?: THREE.Object3D[] | undefined;
    onEvent?: (event: RaycasterEvent) => void | undefined;
    enabled?: boolean | undefined;
  }) {
    if (config.objects) {this.objects = config.objects;}
    if (config.onEvent) {this.onEvent = config.onEvent;}
    if (config.enabled !== undefined) {this.enabled = config.enabled;}

    if (!this.enabled && this.hovered) {
      this.onEvent({ type: 'leave', object: this.hovered });
      this.hovered = null;
    }
  }

  setEnabled(enabled: boolean) {
    this.update({ enabled });
  }

  /* =========================
   *  Dispose
   * ========================= */
  dispose(): void {
    this.dom.removeEventListener('pointermove', this.onPointerMove);
    this.dom.removeEventListener('click', this.onClick);
    this.hovered = null;
  }
}
