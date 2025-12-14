import React from 'react';
import { ManifestEntry } from '../../core/cache/types.cjs';
import * as THREE from 'three';
import { HDRILoaderOptions } from '../../core/loaders/HDRILoader.cjs';

type HDRIProps = {
    entry: ManifestEntry;
    config?: Partial<Omit<HDRILoaderOptions, 'dataType' | 'preserveHDR' | 'rgbeLoaderOptions'>>;
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
};
declare const HDRI: React.FC<HDRIProps>;

export { HDRI };
