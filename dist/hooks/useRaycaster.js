'use client';
import { useEffect } from 'react';
import { useScene } from './useScene';
import { RaycasterPlugin } from '../core/orchestrator/plugins';
export const useRaycaster = (onEvent) => {
    const orchestrator = useScene();
    useEffect(() => {
        const plugin = new RaycasterPlugin(onEvent);
        orchestrator.use(plugin);
        return () => {
            // Opcional: remover plugin
        };
    }, [onEvent]);
};
//# sourceMappingURL=useRaycaster.js.map