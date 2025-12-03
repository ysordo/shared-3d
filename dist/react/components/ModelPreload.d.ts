import React from 'react';
import { ModelManifest } from '../../core/cache/types.js';

type ModelPreloadProps = {
    entries: ModelManifest;
    draco?: boolean;
};
declare const ModelPreload: React.FC<ModelPreloadProps>;

export { ModelPreload };
