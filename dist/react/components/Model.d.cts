import React from 'react';
import { ManifestEntry } from '../../core/cache/types.cjs';
import * as THREE from 'three';
import { GLTFLoaderEvents } from '../../core/loaders/GLTFLoader.cjs';

type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    children?: (model: THREE.Group) => React.ReactNode;
};
declare const Model: React.FC<ModelProps & GLTFLoaderEvents>;

export { Model };
