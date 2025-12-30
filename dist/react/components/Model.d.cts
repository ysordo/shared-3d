import { ManifestEntry } from '../../core/cache/types.cjs';
import { GLTFLoaderEvents } from '../../core/loaders/loaders.d.cjs';
import 'three';

type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
} & Partial<GLTFLoaderEvents>;
declare const Model: React.FC<ModelProps>;

export { Model };
