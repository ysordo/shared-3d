import type { SceneOrchestrator } from './SceneOrchestrator';
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
  dispose?(): void;
}