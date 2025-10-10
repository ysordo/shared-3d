import { DataTexture, DataTextureLoader, DataUtils, FloatType, HalfFloatType, LinearFilter, LinearSRGBColorSpace, RGBAFormat, FileLoader } from 'three';
/**
 * Enhanced loader for WebP-encoded HDR textures using RGBM encoding.
 *
 * This loader preserves all HDR characteristics including high dynamic range,
 * intensity, lighting information, and environment mapping capabilities.
 */
class WebPHDRLoader extends DataTextureLoader {
    constructor(manager) {
        super(manager);
        this.type = FloatType;
        this.preserveHDR = true;
        this.maxLuminance = 16.0; // Default max luminance for HDR
        this.exposure = 1.0;
    }
    /**
     * Enhanced RGBM decoding with HDR preservation
     */
    decodeRGBM(r, g, b, m) {
        // RGBM decoding with extended range for HDR
        const scale = m * 6.0 * this.maxLuminance;
        return {
            r: r * scale * this.exposure,
            g: g * scale * this.exposure,
            b: b * scale * this.exposure
        };
    }
    /**
     * Calculate luminance from RGB values
     */
    calculateLuminance(r, g, b) {
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    /**
     * Analyze HDR characteristics from the decoded data
     */
    analyzeHDRCharacteristics(data, type) {
        const numPixels = data.length / 4;
        let totalLuminance = 0;
        let maxLum = 0;
        let minLum = Number.MAX_VALUE;
        for (let i = 0; i < data.length; i += 4) {
            let r, g, b;
            if (type === FloatType) {
                r = data[i];
                g = data[i + 1];
                b = data[i + 2];
            }
            else {
                r = DataUtils.fromHalfFloat(data[i]);
                g = DataUtils.fromHalfFloat(data[i + 1]);
                b = DataUtils.fromHalfFloat(data[i + 2]);
            }
            const lum = this.calculateLuminance(r, g, b);
            totalLuminance += lum;
            maxLum = Math.max(maxLum, lum);
            minLum = Math.min(minLum, lum);
        }
        return {
            maxLuminance: maxLum,
            averageLuminance: totalLuminance / numPixels,
            minLuminance: minLum
        };
    }
    /**
     * Parse WebP data with enhanced HDR preservation
     */
    async parse(buffer) {
        return new Promise(async (resolve, reject) => {
            try {
                const blob = new Blob([buffer], { type: 'image/webp' });
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = () => {
                    try {
                        URL.revokeObjectURL(url);
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d', {
                            willReadFrequently: true,
                            colorSpace: 'srgb'
                        });
                        if (!ctx) {
                            throw new Error('THREE.WebPHDRLoader: Unable to get canvas context');
                        }
                        const width = img.width;
                        const height = img.height;
                        canvas.width = width;
                        canvas.height = height;
                        // Preserve color space for HDR
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(img, 0, 0, width, height);
                        const imageData = ctx.getImageData(0, 0, width, height, {
                            colorSpace: 'srgb'
                        });
                        const rgbaData = imageData.data;
                        let data;
                        let type;
                        const numElements = width * height;
                        // Temporary Float32 array for HDR analysis
                        const tempFloatData = new Float32Array(numElements * 4);
                        // First pass: decode all data and store in temp array
                        for (let i = 0, j = 0; i < rgbaData.length; i += 4, j += 4) {
                            const r = rgbaData[i] / 255.0;
                            const g = rgbaData[i + 1] / 255.0;
                            const b = rgbaData[i + 2] / 255.0;
                            const m = rgbaData[i + 3] / 255.0;
                            const hdr = this.decodeRGBM(r, g, b, m);
                            tempFloatData[j] = hdr.r;
                            tempFloatData[j + 1] = hdr.g;
                            tempFloatData[j + 2] = hdr.b;
                            tempFloatData[j + 3] = 1.0;
                        }
                        // Analyze HDR characteristics
                        const hdrStats = this.analyzeHDRCharacteristics(tempFloatData, FloatType);
                        // Adjust max luminance based on actual content
                        this.maxLuminance = Math.max(hdrStats.maxLuminance, 1.0);
                        // Second pass: convert to final format with proper HDR range
                        switch (this.type) {
                            case FloatType: {
                                data = new Float32Array(numElements * 4);
                                for (let i = 0; i < tempFloatData.length; i += 4) {
                                    data[i] = tempFloatData[i];
                                    data[i + 1] = tempFloatData[i + 1];
                                    data[i + 2] = tempFloatData[i + 2];
                                    data[i + 3] = tempFloatData[i + 3];
                                }
                                type = FloatType;
                                break;
                            }
                            case HalfFloatType: {
                                data = new Uint16Array(numElements * 4);
                                for (let i = 0, j = 0; i < tempFloatData.length; i += 4, j += 4) {
                                    data[j] = DataUtils.toHalfFloat(Math.min(tempFloatData[i], 65504));
                                    data[j + 1] = DataUtils.toHalfFloat(Math.min(tempFloatData[i + 1], 65504));
                                    data[j + 2] = DataUtils.toHalfFloat(Math.min(tempFloatData[i + 2], 65504));
                                    data[j + 3] = DataUtils.toHalfFloat(1.0);
                                }
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
                            header: 'WebP RGBM HDR - Enhanced',
                            gamma: 1.0,
                            exposure: this.exposure,
                            type: type,
                            maxLuminance: hdrStats.maxLuminance,
                            averageLuminance: hdrStats.averageLuminance,
                            metadata: {
                                format: 'RGBM',
                                hdr: true,
                                dynamicRange: 'high',
                                compression: 'WebP',
                                luminanceRange: {
                                    min: hdrStats.minLuminance,
                                    max: hdrStats.maxLuminance,
                                    average: hdrStats.averageLuminance
                                }
                            }
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
     * Set the texture type with HDR considerations
     */
    setDataType(value) {
        this.type = value;
        return this;
    }
    /**
     * Set exposure compensation for HDR content
     */
    setExposure(exposure) {
        this.exposure = exposure;
        return this;
    }
    /**
     * Set maximum luminance for HDR preservation
     */
    setMaxLuminance(maxLuminance) {
        this.maxLuminance = maxLuminance;
        return this;
    }
    /**
     * Enable/disable HDR preservation
     */
    setPreserveHDR(preserve) {
        this.preserveHDR = preserve;
        return this;
    }
    /**
     * Enhanced load method with HDR optimization
     */
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const onLoadCallback = function (texture, texData) {
            try {
                // Enhanced texture configuration for HDR environment mapping
                texture.colorSpace = LinearSRGBColorSpace;
                texture.minFilter = LinearFilter;
                texture.magFilter = LinearFilter;
                texture.generateMipmaps = false;
                texture.flipY = true;
                // Set texture properties for HDR usage
                texture.needsUpdate = true;
                // Add HDR metadata to texture userData
                texture.userData = {
                    ...texture.userData,
                    hdr: true,
                    maxLuminance: texData.maxLuminance,
                    averageLuminance: texData.averageLuminance,
                    exposure: texData.exposure,
                    metadata: texData.metadata
                };
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
                    }).catch(error => {
                        if (onError) {
                            onError(error);
                        }
                    });
                }
                catch (error) {
                    if (onError) {
                        onError(error);
                    }
                }
            }, onProgress, onError);
            return new DataTexture(new Uint8Array(4), 1, 1, RGBAFormat);
        };
        return _load.call(this, url, onLoadCallback, onProgress, onError);
    }
    /**
     * Async load with HDR preservation
     */
    async loadAsync(url, onProgress) {
        return new Promise((resolve, reject) => {
            this.load(url, resolve, onProgress, reject);
        });
    }
}
export { WebPHDRLoader };
//# sourceMappingURL=WebPHDRLoader.js.map