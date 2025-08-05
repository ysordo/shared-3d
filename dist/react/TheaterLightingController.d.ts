import { type JSX } from 'react';
/**
 * Props for the LightingController component.
 * @property {string} [className] - Additional CSS classes for styling
 * @typedef {Object} LightingControllerProps
 */
interface LightingControllerProps {
    className?: string;
}
/**
 * Component to control lighting settings in a 3D scene.
 * Allows users to adjust intensity, number of lights, radius, height, and visibility of helpers.
 * @param {LightingControllerProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Rendered component with controls for lighting
 */
export declare function LightingController({ className, }: LightingControllerProps): JSX.Element;
export {};
//# sourceMappingURL=TheaterLightingController.d.ts.map