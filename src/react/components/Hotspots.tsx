'use client';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { useScene } from '../../hooks/useScene';
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
  const orchestrator = useScene();

    const data = useMemo(
        () => hotspots.map(hotspot => ({
          ...hotspot,
          position: new THREE.Vector3(...hotspot.position)
        })),
        [hotspots]
      );
    
      usePlugin(new HotspotPlugin(data), data);
    
      return null;
};
