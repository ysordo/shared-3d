import { CacheReport, ManifestEntries } from '../core/cache/types.cjs';

declare const useCache: () => {
    status: "idle" | "validating" | "ready" | "error";
    progress: number;
    report: CacheReport | null;
    validate: (manifest: ManifestEntries) => Promise<CacheReport>;
};

export { useCache };
