import type { LoadingManager, TextureDataType } from 'three';
import { DataTexture, DataTextureLoader } from 'three';
export interface TexData {
    width: number;
    height: number;
    data: Float32Array | Uint16Array;
    header: string;
    gamma: number;
    exposure: number;
    type: TextureDataType;
}
/**
 * A loader for WebP-encoded HDR textures using RGBM encoding.
 *
 * This loader can load WebP files that contain HDR data encoded in RGBM format
 * and convert them back to proper HDR textures for use in Three.js.
 *
 * ```js
 * const loader = new WebPHDRLoader();
 * const envMap = await loader.loadAsync('environment_rgbm.webp');
 * envMap.mapping = THREE.EquirectangularReflectionMapping;
 *
 * scene.environment = envMap;
 * ```
 *
 * @augments DataTextureLoader
 */
declare class WebPHDRLoader extends DataTextureLoader {
    /**
     * The texture type for the output HDR texture.
     *
     * @type {TextureDataType}
     * @default FloatType
     */
    type: TextureDataType;
    /**
     * Constructs a new WebP HDR loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Decodes RGBM data back to HDR
     * @param {number} r - Red component (0-1)
     * @param {number} g - Green component (0-1)
     * @param {number} b - Blue component (0-1)
     * @param {number} m - Multiplier component (0-1)
     * @returns {Object} Decoded HDR values
     */
    private decodeRGBM;
    /**
     * Parses WebP data containing RGBM-encoded HDR content
     *
     * @param {ArrayBuffer} buffer - The WebP file data
     * @return {Promise<TexData>} An object representing the parsed texture data
     */
    parse(buffer: ArrayBuffer): Promise<TexData>;
    /**
     * Sets the texture type.
     *
     * @param {(HalfFloatType|FloatType)} value - The texture type to set.
     * @return {WebPHDRLoader} A reference to this loader.
     */
    setDataType(value: TextureDataType): this;
    /**
     * Loads a WebP HDR texture.
     *
     * @param {string} url - The URL of the WebP HDR file.
     * @param {Function} onLoad - Callback when loading is complete.
     * @param {Function} onProgress - Callback for progress updates.
     * @param {Function} onError - Callback for errors.
     * @return {DataTexture} The loaded texture.
     */
    load(url: string, onLoad?: (texture: DataTexture, texData: TexData) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: unknown) => void): DataTexture;
    /**
     * Loads a WebP HDR texture asynchronously.
     *
     * @param {string} url - The URL of the WebP HDR file.
     * @param {Function} onProgress - Callback for progress updates.
     * @return {Promise<DataTexture>} Promise that resolves with the loaded texture.
     */
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DataTexture>;
}
export { WebPHDRLoader };
//# sourceMappingURL=WebPHDRLoader.d.ts.map