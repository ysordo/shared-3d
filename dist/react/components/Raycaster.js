/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { RaycasterPlugin, } from '../../core/orchestrator/plugins';
export const Raycaster = ({ onClick, onHover }) => {
    const orchestrator = useScene();
    useEffect(() => {
        const plugin = new RaycasterPlugin((event) => {
            if (event.type === 'click' && onClick) {
                onClick(event.object);
            }
            if (event.type === 'hover' && onHover) {
                onHover(event.object);
            }
        });
        orchestrator.use(plugin);
    }, [onClick, onHover]);
    return null;
};
//# sourceMappingURL=Raycaster.js.map