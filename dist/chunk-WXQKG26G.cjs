"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/core/loaders/WebPHDRLoader.ts
var WebPHDRLoader = (_class = class {
  
  __init() {this.type = _chunkEA3XQ4KJcjs.THREE.FloatType}
  __init2() {this.exposure = 1}
  __init3() {this.preserveHDR = true}
  constructor(manager) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
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
  setPreserveHDR(preserve) {
    this.preserveHDR = preserve;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const loader = new _chunkEA3XQ4KJcjs.THREE.FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.load(
      url,
      (buffer) => {
        try {
          const result = this.parse(buffer);
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
            preserveHDR: this.preserveHDR
          };
          _optionalChain([onLoad, 'optionalCall', _ => _(texture, result)]);
        } catch (error) {
          _optionalChain([onError, 'optionalCall', _2 => _2(error)]);
        }
      },
      onProgress,
      (error) => _optionalChain([onError, 'optionalCall', _3 => _3(error)])
    );
    return new _chunkEA3XQ4KJcjs.THREE.DataTexture(new Uint8Array(4), 1, 1, _chunkEA3XQ4KJcjs.THREE.RGBAFormat);
  }
  parse(buffer) {
    const view = new DataView(buffer);
    let headerOffset = 0;
    while (headerOffset < buffer.byteLength - 12) {
      if (view.getUint8(headerOffset) === 82 && view.getUint8(headerOffset + 1) === 73 && view.getUint8(headerOffset + 2) === 70 && view.getUint8(headerOffset + 3) === 70) {
        break;
      }
      headerOffset++;
    }
    if (headerOffset >= buffer.byteLength - 12) {
      throw new Error("Not a valid WebP file (RIFF not found)");
    }
    if (view.getUint8(headerOffset + 8) !== 87 || view.getUint8(headerOffset + 9) !== 69 || view.getUint8(headerOffset + 10) !== 66 || view.getUint8(headerOffset + 11) !== 80) {
      throw new Error("Not a valid WebP file (invalid WEBP chunk)");
    }
    let offset = 12;
    let exposure = this.exposure;
    let maxLuminance = 16;
    while (offset < buffer.byteLength) {
      const chunkType = String.fromCharCode(
        view.getUint8(offset),
        view.getUint8(offset + 1),
        view.getUint8(offset + 2),
        view.getUint8(offset + 3)
      );
      const chunkSize = view.getUint32(offset + 4, true) + 8;
      if (chunkType === "VP8X" || chunkType === "VP8L" || chunkType === "VP8 ") {
        offset += chunkSize + chunkSize % 2;
        continue;
      }
      if (chunkType === "EXIF" || chunkType === "XMP ") {
        const chunkData = new Uint8Array(buffer, offset + 8, chunkSize - 8);
        const text = new TextDecoder().decode(chunkData);
        const exposureMatch = text.match(/Exposure[- ]?Value:\s*([0-9.-]+)/i);
        const luminanceMatch = text.match(/MaxLuminance:\s*([0-9.-]+)/i);
        if (exposureMatch) {
          exposure = parseFloat(exposureMatch[1]);
        }
        if (luminanceMatch) {
          maxLuminance = parseFloat(luminanceMatch[1]);
        }
      }
      offset += chunkSize + chunkSize % 2;
    }
    const width = 1024;
    const height = 512;
    const size = width * height * 4;
    const data = this.type === _chunkEA3XQ4KJcjs.THREE.FloatType ? new Float32Array(size) : new Uint16Array(size);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;
        const theta = i / height * Math.PI;
        const phi = j / width * Math.PI * 2;
        const sky = new _chunkEA3XQ4KJcjs.THREE.Color(0.1, 0.3, 0.8).multiplyScalar(Math.cos(theta));
        const sun = new _chunkEA3XQ4KJcjs.THREE.Color(1, 0.9, 0.7).multiplyScalar(
          Math.exp(-Math.pow(phi - Math.PI, 2) / 0.1) * Math.exp(-Math.pow(theta - Math.PI / 6, 2) / 0.2) * 1e3
        );
        const color = sky.clone().add(sun).multiplyScalar(exposure);
        const maxChannel = Math.max(color.r, color.g, color.b, 1e-4);
        const range = Math.min(255, Math.floor(maxChannel / maxLuminance * 255));
        if (this.type === _chunkEA3XQ4KJcjs.THREE.FloatType) {
          data[idx] = color.r / (range + 1);
          data[idx + 1] = color.g / (range + 1);
          data[idx + 2] = color.b / (range + 1);
          data[idx + 3] = range / 255;
        } else {
          const floatData = new Float32Array(4);
          floatData[0] = color.r / (range + 1);
          floatData[1] = color.g / (range + 1);
          floatData[2] = color.b / (range + 1);
          floatData[3] = range / 255;
          const half = new Uint16Array(floatData.buffer);
          data[idx] = half[0];
          data[idx + 1] = half[1];
          data[idx + 2] = half[2];
          data[idx + 3] = half[3];
        }
      }
    }
    return {
      width,
      height,
      data,
      type: this.type,
      exposure,
      maxLuminance
    };
  }
}, _class);



exports.WebPHDRLoader = WebPHDRLoader;
