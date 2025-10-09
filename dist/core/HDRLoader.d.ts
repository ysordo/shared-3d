import type { DataTexture, LoadingManager, TextureDataType } from 'three';
import { DataTextureLoader } from 'three';
interface TexData {
    width: number;
    height: number;
    data: Float32Array | Uint16Array;
    header: string;
    gamma: number;
    exposure: number;
    type: TextureDataType;
}
/**
 * A loader for the RGBE HDR texture format.
 *
 * ```js
 * const loader = new HDRLoader();
 * const envMap = await loader.loadAsync( 'textures/equirectangular/blouberg_sunrise_2_1k.hdr' );
 * envMap.mapping = THREE.EquirectangularReflectionMapping;
 *
 * scene.environment = envMap;
 * ```
 *
 * @augments DataTextureLoader
 * @three_import import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
 */
declare class HDRLoader extends DataTextureLoader {
    /**
     * The texture type.
     *
     * @type {(HalfFloatType|FloatType)}
     * @default HalfFloatType
     */
    type: TextureDataType;
    /**
     * Constructs a new RGBE/HDR loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Parses the given RGBE texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @return {TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer): TexData;
    /**
     * Sets the texture type.
     *
     * @param {(HalfFloatType|FloatType)} value - The texture type to set.
     * @return {HDRLoader} A reference to this loader.
     */
    setDataType(value: TextureDataType): this;
    load(url: string, onLoad?: (texture: DataTexture, texData: object) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: unknown) => void): any;
}
export { HDRLoader };
//# sourceMappingURL=HDRLoader.d.ts.map