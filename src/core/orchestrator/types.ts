import type * as THREE from 'three';
import type { SceneOrchestrator } from './SceneOrchestrator';

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