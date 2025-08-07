/**
 * Props for the OrbitControls component.
 * @property {Object} options - Configuration options for the controls
 * @property {boolean} [options.enableRotate=true] - Enable rotation controls
 * @property {boolean} [options.enableZoom=true] - Enable zoom controls
 * @property {boolean} [options.enablePan=true] - Enable pan controls
 * @typedef {Object} OrbitControlsProps
 */
interface OrbitControlsProps {
    id: string;
    options?: {
        enableRotate?: boolean;
        enableZoom?: boolean;
        enablePan?: boolean;
    };
}
/**
 * Component to set up OrbitControls for a 3D model in the scene.
 * This component uses the SceneContext to access the SceneManager and set up controls.
 * @param {OrbitControlsProps} props - Component properties
 * @param {Object} props.options - Configuration options for the controls
 * @param {boolean} [props.options.enableRotate=true] - Enable rotation controls
 * @param {boolean} [props.options.enableZoom=true] - Enable zoom controls
 * @param {boolean} [props.options.enablePan=true] - Enable pan controls
 * @returns {null} This component does not render anything directly
 * @throws {Error} If the SceneManager is not available in the context
 */
export declare function OrbitControls({ id, options }: OrbitControlsProps): null;
export {};
//# sourceMappingURL=OrbitControls.d.ts.map