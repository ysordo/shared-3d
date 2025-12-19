'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedOrbitControlsPlugin } from '../../core/orchestrator/plugins/AdvancedOrbitControlsPlugin';
import { useScene } from '../../hooks';

type StateProps = {
  readonly enablePan: boolean;
  readonly enableRotate: boolean;
  readonly enableZoom: boolean;
  readonly minDistance: number;
  readonly maxDistance: number;
  setEnablePan: (enablePan: boolean) => void;
  setEnableRotate: (enableRotate: boolean) => void;
  setEnableZoom: (enableZoom: boolean) => void;
  setMinDistance: (minDistance: number) => void;
  setMaxDistance: (maxDistance: number) => void;
};

type AdvancedOrbitControlsProps = {
  options?: Partial<{
    enablePan?: boolean;
    enableRotate?: boolean;
    enableZoom?: boolean;
    dampingFactor?: number;
    panSpeed?: number;
    rotateSpeed?: number;
    zoomSpeed?: number;
    minDistance?: number;
    maxDistance?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
  }>;
  enabled?: boolean;
  children?: (state: StateProps) => React.ReactNode;
};

export const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps> = ({
  options = {},
  enabled = true,
  children,
}) => {
  const stableOptions = useMemo(
    () => ({ ...options }),
    [...Object.values(options)]
  );
  const [enable, setEnable] = useState({
    pan: stableOptions.enablePan ?? true,
    rotate: stableOptions.enableRotate ?? true,
    zoom: stableOptions.enableZoom ?? true,
  });
  const [distance, setDistance] = useState({
    min: stableOptions.minDistance ?? 0.1,
    max: stableOptions.maxDistance ?? 1000,
  });

  const deps = useMemo(
    () => [...Object.values(stableOptions), enabled],
    [...Object.values(stableOptions), enabled]
  );

  const plugin = usePlugin(
    new AdvancedOrbitControlsPlugin(stableOptions),
    deps
  );

  useEffect(() => {
    if (plugin) {
      if (plugin.enablePan !== enable.pan) {
        plugin.enablePan = enable.pan;
      }
      if (plugin.enableRotate !== enable.rotate) {
        plugin.enableRotate = enable.rotate;
      }
      if (plugin.enableZoom !== enable.zoom) {
        plugin.enableZoom = enable.zoom;
      }
    }
  }, [enable.pan, enable.rotate, enable.zoom, plugin]);

  useEffect(() => {
    if (plugin) {
      if (plugin.maxDistance != distance.max) {
        plugin.maxDistance = distance.max;
      }
      if (plugin.minDistance !== distance.min) {
        plugin.minDistance = distance.min;
      }
    }
  }, [distance.max, distance.min, plugin]);

  const setEnablePan = useCallback((enablePan: boolean) => {
    setEnable((old) => ({ ...old, pan: enablePan }));
  }, []);
  const setEnableRotate = useCallback((enableRotate: boolean) => {
    setEnable((old) => ({ ...old, rotate: enableRotate }));
  }, []);
  const setEnableZoom = useCallback((enableZoom: boolean) => {
    setEnable((old) => ({ ...old, zoom: enableZoom }));
  }, []);
  const setMinDistance = useCallback((minDistance: number) => {
    setDistance((old) => ({ ...old, min: minDistance }));
  }, []);
  const setMaxDistance = useCallback((maxDistance: number) => {
    setDistance((old) => ({ ...old, max: maxDistance }));
  }, []);
  const state = useMemo<StateProps | null>(() => {
    return {
      enablePan: enable.pan,
      enableRotate: enable.rotate,
      enableZoom: enable.zoom,
      minDistance: distance.min,
      maxDistance: distance.max,
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance,
    };
  }, [
    enable.pan,
    enable.rotate,
    enable.zoom,
    distance.min,
    distance.max,
    setEnablePan,
    setEnableRotate,
    setEnableZoom,
    setMinDistance,
    setMaxDistance,
  ]);

  return <>{enabled && state && children?.(state)}</>;
};
