import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

type LODLevel = {
  distance: number;
  model: THREE.Object3D;
};

type LODConfig = {
  levels: LODLevel[];
  hysteresis?: number;
};

export class LODSystemPlugin implements Plugin {
  name = 'LODSystem';
  private lodObjects = new Map<THREE.Object3D, THREE.LOD>();
  private camera!: THREE.Camera;

  constructor(private config: LODConfig[]) {}

  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera;

    const processModel = (model: THREE.Object3D) => {
      const lod = new THREE.LOD();

      this.config.forEach((cfg, index) => {
        const clone = cfg.levels[index]?.model.clone() || model.clone();
        clone.visible = false;
        lod.addLevel(clone, cfg.levels[index]?.distance || 0);
      });

      if (model.parent) {
        model.parent.add(lod);
        model.parent.remove(model);
      }

      lod.position.copy(model.position);
      lod.quaternion.copy(model.quaternion);
      lod.scale.copy(model.scale);

      this.lodObjects.set(model, lod);

      (lod as any).originalModel = model;
    };

    const activeModel = orchestrator.getActiveModel();
    if (activeModel) {processModel(activeModel);}

    const originalSetModel = (orchestrator as any).setModel;
    if (originalSetModel) {
      (orchestrator as any).setModel = (entry: any, options: any) => {
        originalSetModel.call(orchestrator, entry, options).then((model: THREE.Object3D) => {
          this.lodObjects.forEach((lod) => {
            if (lod.parent) {lod.parent.remove(lod);}
          });
          this.lodObjects.clear();
          processModel(model);
        });
      };
    }

    const update = () => {
      this.lodObjects.forEach((lod) => {
        lod.update(this.camera);
      });
      requestAnimationFrame(update);
    };
    update();
  }

  dispose(): void {
    this.lodObjects.forEach((lod) => {
      if (lod.parent) {lod.parent.remove(lod);}
      lod.traverse((child) => {
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
    this.lodObjects.clear();
  }
}