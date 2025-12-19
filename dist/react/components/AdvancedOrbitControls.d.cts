type StateProps = {
    readonly enablePan: boolean;
    readonly enableRotate: boolean;
    readonly enableZoom: boolean;
    readonly minDistance: number;
    readonly maxDistance: number;
    setEnablePan: (value: boolean) => void;
    setEnableRotate: (value: boolean) => void;
    setEnableZoom: (value: boolean) => void;
    setMinDistance: (value: number) => void;
    setMaxDistance: (value: number) => void;
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
