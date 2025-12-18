import {
  usePlugin
} from "./chunk-LLGU6H6V.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-N3ACJCKO.js";
import {
  useScene
} from "./chunk-PQUWKDDP.js";

// src/react/components/AdvancedOrbitControls.tsx
import { useMemo } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const orchestrator = useScene();
  const stableOptions = useMemo(
    () => options,
    [
      options.enablePan,
      options.enableRotate,
      options.enableZoom,
      options.dampingFactor,
      options.panSpeed,
      options.rotateSpeed,
      options.zoomSpeed,
      options.minDistance,
      options.maxDistance,
      options.minPolarAngle,
      options.maxPolarAngle
    ]
  );
  usePlugin(
    () => new AdvancedOrbitControlsPlugin(stableOptions),
    enabled ? [stableOptions] : []
  );
  if (!enabled || !orchestrator) {
    return null;
  }
  const plugin = orchestrator.plugin("AdvancedOrbitControls");
  if (!plugin) {
    return null;
  }
  const state = {
    enablePan: plugin.enablePan,
    enableRotate: plugin.enableRotate,
    enableZoom: plugin.enableZoom,
    minDistance: plugin.minDistance,
    maxDistance: plugin.maxDistance,
    setEnablePan: (enablePan) => {
      plugin.enablePan = enablePan;
    },
    setEnableRotate: (enableRotate) => {
      plugin.enableRotate = enableRotate;
    },
    setEnableZoom: (enableZoom) => {
      plugin.enableZoom = enableZoom;
    },
    setMinDistance: (minDistance) => {
      plugin.minDistance = minDistance;
    },
    setMaxDistance: (maxDistance) => {
      plugin.maxDistance = maxDistance;
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(state) });
};

export {
  AdvancedOrbitControls
};
