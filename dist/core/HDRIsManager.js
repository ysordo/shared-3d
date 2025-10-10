import { DataTexture } from 'three';
import { FloatType, HalfFloatType, LinearFilter, LinearSRGBColorSpace, EquirectangularReflectionMapping, EquirectangularRefractionMapping, FileLoader } from 'three';
import { HDRLoader } from './HDRLoader';
import { WebPHDRLoader } from './WebPHDRLoader';
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
class HDRIsManager {
    /**
     * Constructs a new HDRIs manager with automatic format detection.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     * @param {HDRIConfig} [defaultConfig] - Default configuration for all loaded HDRIs.
     */
    constructor(manager, defaultConfig = {}) {
        this.hdrLoader = new HDRLoader(manager);
        this.webpLoader = new WebPHDRLoader(manager);
        this.fileLoader = new FileLoader(manager);
        this.cache = new Map();
        this.defaultConfig = {
            mapping: EquirectangularReflectionMapping,
            flipY: true,
            generateMipmaps: false,
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            ...defaultConfig
        };
    }
    /**
     * Detects the file format based on URL and file header.
     *
     * @private
     * @param {string} url - The URL to check.
     * @param {ArrayBuffer} [buffer] - Optional file buffer for header detection.
     * @return {Promise<'hdr' | 'webp'>} The detected format.
     */
    async detectFormat(url, buffer) {
        // First check file extension
        const extension = url.toLowerCase().split('.').pop();
        if (extension === 'webp') {
            return 'webp';
        }
        if (extension === 'hdr') {
            return 'hdr';
        }
        // If no clear extension or ambiguous, check file header
        if (buffer) {
            try {
                const header = new Uint8Array(buffer, 0, 12);
                // Check for WebP signature: 'RIFF' + file size + 'WEBP'
                if (header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46 &&
                    header[8] === 0x57 && header[9] === 0x45 && header[10] === 0x42 && header[11] === 0x50) {
                    return 'webp';
                }
                // Check for HDR signature: usually starts with '#?RADIANCE'
                const decoder = new TextDecoder();
                const headerText = decoder.decode(header);
                if (headerText.includes('#?RADIANCE') || headerText.includes('#?')) {
                    return 'hdr';
                }
            }
            catch (error) {
                console.warn('Failed to detect format from header, falling back to extension');
            }
        }
        // Default to HDR for unknown formats (backward compatibility)
        return 'hdr';
    }
    /**
     * Gets the appropriate loader for the detected format.
     *
     * @private
     * @param {'hdr' | 'webp'} format - The detected format.
     * @return {HDRLoader | WebPHDRLoader} The appropriate loader.
     */
    getLoaderForFormat(format) {
        return format === 'webp' ? this.webpLoader : this.hdrLoader;
    }
    /**
     * Sets the default texture type for all HDRIs.
     *
     * @param {TextureDataType} type - The texture type (HalfFloatType or FloatType).
     * @return {HDRIsManager} A reference to this manager.
     */
    setType(type) {
        this.hdrLoader.setDataType(type);
        this.webpLoader.setDataType(type);
        return this;
    }
    /**
     * Sets the default configuration for all HDRIs.
     *
     * @param {HDRIConfig} config - The configuration object.
     * @return {HDRIsManager} A reference to this manager.
     */
    setDefaultConfig(config) {
        this.defaultConfig = { ...this.defaultConfig, ...config };
        return this;
    }
    /**
     * Loads an environment map with automatic format detection.
     *
     * @param {string} url - The URL of the environment file (HDR or WebP).
     * @param {HDRIConfig} [config] - Specific configuration for this environment.
     * @param {HDRILoadingCallbacks} [callbacks] - Loading callbacks.
     * @return {Promise<DataTexture>} A promise that resolves with the loaded texture.
     */
    async load(url, config, callbacks) {
        // Check cache first
        const cached = this.cache.get(url);
        if (cached) {
            if (cached.loaded) {
                return cached.texture;
            }
            if (cached.loading) {
                // Wait for the ongoing load to complete
                return new Promise((resolve, reject) => {
                    const checkInterval = setInterval(() => {
                        const entry = this.cache.get(url);
                        if (entry && entry.loaded) {
                            clearInterval(checkInterval);
                            resolve(entry.texture);
                        }
                        if (entry && !entry.loading && !entry.loaded) {
                            clearInterval(checkInterval);
                            reject(new Error(`Failed to load environment: ${url}`));
                        }
                    }, 50);
                });
            }
        }
        // Mark as loading
        this.cache.set(url, {
            texture: {},
            url,
            loaded: false,
            loading: true,
            loaderType: 'hdr' // Temporary, will be updated after detection
        });
        try {
            // First, load the file to detect format
            const buffer = await new Promise((resolve, reject) => {
                this.fileLoader.setResponseType('arraybuffer');
                this.fileLoader.load(url, (data) => {
                    resolve(data);
                }, (event) => {
                    if (callbacks?.onProgress) {
                        callbacks.onProgress(event);
                    }
                }, (event) => {
                    reject(event.error || new Error(`Failed to load file: ${url}`));
                });
            });
            // Detect format
            const format = await this.detectFormat(url, buffer);
            const loader = this.getLoaderForFormat(format);
            // Update cache with detected format
            const cacheEntry = this.cache.get(url);
            if (cacheEntry) {
                cacheEntry.loaderType = format;
            }
            console.log(`🔄 Detected format: ${format.toUpperCase()} for ${url}`);
            // Parse with the appropriate loader
            const texture = await new Promise((resolve, reject) => {
                // For HDRLoader, we need to use its parse method directly
                if (loader === this.hdrLoader) {
                    try {
                        const texData = loader.parse(buffer);
                        const texture = new DataTexture(texData.data, texData.width, texData.height, texData.format || undefined, texData.type);
                        this.applyConfig(texture, { ...this.defaultConfig, ...config });
                        // Update cache
                        const entry = {
                            texture,
                            url,
                            loaded: true,
                            loading: false,
                            loaderType: format
                        };
                        this.cache.set(url, entry);
                        if (callbacks?.onLoad) {
                            callbacks.onLoad(texture, texData);
                        }
                        resolve(texture);
                    }
                    catch (error) {
                        reject(error);
                    }
                }
                else {
                    // For WebPHDRLoader, use async parse
                    loader.parse(buffer)
                        .then((texData) => {
                        const texture = new DataTexture(texData.data, texData.width, texData.height, texData.format || undefined, texData.type);
                        this.applyConfig(texture, { ...this.defaultConfig, ...config });
                        // Update cache
                        const entry = {
                            texture,
                            url,
                            loaded: true,
                            loading: false,
                            loaderType: format
                        };
                        this.cache.set(url, entry);
                        if (callbacks?.onLoad) {
                            callbacks.onLoad(texture, texData);
                        }
                        resolve(texture);
                    })
                        .catch(reject);
                }
            });
            return texture;
        }
        catch (error) {
            // Ensure cache is cleaned up on error
            this.cache.delete(url);
            if (callbacks?.onError) {
                callbacks.onError(error);
            }
            throw error;
        }
    }
    /**
     * Preloads multiple environment maps with automatic format detection.
     *
     * @param {string[]} urls - Array of URLs to preload.
     * @param {HDRIConfig} [config] - Configuration for all environments.
     * @param {Function} [onProgress] - Progress callback.
     * @return {Promise<DataTexture[]>} A promise that resolves with all loaded textures.
     */
    async preload(urls, config, onProgress) {
        const total = urls.length;
        let loaded = 0;
        const promises = urls.map(url => this.load(url, config, {
            onLoad: (texture, texData) => {
                loaded++;
                const cacheEntry = this.cache.get(url);
                const format = cacheEntry?.loaderType || 'unknown';
                if (onProgress) {
                    onProgress(loaded, total, url, format);
                }
            }
        }));
        return Promise.all(promises);
    }
    /**
     * Gets a loaded environment map from cache.
     *
     * @param {string} url - The URL of the environment.
     * @return {DataTexture | undefined} The cached texture or undefined if not found.
     */
    get(url) {
        const entry = this.cache.get(url);
        return entry?.loaded ? entry.texture : undefined;
    }
    /**
     * Gets the format used to load a specific environment.
     *
     * @param {string} url - The URL of the environment.
     * @return {'hdr' | 'webp' | undefined} The format used or undefined if not loaded.
     */
    getFormat(url) {
        return this.cache.get(url)?.loaderType;
    }
    /**
     * Checks if an environment is loaded.
     *
     * @param {string} url - The URL of the environment.
     * @return {boolean} True if the environment is loaded and cached.
     */
    isLoaded(url) {
        return this.cache.get(url)?.loaded || false;
    }
    /**
     * Removes an environment from cache and disposes its texture.
     *
     * @param {string} url - The URL of the environment to dispose.
     * @return {boolean} True if the environment was found and disposed.
     */
    dispose(url) {
        const entry = this.cache.get(url);
        if (entry && entry.texture) {
            entry.texture.dispose();
            this.cache.delete(url);
            return true;
        }
        return false;
    }
    /**
     * Disposes all cached environments and clears the cache.
     */
    disposeAll() {
        for (const [url, entry] of this.cache.entries()) {
            if (entry.texture) {
                entry.texture.dispose();
            }
        }
        this.cache.clear();
    }
    /**
     * Gets the list of all cached environment URLs.
     *
     * @return {string[]} Array of cached environment URLs.
     */
    getCachedUrls() {
        return Array.from(this.cache.keys());
    }
    /**
     * Gets the list of loaded environment URLs with their formats.
     *
     * @return {Array<{url: string, format: string}>} Array of loaded environments.
     */
    getLoadedEnvironments() {
        return Array.from(this.cache.entries())
            .filter(([_, entry]) => entry.loaded)
            .map(([url, entry]) => ({ url, format: entry.loaderType }));
    }
    /**
     * Applies configuration to a texture.
     *
     * @private
     * @param {DataTexture} texture - The texture to configure.
     * @param {HDRIConfig} config - The configuration to apply.
     */
    applyConfig(texture, config) {
        if (config.mapping !== undefined) {
            texture.mapping = config.mapping;
        }
        if (config.flipY !== undefined) {
            texture.flipY = config.flipY;
        }
        if (config.generateMipmaps !== undefined) {
            texture.generateMipmaps = config.generateMipmaps;
        }
        if (config.minFilter !== undefined) {
            texture.minFilter = config.minFilter;
        }
        if (config.magFilter !== undefined) {
            texture.magFilter = config.magFilter;
        }
        // Apply color space for HDR textures
        if (texture.type === FloatType || texture.type === HalfFloatType) {
            texture.colorSpace = LinearSRGBColorSpace;
        }
    }
    /**
     * Creates a reflection mapping configuration.
     *
     * @return {HDRIConfig} A configuration for reflection mapping.
     */
    static reflectionConfig() {
        return {
            mapping: EquirectangularReflectionMapping,
            flipY: true,
            generateMipmaps: false,
            minFilter: LinearFilter,
            magFilter: LinearFilter
        };
    }
    /**
     * Creates a refraction mapping configuration.
     *
     * @return {HDRIConfig} A configuration for refraction mapping.
     */
    static refractionConfig() {
        return {
            mapping: EquirectangularRefractionMapping,
            flipY: true,
            generateMipmaps: false,
            minFilter: LinearFilter,
            magFilter: LinearFilter
        };
    }
}
export { HDRIsManager };
//# sourceMappingURL=HDRIsManager.js.map