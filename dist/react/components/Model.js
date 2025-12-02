/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { useScene } from '../../hooks/useScene';
export const Model = ({ entry, draco = false, children, }) => {
    const orchestrator = useScene();
    const [model, setModel] = useState(null);
    useEffect(() => {
        const load = async () => {
            const gltf = await orchestrator.setModel(entry, { draco });
            setModel(gltf);
        };
        load();
    }, [entry.id, draco]);
    if (!model) {
        return null;
    }
    return children?.(model);
};
//# sourceMappingURL=Model.js.map