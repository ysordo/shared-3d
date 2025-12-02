import type { THREE } from './three';
export type Vector3Tuple = [number, number, number];
export type ColorRepresentation = THREE.ColorRepresentation;
export type { ManifestEntry, ModelManifest } from '../core/cache/types';
export type LightConfig = {
    intensity?: number;
    color?: ColorRepresentation;
    position?: Vector3Tuple;
    castShadow?: boolean;
};
export type ClickEvent = {
    object: THREE.Object3D;
    point: THREE.Vector3;
    distance: number;
};
export type HoverEvent = {
    object: THREE.Object3D;
    point: THREE.Vector3;
};
export type { PluginContext, Plugin } from '../core/orchestrator/types';
export type { CustomMaterialFactory, MaterialConfig } from '../react/controls/MaterialController';
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
//# sourceMappingURL=types.d.ts.map