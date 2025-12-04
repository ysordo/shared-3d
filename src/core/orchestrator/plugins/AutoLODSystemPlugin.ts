import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib/three';
import type { SceneOrchestrator } from '../SceneOrchestrator';
import type { ManifestEntry } from '../../cache';

type AutoLODConfig = {
  distances: [number, number, number];
  reductionPercentages?: [number, number];
};

export class AutoLODSystemPlugin implements Plugin {
  name = 'AutoLODSystem';
  private lods = new Map<THREE.Object3D, THREE.LOD>();
  private camera!: THREE.Camera;

  constructor(private config: AutoLODConfig) {
    this.config.reductionPercentages = this.config.reductionPercentages || [0.5, 0.2];
  }

  private simplifyGeometry(geometry: THREE.BufferGeometry, percentage: number): THREE.BufferGeometry {
    const modifier = new SimplifyModifier();
    const count = Math.floor((geometry.attributes.position as THREE.BufferAttribute | THREE.InterleavedBufferAttribute).count * percentage);
    return modifier.modify(geometry, count);
  }

  private createLODLevels(model: THREE.Object3D): THREE.LOD {
    const lod = new THREE.LOD();

    /* === Level 0: original (high quality) === */
    const high = model.clone();
    high.visible = true;
    lod.addLevel(high, 0);

    /* === Level 1: 50% polygons === */
    const medium = model.clone();
    medium.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages![0]);
      }
    });
    lod.addLevel(medium, this.config.distances[0]);

    /* === Level 2: 20% polygons === */
    const low = model.clone();
    low.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry = this.simplifyGeometry(child.geometry, this.config.reductionPercentages![1]);
      }
    });
    lod.addLevel(low, this.config.distances[1]);

    /* === Level 3: hide === */
    const empty = new THREE.Object3D();
    empty.visible = false;
    lod.addLevel(empty, this.config.distances[2]);

    return lod;
  }

  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera;

    const applyLODToModel = (model: THREE.Object3D) => {
      const lod = this.createLODLevels(model);
      
      if (model.parent) {
        model.parent.add(lod);
        model.parent.remove(model);
      }

      lod.position.copy(model.position);
      lod.quaternion.copy(model.quaternion);
      lod.scale.copy(model.scale);

      this.lods.set(model, lod);
    };

    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {applyLODToModel(activeModel);}

    const originalSetModel = (orchestrator as SceneOrchestrator).setModel;
    if (originalSetModel) {
      (orchestrator as SceneOrchestrator).setModel = async (...args: [ManifestEntry,{draco?: boolean;} | undefined]) => {
        const model = await originalSetModel.apply(orchestrator, args);
        this.lods.forEach(lod => lod.parent?.remove(lod));
        this.lods.clear();
        applyLODToModel(model);
        return model;
      };
    }

    const update = () => {
      this.lods.forEach(lod => lod.update(this.camera));
      requestAnimationFrame(update);
    };
    update();
  }

  dispose(): void {
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