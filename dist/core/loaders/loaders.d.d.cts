import * as THREE from 'three';
import { ManifestEntry } from '../cache/types.cjs';

type ProgressEvent = {
  loaded: number;
  total: number;
  percent: number;
  url: string;
};

type onLoadedProps<K extends [texture: THREE.Texture] | [obj: THREE.Group] = [obj: THREE.Group]> = [...K, entry: ManifestEntry];
type onErrorProps = [error: Error, url: string, entry?: ManifestEntry];

type HDRIEvents = {
  onProgress?: (progress: ProgressEvent) => void;
  onLoaded?: (...args: onLoadedProps<[texture: THREE.Texture]>) => void;
  onError?: (...args: onErrorProps) => void;
};

type HDRILoaderOptions = {
  dataType?: typeof THREE.FloatType | typeof THREE.HalfFloatType;
  exposure?: number;
  maxLuminance?: number;
  preserveHDR?: boolean;
};

type GLTFLoaderOptions = {
  draco?: boolean | undefined;
  decoderPath?: string | undefined;
};

type GLTFLoaderEvents = {
  onProgress?: (p: ProgressEvent) => void | undefined;
  onLoaded?: (...args: onLoadedProps) => void | undefined;
  onError?: (...args: onErrorProps) => void | undefined;
};

interface WebPHDRData {
  width: number;
  height: number;
  data: Float32Array | Uint16Array;
  type: typeof THREE.FloatType | typeof THREE.HalfFloatType;
  exposure: number;
  maxLuminance: number;
  averageLuminance: number;
  metadata?: Record<string, never>;
}

export type { GLTFLoaderEvents, GLTFLoaderOptions, HDRIEvents, HDRILoaderOptions, ProgressEvent, WebPHDRData };
