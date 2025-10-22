import type { LoadingManager, TextureDataType, DataTexture } from 'three';
interface HDRILoadingCallbacks {
    onLoad?: (texture: DataTexture, texData: any) => void;
    onProgress?: (event: ProgressEvent) => void;
    onError?: (event: ErrorEvent) => void;
}
interface HDRIConfig {
    mapping?: number;
    encoding?: number;
    flipY?: boolean;
    generateMipmaps?: boolean;
    minFilter?: number;
    magFilter?: number;
    exposure?: number;
    reserveHDR?: boolean;
}
/**
 * Manager for HDR environment maps with caching and configuration options.
 *
 * ```js
 * const hdriManager = new HDRIsManager();
 *
 * // Load an HDR environment map
 * const envMap = await hdriManager.load('path/to/environment.hdr');
 * scene.environment = envMap;
 *
 * // Preload multiple HDRIs
 * await hdriManager.preload([
 *   'path/to/sunset.hdr',
 *   'path/to/night.hdr',
 *   'path/to/studio.hdr'
 * ]);
 * ```
 */
declare class HDRIsManager {
    private loader;
    private loaderMin;
    private cache;
    private defaultConfig;
    /**
     * Constructs a new HDRIs manager.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     * @param {HDRIConfig} [defaultConfig] - Default configuration for all loaded HDRIs.
     */
    constructor(manager?: LoadingManager, defaultConfig?: HDRIConfig);
    /**
     * Sets the default texture type for HDRIs.
     *
     * @param {TextureDataType} type - The texture type (HalfFloatType or FloatType).
     * @return {HDRIsManager} A reference to this manager.
     */
    setType(type: TextureDataType): this;
    /**
     * Sets the default configuration for all HDRIs.
     *
     * @param {HDRIConfig} config - The configuration object.
     * @return {HDRIsManager} A reference to this manager.
     */
    setDefaultConfig(config: HDRIConfig): this;
    /**
     * Loads an HDR environment map.
     *
     * @param {string} url - The URL of the HDR file.
     * @param {HDRIConfig} [config] - Specific configuration for this HDRI.
     * @param {HDRILoadingCallbacks} [callbacks] - Loading callbacks.
     * @return {Promise<DataTexture>} A promise that resolves with the loaded texture.
     */
    load(url: string, config?: HDRIConfig, callbacks?: HDRILoadingCallbacks): Promise<DataTexture>;
    /**
     * Preloads multiple HDR environment maps.
     *
     * @param {string[]} urls - Array of URLs to preload.
     * @param {HDRIConfig} [config] - Configuration for all HDRIs.
     * @param {Function} [onProgress] - Progress callback.
     * @return {Promise<DataTexture[]>} A promise that resolves with all loaded textures.
     */
    preload(urls: string[], config?: HDRIConfig, onProgress?: (loaded: number, total: number, url: string) => void): Promise<DataTexture[]>;
    /**
     * Gets a loaded HDRI from cache.
     *
     * @param {string} url - The URL of the HDRI.
     * @return {DataTexture | undefined} The cached texture or undefined if not found.
     */
    get(url: string): DataTexture | undefined;
    /**
     * Checks if an HDRI is loaded.
     *
     * @param {string} url - The URL of the HDRI.
     * @return {boolean} True if the HDRI is loaded and cached.
     */
    isLoaded(url: string): boolean;
    /**
     * Removes an HDRI from cache and disposes its texture.
     *
     * @param {string} url - The URL of the HDRI to dispose.
     * @return {boolean} True if the HDRI was found and disposed.
     */
    dispose(url: string): boolean;
    /**
     * Disposes all cached HDRIs and clears the cache.
     */
    disposeAll(): void;
    /**
     * Gets the list of all cached HDRI URLs.
     *
     * @return {string[]} Array of cached HDRI URLs.
     */
    getCachedUrls(): string[];
    /**
     * Gets the list of loaded HDRI URLs.
     *
     * @return {string[]} Array of loaded HDRI URLs.
     */
    getLoadedUrls(): string[];
    /**
     * Applies configuration to a texture.
     *
     * @private
     * @param {DataTexture} texture - The texture to configure.
     * @param {HDRIConfig} config - The configuration to apply.
     */
    private applyConfig;
    /**
     * Creates a reflection mapping configuration.
     *
     * @return {HDRIConfig} A configuration for reflection mapping.
     */
    static reflectionConfig(): HDRIConfig;
    /**
     * Creates a refraction mapping configuration.
     *
     * @return {HDRIConfig} A configuration for refraction mapping.
     */
    static refractionConfig(): HDRIConfig;
}
export { HDRIsManager };
//# sourceMappingURL=HDRIsManager.d.ts.map