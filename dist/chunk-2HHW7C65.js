import {
  usePlugin
} from "./chunk-I3ICZD4F.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-U7W5KKD5.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useCallback, useMemo } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  dampingFactor,
  panSpeed,
  rotateSpeed,
  zoomSpeed,
  minDistance = 0.1,
  maxDistance = 1e3,
  minPolarAngle,
  maxPolarAngle,
  children
}) => {
  const config = useMemo(
    () => ({
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
  const factory = useCallback(() => new AdvancedOrbitControlsPlugin(), []);
  const plugin = usePlugin(factory, config);
  const setEnablePan = useCallback(
    (value) => {
      if (plugin) {
        plugin.enablePan = value;
      }
    },
    [plugin]
  );
  const setEnableRotate = useCallback(
    (value) => {
      if (plugin) {
        plugin.enableRotate = value;
      }
    },
    [plugin]
  );
  const setEnableZoom = useCallback(
    (value) => {
      if (plugin) {
        plugin.enableZoom = value;
      }
    },
    [plugin]
  );
  const setMinDistance = useCallback(
    (value) => {
      if (plugin) {
        plugin.minDistance = value;
      }
    },
    [plugin]
  );
  const setMaxDistance = useCallback(
    (value) => {
      if (plugin) {
        plugin.maxDistance = value;
      }
    },
    [plugin]
  );
  const state = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
  if (!plugin) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(state) });
};

export {
  AdvancedOrbitControls
};
