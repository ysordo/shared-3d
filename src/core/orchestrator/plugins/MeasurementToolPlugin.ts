import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
import type { SceneOrchestrator } from '../SceneOrchestrator';

export type MeasurementEvent = {
  /** Punto seleccionado en este click */
  point: THREE.Vector3;
  /** Distancia calculada (solo cuando se completa la medición de 2 puntos) */
  distance?: number;
  /** Array acumulativo de puntos seleccionados */
  points: THREE.Vector3[];
};

export type MeasurementConfig = {
  /** Habilitar/deshabilitar la herramienta */
  enabled?: boolean;
  /** Radio de las esferas que marcan los puntos */
  pointRadius?: number;
  /** Color de puntos y línea (formato hexadecimal Three.js) */
  color?: number;
  /** Callback invocado en cada punto y al completar la medición */
  onMeasure?: (event: MeasurementEvent) => void;
};

/**
 * MeasurementToolPlugin
 * 
 * Plugin de herramienta de medición interactiva punto a punto sobre el modelo activo.
 * 
 * Características principales:
 * - Selección de hasta 2 puntos mediante click izquierdo sobre el modelo.
 * - Visualización inmediata con esferas en los puntos y línea al completar.
 * - Callback reactivo onMeasure con información progresiva y final (distancia).
 * - Configuración en caliente (enabled, color, radius) sin recrear la instancia.
 * - Limpieza automática de geometrías/materiales tras 3 segundos o al deshabilitar.
 * - Integración limpia con eventos DOM (pointerdown en capture) y dispose completo.
 * - Sin requestAnimationFrame propio → compatible con loop centralizado.
 * 
 * Ideal para visualizadores técnicos, CAD-like, arquitectura o e-commerce de productos
 * donde el usuario necesite medir dimensiones reales.
 * 
 * @example
 * new MeasurementToolPlugin({
 *   color: 0xff0000,
 *   pointRadius: 0.08,
 *   onMeasure: (event) => {
 *     if (event.distance !== undefined) {
 *       console.log(`Distancia: ${event.distance.toFixed(2)} unidades`);
 *     }
 *   }
 * })
 */
export class MeasurementToolPlugin implements Plugin {
  public readonly name = 'MeasurementTool';

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

  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();

  constructor(config?: MeasurementConfig) {
    this.config = {
      enabled: true,
      pointRadius: 0.05,
      color: 0x00ff00,
      onMeasure: () => {},
      ...config,
    };
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
    this.reset();
  }

  update(newConfig: Partial<MeasurementConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.enabled !== undefined) {
      this.enabled = newConfig.enabled;
      if (!this.enabled) {
        this.reset();
      }
    }

    if ((newConfig.color !== undefined || newConfig.pointRadius !== undefined) && this.spheres.length > 0) {
      this.spheres.forEach((sphere) => {
        if (newConfig.color !== undefined) {
          (sphere.material as THREE.MeshBasicMaterial).color.setHex(newConfig.color);
        }
        if (newConfig.pointRadius !== undefined) {
          sphere.scale.setScalar(newConfig.pointRadius / this.config.pointRadius);
        }
      });
      if (this.line && newConfig.color !== undefined) {
        (this.line.material as THREE.LineBasicMaterial).color.setHex(newConfig.color);
      }
    }
  }

  install({ scene, camera, renderer, orchestrator }: PluginContext): void {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.orchestrator = orchestrator;

    this.pointerHandler = this.handlePointerDown.bind(this);
    this.renderer.domElement.addEventListener('pointerdown', this.pointerHandler, { capture: true });
  }

  private handlePointerDown(e: PointerEvent): void {
    if (!this.enabled || e.button !== 0) {return;}

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const model = this.orchestrator.getActiveModel();
    if (!model) {return;}

    const intersects = this.raycaster.intersectObject(model, true);
    if (intersects.length === 0) {return;}

    const point = intersects[0]!.point.clone();

    this.points.push(point);
    this.spawnPoint(point);

    this.config.onMeasure({ point, points: [...this.points] });

    if (this.points.length === 2) {
      this.finishMeasurement();
    }
  }

  private spawnPoint(point: THREE.Vector3): void {
    const geometry = new THREE.SphereGeometry(this.config.pointRadius, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: this.config.color });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(point);

    this.scene.add(mesh);
    this.spheres.push(mesh);
  }

  private finishMeasurement(): void {
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

  private reset(): void {
    this.points = [];

    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      (this.line.material as THREE.Material).dispose();
      this.line = undefined;
    }

    this.spheres.forEach((sphere) => {
      this.scene.remove(sphere);
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
    });
    this.spheres = [];
  }

  dispose(): void {
    this.renderer.domElement.removeEventListener('pointerdown', this.pointerHandler, { capture: true });
    this.reset();
  }
}