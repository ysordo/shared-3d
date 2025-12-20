'use client';
import type React from 'react';
import { useCallback, useEffect } from 'react';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import { THREE } from '../../lib';
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
  const factory = useCallback(
    () =>
      new HotspotPlugin(
        hotspots.map((hotspot) => ({
          ...hotspot,
          position: new THREE.Vector3(...hotspot.position),
        }))
      ),
    [hotspots]
  );

  const plugin = usePlugin(factory, []);

  useEffect(() => {
    plugin?.update(
      hotspots.map((hotspot) => ({
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position),
      }))
    );
  }, [hotspots, plugin]);

  return null;
};
