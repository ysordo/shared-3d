"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/loaders/WebPHDRLoader.ts
var WebPHDRLoader = (_class = class {
  
  __init() {this.type = _chunkEA3XQ4KJcjs.THREE.FloatType}
  __init2() {this.exposure = 1}
  __init3() {this.maxLuminance = 16}
  __init4() {this.preserveHDR = true}
  constructor(manager) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);
    this.manager = manager || new _chunkEA3XQ4KJcjs.THREE.LoadingManager();
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
      if (type === _chunkEA3XQ4KJcjs.THREE.FloatType) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
      } else {
        r = _chunkEA3XQ4KJcjs.THREE.DataUtils.fromHalfFloat(data[i]);
        g = _chunkEA3XQ4KJcjs.THREE.DataUtils.fromHalfFloat(data[i + 1]);
        b = _chunkEA3XQ4KJcjs.THREE.DataUtils.fromHalfFloat(data[i + 2]);
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
    const loader = new _chunkEA3XQ4KJcjs.THREE.FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.load(
      url,
      async (buffer) => {
        try {
          const result = await this.parse(buffer);
          const texture = new _chunkEA3XQ4KJcjs.THREE.DataTexture(
            result.data,
            result.width,
            result.height,
            _chunkEA3XQ4KJcjs.THREE.RGBAFormat,
            result.type
          );
          texture.colorSpace = _chunkEA3XQ4KJcjs.THREE.LinearSRGBColorSpace;
          texture.minFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          texture.magFilter = _chunkEA3XQ4KJcjs.THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.flipY = true;
          texture.userData = {
            format: "webp-hdr",
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            averageLuminance: result.averageLuminance,
            preserveHDR: this.preserveHDR,
            metadata: result.metadata
          };
          _optionalChain([onLoad, 'optionalCall', _ => _(texture, result)]);
        } catch (error) {
          _optionalChain([onError, 'optionalCall', _2 => _2(error)]);
        }
      },
      onProgress,
      (err) => _optionalChain([onError, 'optionalCall', _3 => _3(err)])
    );
    return new _chunkEA3XQ4KJcjs.THREE.DataTexture(new Uint8Array(4), 1, 1, _chunkEA3XQ4KJcjs.THREE.RGBAFormat);
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
            const hdrStats = this.analyzeHDRCharacteristics(tempFloatData, _chunkEA3XQ4KJcjs.THREE.FloatType);
            const actualMaxLuminance = Math.max(hdrStats.maxLuminance, 1);
            if (this.type === _chunkEA3XQ4KJcjs.THREE.FloatType) {
              data = new Float32Array(numElements * 4);
              data.set(tempFloatData);
            } else {
              data = new Uint16Array(numElements * 4);
              for (let i = 0, j = 0; i < tempFloatData.length; i += 4, j += 4) {
                data[j] = _chunkEA3XQ4KJcjs.THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i], 65504));
                data[j + 1] = _chunkEA3XQ4KJcjs.THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i + 1], 65504));
                data[j + 2] = _chunkEA3XQ4KJcjs.THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i + 2], 65504));
                data[j + 3] = _chunkEA3XQ4KJcjs.THREE.DataUtils.toHalfFloat(1);
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
}, _class);



exports.WebPHDRLoader = WebPHDRLoader;
