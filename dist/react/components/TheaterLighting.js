/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';
export const TheaterLighting = ({ intensity = 2, count = 8, }) => {
    const { scene } = useScene();
    useEffect(() => {
        const lights = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const light = new THREE.PointLight(0xffffff, intensity);
            light.position.set(Math.cos(angle) * 5, 5, Math.sin(angle) * 5);
            scene.add(light);
            lights.push(light);
        }
        return () => {
            lights.forEach((l) => {
                scene.remove(l);
                l.dispose();
            });
        };
    }, [intensity, count]);
    return null;
};
//# sourceMappingURL=TheaterLighting.js.map