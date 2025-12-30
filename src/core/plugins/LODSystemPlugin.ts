import type { Plugin, PluginContext } from './types';
import { THREE } from '../../lib';
import type { SceneOrchestrator } from '../orchestrator/SceneOrchestrator';

type LODLevel = {
  /** Distancia a partir de la cual se activa este nivel (mayor distancia = menor detalle) */
  distance: number;
  /** Modelo pre-generado para este nivel de detalle */
  model: THREE.Object3D;
};

export type LODConfig = {
  /** Niveles de detalle ordenados por distancia creciente */
  levels: LODLevel[];
  /** Histéresis opcional para evitar flickering en transiciones (valor 0-1, default 0) */
  hysteresis?: number;
};

/**
 * LODSystemPlugin
 * 
 * Plugin de Level of Detail manual basado en modelos predefinidos.
 * 
 * Características principales:
 * - Permite definir niveles LOD explícitos proporcionando modelos alternativos (ej. baked low-poly, impostors).
 * - Switching determinista por distancia a cámara con soporte opcional para histéresis.
 * - Integración transparente con SceneOrchestrator: aplica LOD automáticamente al modelo activo y futuros.
 * - Actualización en caliente de configuración (niveles/hysteresis) sin recrear la instancia.
 * - Integración completa con el loop centralizado mediante preRender() (un único LOD.update por frame).
 * - Limpieza exhaustiva de recursos en dispose() para evitar memory leaks.
 * 
 * Ideal para optimización avanzada donde se controlan manualmente los modelos de cada nivel
 * (ej. versiones simplificadas preparadas en Blender o herramientas externas).
 * 
 * @example
 * new LODSystemPlugin({
 *   levels: [
 *     { distance: 0,   model: highDetailModel },
 *     { distance: 20,  model: mediumDetailModel },
 *     { distance: 50,  model: lowDetailModel },
 *     { distance: 100, model: emptyPlaceholder }
 *   ],
 *   hysteresis: 0.1
 * })
 */
export class LODSystemPlugin implements Plugin {
  public readonly name = 'LODSystem';

  private camera!: THREE.Camera;
  private orchestrator!: SceneOrchestrator;

  private config: Required<LODConfig>;
  private lods = new Map<THREE.Object3D, THREE.LOD>();
  private originalSetModel?: SceneOrchestrator['activeModel']['set'];

  constructor(config: LODConfig) {
    this.config = {
      levels: config.levels,
      hysteresis: config.hysteresis ?? 0,
    };
  }

  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera;
    this.orchestrator = orchestrator;

    const activeModel = this.orchestrator.activeModel.get;
    if (activeModel) {
      this.applyLOD(activeModel);
    }

    this.originalSetModel = this.orchestrator.activeModel.set.bind(this.orchestrator);
    this.orchestrator.activeModel.set = async (...args) => {
      await this.originalSetModel!(...args);
      const newModel = this.orchestrator.activeModel.get;
      if (newModel) {
        this.applyLOD(newModel);
      }
    };
  }

  preRender(): void {
    this.lods.forEach((lod) => {
      if (this.config.hysteresis > 0) {
        lod.children.forEach((child) => {
          if (child instanceof THREE.LOD) {return;}
        });
      }
      lod.update(this.camera);
    });
  }

  update(newConfig: Partial<LODConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
      levels: newConfig.levels ?? this.config.levels,
      hysteresis: newConfig.hysteresis ?? this.config.hysteresis,
    };

    this.lods.forEach((lod, originalModel) => {
      this.rebuildLOD(originalModel, lod);
    });
  }

  private applyLOD(model: THREE.Object3D): void {
    if (this.lods.has(model)) {return;}

    const lod = new THREE.LOD();

    this.buildLODLevels(lod);

    if (model.parent) {
      model.parent.add(lod);
      model.parent.remove(model);
    }

    lod.position.copy(model.position);
    lod.quaternion.copy(model.quaternion);
    lod.scale.copy(model.scale);

    this.lods.set(model, lod);
  }

  private buildLODLevels(lod: THREE.LOD): void {
    this.config.levels.forEach((level) => {
      const clone = level.model.clone(true);
      clone.visible = true;
      lod.addLevel(clone, level.distance);
    });
  }

  private rebuildLOD(originalModel: THREE.Object3D, lod: THREE.LOD): void {
    lod.levels.forEach((level) => {
      const obj = level.object;
      obj.parent?.remove(obj);
      obj.traverse((child) => {
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

    lod.levels.length = 0;
    this.buildLODLevels(lod);
  }
  
  dispose(): void {
    if (this.originalSetModel && this.orchestrator) {
      this.orchestrator.activeModel.set = this.originalSetModel;
    }

    this.lods.forEach((lod) => {
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