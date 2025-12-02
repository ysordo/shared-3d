/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { LODSystemPlugin } from '../../core/orchestrator/plugins/LODSystemPlugin';
export const LODSystem = ({ levels, hysteresis = 0.1, }) => {
    const orchestrator = useScene();
    useEffect(() => {
        const plugin = new LODSystemPlugin([{ levels, hysteresis }]);
        orchestrator.use(plugin);
        return () => {
            plugin.dispose();
        };
    }, [levels, hysteresis]);
    return null;
};
//# sourceMappingURL=LODSystem.js.map