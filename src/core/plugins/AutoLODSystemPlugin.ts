import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import type { Plugin, PluginContext } from './types';
import { THREE } from '../../lib';
import type { SceneOrchestrator } from '../orchestrator/SceneOrchestrator';

export type AutoLODConfig = {
  /** [mediumDistance, lowDistance, hideDistance] */
  distances: [number, number, number];
  /** [mediumReduction, lowReduction] – porcentaje de vértices a mantener (ej. 0.5 = 50%) */
  reductionPercentages?: [number, number] | undefined;
};

/**
 * AutoLODSystemPlugin
 * 
 * Plugin de Level of Detail automático basado en distancia a cámara.
 * 
 * Características principales:
 * - Genera automáticamente 4 niveles LOD para el modelo activo: High, Medium (simplificado), Low (simplificado) y Empty (oculto).
 * - Usa SimplifyModifier de Three.js para reducción progresiva de geometría.
 * - Integración transparente con SceneOrchestrator: intercepta setModel y aplica LOD a nuevos modelos.
 * - Actualización en caliente de distancias y porcentajes de reducción sin recrear el plugin.
 * - Integración completa con el loop centralizado mediante preRender() (un único LOD.update por frame).
 * - Limpieza exhaustiva de geometrías, materiales y referencias en dispose().
 * - Optimizado para escenas complejas con modelos de alto polígono count.
 * 
 * Ideal para optimización de rendimiento en visualizadores 3D con navegación libre.
 * 
 * @example
 * new AutoLODSystemPlugin({
 *   distances: [20, 50, 100],
 *   reductionPercentages: [0.6, 0.25]
 * })
 */
export class AutoLODSystemPlugin implements Plugin {
  public readonly name = 'AutoLODSystem';

  private camera!: THREE.Camera;
  private orchestrator!: SceneOrchestrator;

  private lods = new Map<THREE.Object3D, THREE.LOD>();
  private originalSetModel?: SceneOrchestrator['activeModel']['set'];

  private config: Required<AutoLODConfig>;

  private readonly simplifier = new SimplifyModifier();

  constructor(config: AutoLODConfig) {
    this.config = {
      distances: config.distances,
      reductionPercentages: config.reductionPercentages ?? [0.5, 0.2],
    };
  }

  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera;
    this.orchestrator = orchestrator;

    const activeModel = this.orchestrator.activeModel.get;
    if (activeModel) {
      this.applyLODToModel(activeModel);
    }

    this.originalSetModel = this.orchestrator.activeModel.set.bind(this.orchestrator);
    this.orchestrator.activeModel.set = async (...args) => {
      await this.originalSetModel!(...args);
      const newModel = this.orchestrator.activeModel.get;
      if (newModel) {
        this.applyLODToModel(newModel);
      }
    };
  }

  preRender(): void {
    this.lods.forEach((lod) => lod.update(this.camera));
  }

  update(newConfig: Partial<AutoLODConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
      reductionPercentages:
        newConfig.reductionPercentages ?? this.config.reductionPercentages,
    };

    this.lods.forEach((lod, originalModel) => {
      this.rebuildSimplifiedLevels(lod, originalModel);
      lod.levels[1]!.distance = this.config.distances[0];
      lod.levels[2]!.distance = this.config.distances[1];
      lod.levels[3]!.distance = this.config.distances[2];
    });
  }

  private applyLODToModel(model: THREE.Object3D): void {
    if (this.lods.has(model)) {
      const existingLOD = this.lods.get(model)!;
      this.rebuildSimplifiedLevels(existingLOD, model);
      return;
    }

    const lod = new THREE.LOD();

    const high = model.clone(true);
    high.visible = true;
    lod.addLevel(high, 0);

    const medium = model.clone(true);
    this.simplifyMeshes(medium, this.config.reductionPercentages![0]);
    lod.addLevel(medium, this.config.distances[0]);

    const low = model.clone(true);
    this.simplifyMeshes(low, this.config.reductionPercentages![1]);
    lod.addLevel(low, this.config.distances[1]);

    const empty = new THREE.Object3D();
    empty.visible = false;
    lod.addLevel(empty, this.config.distances[2]);

    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }

    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);

    this.lods.set(model, lod);
  }

  private simplifyMeshes(object: THREE.Object3D, percentage: number): void {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const originalGeo = child.geometry as THREE.BufferGeometry;
        const simplifiedGeo = this.simplifier.modify(
          originalGeo.clone(),
          Math.floor(originalGeo.getAttribute('position').count * percentage)
        );
        child.geometry.dispose();
        child.geometry = simplifiedGeo;
      }
    });
  }

  private rebuildSimplifiedLevels(lod: THREE.LOD, originalModel: THREE.Object3D): void {
    const medium = lod.levels[1]!.object;
    if (medium) {this.simplifyMeshes(medium, this.config.reductionPercentages![0]);}

    const low = lod.levels[2]!.object;
    if (low) {this.simplifyMeshes(low, this.config.reductionPercentages![1]);}
  }

  dispose(): void {
    if (this.originalSetModel && this.orchestrator) {
      this.orchestrator.activeModel.set = this.originalSetModel;
    }

    this.lods.forEach((lod, originalModel) => {
      if (lod.parent) {
        lod.parent.remove(lod);
      }

      lod.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    });

    this.lods.clear();
  }
}