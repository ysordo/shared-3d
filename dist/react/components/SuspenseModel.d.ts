import React from 'react';
import { ManifestEntry } from '../../core/cache/types.js';
import * as THREE from 'three';

type SuspenseModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    fallback?: React.ReactNode;
    children?: (model: THREE.Group) => React.ReactNode;
};
declare const SuspenseModel: React.FC<SuspenseModelProps>;

export { SuspenseModel };
