import type { LoadingManager, TextureDataType } from 'three';
import { DataTexture } from 'three';
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
}
/**
 * Manager for HDR environment maps with automatic format detection (HDR/WebP).
 *
 * ```js
 * const hdriManager = new HDRIsManager();
 *
 * // Load an environment map - automatically detects format
 * const envMap = await hdriManager.load('path/to/environment.hdr');
 * // or
 * const envMap = await hdriManager.load('path/to/environment_rgbm.webp');
 *
 * scene.environment = envMap;
 * ```
 */
declare class HDRIsManager {
    private hdrLoader;
    private webpLoader;
    private fileLoader;
    private cache;
    private defaultConfig;
    /**
     * Constructs a new HDRIs manager with automatic format detection.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     * @param {HDRIConfig} [defaultConfig] - Default configuration for all loaded HDRIs.
     */
    constructor(manager?: LoadingManager, defaultConfig?: HDRIConfig);
    /**
     * Detects the file format based on URL and file header.
     *
     * @private
     * @param {string} url - The URL to check.
     * @param {ArrayBuffer} [buffer] - Optional file buffer for header detection.
     * @return {Promise<'hdr' | 'webp'>} The detected format.
     */
    private detectFormat;
    /**
     * Gets the appropriate loader for the detected format.
     *
     * @private
     * @param {'hdr' | 'webp'} format - The detected format.
     * @return {HDRLoader | WebPHDRLoader} The appropriate loader.
     */
    private getLoaderForFormat;
    /**
     * Sets the default texture type for all HDRIs.
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
     * Loads an environment map with automatic format detection.
     *
     * @param {string} url - The URL of the environment file (HDR or WebP).
     * @param {HDRIConfig} [config] - Specific configuration for this environment.
     * @param {HDRILoadingCallbacks} [callbacks] - Loading callbacks.
     * @return {Promise<DataTexture>} A promise that resolves with the loaded texture.
     */
    load(url: string, config?: HDRIConfig, callbacks?: HDRILoadingCallbacks): Promise<DataTexture>;
    /**
     * Preloads multiple environment maps with automatic format detection.
     *
     * @param {string[]} urls - Array of URLs to preload.
     * @param {HDRIConfig} [config] - Configuration for all environments.
     * @param {Function} [onProgress] - Progress callback.
     * @return {Promise<DataTexture[]>} A promise that resolves with all loaded textures.
     */
    preload(urls: string[], config?: HDRIConfig, onProgress?: (loaded: number, total: number, url: string, format: string) => void): Promise<DataTexture[]>;
    /**
     * Gets a loaded environment map from cache.
     *
     * @param {string} url - The URL of the environment.
     * @return {DataTexture | undefined} The cached texture or undefined if not found.
     */
    get(url: string): DataTexture | undefined;
    /**
     * Gets the format used to load a specific environment.
     *
     * @param {string} url - The URL of the environment.
     * @return {'hdr' | 'webp' | undefined} The format used or undefined if not loaded.
     */
    getFormat(url: string): 'hdr' | 'webp' | undefined;
    /**
     * Checks if an environment is loaded.
     *
     * @param {string} url - The URL of the environment.
     * @return {boolean} True if the environment is loaded and cached.
     */
    isLoaded(url: string): boolean;
    /**
     * Removes an environment from cache and disposes its texture.
     *
     * @param {string} url - The URL of the environment to dispose.
     * @return {boolean} True if the environment was found and disposed.
     */
    dispose(url: string): boolean;
    /**
     * Disposes all cached environments and clears the cache.
     */
    disposeAll(): void;
    /**
     * Gets the list of all cached environment URLs.
     *
     * @return {string[]} Array of cached environment URLs.
     */
    getCachedUrls(): string[];
    /**
     * Gets the list of loaded environment URLs with their formats.
     *
     * @return {Array<{url: string, format: string}>} Array of loaded environments.
     */
    getLoadedEnvironments(): Array<{
        url: string;
        format: string;
    }>;
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