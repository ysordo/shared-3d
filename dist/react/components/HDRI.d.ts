import React from 'react';
import { ManifestEntry } from '../../core/cache/types.js';
import * as THREE from 'three';
import { HDRILoaderOptions } from '../../core/loaders/HDRILoader.js';

type HDRIProps = {
    entry: ManifestEntry;
    onLoaded?: (event: {
        texture: THREE.Texture;
        entry: ManifestEntry;
        config: any;
    }) => void;
    onProgress?: (event: {
        progress: any;
        entry: ManifestEntry;
    }) => void;
    onError?: (event: {
        error: Error;
        entry: ManifestEntry;
    }) => void;
} & Partial<Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>>;
declare const HDRI: React.FC<HDRIProps>;

export { HDRI };
