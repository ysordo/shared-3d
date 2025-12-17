import { CacheReport, ModelManifest } from '../core/cache/types.cjs';

declare const useCache: () => {
    status: "error" | "idle" | "validating" | "ready";
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ModelManifest) => Promise<CacheReport>;
};

export { useCache };
