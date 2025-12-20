import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type HotspotData = {
  id: string;
  position: THREE.Vector3;
  target?: THREE.Object3D;
  onClick: () => void;
  visible?: boolean;
};

export class HotspotPlugin implements Plugin {
  name = 'Hotspot';

  private scene!: THREE.Scene;
  private camera?: THREE.Camera;
  private hotspots = new Map<string, THREE.Mesh>();
  private data: HotspotData[];

  private _rafId: number | null = null;

  constructor(data: HotspotData[]) {
    this.data = data;
  }

  install({ scene, camera }: PluginContext): void {
    this.scene = scene;
    this.camera = camera;

    this.syncHotspots();
    this.startLoop();
  }

  /* ============================
   *  Hot update API
   * ============================ */
  update(data: HotspotData[]) {
    this.data = data;
    this.syncHotspots();
  }

  /* ============================
   *  Sync logic
   * ============================ */
  private syncHotspots() {
    const nextIds = new Set(this.data.map(h => h.id));

    // Remove
    this.hotspots.forEach((_, id) => {
      if (!nextIds.has(id)) {
        this.removeHotspot(id);
      }
    });

    // Add / Update
    this.data.forEach(hotspot => {
      if (!this.hotspots.has(hotspot.id)) {
        this.addHotspot(hotspot);
      } else {
        this.updateHotspot(hotspot);
      }
    });
  }

  private addHotspot(hotspot: HotspotData) {
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(hotspot.position);

    mesh.userData.hotspotId = hotspot.id;
    mesh.userData.target = hotspot.target;
    mesh.userData.onClick = hotspot.onClick;

    mesh.visible = hotspot.visible ?? true;

    this.scene.add(mesh);
    this.hotspots.set(hotspot.id, mesh);
  }

  private updateHotspot(hotspot: HotspotData) {
    const mesh = this.hotspots.get(hotspot.id)!;

    mesh.visible = hotspot.visible ?? true;
    mesh.userData.onClick = hotspot.onClick;
    mesh.userData.target = hotspot.target;

    if (!hotspot.target) {
      mesh.position.copy(hotspot.position);
    }
  }

  private removeHotspot(id: string) {
    const mesh = this.hotspots.get(id)!;

    mesh.parent?.remove(mesh);
    mesh.geometry.dispose();

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(m => m.dispose());
    } else {
      mesh.material.dispose();
    }

    this.hotspots.delete(id);
  }

  /* ============================
   *  Loop (vida infinita)
   * ============================ */
  private startLoop() {
    const loop = () => {
      this.hotspots.forEach(mesh => {
        const target = mesh.userData.target as THREE.Object3D | undefined;
        if (target) {
          target.getWorldPosition(mesh.position);
        }

        // Opcional: siempre mirar a cámara
        if (this.camera) {
          mesh.lookAt(this.camera.position);
        }
      });

      this._rafId = requestAnimationFrame(loop);
    };

    loop();
  }

  dispose(): void {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    this.hotspots.forEach((_, id) => this.removeHotspot(id));
    this.hotspots.clear();
  }
}
