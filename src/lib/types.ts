import type * as THREE from 'three';

// === Utilidades de tipo ===
export type Vector3Tuple = [number, number, number];
export type ColorRepresentation = THREE.ColorRepresentation;

// === Manifest ===
export type { ModelManifestEntry } from '../core/cache/types';

// === Configuraciones comunes ===
export type LightConfig = {
  intensity?: number;
  color?: ColorRepresentation;
  position?: Vector3Tuple;
  castShadow?: boolean;
};

// === Eventos comunes ===
export type ClickEvent = {
  object: THREE.Object3D;
  point: THREE.Vector3;
  distance: number;
};

export type HoverEvent = {
  object: THREE.Object3D;
  point: THREE.Vector3;
};

// === Plugin types (reexport si no está en orchestrator) ===
export type { PluginContext, Plugin } from '../core/orchestrator/types';

// === Material Config (reutilizable) ===

export type { CustomMaterialFactory, MaterialConfig } from '../react/controls/MaterialController';

// === Utilidad: Deep partial ===
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;