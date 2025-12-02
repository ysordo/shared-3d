/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { OrbitControlsPlugin } from '../../core/orchestrator/plugins';
export const OrbitControls = () => {
    const orchestrator = useScene();
    useEffect(() => {
        orchestrator.use(new OrbitControlsPlugin());
    }, []);
    return null;
};
//# sourceMappingURL=OrbitControls.js.map