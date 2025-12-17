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

  if (!enabled || !orchestrator) {
    return null;
  }
  const plugin = orchestrator.plugin('AdvancedOrbitControls');
  if (!plugin) {
    return null;
  }
  const state = {
    enablePan: (plugin as AdvancedOrbitControlsPlugin).enablePan,
    enableRotate: (plugin as AdvancedOrbitControlsPlugin).enableRotate,
    enableZoom: (plugin as AdvancedOrbitControlsPlugin).enableZoom,
    minDistance: (plugin as AdvancedOrbitControlsPlugin).minDistance,
    maxDistance: (plugin as AdvancedOrbitControlsPlugin).maxDistance,
    setEnablePan: (enablePan: boolean) => {
      (plugin as AdvancedOrbitControlsPlugin).enablePan = enablePan;
    },
    setEnableRotate: (enableRotate: boolean) => {
      (plugin as AdvancedOrbitControlsPlugin).enableRotate = enableRotate;
    },
    setEnableZoom: (enableZoom: boolean) => {
      (plugin as AdvancedOrbitControlsPlugin).enableZoom = enableZoom;
    },
    setMinDistance: (minDistance: number) => {
      (plugin as AdvancedOrbitControlsPlugin).minDistance = minDistance;
    },
    setMaxDistance: (maxDistance: number) => {
      (plugin as AdvancedOrbitControlsPlugin).maxDistance = maxDistance;
    },
  };

  return <>{children?.(state)}</>;
};
