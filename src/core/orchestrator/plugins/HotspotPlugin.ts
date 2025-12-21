import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type HotspotData = {
  id: string;
  position: THREE.Vector3;
  target?: THREE.Object3D | undefined;
  onClick: () => void;
  visible?: boolean;
};

/**
 * HotspotPlugin
 * 
 * Plugin responsable de gestionar hotspots interactivos en la escena 3D.
 * 
 * Características principales:
 * - Creación, actualización y eliminación dinámica de hotspots mediante diff inteligente.
 * - Soporte para posición fija o seguimiento automático de un target (Object3D).
 * - Billboard automático (siempre orientado hacia la cámara).
 * - Reutilización de geometría y material estáticos para optimizar memoria y draw calls.
 * - Integración completa con el loop centralizado del SceneOrchestrator (preRender).
 * - API reactiva vía update() para cambios en caliente desde componentes React.
 * - Limpieza segura de recursos en dispose() sin afectar instancias compartidas.
 * 
 * Ideal para anotaciones interactivas, puntos de interés o UI 3D superpuesta.
 * 
 * @example
 * new HotspotPlugin([
 *   { id: '1', position: new THREE.Vector3(0, 1, 0), onClick: () => console.log('click') }
 * ])
 */
export class HotspotPlugin implements Plugin {
  public readonly name = 'Hotspot';

  private scene!: THREE.Scene;
  private camera!: THREE.Camera; // Ahora obligatorio (siempre disponible tras install)
  private hotspots = new Map<string, THREE.Mesh>();
  private data: HotspotData[] = [];

  private static readonly geometry = new THREE.SphereGeometry(0.3, 16, 16);
  private static readonly material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
    depthTest: false,
  });

  constructor(initialData: HotspotData[] = []) {
    this.data = initialData;
  }

  install({ scene, camera }: PluginContext): void {
    this.scene = scene;
    this.camera = camera;

    this.syncHotspots();
  }

  preRender(): void {
    if (this.hotspots.size === 0) {return;}

    const cameraPosition = this.camera.position;

    this.hotspots.forEach((mesh) => {
      const target = mesh.userData.target as THREE.Object3D | undefined;

      if (target) {
        target.getWorldPosition(mesh.position);
      }

      mesh.lookAt(cameraPosition);
    });
  }

  update(newData: HotspotData[]): void {
    this.data = newData;
    this.syncHotspots();
  }

  private syncHotspots(): void {
    const nextIds = new Set(this.data.map((h) => h.id));

    this.hotspots.forEach((_, id) => {
      if (!nextIds.has(id)) {
        this.removeHotspot(id);
      }
    });

    this.data.forEach((hotspot) => {
      const existing = this.hotspots.get(hotspot.id);

      if (!existing) {
        this.addHotspot(hotspot);
      } else {
        this.updateHotspot(existing, hotspot);
      }
    });
  }

  private addHotspot(hotspot: HotspotData): void {
    const mesh = new THREE.Mesh(HotspotPlugin.geometry, HotspotPlugin.material);

    mesh.position.copy(hotspot.position);

    mesh.userData.hotspotId = hotspot.id;
    mesh.userData.target = hotspot.target;
    mesh.userData.onClick = hotspot.onClick;

    mesh.visible = hotspot.visible ?? true;

    this.scene.add(mesh);
    this.hotspots.set(hotspot.id, mesh);
  }

  private updateHotspot(mesh: THREE.Mesh, hotspot: HotspotData): void {
    mesh.visible = hotspot.visible ?? true;
    mesh.userData.onClick = hotspot.onClick;
    mesh.userData.target = hotspot.target;

    if (!hotspot.target) {
      mesh.position.copy(hotspot.position);
    }
  }

  private removeHotspot(id: string): void {
    const mesh = this.hotspots.get(id);
    if (!mesh) {return;}

    mesh.parent?.remove(mesh);
    this.hotspots.delete(id);
  }

  dispose(): void {
    this.hotspots.forEach((_, id) => this.removeHotspot(id));
    this.hotspots.clear();
  }
}