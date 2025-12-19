import {
  usePlugin
} from "./chunk-GXOLQXMV.js";
import {
  AdvancedOrbitControlsPlugin
} from "./chunk-N3ACJCKO.js";
import {
  useScene
} from "./chunk-BYTQQZPW.js";

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
  const plugin = orchestrator.plugin(
    "AdvancedOrbitControls"
  );
  const state = useMemo(() => {
    if (!plugin) {
      return null;
    }
    return {
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
  }, [
    plugin?.enablePan,
    plugin?.enableRotate,
    plugin?.enableZoom,
    plugin?.maxDistance,
    plugin?.minDistance
  ]);
  return /* @__PURE__ */ jsx(Fragment, { children: enabled && state && children?.(state) });
};

export {
  AdvancedOrbitControls
};
