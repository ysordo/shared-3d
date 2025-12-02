/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedRaycasterPlugin } from '../../core/orchestrator/plugins/AdvancedRaycasterPlugin';
import { useActiveModel } from '../../hooks/useActiveModel';
export const AdvancedRaycaster = ({ model: customModel, onClick, onHoverIn, onHoverOut, onHoverMove, onDragStart, onDrag, onDragEnd, }) => {
    const orchestrator = useScene();
    const activeModel = useActiveModel();
    useEffect(() => {
        const plugin = new AdvancedRaycasterPlugin(customModel || activeModel || undefined, (e) => {
            switch (e.type) {
                case 'objectclick':
                    onClick?.(e);
                    break;
                case 'objecthoverin':
                    onHoverIn?.(e);
                    break;
                case 'objecthoverout':
                    onHoverOut?.(e);
                    break;
                case 'objecthovermove':
                    onHoverMove?.(e);
                    break;
                case 'objectdragstart':
                    onDragStart?.(e);
                    break;
                case 'objectdrag':
                    onDrag?.(e);
                    break;
                case 'objectdragend':
                    onDragEnd?.(e);
                    break;
            }
        });
        orchestrator.use(plugin);
    }, [
        customModel,
        activeModel,
        onClick,
        onHoverIn,
        onHoverOut,
        onHoverMove,
        onDragStart,
        onDrag,
        onDragEnd,
    ]);
    return null;
};
//# sourceMappingURL=AdvancedRaycaster.js.map