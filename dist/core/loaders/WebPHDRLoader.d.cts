import * as THREE from 'three';

interface WebPHDRData {
    width: number;
    height: number;
    data: Float32Array | Uint16Array;
    type: typeof THREE.FloatType | typeof THREE.HalfFloatType;
    exposure: number;
    maxLuminance: number;
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
    private preserveHDR;
    constructor(manager?: THREE.LoadingManager);
    setDataType(type: typeof THREE.FloatType | typeof THREE.HalfFloatType): this;
    setExposure(exposure: number): this;
    setPreserveHDR(preserve: boolean): this;
    load(url: string, onLoad?: (texture: THREE.DataTexture, data: WebPHDRData) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: Event) => void): THREE.DataTexture;
    parse(buffer: ArrayBuffer): WebPHDRData;
}

export { type WebPHDRData, WebPHDRLoader };
