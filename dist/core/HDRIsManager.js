import { FloatType, HalfFloatType, LinearFilter, LinearSRGBColorSpace, EquirectangularReflectionMapping, EquirectangularRefractionMapping } from 'three';
import { HDRLoader } from './HDRLoader';
import { WebPHDRLoader } from './WebPHDRLoader';
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
class HDRIsManager {
    /**
     * Constructs a new HDRIs manager.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     * @param {HDRIConfig} [defaultConfig] - Default configuration for all loaded HDRIs.
     */
    constructor(manager, defaultConfig = {}) {
        this.loader = new HDRLoader(manager);
        this.loaderMin = new WebPHDRLoader(manager);
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
     * Sets the default texture type for HDRIs.
     *
     * @param {TextureDataType} type - The texture type (HalfFloatType or FloatType).
     * @return {HDRIsManager} A reference to this manager.
     */
    setType(type) {
        this.loader.setDataType(type);
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
     * Loads an HDR environment map.
     *
     * @param {string} url - The URL of the HDR file.
     * @param {HDRIConfig} [config] - Specific configuration for this HDRI.
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
                            reject(new Error(`Failed to load HDRI: ${url}`));
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
            loading: true
        });
        try {
            const texture = await new Promise((resolve, reject) => {
                const ext = url.toLowerCase().split('.').reverse()[0];
                switch (ext) {
                    case 'hdr':
                        this.loader.load(url, (texture, texData) => {
                            // Apply configuration
                            this.applyConfig(texture, { ...this.defaultConfig, ...config });
                            // Update cache
                            const entry = {
                                texture,
                                url,
                                loaded: true,
                                loading: false
                            };
                            this.cache.set(url, entry);
                            // Call user callback
                            if (callbacks?.onLoad) {
                                callbacks.onLoad(texture, texData);
                            }
                            resolve(texture);
                        }, (event) => {
                            if (callbacks?.onProgress) {
                                callbacks.onProgress(event);
                            }
                        }, (event) => {
                            // Remove from cache on error
                            this.cache.delete(url);
                            if (callbacks?.onError) {
                                callbacks.onError(event);
                            }
                            reject(event.error || new Error(`Failed to load HDRI: ${url}`));
                        });
                        break;
                    case 'webp':
                        this.loaderMin.load(url, (texture, texData) => {
                            // Apply configuration
                            this.applyConfig(texture, { ...this.defaultConfig, ...config });
                            // Update cache
                            const entry = {
                                texture,
                                url,
                                loaded: true,
                                loading: false
                            };
                            this.cache.set(url, entry);
                            // Call user callback
                            if (callbacks?.onLoad) {
                                callbacks.onLoad(texture, texData);
                            }
                            resolve(texture);
                        }, (event) => {
                            if (callbacks?.onProgress) {
                                callbacks.onProgress(event);
                            }
                        }, (event) => {
                            // Remove from cache on error
                            this.cache.delete(url);
                            if (callbacks?.onError) {
                                callbacks.onError(event);
                            }
                            reject(event.error || new Error(`Failed to load HDRI: ${url}`));
                        });
                        break;
                }
                ;
            });
            return texture;
        }
        catch (error) {
            // Ensure cache is cleaned up on error
            this.cache.delete(url);
            throw error;
        }
    }
    /**
     * Preloads multiple HDR environment maps.
     *
     * @param {string[]} urls - Array of URLs to preload.
     * @param {HDRIConfig} [config] - Configuration for all HDRIs.
     * @param {Function} [onProgress] - Progress callback.
     * @return {Promise<DataTexture[]>} A promise that resolves with all loaded textures.
     */
    async preload(urls, config, onProgress) {
        const total = urls.length;
        let loaded = 0;
        const promises = urls.map(url => this.load(url, config, {
            onLoad: () => {
                loaded++;
                if (onProgress) {
                    onProgress(loaded, total, url);
                }
            }
        }));
        return Promise.all(promises);
    }
    /**
     * Gets a loaded HDRI from cache.
     *
     * @param {string} url - The URL of the HDRI.
     * @return {DataTexture | undefined} The cached texture or undefined if not found.
     */
    get(url) {
        const entry = this.cache.get(url);
        return entry?.loaded ? entry.texture : undefined;
    }
    /**
     * Checks if an HDRI is loaded.
     *
     * @param {string} url - The URL of the HDRI.
     * @return {boolean} True if the HDRI is loaded and cached.
     */
    isLoaded(url) {
        return this.cache.get(url)?.loaded || false;
    }
    /**
     * Removes an HDRI from cache and disposes its texture.
     *
     * @param {string} url - The URL of the HDRI to dispose.
     * @return {boolean} True if the HDRI was found and disposed.
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
     * Disposes all cached HDRIs and clears the cache.
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
     * Gets the list of all cached HDRI URLs.
     *
     * @return {string[]} Array of cached HDRI URLs.
     */
    getCachedUrls() {
        return Array.from(this.cache.keys());
    }
    /**
     * Gets the list of loaded HDRI URLs.
     *
     * @return {string[]} Array of loaded HDRI URLs.
     */
    getLoadedUrls() {
        return Array.from(this.cache.entries())
            .filter(([_, entry]) => entry.loaded)
            .map(([url, _]) => url);
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