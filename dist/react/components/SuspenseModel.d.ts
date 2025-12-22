import React from 'react';
import { ManifestEntry } from '../../core/cache/types.js';

type SuspenseModelProps = {
    entry: ManifestEntry;
    draco?: boolean | undefined;
    fallback?: React.ReactNode;
};
declare const SuspenseModel: React.FC<SuspenseModelProps>;

export { SuspenseModel };
