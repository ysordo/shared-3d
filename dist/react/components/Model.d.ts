import { ManifestEntry } from '../../core/cache/types.js';
import { GLTFLoaderEvents } from '../../core/loaders/loaders.d.js';
import 'three';

type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
} & Partial<GLTFLoaderEvents>;
declare const Model: React.FC<ModelProps>;

export { Model };
