import React from 'react';
import { ModelManifest, ManifestEntry } from '../../core/cache/types.cjs';

type ModelPreloadProps = {
    entries: ModelManifest;
    draco?: boolean;
    onProgress?: (completed: number, total: number, entry: ManifestEntry) => void;
};
declare const ModelPreload: React.FC<ModelPreloadProps>;

export { ModelPreload };
