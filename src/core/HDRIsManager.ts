import type {
	LoadingManager,
	TextureDataType,
	DataTexture,
    AnyMapping,
    MinificationTextureFilter,
    MagnificationTextureFilter} from 'three';
import {
	FloatType,
	HalfFloatType,
	LinearFilter,
	LinearSRGBColorSpace,
	EquirectangularReflectionMapping,
	EquirectangularRefractionMapping
} from 'three';

import { HDRLoader } from './HDRLoader';
import { WebPHDRLoader } from './WebPHDRLoader';

interface HDRICacheEntry {
	texture: DataTexture;
	url: string;
	loaded: boolean;
	loading: boolean;
}

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
	private loader: HDRLoader;
	private loaderMin: WebPHDRLoader;
	private cache: Map<string, HDRICacheEntry>;
	private defaultConfig: HDRIConfig;

	/**
	 * Constructs a new HDRIs manager.
	 * 
	 * @param {LoadingManager} [manager] - The loading manager.
	 * @param {HDRIConfig} [defaultConfig] - Default configuration for all loaded HDRIs.
	 */
	constructor(manager?: LoadingManager, defaultConfig: HDRIConfig = {}) {
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
	public setType(type: TextureDataType): this {
		this.loader.setDataType(type);
		return this;
	}

	/**
	 * Sets the default configuration for all HDRIs.
	 * 
	 * @param {HDRIConfig} config - The configuration object.
	 * @return {HDRIsManager} A reference to this manager.
	 */
	public setDefaultConfig(config: HDRIConfig): this {
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
	public async load(
		url: string, 
		config?: HDRIConfig, 
		callbacks?: HDRILoadingCallbacks
	): Promise<DataTexture> {
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
			texture: {} as DataTexture,
			url,
			loaded: false,
			loading: true
		});

		try {
			const texture = await new Promise<DataTexture>((resolve, reject) => {
                const ext = url.toLowerCase().split('.').reverse()[0];
                switch(ext){
                    case 'hdr': this.loader.load(
                        url,
                        (texture: DataTexture, texData: any) => {
                            // Apply configuration
                            this.applyConfig(texture, { ...this.defaultConfig, ...config });
                            
                            // Update cache
                            const entry: HDRICacheEntry = {
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
                        },
                        (event: ProgressEvent) => {
                            if (callbacks?.onProgress) {
                                callbacks.onProgress(event);
                            }
                        },
                        (event: unknown) => {
                            // Remove from cache on error
                            this.cache.delete(url);
                            if (callbacks?.onError) {
                                callbacks.onError(event as ErrorEvent);
                            }
                            reject((event as ErrorEvent).error || new Error(`Failed to load HDRI: ${url}`));
                        }
                    );
                    break;
                    case 'webp': this.loaderMin.load(
                        url,
                        (texture: DataTexture, texData: any) => {
                            // Apply configuration
                            this.applyConfig(texture, { ...this.defaultConfig, ...config });
                            
                            // Update cache
                            const entry: HDRICacheEntry = {
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
                        },
                        (event: ProgressEvent) => {
                            if (callbacks?.onProgress) {
                                callbacks.onProgress(event);
                            }
                        },
                        (event: unknown) => {
                            // Remove from cache on error
                            this.cache.delete(url);
                            if (callbacks?.onError) {
                                callbacks.onError(event as ErrorEvent);
                            }
                            reject((event as ErrorEvent).error || new Error(`Failed to load HDRI: ${url}`));
                        }
                    );
                    break;
                };
			});

			return texture;
		} catch (error) {
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
	public async preload(
		urls: string[], 
		config?: HDRIConfig, 
		onProgress?: (loaded: number, total: number, url: string) => void
	): Promise<DataTexture[]> {
		const total = urls.length;
		let loaded = 0;

		const promises = urls.map(url => 
			this.load(url, config, {
				onLoad: () => {
					loaded++;
					if (onProgress) {
						onProgress(loaded, total, url);
					}
				}
			})
		);

		return Promise.all(promises);
	}

	/**
	 * Gets a loaded HDRI from cache.
	 * 
	 * @param {string} url - The URL of the HDRI.
	 * @return {DataTexture | undefined} The cached texture or undefined if not found.
	 */
	public get(url: string): DataTexture | undefined {
		const entry = this.cache.get(url);
		return entry?.loaded ? entry.texture : undefined;
	}

	/**
	 * Checks if an HDRI is loaded.
	 * 
	 * @param {string} url - The URL of the HDRI.
	 * @return {boolean} True if the HDRI is loaded and cached.
	 */
	public isLoaded(url: string): boolean {
		return this.cache.get(url)?.loaded || false;
	}

	/**
	 * Removes an HDRI from cache and disposes its texture.
	 * 
	 * @param {string} url - The URL of the HDRI to dispose.
	 * @return {boolean} True if the HDRI was found and disposed.
	 */
	public dispose(url: string): boolean {
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
	public disposeAll(): void {
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
	public getCachedUrls(): string[] {
		return Array.from(this.cache.keys());
	}

	/**
	 * Gets the list of loaded HDRI URLs.
	 * 
	 * @return {string[]} Array of loaded HDRI URLs.
	 */
	public getLoadedUrls(): string[] {
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
	private applyConfig(texture: DataTexture, config: HDRIConfig): void {
		if (config.mapping !== undefined) {
			texture.mapping = config.mapping as AnyMapping;
		}
		if (config.flipY !== undefined) {
			texture.flipY = config.flipY;
		}
		if (config.generateMipmaps !== undefined) {
			texture.generateMipmaps = config.generateMipmaps;
		}
		if (config.minFilter !== undefined) {
			texture.minFilter = config.minFilter as MinificationTextureFilter;
		}
		if (config.magFilter !== undefined) {
			texture.magFilter = config.magFilter as MagnificationTextureFilter;
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
	public static reflectionConfig(): HDRIConfig {
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
	public static refractionConfig(): HDRIConfig {
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