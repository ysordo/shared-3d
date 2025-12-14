import { THREE } from '../../lib';

export interface WebPHDRData {
  width: number;
  height: number;
  data: Float32Array | Uint16Array;
  type: typeof THREE.FloatType | typeof THREE.HalfFloatType;
  exposure: number;
  maxLuminance: number;
  averageLuminance: number;
  metadata?: Record<string, any>;
}

/**
 * Loader para WebP HDR (RGBM encoding)
 * Soporta .webp con metadatos HDR preservados
 * Ideal para environment maps ligeros y rápidos
 */
export class WebPHDRLoader {
  manager: THREE.LoadingManager;
  private type: typeof THREE.FloatType | typeof THREE.HalfFloatType = THREE.FloatType;
  private exposure = 1.0;
  private maxLuminance = 16.0;
  private preserveHDR = true;

  constructor(manager?: THREE.LoadingManager) {
    this.manager = manager || new THREE.LoadingManager();
  }

  setDataType(type: typeof THREE.FloatType | typeof THREE.HalfFloatType): this {
    this.type = type;
    return this;
  }

  setExposure(exposure: number): this {
    this.exposure = exposure;
    return this;
  }

  setMaxLuminance(maxLuminance: number): this {
    this.maxLuminance = maxLuminance;
    return this;
  }

  setPreserveHDR(preserve: boolean): this {
    this.preserveHDR = preserve;
    return this;
  }

  /**
   * Enhanced RGBM decoding with HDR preservation
   */
  private decodeRGBM(r: number, g: number, b: number, m: number): { r: number; g: number; b: number } {
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
  private calculateLuminance(r: number, g: number, b: number): number {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Analyze HDR characteristics from the decoded data
   */
  private analyzeHDRCharacteristics(data: Float32Array | Uint16Array, type: typeof THREE.FloatType | typeof THREE.HalfFloatType): {
    maxLuminance: number;
    averageLuminance: number;
    minLuminance: number;
  } {
    const numPixels = data.length / 4;
    let totalLuminance = 0;
    let maxLum = 0;
    let minLum = Number.MAX_VALUE;

    for (let i = 0; i < data.length; i += 4) {
      let r: number, g: number, b: number;

      if (type === THREE.FloatType) {
        r = (data as Float32Array)[i] as number;
        g = (data as Float32Array)[i + 1] as number;
        b = (data as Float32Array)[i + 2] as number;
      } else {
        r = THREE.DataUtils.fromHalfFloat((data as Uint16Array)[i] as number);
        g = THREE.DataUtils.fromHalfFloat((data as Uint16Array)[i + 1] as number);
        b = THREE.DataUtils.fromHalfFloat((data as Uint16Array)[i + 2] as number);
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

  load(
    url: string,
    onLoad?: (texture: THREE.DataTexture, data: WebPHDRData) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: Event) => void
  ): THREE.DataTexture {
    const loader = new THREE.FileLoader(this.manager);
    loader.setResponseType('arraybuffer');

    loader.load(
      url,
      async (buffer) => {
        try {
          const result = await this.parse(buffer as ArrayBuffer);
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
            format: 'webp-hdr',
            exposure: result.exposure,
            maxLuminance: result.maxLuminance,
            averageLuminance: result.averageLuminance,
            preserveHDR: this.preserveHDR,
            metadata: result.metadata
          };

          onLoad?.(texture, result);
        } catch (error) {
          onError?.(error as Event);
        }
      },
      onProgress,
      (err)=>onError?.(err as Event)
    );

    return new THREE.DataTexture(new Uint8Array(4), 1, 1, THREE.RGBAFormat);
  }

  async parse(buffer: ArrayBuffer): Promise<WebPHDRData> {
    return new Promise((resolve, reject) => {
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
              throw new Error('WebPHDRLoader: Unable to get canvas context');
            }

            const width = img.width;
            const height = img.height;
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, width, height);
            
            const imageData = ctx.getImageData(0, 0, width, height, {
              colorSpace: 'srgb'
            });
            const rgbaData = imageData.data;
            
            let data: Float32Array | Uint16Array;
            const numElements = width * height;
            
            // Temporary Float32 array for HDR analysis
            const tempFloatData = new Float32Array(numElements * 4);
            
            // First pass: decode all data and store in temp array
            for (let i = 0, j = 0; i < rgbaData.length; i += 4, j += 4) {
              const r = rgbaData[i] as number / 255.0;
              const g = rgbaData[i + 1] as number / 255.0;
              const b = rgbaData[i + 2] as number / 255.0;
              const m = rgbaData[i + 3] as number / 255.0;
              
              const hdr = this.decodeRGBM(r, g, b, m);
              
              tempFloatData[j] = hdr.r;
              tempFloatData[j + 1] = hdr.g;
              tempFloatData[j + 2] = hdr.b;
              tempFloatData[j + 3] = 1.0;
            }

            // Analyze HDR characteristics
            const hdrStats = this.analyzeHDRCharacteristics(tempFloatData, THREE.FloatType);
            
            // Adjust max luminance based on actual content
            const actualMaxLuminance = Math.max(hdrStats.maxLuminance, 1.0);

            // Second pass: convert to final format with proper HDR range
            if (this.type === THREE.FloatType) {
              data = new Float32Array(numElements * 4);
              data.set(tempFloatData);
            } else {
              data = new Uint16Array(numElements * 4);
              for (let i = 0, j = 0; i < tempFloatData.length; i += 4, j += 4) {
                data[j] = THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i] as number, 65504));
                data[j + 1] = THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i + 1] as number, 65504));
                data[j + 2] = THREE.DataUtils.toHalfFloat(Math.min(tempFloatData[i + 2] as number, 65504));
                data[j + 3] = THREE.DataUtils.toHalfFloat(1.0);
              }
            }
            
            const result: WebPHDRData = {
              width,
              height,
              data,
              type: this.type,
              exposure: this.exposure,
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
            };
            
            resolve(result);
            
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('WebPHDRLoader: Failed to load WebP image'));
        };
        
        img.src = url;
        
      } catch (error) {
        reject(error);
      }
    });
  }

  async loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.DataTexture> {
    return new Promise((resolve, reject) => {
      this.load(url, resolve, onProgress, reject);
    });
  }
}