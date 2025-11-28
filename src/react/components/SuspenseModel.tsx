'use client';
import React from 'react';
import type { ManifestEntry } from '../../core/cache/types';
import type { THREE } from '../../lib';
import { Model } from './Model';
import { Suspense } from './Suspense';

type SuspenseModelProps = {
  entry: ManifestEntry;
  draco?: boolean | undefined;
  fallback?: React.ReactNode;
  children?: (model: THREE.Group) => React.ReactNode;
};

export const SuspenseModel: React.FC<SuspenseModelProps> = ({
  entry,
  draco,
  fallback = <div className="text-white">Loading model {entry.id}...</div>,
  children,
}) => {
  return (
    <Suspense fallback={fallback}>
      <Model entry={entry} draco={draco}>
        {(model) => children?.(model)}
      </Model>
    </Suspense>
  );
};
