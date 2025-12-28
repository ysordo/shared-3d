import { ManifestEntry } from './types.cjs';

declare class FileWatcher {
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

export { FileWatcher };
