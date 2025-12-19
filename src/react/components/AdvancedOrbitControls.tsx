'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedOrbitControlsPlugin } from '../../core/orchestrator/plugins/AdvancedOrbitControlsPlugin';

type StateProps = {
  readonly enablePan: boolean;
  readonly enableRotate: boolean;
  readonly enableZoom: boolean;
  readonly minDistance: number;
  readonly maxDistance: number;
  setEnablePan: (value: boolean) => void;
  setEnableRotate: (value: boolean) => void;
  setEnableZoom: (value: boolean) => void;
  setMinDistance: (value: number) => void;
  setMaxDistance: (value: number) => void;
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
  // Extraer valores primitivos para deps estables
  const {
    enablePan = true,
    enableRotate = true,
    enableZoom = true,
    minDistance = 0.1,
    maxDistance = 1000,
    dampingFactor,
    panSpeed,
    rotateSpeed,
    zoomSpeed,
    minPolarAngle,
    maxPolarAngle,
  } = options;

  // Factory con deps primitivas → estable
  const factory = useCallback(
    () => new AdvancedOrbitControlsPlugin({
      enablePan,
      enableRotate,
      enableZoom,
      dampingFactor,
      panSpeed,
      rotateSpeed,
      zoomSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle,
    }),
    [
      enablePan,
      enableRotate,
      enableZoom,
      dampingFactor,
      panSpeed,
      rotateSpeed,
      zoomSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle,
    ]
  );

  // Plugin estable (instancia única)
  const plugin = usePlugin(factory, [
    enablePan,
    enableRotate,
    enableZoom,
    dampingFactor,
    panSpeed,
    rotateSpeed,
    zoomSpeed,
    minDistance,
    maxDistance,
    minPolarAngle,
    maxPolarAngle,
  ]);

  // Setters que actualizan el plugin directamente (fuente de verdad)
  const setEnablePan = useCallback((value: boolean) => {
    if (plugin) {plugin.enablePan = value;}
  }, [plugin]);

  const setEnableRotate = useCallback((value: boolean) => {
    if (plugin) {plugin.enableRotate = value;}
  }, [plugin]);

  const setEnableZoom = useCallback((value: boolean) => {
    if (plugin) {plugin.enableZoom = value;}
  }, [plugin]);

  const setMinDistance = useCallback((value: number) => {
    if (plugin) {plugin.minDistance = value;}
  }, [plugin]);

  const setMaxDistance = useCallback((value: number) => {
    if (plugin) {plugin.maxDistance = value;}
  }, [plugin]);

  // Estado derivado del plugin (reactivo)
  const state = useMemo<StateProps>(() => ({
    enablePan: plugin?.enablePan ?? enablePan,
    enableRotate: plugin?.enableRotate ?? enableRotate,
    enableZoom: plugin?.enableZoom ?? enableZoom,
    minDistance: plugin?.minDistance ?? minDistance,
    maxDistance: plugin?.maxDistance ?? maxDistance,
    setEnablePan,
    setEnableRotate,
    setEnableZoom,
    setMinDistance,
    setMaxDistance,
  }), [
    plugin,
    enablePan,
    enableRotate,
    enableZoom,
    minDistance,
    maxDistance,
    setEnablePan,
    setEnableRotate,
    setEnableZoom,
    setMinDistance,
    setMaxDistance,
  ]);

  // Render condicional
  if (!enabled || !plugin) {return null;}

  return <>{children?.(state)}</>;
};