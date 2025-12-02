/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { AnnotationsPlugin } from '../../core/orchestrator/plugins/AnnotationsPlugin';
import { THREE } from '../../lib';
export const Annotations = ({ annotations }) => {
    const orchestrator = useScene();
    useEffect(() => {
        const data = annotations.map((ann) => {
            const target = typeof ann.target === 'string'
                ? orchestrator.scene.getObjectByName(ann.target)
                : ann.target;
            const content = typeof ann.content === 'string'
                ? ann.content
                : React.isValidElement(ann.content)
                    ? ann.content.props.children
                    : String(ann.content);
            return {
                id: ann.id,
                position: new THREE.Vector3(...ann.position),
                target,
                content,
                offset: ann.offset ? new THREE.Vector3(...ann.offset) : undefined,
            };
        });
        const plugin = new AnnotationsPlugin(data);
        orchestrator.use(plugin);
        return () => {
            plugin.dispose();
        };
    }, [annotations]);
    return null;
};
//# sourceMappingURL=Annotations.js.map