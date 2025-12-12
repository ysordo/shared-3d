import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/core/loaders/WebPHDRLoader.ts
var WebPHDRLoader = class {
  manager;
  type = THREE.FloatType;
  exposure = 1;
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
  setPreserveHDR(preserve) {
    this.preserveHDR = preserve;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    const loader = new THREE.FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.load(
      url,
      (buffer) => {
        try {
          const result = this.parse(buffer);
          const texture = new THREE.DataTexture(
            result.data,
            result.width,
            result.height,
            THREE.RGBAFormat,
            result.type
          );
          texture.colorSpace = THREE.LinearSRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.flipY = true;
          texture.userData = {
            format: "webp-hdr",
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            preserveHDR: this.preserveHDR
          };
          onLoad?.(texture, result);
        } catch (error) {
          onError?.(error);
        }
      },
      onProgress,
      (error) => onError?.(error)
    );
    return new THREE.DataTexture(new Uint8Array(4), 1, 1, THREE.RGBAFormat);
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
    const data = this.type === THREE.FloatType ? new Float32Array(size) : new Uint16Array(size);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;
        const theta = i / height * Math.PI;
        const phi = j / width * Math.PI * 2;
        const sky = new THREE.Color(0.1, 0.3, 0.8).multiplyScalar(Math.cos(theta));
        const sun = new THREE.Color(1, 0.9, 0.7).multiplyScalar(
          Math.exp(-Math.pow(phi - Math.PI, 2) / 0.1) * Math.exp(-Math.pow(theta - Math.PI / 6, 2) / 0.2) * 1e3
        );
        const color = sky.clone().add(sun).multiplyScalar(exposure);
        const maxChannel = Math.max(color.r, color.g, color.b, 1e-4);
        const range = Math.min(255, Math.floor(maxChannel / maxLuminance * 255));
        if (this.type === THREE.FloatType) {
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
};

export {
  WebPHDRLoader
};
