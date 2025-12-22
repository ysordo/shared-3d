import type { SceneOrchestrator } from './SceneOrchestrator';
import type { THREE } from '../../lib';

export type PluginContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  orchestrator: SceneOrchestrator;
};

// core/orchestrator/types.ts
export interface Plugin {
  name: string;

  /** Called once when plugin is registered */
  install(context: PluginContext): void;

  /** Optional: called every frame BEFORE main render */
  preRender?(deltaTime?: number, elapsedTime?: number): void;

  /** Optional: called every frame AFTER main render (ideal for post-processing) */
  postRender?(deltaTime?: number, elapsedTime?: number): void;

  /** Optional: hot update of configuration */
  update?(config: unknown): void;

  /** Optional: resize handler */
  resize?(width: number, height: number): void;

  /** Cleanup resources */
  dispose?(): void;
}

export type ConfigToTuple<
  T extends object,
  OrderedKeys extends readonly (keyof T)[]
> = OrderedKeys extends readonly [infer First, ...infer Rest]
  ? First extends keyof T
    ? Rest extends readonly (keyof T)[]
      ? [T[First], ...ConfigToTuple<T, Rest>]
      : [T[First]]
    : never
  : [];