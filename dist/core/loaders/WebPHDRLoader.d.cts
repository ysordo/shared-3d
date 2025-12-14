import * as THREE from 'three';

interface WebPHDRData {
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

export { type WebPHDRData, WebPHDRLoader };
