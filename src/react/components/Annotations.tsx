'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AnnotationsPlugin } from '../../core/orchestrator/plugins';
import { THREE } from '../../lib';
import { useScene } from '../../hooks/useScene';

type Annotation = {
  id: string;
  position: [number, number, number];
  target?: THREE.Object3D | string;
  content: string | React.ReactNode;
  offset?: [number, number, number];
};

type AnnotationsProps = {
  annotations: Annotation[];
};

export const Annotations: React.FC<AnnotationsProps> = ({ annotations }) => {
  const orchestrator = useScene();

  const data = useMemo(() => {
    return annotations.map((ann) => {
      const target =
        typeof ann.target === 'string'
          ? orchestrator.scene.getObjectByName(ann.target)
          : ann.target;

      return {
        id: ann.id,
        position: new THREE.Vector3(...ann.position),
        target,
        content:
          typeof ann.content === 'string' ? ann.content : String(ann.content),
        offset: ann.offset ? new THREE.Vector3(...ann.offset) : undefined,
      };
    });
  }, [annotations, orchestrator.scene]);

  usePlugin(() => new AnnotationsPlugin(data), [data]);

  return null;
};
