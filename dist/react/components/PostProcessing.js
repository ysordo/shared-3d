/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { PostProcessingPlugin } from '../../core/orchestrator/plugins';
export const PostProcessing = ({ bloom = { strength: 1.5, radius: 0.4, threshold: 0 }, enabled = true, }) => {
    const orchestrator = useScene();
    useEffect(() => {
        if (!enabled) {
            return;
        }
        const plugin = new PostProcessingPlugin(bloom);
        orchestrator.use(plugin);
        return () => { };
    }, [enabled, bloom.strength, bloom.radius, bloom.threshold]);
    return null;
};
//# sourceMappingURL=PostProcessing.js.map