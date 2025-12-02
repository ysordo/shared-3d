import type { ManifestEntry } from './types';
export declare class FileWatcher {
    private static instance;
    private watchers;
    private manifest;
    private onChange?;
    private constructor();
    static getInstance(): FileWatcher;
    watch(manifest: ManifestEntry[], onChange: (ids: string[]) => void): void;
    private checkForChanges;
    private startPolling;
    dispose(): void;
}
//# sourceMappingURL=FileWatcher.d.ts.map