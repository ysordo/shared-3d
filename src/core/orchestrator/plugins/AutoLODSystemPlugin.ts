import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib/three';
import type { SceneOrchestrator } from '../SceneOrchestrator';

export type AutoLODConfig = {
  distances: [number, number, number];
  reductionPercentages?: [number, number] | undefined;
};

export class AutoLODSystemPlugin implements Plugin {
  name = 'AutoLODSystem';
  private lods = new Map<THREE.Object3D, THREE.LOD>();
  private camera!: THREE.Camera;
  private rafId: number | null = null;
  private orchestrator!: SceneOrchestrator;
  private originalSetModel?: SceneOrchestrator['setModel'];
  private config: AutoLODConfig;

  constructor(config: AutoLODConfig) {
    this.config = {
      ...config,
      reductionPercentages: config.reductionPercentages ?? [0.5, 0.2],
    };
  }

  /** Permite actualizar la configuración en caliente */
  update(newConfig: Partial<AutoLODConfig>) {
    this.config = {
      ...this.config,
      ...newConfig,
      reductionPercentages: newConfig.reductionPercentages ?? this.config.reductionPercentages!,
    };

    // Recalcular LODs existentes
    this.lods.forEach((lod, model) => this.updateLODForModel(model, lod));
  }

  private simplifyGeometry(geometry: THREE.BufferGeometry, percentage: number): THREE.BufferGeometry {
    const modifier = new SimplifyModifier();
    const count = Math.floor((geometry.attributes.position as THREE.BufferAttribute | THREE.InterleavedBufferAttribute).count * percentage);
    return modifier.modify(geometry, count);
  }

  /** Reconstruye los niveles LOD para un modelo existente */
  private updateLODForModel(model: THREE.Object3D, lod: THREE.LOD) {
    lod.levels.forEach((level, idx) => {
      if (level.object instanceof THREE.Mesh && idx > 0 && idx < 3) { // niveles simplificados
        level.object.geometry?.dispose();
        level.object.geometry = this.simplifyGeometry(
          (model.children[idx - 1] as THREE.Mesh)?.geometry.clone() ?? level.object.geometry.clone(),
          this.config.reductionPercentages![idx - 1]!
        );
      }
    });
  }

  private createLODLevels(model: THREE.Object3D): THREE.LOD {
    const lod = new THREE.LOD();

    const high = model.clone();
    high.visible = true;
    lod.addLevel(high, 0);

    const medium = model.clone();
    medium.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry.clone(), this.config.reductionPercentages![0]);
      }
    });
    lod.addLevel(medium, this.config.distances[0]);

    const low = model.clone();
    low.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry.clone(), this.config.reductionPercentages![1]);
      }
    });
    lod.addLevel(low, this.config.distances[1]);

    const empty = new THREE.Object3D();
    empty.visible = false;
    lod.addLevel(empty, this.config.distances[2]);

    return lod;
  }

  /** Aplica LOD a un modelo específico, reutilizando si ya existe */
  private applyLODToModel(model: THREE.Object3D) {
    if (this.lods.has(model)) {
      this.updateLODForModel(model, this.lods.get(model)!);
      return;
    }

    const lod = this.createLODLevels(model);

    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }

    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);

    this.lods.set(model, lod);
  }

  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera;
    this.orchestrator = orchestrator;

    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {this.applyLODToModel(activeModel);}

    this.originalSetModel = orchestrator.setModel.bind(orchestrator);
    orchestrator.setModel = async (...args) => {
      await this.originalSetModel!(...args);
      const model = orchestrator.getActiveModel()!;
      this.applyLODToModel(model);
    };

    const updateLoop = () => {
      this.lods.forEach(lod => lod.update(this.camera));
      this.rafId = requestAnimationFrame(updateLoop);
    };
    if (!this.rafId) {updateLoop();}
  }

  dispose(): void {
    if (this.originalSetModel) {this.orchestrator.setModel = this.originalSetModel;}
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lods.forEach(lod => {
      if (lod.parent) {lod.parent.remove(lod);}
      lod.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    });
    this.lods.clear();
  }
}
