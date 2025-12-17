type MeasurementToolProps = {
    enabled?: boolean;
    color?: string;
    onMeasure?: (distance: number, points: [any, any]) => void;
};
declare const MeasurementTool: React.FC<MeasurementToolProps>;

export { MeasurementTool };
