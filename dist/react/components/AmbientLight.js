/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';
export const AmbientLight = ({ intensity = 0.5, color = 0xffffff, }) => {
    const { scene } = useScene();
    useEffect(() => {
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
        return () => {
            scene.remove(light);
            light.dispose();
        };
    }, [intensity, color]);
    return null;
};
//# sourceMappingURL=AmbientLight.js.map