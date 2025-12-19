'use client';

import { useCallback, useMemo } from 'react';
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
    () => ({...options}),
    [
      ...Object.values(options)
    ]
  );

  const plugin = usePlugin(
    () => new AdvancedOrbitControlsPlugin(stableOptions),
    enabled ? [...Object.values(stableOptions)] : []
  );

  const setEnablePan = useCallback(
    (enablePan: boolean) => {
      if (plugin) {
        plugin.enablePan = enablePan;
      }
    },
    [plugin]
  );
  const setEnableRotate = useCallback(
    (enableRotate: boolean) => {
      if (plugin) {
        plugin.enableRotate = enableRotate;
      }
    },
    [plugin]
  );
  const setEnableZoom = useCallback(
    (enableZoom: boolean) => {
      if (plugin) {
        plugin.enableZoom = enableZoom;
      }
    },
    [plugin]
  );
  const setMinDistance = useCallback(
    (minDistance: number) => {
      if (plugin) {
        plugin.minDistance = minDistance;
      }
    },
    [plugin]
  );
  const setMaxDistance = useCallback(
    (maxDistance: number) => {
      if (plugin) {
        plugin.maxDistance = maxDistance;
      }
    },
    [plugin]
  );
  const state = useMemo<StateProps | null>(() => {
    if (!plugin) {
      return null;
    }
    return {
      enablePan: plugin.enablePan,
      enableRotate: plugin.enableRotate,
      enableZoom: plugin.enableZoom,
      minDistance: plugin.minDistance,
      maxDistance: plugin.maxDistance,
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance,
    };
  }, [plugin, setEnablePan, setEnableRotate, setEnableZoom, setMinDistance, setMaxDistance]);

  return <>{enabled && state && children?.(state)}</>;
};
