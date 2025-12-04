import {
  AdvancedOrbitControlsPlugin
} from "./chunk-VTSNXELB.js";
import {
  useScene
} from "./chunk-MAMG6W2Y.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useEffect, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  children,
  defaultEnabled = true,
  ...config
}) => {
  const orchestrator = useScene();
  const [panEnabled, setPanEnabled] = useState(defaultEnabled);
  const [rotateEnabled, setRotateEnabled] = useState(defaultEnabled);
  const [zoomEnabled, setZoomEnabled] = useState(defaultEnabled);
  const [plugin, setPlugin] = useState(
    null
  );
  useEffect(() => {
    const newPlugin = new AdvancedOrbitControlsPlugin(config);
    orchestrator.use(newPlugin);
    setPlugin(newPlugin);
    newPlugin.setAllEnabled(defaultEnabled);
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
