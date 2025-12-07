'use client';

import React, { useEffect, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedOrbitControlsPlugin } from '../../core/orchestrator/plugins/AdvancedOrbitControlsPlugin';

type OrbitState = {
  panEnabled: boolean;
  rotateEnabled: boolean;
  zoomEnabled: boolean;
  isActive: boolean;
  setPanEnabled: (value: boolean) => void;
  setRotateEnabled: (value: boolean) => void;
  setZoomEnabled: (value: boolean) => void;
  setAllEnabled: (value: boolean) => void;
  togglePan: () => void;
  toggleRotate: () => void;
  toggleZoom: () => void;
  toggleAll: () => void;
};

type AdvancedOrbitControlsProps = {
  children: (state: OrbitState) => React.ReactNode;
  enablePan?: boolean;
  enableRotate?: boolean;
  enableZoom?: boolean;
  panSpeed?: number;
  rotateSpeed?: number;
  zoomSpeed?: number;
  dampingFactor?: number;
  minDistance?: number;
  maxDistance?: number;
};

export const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps> = ({
  children,
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  ...config
}) => {
  const orchestrator = useScene();
  const [plugin, setPlugin] = useState<AdvancedOrbitControlsPlugin | null>(
    null
  );

  const [panEnabled, setPanEnabled] = useState(enablePan);
  const [rotateEnabled, setRotateEnabled] = useState(enableRotate);
  const [zoomEnabled, setZoomEnabled] = useState(enableZoom);

  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const newPlugin = new AdvancedOrbitControlsPlugin({
      enablePan,
      enableRotate,
      enableZoom,
      ...config,
    });

    orchestrator.use(newPlugin);
    setPlugin(newPlugin);

    return () => {
      newPlugin.dispose();
      setPlugin(null);
    };
  }, [orchestrator]);

  useEffect(() => {
    if (!plugin) {
      return;
    }
    plugin.setPanEnabled(panEnabled);
    plugin.setRotateEnabled(rotateEnabled);
    plugin.setZoomEnabled(zoomEnabled);
  }, [panEnabled, rotateEnabled, zoomEnabled]);

  const setAllEnabled = (value: boolean) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };

  const togglePan = () => setPanEnabled((p) => !p);
  const toggleRotate = () => setRotateEnabled((p) => !p);
  const toggleZoom = () => setZoomEnabled((p) => !p);
  const toggleAll = () =>
    setAllEnabled(!(panEnabled && rotateEnabled && zoomEnabled));

  const state: OrbitState = {
    panEnabled,
    rotateEnabled,
    zoomEnabled,
    isActive: panEnabled || rotateEnabled || zoomEnabled,
    setPanEnabled,
    setRotateEnabled,
    setZoomEnabled,
    setAllEnabled,
    togglePan,
    toggleRotate,
    toggleZoom,
    toggleAll,
  };

  return <>{children(state)}</>;
};
