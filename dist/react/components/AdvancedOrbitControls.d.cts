import React from 'react';

type OrbitState = {
    panEnabled: boolean;
    rotateEnabled: boolean;
    zoomEnabled: boolean;
    isActive: boolean;
    setPanEnabled: (value: boolean) => void;
    setRotateEnabled: (value: boolean) => void;
    setZoomEnabled: (value: boolean) => void;
    setAllEnabled: (value: boolean) => void;
    togglePan: () => void;
    toggleRotate: () => void;
    toggleZoom: () => void;
    toggleAll: () => void;
};
type AdvancedOrbitControlsProps = {
    children: (state: OrbitState) => React.ReactNode;
    defaultEnabled?: boolean;
    panSpeed?: number;
    rotateSpeed?: number;
    zoomSpeed?: number;
    dampingFactor?: number;
    minDistance?: number;
    maxDistance?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
};
declare const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps>;

export { AdvancedOrbitControls };
