export declare const useCache: () => {
    status: "error" | "idle" | "validating" | "ready";
    progress: number;
    report: import("..").CacheReport | null;
    validate: (manifest: import("..").ModelManifest) => Promise<import("..").CacheReport>;
};
//# sourceMappingURL=useCache.d.ts.map