'use client';
import { useEffect } from 'react';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
export const ModelPreload = ({ entries, draco = false, }) => {
    useEffect(() => {
        entries.forEach((entry) => {
            GLTFLoader.load(entry, { draco }).catch(() => { });
        });
    }, [entries, draco]);
    return null;
};
//# sourceMappingURL=ModelPreload.js.map