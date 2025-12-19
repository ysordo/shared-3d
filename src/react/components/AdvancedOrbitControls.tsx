'use client';

import { useMemo } from 'react';
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
  const orchestrator = useScene();
  const stableOptions = useMemo(
    () => options,
    [
      options.enablePan,
      options.enableRotate,
      options.enableZoom,
      options.dampingFactor,
      options.panSpeed,
      options.rotateSpeed,
      options.zoomSpeed,
      options.minDistance,
      options.maxDistance,
      options.minPolarAngle,
      options.maxPolarAngle,
    ]
  );

  usePlugin(
    () => new AdvancedOrbitControlsPlugin(stableOptions),
    enabled ? [stableOptions] : []
  );

  const plugin = orchestrator.plugin<AdvancedOrbitControlsPlugin>(
    'AdvancedOrbitControls'
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
      setEnablePan: (enablePan: boolean) => {
        plugin.enablePan = enablePan;
      },
      setEnableRotate: (enableRotate: boolean) => {
        plugin.enableRotate = enableRotate;
      },
      setEnableZoom: (enableZoom: boolean) => {
        plugin.enableZoom = enableZoom;
      },
      setMinDistance: (minDistance: number) => {
        plugin.minDistance = minDistance;
      },
      setMaxDistance: (maxDistance: number) => {
        plugin.maxDistance = maxDistance;
      },
    };
  }, [
    plugin?.enablePan,
    plugin?.enableRotate,
    plugin?.enableZoom,
    plugin?.maxDistance,
    plugin?.minDistance,
  ]);

  return <>{enabled && state && children?.(state)}</>;
};
