import { CacheReport, ModelManifest } from '../core/cache/types.cjs';

declare const useCache: () => {
    status: "idle" | "validating" | "ready" | "error";
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ModelManifest) => Promise<CacheReport>;
};

export { useCache };
