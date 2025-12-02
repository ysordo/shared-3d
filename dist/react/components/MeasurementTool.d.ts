import type React from 'react';
import type { THREE } from '../../lib';
type MeasurementToolProps = {
    enabled?: boolean;
    color?: string;
    onMeasure?: (distance: number, points: [THREE.Vector3, THREE.Vector3]) => void;
};
export declare const MeasurementTool: React.FC<MeasurementToolProps>;
export {};
//# sourceMappingURL=MeasurementTool.d.ts.map