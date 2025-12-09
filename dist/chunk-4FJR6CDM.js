import {
  AdvancedOrbitControlsPlugin
} from "./chunk-OVBEDQKS.js";
import {
  useScene
} from "./chunk-43RFP7TS.js";

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
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const plugin = new AdvancedOrbitControlsPlugin({
      enablePan,
      enableRotate,
      enableZoom,
      ...config
    });
    orchestrator.use(plugin);
    return () => {
      orchestrator.plugin("AdvancedOrbitControlsPlugin").dispose?.();
    };
  }, [orchestrator]);
  useEffect(() => {
    const plugin = orchestrator.plugin(
      "AdvancedOrbitControlsPlugin"
    );
    console.info("[AdvancedOrbitControls] Change state options:", {
      orchestrator,
      plugin
    });
    if (!plugin) {
      return;
    }
    plugin.setPanEnabled(panEnabled);
    plugin.setRotateEnabled(rotateEnabled);
    plugin.setZoomEnabled(zoomEnabled);
  }, [panEnabled, rotateEnabled, zoomEnabled]);
  const setAllEnabled = (value) => {
    setPanEnabled(value);
    setRotateEnabled(value);
    setZoomEnabled(value);
  };
  const togglePan = () => setPanEnabled((p) => !p);
  const toggleRotate = () => setRotateEnabled((p) => !p);
  const toggleZoom = () => setZoomEnabled((p) => !p);
  const toggleAll = () => setAllEnabled(!(panEnabled && rotateEnabled && zoomEnabled));
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
