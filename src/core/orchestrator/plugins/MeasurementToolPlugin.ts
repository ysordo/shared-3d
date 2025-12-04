import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type MeasurementEvent = {
  point: THREE.Vector3;
  distance?: number;
  points: THREE.Vector3[];
};

export class MeasurementToolPlugin implements Plugin {
  name = 'MeasurementTool';
  private points: THREE.Vector3[] = [];
  private line?: THREE.Line | undefined;
  private spheres: THREE.Mesh[] = [];
  private onMeasure?: (event: MeasurementEvent) => void;

  constructor(onMeasure?: (event: MeasurementEvent) => void) {
    this.onMeasure = onMeasure ?? (()=>{});
  }

  install({ scene, camera, renderer, orchestrator }: PluginContext): void {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) {return;}

      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const model = orchestrator.getActiveModel();
      if (!model) {return;}

      const intersects = raycaster.intersectObject(model, true);
      if (intersects.length === 0) {return;}

      const point = (intersects[0] as THREE.Intersection).point.clone();
      this.points.push(point);

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      sphere.position.copy(point);
      scene.add(sphere);
      this.spheres.push(sphere);

      this.onMeasure?.({ point, points: [...this.points] });

      if (this.points.length === 2) {
        const distance = (this.points[0] as THREE.Vector3).distanceTo(this.points[1] as THREE.Vector3);
        this.onMeasure?.({ point, distance, points: [...this.points] });

        const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        this.line = new THREE.Line(geometry, material);
        scene.add(this.line);

        setTimeout(() => this.reset(), 3000);
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown, { capture: true });

    this.dispose = () => {
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown, { capture: true } as boolean | EventListenerOptions);
      this.reset();
    };
  }

  private reset() {
    this.points = [];

    if (this.line) {
      this.line.parent?.remove(this.line);
      this.line.geometry.dispose();
      if(Array.isArray(this.line.material)) {
        this.line.material.forEach(mat => mat.dispose());
      } else {
        this.line.material.dispose();
      }
      this.line = undefined;
    }

    this.spheres.forEach(s => {
      s.parent?.remove(s);
      s.geometry.dispose();
      if(Array.isArray(s.material)) {
        s.material.forEach(mat => mat.dispose());
      } else {
        s.material.dispose();
      }
    });
    this.spheres = [];
  }

  dispose(): void {
    this.reset();
  }
}