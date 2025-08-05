import { type JSX } from 'react';
/**
 * Props for the AmbientLightController component.
 * @property {string} [className] - Additional CSS classes for styling
 * @property {number} [initialIntensity=0.5] - Initial intensity of the ambient light
 * @property {string} [initialColor='#ffffff'] - Initial color of the ambient light in hex format
 * @typedef {Object} AmbientLightControllerProps
 */
interface AmbientLightControllerProps {
    className?: string;
    initialIntensity?: number;
    initialColor?: string;
}
/**
 * Component to control ambient light in a 3D scene.
 * Allows users to adjust intensity and color of the ambient light.
 * @param {AmbientLightControllerProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {number} [props.initialIntensity=0.5] - Initial intensity of the ambient light
 * @param {string} [props.initialColor='#ffffff'] - Initial color of the ambient light in hex format
 * @returns {JSX.Element} Rendered component with controls for ambient light
 */
export declare function AmbientLightController({ className, initialIntensity, initialColor, }: AmbientLightControllerProps): JSX.Element;
export {};
//# sourceMappingURL=AmbientalLightControler.d.ts.map