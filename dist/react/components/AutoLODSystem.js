/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';
export const AutoLODSystem = ({ mediumDistance = 20, lowDistance = 50, hideDistance = 100, }) => {
    const orchestrator = useScene();
    useEffect(() => {
        const plugin = new AutoLODSystemPlugin({
            distances: [mediumDistance, lowDistance, hideDistance],
        });
        orchestrator.use(plugin);
        return () => {
            plugin.dispose();
        };
    }, [mediumDistance, lowDistance, hideDistance]);
    return null;
};
//# sourceMappingURL=AutoLODSystem.js.map