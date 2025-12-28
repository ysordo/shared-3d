import { ManifestEntry, CacheReport } from './types.cjs';

type ValidationOptions = {
    manifest: ManifestEntry[];
    onProgress?: (progress: number, status: string) => void;
    onComplete?: (report: CacheReport) => void;
    forceUpdate?: boolean;
};
declare class CacheValidator {
    private static isFirstLoad;
    static validate(options: ValidationOptions): Promise<CacheReport>;
    static reset(): void;
}

export { CacheValidator, type ValidationOptions };
