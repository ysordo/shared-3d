type MeasurementToolProps = {
    enabled?: boolean;
    pointRadius?: number;
    color?: number;
    onMeasure?: (distance: number, points: [any, any]) => void;
};
declare const MeasurementTool: React.FC<MeasurementToolProps>;

export { MeasurementTool };
