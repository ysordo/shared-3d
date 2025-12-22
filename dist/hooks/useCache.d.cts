import { CacheReport, ManifestEntries } from '../core/cache/types.cjs';

declare const useCache: () => {
    status: "error" | "idle" | "validating" | "ready";
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ManifestEntries) => Promise<CacheReport>;
};

export { useCache };
