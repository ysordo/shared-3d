import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-N3ACJCKO.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useCallback, useMemo } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const {
    enablePan = true,
    enableRotate = true,
    enableZoom = true,
    minDistance = 0.1,
    maxDistance = 1e3,
    dampingFactor,
    panSpeed,
    rotateSpeed,
    zoomSpeed,
    minPolarAngle,
    maxPolarAngle
  } = options;
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
      maxPolarAngle
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
      maxPolarAngle
    ]
  );
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
    maxPolarAngle
  ]);
  const setEnablePan = useCallback((value) => {
    if (plugin) {
      plugin.enablePan = value;
    }
  }, [plugin]);
  const setEnableRotate = useCallback((value) => {
    if (plugin) {
      plugin.enableRotate = value;
    }
  }, [plugin]);
  const setEnableZoom = useCallback((value) => {
    if (plugin) {
      plugin.enableZoom = value;
    }
  }, [plugin]);
  const setMinDistance = useCallback((value) => {
    if (plugin) {
      plugin.minDistance = value;
    }
  }, [plugin]);
  const setMaxDistance = useCallback((value) => {
    if (plugin) {
      plugin.maxDistance = value;
    }
  }, [plugin]);
  const state = useMemo(() => ({
    enablePan: plugin?.enablePan ?? enablePan,
    enableRotate: plugin?.enableRotate ?? enableRotate,
    enableZoom: plugin?.enableZoom ?? enableZoom,
    minDistance: plugin?.minDistance ?? minDistance,
    maxDistance: plugin?.maxDistance ?? maxDistance,
    setEnablePan,
    setEnableRotate,
    setEnableZoom,
    setMinDistance,
    setMaxDistance
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
    setMaxDistance
  ]);
  if (!enabled || !plugin) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(state) });
};

export {
  AdvancedOrbitControls
};
