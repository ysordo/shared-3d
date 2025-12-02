/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useScene } from '../../hooks/useScene';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import { THREE } from '../../lib';
import { useEffect } from 'react';
export const Hotspot = ({ id, position, target, onClick, }) => {
    const orchestrator = useScene();
    useEffect(() => {
        const plugin = new HotspotPlugin([
            {
                id,
                position: new THREE.Vector3(...position),
                target,
                onClick,
            },
        ]);
        orchestrator.use(plugin);
        return () => plugin.dispose();
    }, [id, position, target, onClick]);
    return null;
};
//# sourceMappingURL=Hotspot.js.map