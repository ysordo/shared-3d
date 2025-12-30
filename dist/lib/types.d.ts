import * as THREE from 'three';
export { CacheEntry, CacheReport, ManifestEntries, ManifestEntry } from '../core/cache/types.js';
export { GLTFLoaderEvents, GLTFLoaderOptions, HDRIEvents, HDRILoaderOptions, ProgressEvent, WebPHDRData } from '../core/loaders/loaders.d.js';
export { C as ConfigToTuple, b as Plugin, P as PluginContext } from '../index-oH7U2rpR.js';
export { CustomMaterialFactory, MaterialConfig } from '../react/controls/MaterialController.js';
import 'react';

type Vector3Tuple = [number, number, number];
type ColorRepresentation = THREE.ColorRepresentation;

type LightConfig = {
    intensity?: number;
    color?: ColorRepresentation;
    position?: Vector3Tuple;
    castShadow?: boolean;
};

type ClickEvent = {
    object: THREE.Object3D;
    point: THREE.Vector3;
    distance: number;
};
type HoverEvent = {
    object: THREE.Object3D;
    point: THREE.Vector3;
};

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type { ClickEvent, ColorRepresentation, DeepPartial, HoverEvent, LightConfig, Vector3Tuple };
