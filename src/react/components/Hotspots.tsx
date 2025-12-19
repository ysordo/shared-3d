'use client';
import type React from 'react';
import { useMemo } from 'react';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import * as THREE from 'three';
import { usePlugin } from '../../hooks/usePlugin';

type HotspotData = {
  id: string;
  position: [number, number, number];
  target?: THREE.Object3D;
  onClick: () => void;
};

type HotspotsProps = {
  hotspots: HotspotData[];
};

export const Hotspots: React.FC<HotspotsProps> = ({ hotspots }) => {
  const deps = useMemo(() => [hotspots], [hotspots]);

  usePlugin(
    new HotspotPlugin(
      hotspots.map((hotspot) => ({
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position),
      }))
    ),
    deps
  );

  return null;
};
