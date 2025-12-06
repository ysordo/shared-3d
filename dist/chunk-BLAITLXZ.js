import {
  AdvancedOrbitControlsPlugin
} from "./chunk-RNLQ6KGZ.js";
import {
  useScene
} from "./chunk-YXZQN2XJ.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useEffect, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
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
  const [plugin, setPlugin] = useState(
    null
  );
  useEffect(() => {
    const newPlugin = new AdvancedOrbitControlsPlugin({
      ...config,
      enablePan,
      enableRotate,
      enableZoom
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
  const setAllEnabled = (value) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };
  const togglePan = () => setPanEnabled((prev) => !prev);
  const toggleRotate = () => setRotateEnabled((prev) => !prev);
  const toggleZoom = () => setZoomEnabled((prev) => !prev);
  const toggleAll = () => setAllEnabled(!(rotateEnabled && panEnabled && zoomEnabled));
  const state = {
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
    toggleAll
  };
  return /* @__PURE__ */ jsx(Fragment, { children: children(state) });
};

export {
  AdvancedOrbitControls
};
