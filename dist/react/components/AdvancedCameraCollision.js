/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedCameraCollisionPlugin } from '../../core/orchestrator/plugins/AdvancedCameraCollisionPlugin';
export const AdvancedCameraCollision = ({ distanceThreshold = 0.6, pushBackOffset = 0.1, enabled = true }) => {
    const orchestrator = useScene();
    useEffect(() => {
        if (!enabled) {
            return;
        }
        const plugin = new AdvancedCameraCollisionPlugin(distanceThreshold, pushBackOffset);
        orchestrator.use(plugin);
        return () => {
            plugin.dispose();
        };
    }, [enabled, distanceThreshold, pushBackOffset]);
    return null;
};
//# sourceMappingURL=AdvancedCameraCollision.js.map