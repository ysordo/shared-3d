import type { ReactNode } from 'react';
import type { ModelManifest, CacheReport } from '../core/cache/types';
type CacheStatus = 'idle' | 'validating' | 'ready' | 'error';
type CacheContextValue = {
    status: CacheStatus;
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ModelManifest) => Promise<CacheReport>;
};
export declare const CacheProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useCache: () => CacheContextValue;
export {};
//# sourceMappingURL=CacheContext.d.ts.map