type ManifestEntry = {
    id: string;
    url: string;
    hash: string;
    size: number;
    updatedAt: number;
};
type Manifest = {
    models: Record<string, ManifestEntry>;
    hdris: Record<string, ManifestEntry>;
};
declare function generateManifest(objectDirs?: string | string[], outputPath?: string): Promise<Manifest>;

export { type Manifest, type ManifestEntry, generateManifest };
