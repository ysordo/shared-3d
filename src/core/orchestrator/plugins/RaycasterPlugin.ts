import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type RaycasterEvent =
  | { type: 'click'; object: THREE.Object3D; point: THREE.Vector3 }
  | { type: 'hover'; object: THREE.Object3D; point: THREE.Vector3 }
  | { type: 'leave'; object: THREE.Object3D };

export class RaycasterPlugin implements Plugin {
  name = 'Raycaster';
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private hovered: THREE.Object3D | null = null;
  private onEvent?: (event: RaycasterEvent) => void;

  constructor(onEvent?: (event: RaycasterEvent) => void) {
    this.onEvent = onEvent ?? (() => {});
  }

  install({ scene, camera, renderer }: PluginContext): void {
    const dom = renderer.domElement;

    const onPointerMove = (e: MouseEvent) => {
      this.pointer.x = (e.clientX / dom.clientWidth) * 2 - 1;
      this.pointer.y = -(e.clientY / dom.clientHeight) * 2 + 1;
      this.checkIntersection(scene, camera);
    };

    const onClick = (e: MouseEvent) => {
      this.pointer.x = (e.clientX / dom.clientWidth) * 2 - 1;
      this.pointer.y = -(e.clientY / dom.clientHeight) * 2 + 1;
      const intersect = this.getIntersection(scene, camera);
      if (intersect) {
        this.onEvent?.({ type: 'click', object: intersect.object, point: intersect.point });
      }
    };

    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('click', onClick);

    this.dispose = () => {
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('click', onClick);
      this.hovered = null;
    };
  }

  private checkIntersection(scene: THREE.Scene, camera: THREE.Camera) {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);

    const hit = intersects[0];
    if (hit && hit.object !== this.hovered) {
      if (this.hovered) {
        this.onEvent?.({ type: 'leave', object: this.hovered });
      }
      this.hovered = hit.object;
      this.onEvent?.({ type: 'hover', object: hit.object, point: hit.point });
    } else if (!hit && this.hovered) {
      this.onEvent?.({ type: 'leave', object: this.hovered });
      this.hovered = null;
    }
  }

  private getIntersection(scene: THREE.Scene, camera: THREE.Camera) {
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    return intersects[0] || null;
  }

  dispose(): void { }
}