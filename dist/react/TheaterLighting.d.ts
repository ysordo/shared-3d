/**
 * Props for the TheaterLighting component.
 * @property {number} [intensity=1.0] - Intensity of the lights
 * @property {number} [lightCount=8] - Number of lights in the circle
 * @property {number} [radiusFactor=1.8] - Factor to adjust the radius of the light circle
 * @property {number} [height=2.5] - Height of the lights above the model
 * @property {boolean} [showHelpers=true] - Whether to show light helpers
 * @typedef {Object} TheaterLightingProps
 */
interface TheaterLightingProps {
    intensity?: number;
    lightCount?: number;
    radiusFactor?: number;
    height?: number;
    showHelpers?: boolean;
}
/**
 * Component to create and manage theater-style lighting in a 3D scene.
 * @param {TheaterLightingProps} props - Component properties
 * @param {number} [props.intensity=1.0] - Intensity of the lights
 * @param {number} [props.lightCount=8] - Number of lights in the circle
 * @param {number} [props.radiusFactor=1.8] - Factor to adjust the radius of the light circle
 * @param {number} [props.height=2.5] - Height of the lights above the model
 * @param {boolean} [props.showHelpers=true] - Whether to show light helpers
 * @returns {null} This component does not render anything directly
 */
export declare function TheaterLighting({ intensity, lightCount, radiusFactor, height, showHelpers }: TheaterLightingProps): null;
export {};
//# sourceMappingURL=TheaterLighting.d.ts.map