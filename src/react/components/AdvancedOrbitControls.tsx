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
  minPolarAngle?: number;
  maxPolarAngle?: number;
};

export const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps> = ({
  children,
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  ...config
}) => {
  const orchestrator = useScene();

  const [panEnabled, setPanEnabled] = useState(enablePan);
  const [rotateEnabled, setRotateEnabled] = useState(enableRotate);
  const [zoomEnabled, setZoomEnabled] = useState(enableZoom);
  const [plugin, setPlugin] = useState<AdvancedOrbitControlsPlugin | null>(
    null
  );

  useEffect(() => {
    const newPlugin = new AdvancedOrbitControlsPlugin({
      ...config,
      enablePan,
      enableRotate,
      enableZoom,
    });
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);

    return () => {
      newPlugin.dispose();
    };
  }, []);

  useEffect(() => {
    plugin?.setPanEnabled(panEnabled);
  }, [plugin, panEnabled]);

  useEffect(() => {
    plugin?.setRotateEnabled(rotateEnabled);
  }, [plugin, rotateEnabled]);

  useEffect(() => {
    plugin?.setZoomEnabled(zoomEnabled);
  }, [plugin, zoomEnabled]);

  const setAllEnabled = (value: boolean) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };

  const togglePan = () => setPanEnabled((prev) => !prev);
  const toggleRotate = () => setRotateEnabled((prev) => !prev);
  const toggleZoom = () => setZoomEnabled((prev) => !prev);
  const toggleAll = () =>
    setAllEnabled(!(rotateEnabled && panEnabled && zoomEnabled));

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
