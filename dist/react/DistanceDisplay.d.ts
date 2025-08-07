import { type JSX } from 'react';
/**
 * Props for the DistanceDisplay component.
 * @property {string} [className] - Additional CSS classes for styling
 * @property {React.ReactNode} [children] - Child elements to render inside the component
 * @property {(distance: number) => void} [setDistance] - Callback function to set the distance value
 * @typedef {Object} DistanceDisplayProps
 */
type DistanceDisplayProps = {
    className?: string;
    children?: React.ReactNode;
    setDistance?: (distance: number) => void;
};
/**
 * Component to display the distance from the camera to the active model in a 3D scene.
 * It updates the distance in real-time and can optionally set it via a callback.
 * @param {DistanceDisplayProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {React.ReactNode} [props.children] - Child elements to render inside the component
 * @param {(distance: number) => void} [props.setDistance] - Callback function to set the distance value
 * @returns {JSX.Element} Rendered component showing distance and scale bar
 */
export declare function DistanceDisplay({ children, className, setDistance, }: DistanceDisplayProps): JSX.Element;
export {};
//# sourceMappingURL=DistanceDisplay.d.ts.map