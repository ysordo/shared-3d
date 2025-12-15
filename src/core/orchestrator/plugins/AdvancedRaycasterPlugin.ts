import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

class RaycasterManager extends THREE.EventDispatcher {
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private scene?: THREE.Scene;
  private camera?: THREE.Camera;
  private domElement: HTMLElement;
  private interactableObjects: THREE.Object3D[] = [];
  private lastHoverObject: THREE.Object3D | null = null;
  private isEnabled = false;
  private isDragging = false;
  private currentDragObject: THREE.Object3D | null = null;
  private dragStartPosition = new THREE.Vector2();
  private lastRaycastTime = 0;
  private raycastThrottleMs = 16;

  constructor(domElement: HTMLElement) {
    super();
    this.domElement = domElement;

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  setModel(model: THREE.Object3D) {
    this.interactableObjects = [];
    model.traverse((obj) => {
      if (this.isInteractable(obj)) {
        this.interactableObjects.push(obj);
      }
    });
  }

  private isInteractable(obj: THREE.Object3D): boolean {
    if (!obj.visible) {return false;}
    if (obj.userData.isNotRaycaster) {return false;}
    if (!(obj instanceof THREE.Mesh)) {return false;}
    return true;
  }

  initialize(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.camera = camera;
  }

  setEnabled(enabled: boolean) {
    if (this.isEnabled === enabled) {return;}
    this.isEnabled = enabled;
    enabled ? this.attachEvents() : this.detachEvents();
  }

  private attachEvents() {
    const el = this.domElement;
    el.addEventListener('pointermove', this.onPointerMove, { passive: true });
    el.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    el.addEventListener('pointerup', this.onPointerUp, { passive: true });
    el.addEventListener('click', this.onClick, { passive: true });
    el.addEventListener('contextmenu', this.onContextMenu);
    el.style.cursor = 'pointer';
  }

  private detachEvents() {
    const el = this.domElement;
    el.removeEventListener('pointermove', this.onPointerMove);
    el.removeEventListener('pointerdown', this.onPointerDown);
    el.removeEventListener('pointerup', this.onPointerUp);
    el.removeEventListener('click', this.onClick);
    el.removeEventListener('contextmenu', this.onContextMenu);
    el.style.cursor = 'default';
    this.clearHoverState();
  }

  private onPointerMove(e: PointerEvent) {
    if (!this.isEnabled || !this.scene || !this.camera) {return;}
    this.updatePointer(e);
    this.isDragging && this.currentDragObject ? this.handleDrag(e) : this.throttledRaycast();
  }

  private onPointerDown(e: PointerEvent) {
    if (!this.isEnabled || e.button !== 0) {return;}
    this.updatePointer(e);
    const hit = this.performRaycast()[0];
    if (hit) {
      this.isDragging = true;
      this.currentDragObject = hit.object;
      this.dragStartPosition.set(e.clientX, e.clientY);
      this.dispatchEvent({ type: 'objectdragstart', object: hit.object, startPosition: this.dragStartPosition.clone() } as never);
    }
  }

  private onPointerUp(e: PointerEvent) {
    if (!this.isEnabled || !this.isDragging) {return;}
    const endPos = new THREE.Vector2(e.clientX, e.clientY);
    this.dispatchEvent({
      type: 'objectdragend',
      object: this.currentDragObject!,
      startPosition: this.dragStartPosition.clone(),
      endPosition: endPos,
      totalDelta: endPos.clone().sub(this.dragStartPosition),
    } as never);
    this.isDragging = false;
    this.currentDragObject = null;
  }

  private onClick(e: MouseEvent) {
    if (!this.isEnabled || this.isDragging) {return;}
    this.updatePointer(e as PointerEvent);
    const hit = this.performRaycast()[0];
    if (hit) {
      this.dispatchEvent({ type: 'objectclick', object: hit.object, point: hit.point, distance: hit.distance } as never);
    }
  }

  private handleDrag(e: PointerEvent) {
    const current = new THREE.Vector2(e.clientX, e.clientY);
    const delta = current.clone().sub(this.dragStartPosition);
    this.dispatchEvent({
      type: 'objectdrag',
      object: this.currentDragObject!,
      delta,
      normalizedDelta: new THREE.Vector2(delta.x / this.domElement.clientWidth, delta.y / this.domElement.clientHeight),
    } as never);
    this.dragStartPosition.copy(current);
  }

  private throttledRaycast() {
    const now = Date.now();
    if (now - this.lastRaycastTime < this.raycastThrottleMs) {return;}
    this.lastRaycastTime = now;
    this.raycast();
  }

  private raycast() {
    if (!this.scene || !this.camera) {return;}
    const hits = this.performRaycast();
    const hit = hits?.[0] || null;
    if(hit){
      const current = hit.object || null;
      if (current !== this.lastHoverObject) {
        if (this.lastHoverObject) {
          this.dispatchEvent({ type: 'objecthoverout', object: this.lastHoverObject } as never);
        }
        if (current) {
          this.dispatchEvent({ type: 'objecthoverin', object: current, point: hit.point, distance: hit.distance } as never);
        }
        this.lastHoverObject = current;
      }
  
      if (current) {
        this.dispatchEvent({ type: 'objecthovermove', object: current, point: hit.point, distance: hit.distance } as never);
      }
    }
  }

  private performRaycast(): { object: THREE.Object3D; point: THREE.Vector3; distance: number }[] {
    if (!this.scene || !this.camera) {return [];}
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactableObjects, true);
    return intersects
      .filter(i => !i.object.name.endsWith('-wireframe'))
      .slice(0, 1)
      .map(i => ({ object: i.object, point: i.point, distance: i.distance }));
  }

  private updatePointer(e: PointerEvent) {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private clearHoverState() {
    if (this.lastHoverObject) {
      this.dispatchEvent({ type: 'objecthoverout', object: this.lastHoverObject } as never);
      this.lastHoverObject = null;
    }
  }

  private onContextMenu = (e: Event) => e.preventDefault();
  private onTouchStart = this.onPointerDown as ((e: PointerEvent)=> void);
  private onTouchMove = this.onPointerMove as ((e: PointerEvent)=> void);
  private onTouchEnd = this.onPointerUp as ((e: PointerEvent)=> void);
}

export class AdvancedRaycasterPlugin implements Plugin {
  name = 'AdvancedRaycaster';
  private _manager!: RaycasterManager;

  constructor(
    private model: THREE.Object3D,
    private onEvent?: (event: unknown) => void
  ) {}

  install({ scene, camera, renderer }: PluginContext): void {
    this._manager = new RaycasterManager(renderer.domElement);
    this._manager.initialize(scene, camera);

    if (this.model) {
      this._manager.setModel(this.model);
    }

    const events: string[] = [
      'objectclick',
      'objecthoverin',
      'objecthoverout',
      'objecthovermove',
      'objectdragstart',
      'objectdrag',
      'objectdragend',
    ] as const;

    events.forEach((event) => {
      this._manager.addEventListener(event as never, (e: unknown) => this.onEvent?.(e));
    });

  }

  setEnabled(enable: boolean) {
    this._manager.setEnabled(enable);
  }
  dispose(): void { this._manager.setEnabled(false); }

  get manager(): RaycasterManager { return this._manager; }
}