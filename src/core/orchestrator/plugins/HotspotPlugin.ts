import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

type HotspotData = {
  id: string;
  position: THREE.Vector3;
  target?: THREE.Object3D | undefined;
  onClick: () => void;
};

export class HotspotPlugin implements Plugin {
  name = 'Hotspot';
  private hotspots = new Map<string, THREE.Mesh>();

  constructor(private data: HotspotData[]) {}

  install({ scene }: PluginContext): void {
    this.data.forEach(hotspot => {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(hotspot.position);
      if (hotspot.target) {mesh.userData.target = hotspot.target;}
      mesh.userData.hotspotId = hotspot.id;
      mesh.userData.onClick = hotspot.onClick;

      scene.add(mesh);
      this.hotspots.set(hotspot.id, mesh);
    });
  }

  dispose(): void {
    this.hotspots.forEach(mesh => {
      if (mesh.parent) {mesh.parent.remove(mesh);}
      mesh.geometry.dispose();
      if(Array.isArray(mesh.material)) {
        mesh.material.forEach(mat => mat.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.hotspots.clear();
  }
}