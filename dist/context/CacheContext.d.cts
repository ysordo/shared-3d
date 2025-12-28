import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { CacheReport, ManifestEntries } from '../core/cache/types.cjs';

type CacheStatus = 'idle' | 'validating' | 'ready' | 'error';
type CacheContextValue = {
    status: CacheStatus;
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ManifestEntries) => Promise<CacheReport>;
};
declare const CacheProvider: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const useCache: () => CacheContextValue;

export { CacheProvider, useCache };
