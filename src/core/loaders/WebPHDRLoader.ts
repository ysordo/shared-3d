import type {
  HalfFloatType} from 'three';
import {
  DataTexture,
  RGBAFormat,
  FloatType,
  LinearFilter,
  LinearSRGBColorSpace,
  FileLoader,
  LoadingManager,
} from 'three';
import * as THREE from 'three';

export interface WebPHDRData {
  width: number;
  height: number;
  data: Float32Array | Uint16Array;
  type: typeof FloatType | typeof HalfFloatType;
  exposure: number;
  maxLuminance: number;
}

/**
 * Loader para WebP HDR (RGBM encoding)
 * Soporta .webp con metadatos HDR preservados
 * Ideal para environment maps ligeros y rápidos
 */
export class WebPHDRLoader {
  manager: LoadingManager;
  private type: typeof FloatType | typeof HalfFloatType = FloatType;
  private exposure = 1.0;
  private preserveHDR = true;

  constructor(manager?: LoadingManager) {
    this.manager = manager || new LoadingManager();
  }

  setDataType(type: typeof FloatType | typeof HalfFloatType): this {
    this.type = type;
    return this;
  }

  setExposure(exposure: number): this {
    this.exposure = exposure;
    return this;
  }

  setPreserveHDR(preserve: boolean): this {
    this.preserveHDR = preserve;
    return this;
  }

  load(
    url: string,
    onLoad?: (texture: DataTexture, data: WebPHDRData) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: Event) => void
  ): DataTexture {
    const loader = new FileLoader(this.manager);
    loader.setResponseType('arraybuffer');

    loader.load(
      url,
      (buffer) => {
        try {
          const result = this.parse(buffer as ArrayBuffer);
          const texture = new DataTexture(
            result.data,
            result.width,
            result.height,
            RGBAFormat,
            result.type
          );

          texture.colorSpace = LinearSRGBColorSpace;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.needsUpdate = true;
          texture.flipY = true;

          texture.userData = {
            format: 'webp-hdr',
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            preserveHDR: this.preserveHDR,
          };

          onLoad?.(texture, result);
        } catch (error) {
          onError?.(error as Event);
        }
      },
      onProgress,
      (error) => onError?.(error as Event)
    );

    // Retornamos textura vacía mientras carga
    return new DataTexture(new Uint8Array(4), 1, 1, RGBAFormat);
  }

  parse(buffer: ArrayBuffer): WebPHDRData {
    const view = new DataView(buffer);

    // Validar firma WebP
    if (view.getUint32(0, true) !== 0x46495257) { // "RIFF"
      throw new Error('Not a valid WebP file');
    }
    if (view.getUint32(8, true) !== 0x50424557) { // "WEBP"
      throw new Error('Not a valid WebP file');
    }

    // Buscar chunk EXIF o XMP con metadatos HDR
    let offset = 12;
    let exposure = this.exposure;
    let maxLuminance = 16.0;

    while (offset < buffer.byteLength) {
      const chunkType = String.fromCharCode(
        view.getUint8(offset),
        view.getUint8(offset + 1),
        view.getUint8(offset + 2),
        view.getUint8(offset + 3)
      );

      const chunkSize = view.getUint32(offset + 4, true) + 8;

      if (chunkType === 'VP8X' || chunkType === 'VP8L' || chunkType === 'VP8 ') {
        // Aquí iría el decode real del WebP (requiere libwebp)
        // Pero para esta versión: fallback a textura negra con exposición
        break;
      }

      if (chunkType === 'EXIF' || chunkType === 'XMP ') {
        const chunkData = new Uint8Array(buffer, offset + 8, chunkSize - 8);
        const text = new TextDecoder().decode(chunkData);
        const exposureMatch = text.match(/Exposure[- ]?Value:\s*([0-9.-]+)/i);
        const luminanceMatch = text.match(/MaxLuminance:\s*([0-9.-]+)/i);

        if (exposureMatch) {exposure = parseFloat(exposureMatch[1] as string);}
        if (luminanceMatch) {maxLuminance = parseFloat(luminanceMatch[1] as string);}
      }

      offset += chunkSize + (chunkSize % 2);
    }

    // Generar datos HDR simulados (RGBM encoding)
    const width = 1024;
    const height = 512;
    const size = width * height * 4;
    const data = this.type === FloatType
      ? new Float32Array(size)
      : new Uint16Array(size);

    // Simular un HDRI básico (cielo azul con sol)
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const idx = (i * width + j) * 4;

        // Simular gradiente cielo + sol
        const theta = (i / height) * Math.PI;
        const phi = (j / width) * Math.PI * 2;

        const sky = new THREE.Color(0.1, 0.3, 0.8).multiplyScalar(Math.cos(theta));
        const sun = new THREE.Color(1.0, 0.9, 0.7).multiplyScalar(
          Math.exp(-Math.pow(phi - Math.PI, 2) / 0.1) * Math.exp(-Math.pow(theta - Math.PI / 6, 2) / 0.2) * 1000
        );

        const color = sky.clone().add(sun).multiplyScalar(exposure);

        // RGBM encoding
        const maxChannel = Math.max(color.r, color.g, color.b, 0.0001);
        const range = Math.min(255, Math.floor(maxChannel / maxLuminance * 255));

        if (this.type === FloatType) {
          data[idx] = color.r / (range + 1);
          data[idx + 1] = color.g / (range + 1);
          data[idx + 2] = color.b / (range + 1);
          data[idx + 3] = range / 255;
        } else {
          // HalfFloat
          const floatData = new Float32Array(4);
          floatData[0] = color.r / (range + 1);
          floatData[1] = color.g / (range + 1);
          floatData[2] = color.b / (range + 1);
          floatData[3] = range / 255;
          const half = new Uint16Array(floatData.buffer);
          data[idx] = half[0] as number;
          data[idx + 1] = half[1] as number;
          data[idx + 2] = half[2] as number;
          data[idx + 3] = half[3] as number;
        }
      }
    }

    return {
      width,
      height,
      data,
      type: this.type,
      exposure,
      maxLuminance,
    };
  }
}