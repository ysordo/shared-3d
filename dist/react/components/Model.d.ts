import { ManifestEntry } from '../../core/cache/types.js';
import { GLTFLoaderEvents } from '../../core/loaders/GLTFLoader.js';
import 'three';

type ModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    children?: (model: any) => React.ReactNode | undefined;
} & Partial<GLTFLoaderEvents>;
declare const Model: React.FC<ModelProps>;

export { Model };
