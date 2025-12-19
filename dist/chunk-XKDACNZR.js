import {
  usePlugin
} from "./chunk-BKBNIEFK.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-N3ACJCKO.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const [enable, setEnable] = useState({
    pan: options.enablePan ?? true,
    rotate: options.enableRotate ?? true,
    zoom: options.enableZoom ?? true
  });
  const [distance, setDistance] = useState({
    min: options.minDistance ?? 0.1,
    max: options.maxDistance ?? 1e3
  });
  const factory = useMemo(
    () => new AdvancedOrbitControlsPlugin(options),
    [options]
  );
  const plugin = usePlugin(
    factory,
    [factory, enabled]
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
  const setEnablePan = useCallback((enablePan) => {
    setEnable((old) => ({ ...old, pan: enablePan }));
  }, []);
  const setEnableRotate = useCallback((enableRotate) => {
    setEnable((old) => ({ ...old, rotate: enableRotate }));
  }, []);
  const setEnableZoom = useCallback((enableZoom) => {
    setEnable((old) => ({ ...old, zoom: enableZoom }));
  }, []);
  const setMinDistance = useCallback((minDistance) => {
    setDistance((old) => ({ ...old, min: minDistance }));
  }, []);
  const setMaxDistance = useCallback((maxDistance) => {
    setDistance((old) => ({ ...old, max: maxDistance }));
  }, []);
  const state = useMemo(() => {
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
      setMaxDistance
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
    setMaxDistance
  ]);
  return /* @__PURE__ */ jsx(Fragment, { children: enabled && state && children?.(state) });
};

export {
  AdvancedOrbitControls
};
