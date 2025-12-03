'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import type { ManifestEntry } from '../../core/cache/types';
import type { THREE } from '../../lib';

type ModelProps = {
  entry: ManifestEntry;
  draco?: boolean | undefined;
  children?: (model: THREE.Group) => React.ReactNode;
};

export const Model: React.FC<ModelProps> = ({
  entry,
  draco = false,
  children,
}) => {
  const orchestrator = useScene();
  const [model, setModel] = useState<THREE.Group | null>(null);

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
