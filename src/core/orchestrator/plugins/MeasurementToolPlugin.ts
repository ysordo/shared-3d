import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
import type { SceneOrchestrator } from '../SceneOrchestrator';

export type MeasurementEvent = {
  point: THREE.Vector3;
  distance?: number;
  points: THREE.Vector3[];
};

export type MeasurementConfig = {
  enabled?: boolean;
  pointRadius?: number;
  color?: number;
  onMeasure?: (event: MeasurementEvent) => void;
};

export class MeasurementToolPlugin implements Plugin {
  name = 'MeasurementTool';

  private camera!: THREE.Camera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private orchestrator!: SceneOrchestrator;

  private enabled = true;

  private points: THREE.Vector3[] = [];
  private spheres: THREE.Mesh[] = [];
  private line?: THREE.Line | undefined;

  private config: Required<MeasurementConfig>;
  private pointerHandler!: (e: PointerEvent) => void;

  constructor(config?: MeasurementConfig) {
    this.config = {
      enabled: true,
      pointRadius: 0.05,
      color: 0x00ff00,
      onMeasure: () => {},
      ...config,
    };
  }

  /* =========================
   *  Public API
   * ========================= */
  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    this.reset();
  }

  update(config: Partial<MeasurementConfig>) {
    this.config = { ...this.config, ...config };

    if (config.enabled !== undefined) {
      this.enabled = config.enabled;
      if (!this.enabled) {
        this.reset();
      }
    }
  }

  /* =========================
   *  Install
   * ========================= */
  install(ctx: PluginContext): void {
    this.scene = ctx.scene;
    this.camera = ctx.camera;
    this.renderer = ctx.renderer;
    this.orchestrator = ctx.orchestrator;

    this.pointerHandler = this.handlePointerDown.bind(this);
    this.renderer.domElement.addEventListener('pointerdown', this.pointerHandler, { capture: true });
  }

  /* =========================
   *  Pointer logic
   * ========================= */
  private handlePointerDown(e: PointerEvent) {
    if (!this.enabled || e.button !== 0) {return;}

    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const model = this.orchestrator.getActiveModel();
    if (!model) {return;}

    const intersects = raycaster.intersectObject(model, true);
    if (!intersects.length) {return;}

    const point = intersects[0]!.point.clone();
    this.points.push(point);

    this.spawnPoint(point);
    this.config.onMeasure({ point, points: [...this.points] });

    if (this.points.length === 2) {
      this.finishMeasurement();
    }
  }

  /* =========================
   *  Drawing
   * ========================= */
  private spawnPoint(point: THREE.Vector3) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(this.config.pointRadius),
      new THREE.MeshBasicMaterial({ color: this.config.color })
    );
    mesh.position.copy(point);
    this.scene.add(mesh);
    this.spheres.push(mesh);
  }

  private finishMeasurement() {
    const distance = this.points[0]!.distanceTo(this.points[1]!);

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    const material = new THREE.LineBasicMaterial({ color: this.config.color });

    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);

    this.config.onMeasure({
      point: this.points[1]!,
      distance,
      points: [...this.points],
    });

    setTimeout(() => this.reset(), 3000);
  }

  /* =========================
   *  Cleanup
   * ========================= */
  private reset() {
    this.points = [];

    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      (this.line.material as THREE.Material).dispose();
      this.line = undefined;
    }

    this.spheres.forEach(s => {
      this.scene.remove(s);
      s.geometry.dispose();
      (s.material as THREE.Material).dispose();
    });
    this.spheres = [];
  }

  /* =========================
   *  Dispose
   * ========================= */
  dispose(): void {
    this.renderer.domElement.removeEventListener('pointerdown', this.pointerHandler, { capture: true });
    this.reset();
  }
}
