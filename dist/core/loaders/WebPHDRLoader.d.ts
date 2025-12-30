import * as THREE from 'three';
import { WebPHDRData } from './loaders.d.js';
import '../cache/types.js';

/**
 * Loader para WebP HDR (RGBM encoding)
 * Soporta .webp con metadatos HDR preservados
 * Ideal para environment maps ligeros y rápidos
 */
declare class WebPHDRLoader {
    manager: THREE.LoadingManager;
    private type;
    private exposure;
    private maxLuminance;
    private preserveHDR;
    constructor(manager?: THREE.LoadingManager);
    setDataType(type: typeof THREE.FloatType | typeof THREE.HalfFloatType): this;
    setExposure(exposure: number): this;
    setMaxLuminance(maxLuminance: number): this;
    setPreserveHDR(preserve: boolean): this;
    /**
     * Enhanced RGBM decoding with HDR preservation
     */
    private decodeRGBM;
    /**
     * Calculate luminance from RGB values
     */
    private calculateLuminance;
    /**
     * Analyze HDR characteristics from the decoded data
     */
    private analyzeHDRCharacteristics;
    load(url: string, onLoad?: (texture: THREE.DataTexture, data: WebPHDRData) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: Event) => void): THREE.DataTexture;
    parse(buffer: ArrayBuffer): Promise<WebPHDRData>;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.DataTexture>;
}

export { WebPHDRLoader };
