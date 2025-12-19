import {
  usePlugin
} from "./chunk-X54D3YOP.js";
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
  const stableOptions = useMemo(
    () => ({ ...options }),
    [
      ...Object.values(options)
    ]
  );
  const plugin = usePlugin(
    () => new AdvancedOrbitControlsPlugin(stableOptions),
    enabled ? [...Object.values(stableOptions)] : []
  );
  const setEnablePan = useCallback(
    (enablePan) => {
      if (plugin) {
        plugin.enablePan = enablePan;
      }
    },
    [plugin]
  );
  const setEnableRotate = useCallback(
    (enableRotate) => {
      if (plugin) {
        plugin.enableRotate = enableRotate;
      }
    },
    [plugin]
  );
  const setEnableZoom = useCallback(
    (enableZoom) => {
      if (plugin) {
        plugin.enableZoom = enableZoom;
      }
    },
    [plugin]
  );
  const setMinDistance = useCallback(
    (minDistance) => {
      if (plugin) {
        plugin.minDistance = minDistance;
      }
    },
    [plugin]
  );
  const setMaxDistance = useCallback(
    (maxDistance) => {
      if (plugin) {
        plugin.maxDistance = maxDistance;
      }
    },
    [plugin]
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
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance
    };
  }, [plugin, setEnablePan, setEnableRotate, setEnableZoom, setMinDistance, setMaxDistance]);
  return /* @__PURE__ */ jsx(Fragment, { children: enabled && state && children?.(state) });
};

export {
  AdvancedOrbitControls
};
