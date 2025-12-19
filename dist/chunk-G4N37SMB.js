import {
  usePlugin
} from "./chunk-IF5HNNFI.js";
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
  const stableOptions = useMemo(
    () => ({ ...options }),
    [...Object.values(options)]
  );
  const [enable, setEnable] = useState({
    pan: stableOptions.enablePan ?? true,
    rotate: stableOptions.enableRotate ?? true,
    zoom: stableOptions.enableZoom ?? true
  });
  const [distance, setDistance] = useState({
    min: stableOptions.minDistance ?? 0.1,
    max: stableOptions.maxDistance ?? 1e3
  });
  const deps = useMemo(
    () => [...Object.values(stableOptions), enabled],
    [...Object.values(stableOptions), enabled]
  );
  const plugin = usePlugin(
    "AdvancedOrbitControls",
    () => new AdvancedOrbitControlsPlugin(stableOptions),
    deps
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
