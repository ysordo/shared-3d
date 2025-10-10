import type { LoadingManager, TextureDataType } from 'three';
import { DataTexture, DataTextureLoader } from 'three';
export interface TexData {
    width: number;
    height: number;
    data: Float32Array | Uint16Array;
    header: string;
    gamma: number;
    exposure: number;
    type: TextureDataType;
    maxLuminance: number;
    averageLuminance: number;
    metadata?: Record<string, any>;
}
/**
 * Enhanced loader for WebP-encoded HDR textures using RGBM encoding.
 *
 * This loader preserves all HDR characteristics including high dynamic range,
 * intensity, lighting information, and environment mapping capabilities.
 */
declare class WebPHDRLoader extends DataTextureLoader {
    /**
     * The texture type for the output HDR texture.
     */
    type: TextureDataType;
    /**
     * Whether to preserve high dynamic range characteristics
     */
    preserveHDR: boolean;
    /**
     * Maximum luminance value for tone mapping preservation
     */
    maxLuminance: number;
    /**
     * Exposure compensation for the loaded HDR texture
     */
    exposure: number;
    constructor(manager?: LoadingManager);
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
    /**
     * Parse WebP data with enhanced HDR preservation
     */
    parse(buffer: ArrayBuffer): Promise<TexData>;
    /**
     * Set the texture type with HDR considerations
     */
    setDataType(value: TextureDataType): this;
    /**
     * Set exposure compensation for HDR content
     */
    setExposure(exposure: number): this;
    /**
     * Set maximum luminance for HDR preservation
     */
    setMaxLuminance(maxLuminance: number): this;
    /**
     * Enable/disable HDR preservation
     */
    setPreserveHDR(preserve: boolean): this;
    /**
     * Enhanced load method with HDR optimization
     */
    load(url: string, onLoad?: (texture: DataTexture, texData: TexData) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: unknown) => void): DataTexture;
    /**
     * Async load with HDR preservation
     */
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DataTexture>;
}
export { WebPHDRLoader };
//# sourceMappingURL=WebPHDRLoader.d.ts.map