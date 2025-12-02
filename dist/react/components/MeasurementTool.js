/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { MeasurementToolPlugin } from '../../core/orchestrator/plugins/MeasurementToolPlugin';
export const MeasurementTool = ({ enabled = true, color = '#00ff00', onMeasure, }) => {
    const orchestrator = useScene();
    useEffect(() => {
        if (!enabled) {
            return;
        }
        const plugin = new MeasurementToolPlugin((event) => {
            if (event.distance !== undefined && event.points.length === 2) {
                onMeasure?.(event.distance, [event.points[0], event.points[1]]);
            }
        });
        orchestrator.use(plugin);
        return () => {
            plugin.dispose();
        };
    }, [enabled, onMeasure]);
    return null;
};
//# sourceMappingURL=MeasurementTool.js.map