import type { SceneOrchestrator } from '../orchestrator/SceneOrchestrator';
import type { THREE } from '../../lib';

export type PluginContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  orchestrator: SceneOrchestrator;
};

export interface Plugin {
  name: string;
  install(context: PluginContext): void;
  preRender?(deltaTime?: number, elapsedTime?: number): void;
  postRender?(deltaTime?: number, elapsedTime?: number): void;
  update?(config: unknown): void;
  resize?(width: number, height: number): void;
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