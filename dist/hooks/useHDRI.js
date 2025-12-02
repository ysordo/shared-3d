'use client';
import { useEffect, useState } from 'react';
import { useScene } from './useScene';
export const useHDRI = (entry) => {
    const orchestrator = useScene();
    const [hdri, setHDRI] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!entry) {
            return;
        }
        setLoading(true);
        orchestrator
            .setHDRI(entry)
            .then((tex) => {
            setHDRI(tex);
            setLoading(false);
        })
            .catch(() => setLoading(false));
    }, [entry?.id]);
    const clear = () => orchestrator.clearHDRI();
    return { hdri, loading, clear };
};
//# sourceMappingURL=useHDRI.js.map