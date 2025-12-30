import { THREE } from "../../lib/three";
import type { ManifestEntry } from "../cache/types";

export type ProgressEvent = {
  loaded: number;
  total: number;
  percent: number;
  url: string;
};

type onLoadedProps<K extends [texture: THREE.Texture] | [obj: THREE.Group] = [obj: THREE.Group]> = [...K, entry: ManifestEntry];
type onErrorProps = [error: Error, url: string, entry?: ManifestEntry];

export type HDRIEvents = {
  onProgress?: (progress: ProgressEvent) => void;
  onLoaded?: (...args: onLoadedProps<[texture: THREE.Texture]>) => void;
  onError?: (...args: onErrorProps) => void;
};

export type HDRILoaderOptions = {
  dataType?: typeof THREE.FloatType | typeof THREE.HalfFloatType;
  exposure?: number;
  maxLuminance?: number;
  preserveHDR?: boolean;
};

export type GLTFLoaderOptions = {
  draco?: boolean | undefined;
  decoderPath?: string | undefined;
};

export type GLTFLoaderEvents = {
  onProgress?: (p: ProgressEvent) => void | undefined;
  onLoaded?: (...args: onLoadedProps) => void | undefined;
  onError?: (...args: onErrorProps) => void | undefined;
};

export interface WebPHDRData {
  width: number;
  height: number;
  data: Float32Array | Uint16Array;
  type: typeof THREE.FloatType | typeof THREE.HalfFloatType;
  exposure: number;
  maxLuminance: number;
  averageLuminance: number;
  metadata?: Record<string, never>;
}