import { DataTexture, DataTextureLoader, DataUtils, FloatType, HalfFloatType, LinearFilter, LinearSRGBColorSpace, RGBAFormat, FileLoader } from 'three';
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
class WebPHDRLoader extends DataTextureLoader {
    /**
     * Constructs a new WebP HDR loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager) {
        super(manager);
        this.type = FloatType;
    }
    /**
     * Decodes RGBM data back to HDR
     * @param {number} r - Red component (0-1)
     * @param {number} g - Green component (0-1)
     * @param {number} b - Blue component (0-1)
     * @param {number} m - Multiplier component (0-1)
     * @returns {Object} Decoded HDR values
     */
    decodeRGBM(r, g, b, m) {
        const scale = m * 6.0;
        return {
            r: r * scale,
            g: g * scale,
            b: b * scale
        };
    }
    /**
     * Parses WebP data containing RGBM-encoded HDR content
     *
     * @param {ArrayBuffer} buffer - The WebP file data
     * @return {Promise<TexData>} An object representing the parsed texture data
     */
    async parse(buffer) {
        return new Promise(async (resolve, reject) => {
            try {
                // Convert ArrayBuffer to Blob for image decoding
                const blob = new Blob([buffer], { type: 'image/webp' });
                const url = URL.createObjectURL(blob);
                // Create image element to load and decode WebP
                const img = new Image();
                img.onload = () => {
                    try {
                        URL.revokeObjectURL(url);
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        if (!ctx) {
                            throw new Error('THREE.WebPHDRLoader: Unable to get canvas context');
                        }
                        const width = img.width;
                        const height = img.height;
                        canvas.width = width;
                        canvas.height = height;
                        // Draw WebP image to canvas
                        ctx.drawImage(img, 0, 0);
                        // Extract RGBA data
                        const imageData = ctx.getImageData(0, 0, width, height);
                        const rgbaData = imageData.data;
                        let data;
                        let type;
                        const numElements = width * height;
                        // Convert RGBM back to HDR based on requested type
                        switch (this.type) {
                            case FloatType: {
                                // Float32 output
                                const floatArray = new Float32Array(numElements * 4);
                                for (let i = 0, j = 0; i < rgbaData.length; i += 4, j += 4) {
                                    const r = rgbaData[i] / 255.0;
                                    const g = rgbaData[i + 1] / 255.0;
                                    const b = rgbaData[i + 2] / 255.0;
                                    const m = rgbaData[i + 3] / 255.0;
                                    const hdr = this.decodeRGBM(r, g, b, m);
                                    floatArray[j] = hdr.r;
                                    floatArray[j + 1] = hdr.g;
                                    floatArray[j + 2] = hdr.b;
                                    floatArray[j + 3] = 1.0; // Alpha
                                }
                                data = floatArray;
                                type = FloatType;
                                break;
                            }
                            case HalfFloatType: {
                                // HalfFloat output
                                const halfArray = new Uint16Array(numElements * 4);
                                for (let i = 0, j = 0; i < rgbaData.length; i += 4, j += 4) {
                                    const r = rgbaData[i] / 255.0;
                                    const g = rgbaData[i + 1] / 255.0;
                                    const b = rgbaData[i + 2] / 255.0;
                                    const m = rgbaData[i + 3] / 255.0;
                                    const hdr = this.decodeRGBM(r, g, b, m);
                                    halfArray[j] = DataUtils.toHalfFloat(Math.min(hdr.r, 65504));
                                    halfArray[j + 1] = DataUtils.toHalfFloat(Math.min(hdr.g, 65504));
                                    halfArray[j + 2] = DataUtils.toHalfFloat(Math.min(hdr.b, 65504));
                                    halfArray[j + 3] = DataUtils.toHalfFloat(1.0);
                                }
                                data = halfArray;
                                type = HalfFloatType;
                                break;
                            }
                            default:
                                reject(new Error('THREE.WebPHDRLoader: Unsupported type: ' + this.type));
                                return;
                        }
                        resolve({
                            width: width,
                            height: height,
                            data: data,
                            header: 'WebP RGBM HDR',
                            gamma: 1.0,
                            exposure: 1.0,
                            type: type
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                };
                img.onerror = () => {
                    URL.revokeObjectURL(url);
                    reject(new Error('THREE.WebPHDRLoader: Failed to load WebP image'));
                };
                img.src = url;
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Sets the texture type.
     *
     * @param {(HalfFloatType|FloatType)} value - The texture type to set.
     * @return {WebPHDRLoader} A reference to this loader.
     */
    setDataType(value) {
        this.type = value;
        return this;
    }
    /**
     * Loads a WebP HDR texture.
     *
     * @param {string} url - The URL of the WebP HDR file.
     * @param {Function} onLoad - Callback when loading is complete.
     * @param {Function} onProgress - Callback for progress updates.
     * @param {Function} onError - Callback for errors.
     * @return {DataTexture} The loaded texture.
     */
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const onLoadCallback = function (texture, texData) {
            try {
                // Configure texture for HDR use
                switch (texture.type) {
                    case FloatType:
                    case HalfFloatType:
                        texture.colorSpace = LinearSRGBColorSpace;
                        texture.minFilter = LinearFilter;
                        texture.magFilter = LinearFilter;
                        texture.generateMipmaps = false;
                        texture.flipY = true;
                        break;
                }
                if (onLoad) {
                    onLoad(texture, texData);
                }
            }
            catch (error) {
                if (onError) {
                    onError(error);
                }
            }
        };
        // Override the load function to handle WebP parsing
        const _load = function (url, onLoad, onProgress, onError) {
            const loader = new FileLoader(scope.manager);
            loader.setPath(scope.path);
            loader.setResponseType('arraybuffer');
            loader.setRequestHeader(scope.requestHeader);
            loader.setWithCredentials(scope.withCredentials);
            loader.load(url, function (buffer) {
                try {
                    scope.parse(buffer).then(texData => {
                        const texture = new DataTexture(texData.data, texData.width, texData.height, RGBAFormat, texData.type);
                        onLoadCallback(texture, texData);
                    });
                }
                catch (error) {
                    if (onError) {
                        onError(error);
                    }
                }
            }, onProgress, onError);
            // Return a dummy texture for now, it will be replaced in the callback
            return new DataTexture(new Uint8Array(4), 1, 1, RGBAFormat);
        };
        return _load.call(this, url, onLoadCallback, onProgress, onError);
    }
    /**
     * Loads a WebP HDR texture asynchronously.
     *
     * @param {string} url - The URL of the WebP HDR file.
     * @param {Function} onProgress - Callback for progress updates.
     * @return {Promise<DataTexture>} Promise that resolves with the loaded texture.
     */
    async loadAsync(url, onProgress) {
        return new Promise((resolve, reject) => {
            this.load(url, resolve, onProgress, reject);
        });
    }
}
export { WebPHDRLoader };
//# sourceMappingURL=WebPHDRLoader.js.map