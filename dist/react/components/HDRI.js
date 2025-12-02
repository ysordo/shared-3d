/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
export const HDRI = ({ entry }) => {
    const orchestrator = useScene();
    useEffect(() => {
        orchestrator.setHDRI(entry);
    }, [entry.id]);
    return null;
};
//# sourceMappingURL=HDRI.js.map