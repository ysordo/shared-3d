type StateProps = {
    readonly enablePan: boolean;
    readonly enableRotate: boolean;
    readonly enableZoom: boolean;
    readonly minDistance: number;
    readonly maxDistance: number;
    setEnablePan: (enablePan: boolean) => void;
    setEnableRotate: (enableRotate: boolean) => void;
    setEnableZoom: (enableZoom: boolean) => void;
    setMinDistance: (minDistance: number) => void;
    setMaxDistance: (maxDistance: number) => void;
};
type AdvancedOrbitControlsProps = {
    options?: Partial<{
        enablePan?: boolean;
        enableRotate?: boolean;
        enableZoom?: boolean;
        dampingFactor?: number;
        panSpeed?: number;
        rotateSpeed?: number;
        zoomSpeed?: number;
        minDistance?: number;
        maxDistance?: number;
        minPolarAngle?: number;
        maxPolarAngle?: number;
    }>;
    enabled?: boolean;
    children?: (state: StateProps) => React.ReactNode;
};
declare const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps>;

export { AdvancedOrbitControls };
