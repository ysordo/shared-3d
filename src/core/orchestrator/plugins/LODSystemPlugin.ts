import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
import type { SceneOrchestrator } from '../SceneOrchestrator';

type LODLevel = {
  distance: number;
  model: THREE.Object3D;
};

export type LODConfig = {
  levels: LODLevel[];
  hysteresis?: number;
};

export class LODSystemPlugin implements Plugin {
  name = 'LODSystem';

  private camera!: THREE.Camera;
  private orchestrator!: SceneOrchestrator;

  private config: LODConfig;
  private lods = new Map<THREE.Object3D, THREE.LOD>();

  private rafId: number | null = null;
  private originalSetModel?: SceneOrchestrator['setModel'];

  constructor(config: LODConfig) {
    this.config = config;
  }

  /* =========================
   *  Hot update
   * ========================= */
  update(config: Partial<LODConfig>) {
    this.config = { ...this.config, ...config };

    this.lods.forEach((lod, model) => {
      this.rebuildLOD(model, lod);
    });
  }

  /* =========================
   *  Install
   * ========================= */
  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera;
    this.orchestrator = orchestrator;

    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {
      this.applyLOD(activeModel);
    }

    this.originalSetModel = orchestrator.setModel.bind(orchestrator);
    orchestrator.setModel = async (...args) => {
      await this.originalSetModel!(...args);
      const model = orchestrator.getActiveModel();
      if (model) {
        this.applyLOD(model);
      }
    };

    this.startLoop();
  }

  /* =========================
   *  Core logic
   * ========================= */
  private applyLOD(model: THREE.Object3D) {
    if (this.lods.has(model)) {return;}

    const lod = new THREE.LOD();
    this.buildLODLevels(lod, model);

    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }

    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);

    this.lods.set(model, lod);
  }

  private buildLODLevels(lod: THREE.LOD, model: THREE.Object3D) {
    this.config.levels.forEach(level => {
      const clone = level.model.clone(true);
      clone.visible = true;
      lod.addLevel(clone, level.distance);
    });
  }

  private rebuildLOD(model: THREE.Object3D, lod: THREE.LOD) {
    lod.levels.forEach(level => {
      level.object.parent?.remove(level.object);
      level.object.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    });

    lod.levels.length = 0;
    this.buildLODLevels(lod, model);
  }

  /* =========================
   *  Loop
   * ========================= */
  private startLoop() {
    const loop = () => {
      this.lods.forEach(lod => lod.update(this.camera));
      this.rafId = requestAnimationFrame(loop);
    };
    loop();
  }

  /* =========================
   *  Dispose
   * ========================= */
  dispose(): void {
    if (this.originalSetModel) {
      this.orchestrator.setModel = this.originalSetModel;
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    this.lods.forEach(lod => {
      lod.parent?.remove(lod);
      lod.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    });

    this.lods.clear();
  }
}
