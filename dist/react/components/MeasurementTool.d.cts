import React from 'react';
import * as THREE from 'three';

type MeasurementToolProps = {
    enabled?: boolean;
    color?: string;
    onMeasure?: (distance: number, points: [THREE.Vector3, THREE.Vector3]) => void;
};
declare const MeasurementTool: React.FC<MeasurementToolProps>;

export { MeasurementTool };
