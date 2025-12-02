'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import * as THREE from 'three';
export const Hotspots = ({ hotspots }) => {
    const orchestrator = useScene();
    useEffect(() => {
        const data = hotspots.map((h) => ({
            id: h.id,
            position: new THREE.Vector3(...h.position),
            target: typeof h.target === 'string'
                ? orchestrator.scene.getObjectByName(h.target)
                : h.target,
            onClick: h.onClick,
            offset: h.offset ? new THREE.Vector3(...h.offset) : undefined,
        }));
        const plugin = new HotspotPlugin(data);
        orchestrator.use(plugin);
        return () => {
            plugin.dispose();
        };
    }, [hotspots, orchestrator]);
    return null;
};
//# sourceMappingURL=Hotspots.js.map