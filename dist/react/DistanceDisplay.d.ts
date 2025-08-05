/**
 * Props for the DistanceDisplay component.
 * @property {string} [className] - Additional CSS classes for styling
 * @typedef {Object} DistanceDisplayProps
 */
type DistanceDisplayProps = {
    className?: string;
};
/**
 * Component to display the distance from the camera to the active model in a 3D scene.
 * It shows the distance in meters, centimeters, or kilometers, and includes a scale bar.
 * @param {DistanceDisplayProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Rendered component showing distance and scale bar
 */
export declare const DistanceDisplay: ({ className }: DistanceDisplayProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DistanceDisplay.d.ts.map