import type { ManifestEntry, CacheReport } from './types';
export type ValidationOptions = {
    manifest: ManifestEntry[];
    onProgress?: (progress: number, status: string) => void;
    onComplete?: (report: CacheReport) => void;
    forceUpdate?: boolean;
};
export declare class CacheValidator {
    private static isFirstLoad;
    static validate(options: ValidationOptions): Promise<CacheReport>;
    static reset(): void;
}
//# sourceMappingURL=CacheValidator.d.ts.map