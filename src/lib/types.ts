import type { THREE } from './three';

/* === Utilities of type === */
export type Vector3Tuple = [number, number, number];
export type ColorRepresentation = THREE.ColorRepresentation;

/* === Manifest === */
export type { ManifestEntry, ManifestEntries } from '../core/cache/types';

/* === Common settings === */
export type LightConfig = {
  intensity?: number;
  color?: ColorRepresentation;
  position?: Vector3Tuple;
  castShadow?: boolean;
};

export type { HDRILoaderOptions } from '../core/loaders/HDRILoader';

/* === Common Events === */
export type ClickEvent = {
  object: THREE.Object3D;
  point: THREE.Vector3;
  distance: number;
};

export type HoverEvent = {
  object: THREE.Object3D;
  point: THREE.Vector3;
};

/* === Plugin types (reexport if not in orchestrator) === */
export type { PluginContext, Plugin } from '../core/orchestrator/types';

/* === Config Material (reusable) === */

export type { CustomMaterialFactory, MaterialConfig } from '../react/controls/MaterialController';

/* === Utility: Deep partial === */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
