export type ManifestEntry = {
    id: string;
    url: string;
    hash: string;
    size: number;
    updatedAt: number;
};
export type Manifest = {
    models: Record<string, ManifestEntry>;
    hdris: Record<string, ManifestEntry>;
};
export declare function generateManifest(objectDirs?: string | string[], outputPath?: string): Promise<Manifest>;
//# sourceMappingURL=generateManifest.d.ts.map