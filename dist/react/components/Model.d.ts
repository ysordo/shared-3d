import { ManifestEntry } from '../../core/cache/types.js';
import { GLTFLoaderEvents } from '../../core/loaders/GLTFLoader.js';
import * as THREE from 'three';

type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    children?: (model: THREE.Group) => React.ReactNode | undefined;
} & Partial<GLTFLoaderEvents>;
declare const Model: React.FC<ModelProps>;

export { Model };
