import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/loaders/WebPHDRLoader.ts
var WebPHDRLoader = class {
  manager;
  type = THREE.FloatType;
  exposure = 1;
  maxLuminance = 16;
  preserveHDR = true;
  constructor(manager) {
    this.manager = manager || new THREE.LoadingManager();
  }
  setDataType(type) {
    this.type = type;
    return this;
  }
  setExposure(exposure) {
    this.exposure = exposure;
    return this;
  }
  setMaxLuminance(maxLuminance) {
    this.maxLuminance = maxLuminance;
    return this;
  }
  setPreserveHDR(preserve) {
    this.preserveHDR = preserve;
    return this;
  }
  /**
   * Enhanced RGBM decoding with HDR preservation
   */
  decodeRGBM(r, g, b, m) {
    const scale = m * 6 * this.maxLuminance;
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
      if (type === THREE.FloatType) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
      } else {
        r = THREE.DataUtils.fromHalfFloat(data[i]);
        g = THREE.DataUtils.fromHalfFloat(data[i + 1]);
        b = THREE.DataUtils.fromHalfFloat(data[i + 2]);
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
  load(url, onLoad, onProgress, onError) {
    const loader = new THREE.FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    const texture = new THREE.DataTexture(
      new Uint8Array([0, 0, 0, 255]),
      1,
      1,
      THREE.RGBAFormat,
      this.type
    );
    texture.colorSpace = THREE.LinearSRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.flipY = true;
    texture.name = url;
    texture.userData = {
      isLoading: true,
      url
    };
    loader.load(
      url,
      async (buffer) => {
        try {
          const result = await this.parse(buffer);
          texture.image = {
            width: result.width,
            height: result.height,
            data: result.data
          };
          texture.format = THREE.RGBAFormat;
          texture.type = result.type;
          texture.needsUpdate = true;
          texture.userData = {
            ...texture.userData,
            isLoading: false,
            format: "webp-hdr",
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            averageLuminance: result.averageLuminance,
            preserveHDR: this.preserveHDR,
            metadata: result.metadata,
            loadedAt: Date.now()
          };
          if (onLoad) {
            onLoad(texture, result);
          }
        } catch (error) {
          texture.userData.error = error;
          texture.userData.isLoading = false;
          onError?.(error);
        }
      },
      onProgress,
      (err) => {
        texture.userData.error = err;
        texture.userData.isLoading = false;
        onError?.(err);
      }
    );
    return texture;
  }
  async parse(buffer) {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([buffer], { type: "image/webp" });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          try {
            URL.revokeObjectURL(url);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d", {
              willReadFrequently: true,
              colorSpace: "srgb"
            });
            if (!ctx) {
              throw new Error("WebPHDRLoader: Unable to get canvas context");
            }
            const width = img.width;
            const height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height, {
              colorSpace: "srgb"
            });
            const rgbaData = imageData.data;
            let data;
            const numElements = width * height;
            const tempFloatData = new Float32Array(numElements * 4);
            for (let i = 0, j = 0; i < rgbaData.length; i += 4, j += 4) {
              const r = rgbaData[i] / 255;
              const g = rgbaData[i + 1] / 255;
              const b = rgbaData[i + 2] / 255;
              const m = rgbaData[i + 3] / 255;
              const hdr = this.decodeRGBM(r, g, b, m);
              tempFloatData[j] = hdr.r;
              tempFloatData[j + 1] = hdr.g;
              tempFloatData[j + 2] = hdr.b;
              tempFloatData[j + 3] = 1;
            }
            const hdrStats = this.analyzeHDRCharacteristics(tempFloatData, THREE.FloatType);
            if (this.type === THREE.FloatType) {
              data = new Float32Array(numElements * 4);
              data.set(tempFloatData);
            } else {
              data = new Uint16Array(numElements * 4);
              for (let i = 0, j = 0; i < tempFloatData.length; i += 4, j += 4) {
                data[j] = THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i], 65504));
                data[j + 1] = THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i + 1], 65504));
                data[j + 2] = THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i + 2], 65504));
                data[j + 3] = THREE.DataUtils.toHalfFloat(1);
              }
            }
            const result = {
              width,
              height,
              data,
              type: this.type,
              exposure: this.exposure,
              maxLuminance: hdrStats.maxLuminance,
              averageLuminance: hdrStats.averageLuminance,
              metadata: {
                format: "RGBM",
                hdr: true,
                dynamicRange: "high",
                compression: "WebP",
                luminanceRange: {
                  min: hdrStats.minLuminance,
                  max: hdrStats.maxLuminance,
                  average: hdrStats.averageLuminance
                }
              }
            };
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("WebPHDRLoader: Failed to load WebP image"));
        };
        img.src = url;
      } catch (error) {
        reject(error);
      }
    });
  }
  async loadAsync(url, onProgress) {
    return new Promise((resolve, reject) => {
      this.load(url, resolve, onProgress, reject);
    });
  }
};

export {
  WebPHDRLoader
};
